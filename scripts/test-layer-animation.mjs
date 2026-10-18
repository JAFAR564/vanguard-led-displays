import { spawn } from 'child_process';
import fs from 'fs';

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

const edge = spawn(edgePath, [
  '--headless',
  '--remote-debugging-port=9226',
  '--window-size=1280,900',
  'http://localhost:4321/'
]);

await new Promise(r => setTimeout(r, 1500));

try {
  const versionRes = await fetch('http://127.0.0.1:9226/json/list');
  const tabs = await versionRes.json();
  const pageTab = tabs.find(t => t.type === 'page');

  if (pageTab && pageTab.webSocketDebuggerUrl) {
    const ws = new WebSocket(pageTab.webSocketDebuggerUrl);
    await new Promise(r => ws.onopen = r);

    let id = 1;
    function send(method, params = {}) {
      return new Promise((resolve) => {
        const msgId = id++;
        const onMessage = (event) => {
          const data = JSON.parse(event.data);
          if (data.id === msgId) {
            ws.removeEventListener('message', onMessage);
            resolve(data.result);
          }
        };
        ws.addEventListener('message', onMessage);
        ws.send(JSON.stringify({ id: msgId, method, params }));
      });
    }

    await send('Runtime.enable');
    await send('Page.enable');
    await new Promise(r => setTimeout(r, 1000));

    async function evaluate(expr) {
      const res = await send('Runtime.evaluate', { expression: expr, returnByValue: true });
      return res?.result?.value;
    }

    async function capture(name) {
      const { data } = await send('Page.captureScreenshot', { format: 'jpeg', quality: 85 });
      fs.writeFileSync(`e:\\LED\\scratch-${name}.jpg`, Buffer.from(data, 'base64'));
      console.log(`Saved scratch-${name}.jpg`);
    }

    // Check initial state while above the section
    const preScrollInfo = await evaluate(`
      (() => {
        const cards = Array.from(document.querySelectorAll('.chassis-card'));
        return {
          gridClass: document.getElementById('layer-cards-grid')?.className,
          cardsCount: cards.length,
          card1Transform: window.getComputedStyle(cards[0]).transform,
          card1Opacity: window.getComputedStyle(cards[0]).opacity,
        };
      })()
    `);
    console.log('Pre-scroll info (before reaching section 6):', preScrollInfo);

    // Scroll directly into section 6
    await evaluate(`
      const el = document.getElementById('architecture');
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
    `);

    // Sample progress at +50ms, +180ms, +350ms, +800ms
    for (const delay of [50, 180, 350, 800]) {
      await new Promise(r => setTimeout(r, delay === 50 ? 50 : delay - 50));
      const info = await evaluate(`
        (() => {
          const grid = document.getElementById('layer-cards-grid');
          const cards = Array.from(document.querySelectorAll('.chassis-card'));
          return {
            delay: ${delay},
            gridClass: grid ? grid.className : null,
            cards: cards.map((c, i) => ({
              index: i,
              opacity: parseFloat(window.getComputedStyle(c).opacity).toFixed(2),
              transform: window.getComputedStyle(c).transform
            }))
          };
        })()
      `);
      console.log('Time +' + delay + 'ms:', info);
      if (delay === 180 || delay === 800) {
        await capture('layer-anim-' + delay + 'ms');
      }
    }

    ws.close();
  }
} catch (e) {
  console.error(e);
} finally {
  edge.kill();
}
