import { spawn } from 'child_process';

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

const edge = spawn(edgePath, [
  '--headless',
  '--remote-debugging-port=9223',
  '--window-size=1280,800',
  'http://localhost:4321/'
]);

await new Promise(r => setTimeout(r, 1500));

try {
  const versionRes = await fetch('http://127.0.0.1:9223/json/list');
  const tabs = await versionRes.json();
  const pageTab = tabs.find(t => t.type === 'page');
  console.log('Found page tab:', pageTab ? pageTab.url : 'none');

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
    
    // Wait for page to settle
    await new Promise(r => setTimeout(r, 1000));

    async function evaluate(expr) {
      const res = await send('Runtime.evaluate', { expression: expr, returnByValue: true });
      return res?.result?.value;
    }

    const initialInfo = await evaluate(`
      ({
        trackHeight: document.querySelector('.hero-scroll-track')?.offsetHeight,
        stickyTop: document.querySelector('#sticky-stage')?.getBoundingClientRect().top,
        useCasesTop: document.querySelector('#use-cases')?.getBoundingClientRect().top,
        useCasesMarginTop: window.getComputedStyle(document.querySelector('#use-cases')).marginTop,
        windowHeight: window.innerHeight,
        documentHeight: document.documentElement.scrollHeight
      })
    `);
    console.log('Initial Info:', initialInfo);

    for (const scrollY of [0, 800, 1600, 2000, 2400, 2600, 2800, 3200]) {
      await evaluate(`window.scrollTo(0, ${scrollY})`);
      await new Promise(r => setTimeout(r, 200)); // wait for rAF / lerp
      const pos = await evaluate(`
        (() => {
          const s = document.querySelector('#sticky-stage');
          const u = document.querySelector('#use-cases');
          const sr = s ? s.getBoundingClientRect() : null;
          const ur = u ? u.getBoundingClientRect() : null;
          return {
            scrollY: window.scrollY,
            stickyTop: sr ? sr.top : null,
            stickyHeight: sr ? sr.height : null,
            stickyTransform: s ? s.style.transform : null,
            useCasesTop: ur ? ur.top : null,
            useCasesBottom: ur ? ur.bottom : null
          };
        })()
      `);
      console.log('ScrollY ' + scrollY + ':', pos);
    }

    ws.close();
  }
} catch (e) {
  console.error(e);
} finally {
  edge.kill();
}
