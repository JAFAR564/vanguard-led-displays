import { spawn } from 'child_process';

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

const edge = spawn(edgePath, [
  '--headless',
  '--remote-debugging-port=9224',
  '--window-size=1280,800',
  'http://localhost:4321/'
]);

await new Promise(r => setTimeout(r, 1500));

try {
  const versionRes = await fetch('http://127.0.0.1:9224/json/list');
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
    
    // Wait for frames to load
    await new Promise(r => setTimeout(r, 1500));

    async function evaluate(expr) {
      const res = await send('Runtime.evaluate', { expression: expr, returnByValue: true });
      return res?.result?.value;
    }

    async function captureScreenshot(name) {
      const { data } = await send('Page.captureScreenshot', { format: 'jpeg', quality: 80 });
      import('fs').then(fs => {
        fs.writeFileSync(`e:\\LED\\scratch-${name}.jpg`, Buffer.from(data, 'base64'));
        console.log(`Saved screenshot scratch-${name}.jpg`);
      });
    }

    // Capture key milestones
    const milestones = [
      { y: 0, name: '1-hero-start' },
      { y: 700, name: '2-beat-1' },
      { y: 1100, name: '3-beat-2' },
      { y: 1416, name: '4-video-complete-sheet-contact' },
      { y: 1770, name: '5-sheet-halfway-hero-receded' },
      { y: 2150, name: '6-sheet-docked-top' },
      { y: 2500, name: '7-normal-scroll-content' },
    ];

    for (const m of milestones) {
      await evaluate(`window.scrollTo(0, ${m.y})`);
      await new Promise(r => setTimeout(r, 600)); // allow rAF lerp to settle
      await captureScreenshot(m.name);
    }

    await new Promise(r => setTimeout(r, 500));
    ws.close();
  }
} catch (e) {
  console.error(e);
} finally {
  edge.kill();
}
