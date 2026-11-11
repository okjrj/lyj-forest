const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const { spawn } = require('node:child_process');
const { pathToFileURL } = require('node:url');
const candidates = [process.env.CHROME_PATH,
  path.join(os.homedir(), 'AppData/Local/ms-playwright/chromium_headless_shell-1148/chrome-win/headless_shell.exe'),
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'].filter(Boolean);
const executable = candidates.find(p => fs.existsSync(p));
if (!executable) throw Error('Set CHROME_PATH to a Chromium browser executable.');
const browser = spawn(executable, ['--headless', '--no-sandbox', '--disable-gpu', '--remote-debugging-pipe'], { stdio: ['ignore', 'pipe', 'pipe', 'pipe', 'pipe'] });
let sequence = 0, buffer = '';
const pending = new Map(), exceptions = [];
browser.stdio[4].on('data', chunk => {
  buffer += chunk.toString();
  let end;
  while ((end = buffer.indexOf('\0')) >= 0) {
    const message = JSON.parse(buffer.slice(0, end)); buffer = buffer.slice(end + 1);
    if (message.method === 'Runtime.exceptionThrown') exceptions.push(message.params.exceptionDetails.text);
    if (pending.has(message.id)) { pending.get(message.id)(message); pending.delete(message.id); }
  }
});
function send(method, params = {}, sessionId) {
  return new Promise((resolve, reject) => {
    const id = ++sequence;
    const timer = setTimeout(() => { pending.delete(id); reject(Error('Browser timeout: ' + method)); }, 10000);
    pending.set(id, response => { clearTimeout(timer); response.error ? reject(Error(response.error.message)) : resolve(response.result); });
    browser.stdio[3].write(JSON.stringify({ id, method, params, sessionId }) + '\0');
  });
}
const checks = `(() => {
  const assert=(condition,message)=>{if(!condition)throw Error(message);};
  cancelAnimationFrame(frame);paused=false;time=0;
  assert(gifts.length===(w<650?6:12),'Hanging gifts missing');
  const originalCrunch=playCrunch;let crunchCalls=0;
  playCrunch=()=>{crunchCalls++;return false;};
  resetGifts();forestAsleep=false;pointer.strength=1;lastMove=performance.now();
  const first=gifts[0];fairy.x=w-10;fairy.y=h-10;
  assert(!eatNearGift(giftPosition(first)),'Distant gift consumed');
  fairy.x=first.x;fairy.y=first.y+12;pointer.x=fairy.x;pointer.y=fairy.y;
  canvas.dispatchEvent(new MouseEvent('click',{clientX:first.x,clientY:first.y}));
  assert(first.phase==='flying'&&biteTime>0,'Click did not start eating animation');
  assert(wrapping.some(p=>p.kind==='paper')&&wrapping.some(p=>p.kind==='ribbon'),'Click did not release paper and ribbon');
  updateGifts(.5);assert(first.phase==='eaten','Gift did not disappear');
  assert(crunchCalls===1,'Click eating did not trigger crunch');updateGifts(.5);
  assert(crunchCalls===1,'An eaten gift replayed its crunch');
  assert(giftCount.textContent.includes('1 /'),'Counter did not update');
  paused=true;assert(!eatNearGift(),'Paused game consumed a gift');paused=false;
  const next=gifts.find(g=>g.phase==='hanging');fairy.x=next.x;fairy.y=next.y+12;
  cameraStream={getTracks:()=>[]};faceFeatures={};
  canvas.dispatchEvent(new MouseEvent('click',{clientX:next.x,clientY:next.y}));
  assert(next.phase==='hanging','Webcam mode allowed click consumption');
  const points=Array.from({length:478},()=>({x:.5,y:.5}));
  points[61]={x:.4,y:.5};points[291]={x:.6,y:.5};
  points[13]={x:.5,y:.49};points[14]={x:.5,y:.51};
  updateMouthGesture(points,performance.now(),640,480);
  assert(!mouthOpen,'Closed mouth detected as open');
  points[13].y=.4;points[14].y=.6;
  updateMouthGesture(points,performance.now(),640,480);updateGifts(0);
  assert(next.phase==='hanging','Mouth noise bypassed the hold duration');
  mouthOpenedAt-=200;updateGifts(0);
  assert(next.phase==='flying'&&!mouthArmed,'Open mouth did not consume nearby gift');
  updateGifts(.5);const eaten=gifts.filter(g=>g.phase==='eaten').length;updateGifts(.5);
  assert(gifts.filter(g=>g.phase!=='hanging').length===eaten,'Held-open mouth consumed repeatedly');
  assert(crunchCalls===2,'Webcam eating did not trigger exactly one crunch');
  points[13].y=.49;points[14].y=.51;updateMouthGesture(points,performance.now(),640,480);
  assert(!mouthOpen&&mouthArmed,'Closing mouth did not rearm');
  Object.defineProperty(video,'readyState',{value:2,configurable:true});
  Object.defineProperty(video,'currentTime',{value:1,configurable:true});
  faceLandmarker={detectForVideo:()=>({faceLandmarks:[]})};lastDetection=-Infinity;lastVideoTime=-1;
  faceSeen=performance.now()-1000;mouthOpen=true;trackFace(performance.now());cancelAnimationFrame(faceFrame);
  assert(!faceFeatures&&!mouthOpen&&mouthArmed,'Lost face left eating gesture active');
  delete video.readyState;delete video.currentTime;stopCamera();
  assert(!cameraStream&&!mouthOpen,'Camera stop did not clear gesture');
  fairy.x=w/2;fairy.y=h/2;pointer.x=fairy.x;pointer.y=fairy.y;pointer.strength=1;
  const overlap=gifts.find(g=>g.phase==='hanging'),originalGift={...overlap};
  overlap.x=fairy.x;overlap.y=fairy.y-36;overlap.color=1;
  wrapping.length=0;draw(0);
  const box=giftPosition(overlap),front=ctx.getImageData(Math.floor((box.x-6)/pixelSize),Math.floor((box.y-6)/pixelSize),1,1).data;
  assert(front[1]>front[0]+25,'Gift behind the snowman sprite');
  Object.assign(overlap,originalGift);
  biteTime=.6;ctx.clearRect(0,0,w,h);drawFairy(0,fairy,2.6,true);
  const openMouth=ctx.getImageData(Math.floor((fairy.x+18)/pixelSize),Math.floor((fairy.y-6)/pixelSize),1,1).data;
  assert(openMouth[0]===48&&openMouth[1]===37,'Wide bite mouth did not render');
  biteTime=0;
  const eyePatch=document.createElement('canvas');eyePatch.width=24;eyePatch.height=8;
  const eyePixels=eyePatch.getContext('2d');eyePixels.fillStyle='#a526b7';eyePixels.fillRect(0,0,24,8);
  const feature={canvas:eyePatch,aspect:1/3};
  faceFeatures={rightEye:feature,leftEye:feature,mouth:feature};cameraStream={};
  ctx.clearRect(0,0,w,h);drawFairy(0,fairy,2.6,true);
  const outerEye=ctx.getImageData(Math.floor((fairy.x+48)/pixelSize),Math.floor((fairy.y-66)/pixelSize),1,1).data;
  assert(outerEye[0]===165&&outerEye[2]===183,'Enlarged webcam eye did not cover the expected area');
  faceFeatures.mouth={canvas:eyePatch,aspect:.7};
  mouthOpen=true;
  ctx.clearRect(0,0,w,h);drawFairy(0,fairy,2.6,true);
  const lowerLip=ctx.getImageData(Math.floor(fairy.x/pixelSize),Math.floor((fairy.y+32)/pixelSize),1,1).data;
  assert(lowerLip[0]===165&&lowerLip[2]===183,'Open webcam mouth did not stretch downward');
  faceFeatures=null;cameraStream=null;mouthOpen=false;
  ctx.fillStyle='#fff';ctx.fillRect(0,0,w,h);lightForest();
  const center=ctx.getImageData(Math.floor(fairy.x/pixelSize),Math.floor((fairy.y-48)/pixelSize),1,1).data;
  const edge=ctx.getImageData(0,0,1,1).data;
  assert(center[0]>220&&edge[0]<50,'Spotlight did not preserve bright center and dark outer area');
  resetGifts();gifts[0].phase='eaten';forestAsleep=false;lastMove=performance.now()-60000;
  for(let i=0;i<120;i++)draw(.05);
  assert(pointer.strength===0&&forestAsleep,'Idle forest did not fully turn off');
  assert(gifts[0].phase==='eaten','Gift respawned before reawakening');
  lastMove=performance.now();draw(.016);
  assert(gifts.every(g=>g.phase==='hanging'),'Gifts did not respawn on next awakening');
  assert(!ctx.imageSmoothingEnabled&&!screen.imageSmoothingEnabled,'Pixel scaling lost');
  playCrunch=originalCrunch;
  const offline=new OfflineAudioContext(1,24000,48000),sample=buildCrunchBuffer(offline).getChannelData(0);
  let power=0,peak=0;for(const v of sample){power+=v*v;peak=Math.max(peak,Math.abs(v));}
  assert(Math.sqrt(power/sample.length)>.04&&peak<=.851,'Crunch waveform is silent or clipped: rms='+Math.sqrt(power/sample.length)+', peak='+peak);
  document.querySelector('#sound-toggle').click();
  assert(!soundEnabled&&document.querySelector('#sound-toggle').getAttribute('aria-pressed')==='false','Mute control failed');
  assert(!playCrunch(),'Muted crunch was allowed to play');
  document.querySelector('#sound-toggle').click();assert(soundEnabled,'Sound re-enable failed');
  paused=true;cancelAnimationFrame(frame);pointer.strength=1;lastMove=performance.now();draw(0);
  return 'PASS '+w+'x'+h+': proximity/click, eating animation, webcam-only gesture, one bite per opening, face loss, spotlight, dark-cycle respawn, click/webcam crunch, audio waveform, mute toggle, front gift layer, wide mouth, wrapper particles';
})()`;
(async () => {
  try {
    const target = await send('Target.createTarget', { url: 'about:blank' });
    const attach = await send('Target.attachToTarget', { targetId: target.targetId, flatten: true });
    const session = attach.sessionId;
    await send('Runtime.enable', {}, session); await send('Page.enable', {}, session);
    for (const [width, height, label] of [[1440,1000,'desktop'],[390,844,'mobile']]) {
      await send('Emulation.setDeviceMetricsOverride', { width,height,deviceScaleFactor:1,mobile:false }, session);
      await send('Page.navigate', { url:pathToFileURL(path.join(__dirname,'../forest.html')).href }, session);
      await send('Runtime.evaluate', { expression:'document.fonts.ready',awaitPromise:true }, session);
      const result = await send('Runtime.evaluate', { expression:checks,returnByValue:true }, session);
      if (result.exceptionDetails) throw Error(result.exceptionDetails.exception?.description || result.exceptionDetails.text);
      console.log(result.result.value);
      if (process.env.FOREST_PREVIEW_DIR) {
        const shot = await send('Page.captureScreenshot', { format:'png' }, session);
        fs.writeFileSync(path.join(process.env.FOREST_PREVIEW_DIR,'gift-forest-'+label+'.png'),Buffer.from(shot.data,'base64'));
      }
    }
    if (exceptions.length) throw Error(exceptions.join('\n'));
  } catch(error) { console.error(error);process.exitCode=1; }
  finally { browser.kill(); }
})();
