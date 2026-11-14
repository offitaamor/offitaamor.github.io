(() => {
  'use strict';
  const D = window.EXHIBITION_DATA;
  if (!D) throw new Error('EXHIBITION_DATA is missing');
  const $ = id => document.getElementById(id);
  const canvas = $('worldCanvas'), ctx = canvas.getContext('2d', {alpha:false});
  const el = {splash:$('splash'),game:$('game'),modalLayer:$('modalLayer'),modal:$('modal'),content:$('modalContent'),zoneName:$('zoneName'),zoneToast:$('zoneToast'),toast:$('toast'),interactText:$('interactText'),stampDots:$('stampDots'),questCounter:$('questCounter'),bubble:$('missionBubble')};
  const WORLD={w:3980,h:1000,top:170,bottom:865,doors:[2770]};
  const ZONES=[{id:0,x:0,end:650,label:'ENTRANCE',ko:'연암서당골 입구',color:'#ddd2bf',spawn:338},{id:1,x:650,end:1870,label:'SESSION 01',ko:'내가 바라본 대구',color:'#d6c8b1',spawn:810},{id:2,x:1870,end:2770,label:'SESSION 02',ko:'내가 지낸 연암서당골',color:'#d7cab8',spawn:2010},{id:3,x:2770,end:3980,label:'SESSION 03',ko:'MUSIC & ART SHOP',color:'#c8b9aa',spawn:2910}];
  const positions = [
    ...D.posters.map(a=>({id:a.id,type:'poster',data:a,x:a.x,y:a.y,w:a.w,h:a.h})),
    ...D.artworks.slice(0,9).map((a,i)=>({id:a.id,type:'art',data:a,x:765+i*131,y:324,w:102,h:102})),
    ...D.archive.map((a,i)=>({id:a.id,type:'archive',data:a,x:1955+i*135,y:722,w:106,h:142})),
    ...D.artworks.slice(9).map((a,i)=>({id:a.id,type:'art',data:a,x:2890+i*185,y:324,w:143,h:143})),
    {id:'bird-1',type:'bird',x:525,y:723,w:72,h:72,data:{title:'서비 — 입구'}},
    {id:'bird-2',type:'bird',x:2412,y:535,w:72,h:72,data:{title:'서비 — 연암'}},
    {id:'bird-3',type:'bird',x:3798,y:535,w:72,h:72,data:{title:'서비 — 음악'}}
  ];
  const storeKey='offita_daegu_walk_v1';
  const emptyProgress=()=>({art:[],field:[],sound:[],birds:[],note:false,favorite:'art14',memo:''});
  let progress=emptyProgress();
  try {const saved=JSON.parse(localStorage.getItem(storeKey)||'null');if(saved&&typeof saved==='object') progress={...emptyProgress(),...saved};}catch(_){/* browser storage may be disabled */}
  for(const key of ['art','field','sound','birds'])if(!Array.isArray(progress[key]))progress[key]=[];
  const save=()=>{try{localStorage.setItem(storeKey,JSON.stringify(progress));}catch(_){}};
  let running=false, modalOpen=false, lastFrame=0, lastZone=-1, t=0, camera={x:0,y:0,scale:1}, cw=1,ch=1,dpr=1,autogo=null,pending=null,zoneToastUntil=0,toastUntil=0,touchPresentation=false;
  let player={x:342,y:551,dir:1,moving:false,step:0};
  const keys=new Set(), joy={x:0,y:0,active:false,id:null};
  const images={};
  // Small previews are used in the game to avoid decoding fifteen full-resolution artwork images on mobile.
  for(const a of D.artworks){const img=new Image();img.decoding='async';img.src=D.assets.thumb(a.index);images[a.id]=img;}
  for(const a of D.archive){const img=new Image();img.decoding='async';img.src=D.assets.archive(a.pages[0]);images[a.id]=img;}
  for(const a of D.posters){const img=new Image();img.decoding='async';img.src=D.assets.poster(a.asset);images[a.id]=img;}
  const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
  const touchLayout=()=>window.matchMedia('(pointer:coarse), (max-width:720px)').matches;
  const distance=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
  const roundRect=(x,y,w,h,r=10)=>{ctx.beginPath();if(typeof ctx.roundRect==='function')ctx.roundRect(x,y,w,h,r);else ctx.rect(x,y,w,h)};
  function resize(){cw=canvas.clientWidth||innerWidth;ch=canvas.clientHeight||innerHeight;touchPresentation=touchLayout();dpr=Math.min(window.devicePixelRatio||1,touchPresentation?1.5:2);canvas.width=Math.round(cw*dpr);canvas.height=Math.round(ch*dpr);camera.scale=cw<720?clamp(cw/420,.76,1.02):clamp(cw/1350,.89,1.12);}
  window.addEventListener('resize',resize,{passive:true});resize();
  function sectionFor(x){return x<650?0:x<1870?1:x<2770?2:3;}
  function allCounts(){return {ART:new Set(progress.art).size,FIELD:new Set(progress.field).size,SOUND:new Set(progress.sound).size,SEBI:new Set(progress.birds).size,NOTE:progress.note?1:0};}
  function completed(){const v=allCounts();return D.missions.filter(m=>v[m.id]>=m.goal).length;}
  function updateMissionUI(){const counts=allCounts();const n=completed();el.stampDots.innerHTML=D.missions.map(m=>`<span class="stamp-dot ${counts[m.id]>=m.goal?'filled':''}" title="${m.title}">${counts[m.id]>=m.goal?'✓':'·'}</span>`).join('');el.questCounter.textContent=`${n} / ${D.missions.length}`;el.bubble.textContent=n;}
  updateMissionUI();
  function toast(message,seconds=2.8){el.toast.textContent=message;el.toast.classList.add('visible');toastUntil=performance.now()+seconds*1000;}
  function award(type,item){const before=completed();if(type==='NOTE'){progress.note=true;}else{const key={ART:'art',FIELD:'field',SOUND:'sound',SEBI:'birds'}[type];if(key&&!progress[key].includes(item))progress[key].push(item);}save();updateMissionUI();const after=completed();if(after>before){const m=D.missions.find(m=>m.id===type);toast(`✦ 「${m.title}」 미션 완료! 스탬프를 획득했습니다.`,4);}else if(after===D.missions.length&&before===D.missions.length){} }
  function nearest(max=185){let best=null,bd=max;for(const p of positions){const d=distance(player,p);if(d<bd){best=p;bd=d;}}return best;}
  function canWalk(x,y){if(x<80||x>WORLD.w-80||y<WORLD.top+75||y>WORLD.bottom-37)return false;for(const wallX of WORLD.doors){if(Math.abs(x-wallX)<24&& (y<450||y>647))return false;}return true;}
  function move(dx,dy){if(dx===0&&dy===0)return false;const nx=player.x+dx,ny=player.y+dy;let moved=false;if(canWalk(nx,player.y)){player.x=nx;moved=true;}if(canWalk(player.x,ny)){player.y=ny;moved=true;}return moved;}
  function objectWalkTarget(obj){const offset=obj.y<470?150:obj.y>650?-145:85;return {x:obj.x,y:clamp(obj.y+offset,310,730)};}
  function approach(obj){if(distance(player,obj)<160){interact(obj);return;}autogo=objectWalkTarget(obj);pending=obj;toast('작품 가까이 이동합니다. 방향키로도 직접 걸을 수 있어요.',1.6);}
  function zoneVisit(){const zone=sectionFor(player.x);if(zone!==lastZone){lastZone=zone;el.zoneName.textContent=`${ZONES[zone].label} · ${ZONES[zone].ko}`;if(running && zone!==0){el.zoneToast.querySelector('span').textContent=`${ZONES[zone].label} / ${ZONES[zone].ko}`;el.zoneToast.classList.remove('hidden');zoneToastUntil=performance.now()+2400;}}}
  function loadFit(img,x,y,w,h){if(!img||!img.complete||!img.naturalWidth){ctx.fillStyle='#e4d8c5';ctx.fillRect(x,y,w,h);ctx.fillStyle='#a08c72';ctx.fillRect(x+12,y+12,w-24,3);return;}const iw=img.naturalWidth,ih=img.naturalHeight,ar=Math.min(w/iw,h/ih);const dw=iw*ar,dh=ih*ar;ctx.drawImage(img,x+(w-dw)/2,y+(h-dh)/2,dw,dh);}
  const label=(text,x,y,size=15,color='#685b4e',align='center',font='sans-serif')=>{ctx.fillStyle=color;ctx.textAlign=align;ctx.textBaseline='middle';ctx.font=`${size}px ${font}`;ctx.fillText(text,x,y)};
  function floorPattern(x,w,kind){
    // An unfolded visitor route: the two sides of the main room lead to the smaller music room.
    ctx.fillStyle='#e9e8e4';ctx.fillRect(x,90,w,815);
    ctx.fillStyle='#faf9f5';ctx.fillRect(x,95,w,348);
    ctx.fillStyle=kind===2?'#b49b82':'#faf9f5';ctx.fillRect(x,650,w,206);
    if(kind===2){ctx.fillStyle='rgba(81,61,46,.24)';for(let py=657;py<855;py+=10)for(let px=x+9;px<x+w;px+=10){ctx.beginPath();ctx.arc(px,py,1.05,0,Math.PI*2);ctx.fill();}}
    ctx.fillStyle='#292925';ctx.fillRect(x,91,w,5);ctx.fillRect(x,127,w,4);ctx.fillRect(x,858,w,12);
    ctx.strokeStyle='rgba(45,43,40,.3)';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(x+6,140);ctx.lineTo(x+w-5,140);ctx.stroke();
    for(let px=x+95;px<x+w;px+=225){ctx.fillStyle='#f4f2ed';ctx.fillRect(px-10,132,20,23);ctx.fillStyle='#ddd9d0';ctx.fillRect(px-7,153,14,4);const glow=ctx.createRadialGradient(px,163,3,px,265,128);glow.addColorStop(0,'rgba(255,248,226,.31)');glow.addColorStop(1,'rgba(255,248,226,0)');ctx.fillStyle=glow;ctx.fillRect(px-130,155,260,225);}
    ctx.fillStyle='#d2d1cb';ctx.fillRect(x,444,w,205);ctx.fillStyle='rgba(69,68,65,.06)';for(let i=0;i<140;i++){const px=x+(i*173.1)%w,py=450+(i*97.7)%195;ctx.fillRect(px,py,2,1);}
    ctx.fillStyle='#cac9c3';ctx.fillRect(x,445,w,3);ctx.fillStyle='#f1f0ec';ctx.fillRect(x,646,w,4);
  }
  function roomDetails(){
    floorPattern(0,650,0);floorPattern(650,1220,1);floorPattern(1870,900,2);floorPattern(2770,1210,3);
    // The room photograph shows a continuous narrow hall and one rear doorway.
    ctx.fillStyle='#e9e8e4';ctx.fillRect(2761,90,18,355);ctx.fillRect(2761,649,18,255);
    ctx.fillStyle='#34322f';ctx.fillRect(2764,440,9,12);ctx.fillRect(2764,643,9,12);
    ctx.fillStyle='#fbfaf6';ctx.fillRect(688,389,1144,15);ctx.fillStyle='#7c7b77';ctx.fillRect(688,404,1144,5);
    ctx.fillStyle='#eee9e0';ctx.fillRect(740,676,1015,91);ctx.fillStyle='#aa9a86';ctx.fillRect(740,675,1015,8);ctx.fillStyle='#64564b';ctx.fillRect(740,767,16,23);ctx.fillRect(1739,767,16,23);
    for(let px=805;px<1740;px+=198){ctx.fillStyle='#c0b8aa';ctx.fillRect(px,686,81,55);ctx.fillStyle='#e6dfd2';ctx.fillRect(px+5,685,75,51);}
    ctx.fillStyle='#b18b65';ctx.fillRect(1725,478,165,132);ctx.fillStyle='#c29f79';ctx.fillRect(1725,476,165,10);ctx.fillStyle='#8e6e4e';ctx.fillRect(1725,602,165,8);
    ctx.fillStyle='#c3a07b';ctx.fillRect(2820,477,1125,104);ctx.fillStyle='#a5805f';ctx.fillRect(2820,570,1125,12);ctx.fillStyle='#967554';ctx.fillRect(2870,582,18,105);ctx.fillRect(3880,582,18,105);
    ctx.fillStyle='#2b2a28';ctx.fillRect(3550,403,90,71);ctx.fillStyle='#b3a391';ctx.fillRect(3560,415,70,45);
    label('OFFITA  ×  DAEGU',322,176,18,'#393733','center','Georgia,serif');
    for(const z of ZONES.slice(1)){label(z.label,z.x+(z.end-z.x)/2,178,15,'#514d47','center','Georgia,serif');label(z.ko,z.x+(z.end-z.x)/2,210,13,'#6e6960');}
    label('WHITE PICTURE LEDGE  /  CITY ARTWORK',1240,623,12,'#69645d','center','Georgia,serif');
    label('PEGBOARD  /  FIELD ARCHIVE',2320,623,12,'#69645d','center','Georgia,serif');
    label('MUSIC ROOM  /  WOOD TABLE',3340,623,12,'#69645d','center','Georgia,serif');
    ctx.fillStyle='#d5c2a8';ctx.fillRect(110,502,425,72);label('DAEGUL DAEGUL · LOCAL VENTURE STAGE',322,539,13,'#3d3934','center','Georgia,serif');
  }
  function drawFrame(p,now){
    ctx.save();
    const active=distance(player,p)<180;
    const x=p.x-p.w/2,y=p.y-p.h/2;
    const light=ctx.createRadialGradient(p.x,p.y,10,p.x,p.y,Math.max(p.w,p.h)*1.45);
    light.addColorStop(0,'rgba(255,243,208,.32)');light.addColorStop(1,'rgba(255,243,208,0)');
    ctx.fillStyle=light;ctx.fillRect(p.x-p.w*1.4,p.y-p.h*1.3,p.w*2.8,p.h*2.6);
    ctx.shadowColor='rgba(35,27,22,.48)';ctx.shadowBlur=16;ctx.shadowOffsetY=11;
    ctx.fillStyle=active?'#d5ad61':'#55483c';ctx.fillRect(x-9,y-9,p.w+18,p.h+18);
    ctx.shadowColor='transparent';ctx.shadowBlur=0;ctx.shadowOffsetY=0;
    ctx.fillStyle='#b6a083';ctx.fillRect(x-5,y-5,p.w+10,p.h+10);
    ctx.fillStyle='#f4ebdc';ctx.fillRect(x-2,y-2,p.w+4,p.h+4);
    ctx.fillStyle='#e4d8c5';ctx.fillRect(x+3,y+3,p.w-6,p.h-6);
    loadFit(images[p.id],x+4,y+4,p.w-8,p.h-8);
    ctx.strokeStyle=active?'#eecb7e':'rgba(67,53,43,.4)';ctx.lineWidth=active?3:1;
    ctx.strokeRect(x-10,y-10,p.w+20,p.h+20);
    ctx.fillStyle='#f4eddf';ctx.fillRect(x-8,y+p.h+12,p.w+16,28);
    ctx.fillStyle='#a89579';ctx.fillRect(x-8,y+p.h+12,p.w+16,2);
    ctx.fillStyle='#554b40';ctx.textAlign='center';ctx.textBaseline='middle';ctx.font=`${p.w<130?9:10}px sans-serif`;
    const title=p.data.title;
    ctx.fillText(title.length>15?title.slice(0,14)+'…':title,p.x,y+p.h+27,p.w+8);
    if(active)label(touchPresentation?'TAP / VIEW':'E  /  VIEW',p.x,y-24,11,'#62503d','center','Georgia,serif');
    ctx.restore();
  }
  function drawSwallow(p,now){ctx.save();const found=progress.birds.includes(p.id);const w=1.7;const bob=Math.sin(now*.002+p.x)*5;ctx.translate(p.x,p.y+bob);ctx.rotate(Math.sin(now*.0015+p.y)*.06);ctx.fillStyle='rgba(60,43,33,.17)';ctx.beginPath();ctx.ellipse(0,25,32,10,0,0,Math.PI*2);ctx.fill();ctx.globalAlpha=found?.48:1;ctx.strokeStyle='#453f39';ctx.lineWidth=3;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(0,2);ctx.quadraticCurveTo(-16,-20,-40,-17);ctx.quadraticCurveTo(-28,-4,-8,12);ctx.quadraticCurveTo(-2,25,0,22);ctx.quadraticCurveTo(2,25,8,12);ctx.quadraticCurveTo(28,-4,40,-17);ctx.quadraticCurveTo(16,-20,0,2);ctx.stroke();ctx.fillStyle='#363c42';ctx.beginPath();ctx.ellipse(0,9,9,15,0,0,Math.PI*2);ctx.fill();ctx.fillStyle='#f2e7d4';ctx.beginPath();ctx.ellipse(0,15,5,8,0,0,Math.PI*2);ctx.fill();ctx.fillStyle='#b28b63';ctx.beginPath();ctx.moveTo(-3,5);ctx.lineTo(0,0);ctx.lineTo(3,5);ctx.fill();ctx.globalAlpha=1;if(found){label('✓',24,-16,16,'#9f756c');}else if(distance(player,p)<190){label('서비 발견!',0,-44,14,'#765342');}ctx.restore();}
  function drawPlayer(now){ctx.save();const stride=player.moving?Math.sin(now*.014):0;const bob=player.moving?Math.abs(stride)*2:Math.sin(now*.002)*.5;ctx.translate(player.x,player.y+bob);ctx.fillStyle='rgba(39,38,35,.20)';ctx.beginPath();ctx.ellipse(0,32,27,8,0,0,Math.PI*2);ctx.fill();
    ctx.strokeStyle='#292a29';ctx.lineWidth=11;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(-7,9);ctx.lineTo(-9+stride*7,31);ctx.moveTo(7,9);ctx.lineTo(9-stride*7,31);ctx.stroke();
    ctx.fillStyle='#242423';roundRect(-18+stride*7,28,20,8,3);ctx.fill();roundRect(0-stride*7,28,20,8,3);ctx.fill();
    ctx.fillStyle='#282a29';roundRect(-19,-31,38,47,7);ctx.fill();ctx.fillStyle='#373936';ctx.beginPath();ctx.moveTo(0,-29);ctx.lineTo(12,10);ctx.lineTo(-4,13);ctx.fill();
    ctx.strokeStyle='#252625';ctx.lineWidth=10;ctx.beginPath();ctx.moveTo(-17,-23);ctx.lineTo(-23-stride*5,7);ctx.moveTo(17,-23);ctx.lineTo(23+stride*5,7);ctx.stroke();
    ctx.fillStyle='#c39e82';ctx.beginPath();ctx.ellipse(0,-45,15,18,0,0,Math.PI*2);ctx.fill();ctx.fillStyle='#252525';ctx.beginPath();ctx.moveTo(-15,-49);ctx.quadraticCurveTo(-10,-70,9,-61);ctx.quadraticCurveTo(19,-59,15,-45);ctx.quadraticCurveTo(3,-55,-15,-49);ctx.fill();
    ctx.fillStyle='#f6f2e9';roundRect(-21,-82,42,18,4);ctx.fill();label('YOU',0,-72,10,'#34332f','center','Georgia,serif');ctx.restore();}
  function paint(){ctx.save();ctx.setTransform(dpr,0,0,dpr,0,0);ctx.fillStyle='#292723';ctx.fillRect(0,0,cw,ch);ctx.translate(-camera.x*camera.scale,-camera.y*camera.scale);ctx.scale(camera.scale,camera.scale);roomDetails();for(const p of positions)if(p.x+240>camera.x&&p.x-240<camera.x+cw/camera.scale){if(p.type==='bird')drawSwallow(p,t);else drawFrame(p,t);}drawPlayer(t);ctx.restore();}
  function step(dt,now){if(!running)return; t=now;if(!modalOpen){let dx=0,dy=0;if(keys.has('ArrowLeft')||keys.has('a'))dx-=1;if(keys.has('ArrowRight')||keys.has('d'))dx+=1;if(keys.has('ArrowUp')||keys.has('w'))dy-=1;if(keys.has('ArrowDown')||keys.has('s'))dy+=1;dx+=joy.x;dy+=joy.y;player.moving=false;let speed=205;let len=Math.hypot(dx,dy);if(len>.1){dx/=Math.max(1,len);dy/=Math.max(1,len);autogo=null;pending=null;player.moving=move(dx*speed*dt,dy*speed*dt);if(Math.abs(dx)>.05)player.dir=dx>0?1:-1;}else if(autogo){const dis=distance(player,autogo);if(dis<13){autogo=null;if(pending&&distance(player,pending)<210){const p=pending;pending=null;interact(p);}else pending=null;}else{const ax=(autogo.x-player.x)/dis,ay=(autogo.y-player.y)/dis;const moved=move(ax*speed*dt,ay*speed*dt);player.moving=moved;if(Math.abs(ax)>.05)player.dir=ax>0?1:-1;if(!moved){autogo=null;pending=null;toast('문이 있는 중앙 통로를 통해 이동해 주세요. 지도로 빠른 이동도 가능합니다.');}}}
    const visW=cw/camera.scale,visH=ch/camera.scale;const tx=player.x-visW/2,ty=player.y-visH*.51;camera.x=clamp(camera.x+(tx-camera.x)*Math.min(1,dt*7),0,Math.max(0,WORLD.w-visW));camera.y=clamp(camera.y+(ty-camera.y)*Math.min(1,dt*7),0,Math.max(0,WORLD.h-visH));zoneVisit();const p=nearest();el.interactText.textContent=p? (p.type==='bird'?'제비 서비에게 말 걸기':p.type==='archive'?'기록 열어보기':`「${p.data.title}」 감상하기`):'가까운 작품을 살펴보세요';}
    if(now>zoneToastUntil)el.zoneToast.classList.add('hidden');if(now>toastUntil)el.toast.classList.remove('visible');paint();}
  function loop(ts){const dt=clamp((ts-lastFrame)/1000||.016,0,.05);lastFrame=ts;step(dt,ts);requestAnimationFrame(loop);}requestAnimationFrame(loop);
  function targetAt(x,y){const visible=positions.filter(p=>Math.abs(p.x-x)<p.w*.62+20 && Math.abs(p.y-y)<p.h*.62+20);return visible.sort((a,b)=>distance({x,y},a)-distance({x,y},b))[0]||null;}
  canvas.addEventListener('pointerup',e=>{if(!running||modalOpen)return;const bounds=canvas.getBoundingClientRect();const x=camera.x+(e.clientX-bounds.left)/camera.scale,y=camera.y+(e.clientY-bounds.top)/camera.scale;const obj=targetAt(x,y);if(obj){if(distance(player,obj)<190)interact(obj);else approach(obj);}else{autogo={x:clamp(x,100,WORLD.w-100),y:clamp(y,255,810)};pending=null;}});
  window.addEventListener('keydown',e=>{const key=e.key.length===1?e.key.toLowerCase():e.key;if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight',' ','e','w','a','s','d'].includes(key)&&running&&!modalOpen){e.preventDefault();}if(key==='Escape'&&modalOpen){closeModal();return;}if(modalOpen||!running)return;if(key==='e'||key===' '){interactNearest();}else keys.add(key);});
  window.addEventListener('keyup',e=>{keys.delete(e.key.length===1?e.key.toLowerCase():e.key)});
  window.addEventListener('blur',()=>{keys.clear();endJoy();});
  document.addEventListener('visibilitychange',()=>{if(document.hidden){keys.clear();endJoy();}});
  $('joystick').addEventListener('pointerdown',e=>{e.preventDefault();joy.active=true;joy.id=e.pointerId;$('joystick').setPointerCapture(e.pointerId);updateJoy(e);});
  $('joystick').addEventListener('pointermove',e=>{if(joy.active&&joy.id===e.pointerId)updateJoy(e);});
  const endJoy=()=>{joy.active=false;joy.id=null;joy.x=0;joy.y=0;$('joystickThumb').style.transform='translate(-50%,-50%)'};
  $('joystick').addEventListener('pointerup',endJoy);$('joystick').addEventListener('pointercancel',endJoy);$('joystick').addEventListener('lostpointercapture',endJoy);
  function updateJoy(e){const r=$('joystick').getBoundingClientRect();let x=e.clientX-(r.left+r.width/2),y=e.clientY-(r.top+r.height/2);const len=Math.max(1,Math.hypot(x,y));const cap=Math.min(r.width/2-16,38);x=clamp(x/len* Math.min(len,cap),-cap,cap);y=clamp(y/len*Math.min(len,cap),-cap,cap);joy.x=x/cap;joy.y=y/cap;$('joystickThumb').style.transform=`translate(calc(-50% + ${x}px),calc(-50% + ${y}px))`;}
  $('touchInteract').addEventListener('click',interactNearest);$('interactBtn').addEventListener('click',interactNearest);$('postcardShortcut').addEventListener('click',openPostcard);
  function interactNearest(){if(modalOpen)return;const p=nearest(190);if(!p){toast('액자나 제비 가까이 걸어가서 다시 눌러주세요.');return;}interact(p);}
  function interact(p){if(!p)return;autogo=null;pending=null;if(p.type==='bird')openBird(p);else if(p.type==='archive')openArchive(p);else if(p.type==='poster')openPoster(p);else openArtwork(p);}
  let modalReturnFocus=null;
  function openModal(html,className=''){if(!modalOpen)modalReturnFocus=document.activeElement;modalOpen=true;keys.clear();endJoy();el.content.innerHTML=html;el.modal.className=`modal ${className}`;el.modalLayer.classList.remove('hidden');el.modalLayer.setAttribute('aria-hidden','false');setTimeout(()=>{if(modalOpen)$('modalClose').focus();},20);}
  function closeModal(){if(!modalOpen)return;el.modalLayer.classList.add('hidden');el.modalLayer.setAttribute('aria-hidden','true');modalOpen=false;el.content.innerHTML='';const target=modalReturnFocus?.isConnected&&!el.modal.contains(modalReturnFocus)?modalReturnFocus:(running?el.game:$('aboutBtn'));modalReturnFocus=null;target?.focus();}
  window.addEventListener('keydown',e=>{if(!modalOpen||e.key!=='Tab')return;const focusables=[...el.modal.querySelectorAll('a[href],button:not([disabled]),input,select,textarea,[tabindex]:not([tabindex="-1"])')].filter(node=>node.getClientRects().length);if(!focusables.length)return;const first=focusables[0],last=focusables[focusables.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}});
  $('modalClose').addEventListener('click',closeModal);el.modalLayer.querySelector('[data-close]').addEventListener('click',closeModal);
  function artNumber(a){return `${String(a.index).padStart(2,'0')} / 15`}
  function openArtwork(p){
    const a=p.data;
    award(a.zone===1?'ART':'SOUND',a.id);
    const views=[{label:'원화',src:D.assets.artwork(a.index),caption:'전시 원화 · 20 × 20 cm',portrait:false}];
    const postcard=D.assets.postcard(a.index),note=D.assets.note(a.index);
    if(postcard)views.push({label:'인쇄 엽서',src:postcard,caption:'실제 전시 엽서 · 앞면 110 × 158 mm',portrait:true});
    if(note)views.push({label:'테이스팅 노트',src:note,caption:a.zone===1?'실제 음식 테이스팅 노트':'실제 음악 테이스팅 노트',portrait:true});
    openModal(`<div class="art-detail"><div class="art-detail-image"><img id="detailImage" src="${views[0].src}" alt="${a.title} 원화"><div class="detail-image-caption" id="detailCaption">${views[0].caption}</div>${views.length>1?`<div class="artifact-tabs" aria-label="작품 자료">${views.map((v,i)=>`<button type="button" data-view="${i}" aria-pressed="${i===0}">${v.label}</button>`).join('')}</div>`:''}<a class="full-image-link" id="detailOriginalLink" href="${views[0].src}" target="_blank" rel="noopener">이미지 크게 보기 ↗</a></div><div class="art-detail-copy"><div class="modal-eyebrow">${a.zone===1?'SESSION 01 / DAEGU CITY PORTRAITS':'SESSION 03 / MUSIC & ART SHOP'}</div><h2>${a.title}</h2><div class="detail-num">${a.subtitle}</div><div class="modal-rule"></div><div class="modal-eyebrow">${a.kind} · ARTWORK ${artNumber(a)}</div><p>${a.description}</p>${views.length>1?'<p class="artifact-context">원화와 실제 전시에서 제작한 인쇄물을 위의 탭에서 함께 살펴보세요.</p>':''}${a.zone===3?'<div class="tip-box">현재 제공된 자료에는 실제 음원 파일이 포함되어 있지 않습니다. 음원 파일을 연결하면 이 자리에 음악 재생 기능을 활성화할 수 있습니다.</div>':''}<div class="detail-buttons"><button class="action-btn" id="favoriteButton">이 작품을 마음에 담기 ♡</button><button class="action-btn ghost" id="artCloseButton">산책 계속하기 ↗</button></div></div></div>`,'art-modal');
    el.content.querySelectorAll('[data-view]').forEach(button=>button.onclick=()=>{const view=views[Number(button.dataset.view)];const img=$('detailImage');img.src=view.src;img.alt=`${a.title} ${view.label}`;img.classList.toggle('artifact-portrait',view.portrait);$('detailCaption').textContent=view.caption;$('detailOriginalLink').href=view.src;el.content.querySelectorAll('[data-view]').forEach(other=>other.setAttribute('aria-pressed',String(other===button)));});
    $('favoriteButton').onclick=()=>{progress.favorite=a.id;save();toast('「'+a.title+'」 작품을 관람 엽서에 저장했어요.');$('favoriteButton').textContent='마음에 담았어요 ♥';};
    $('artCloseButton').onclick=closeModal;
  }
  function openArchive(p,pageIndex=0,record=true){
    const a=p.data;
    if(record)award('FIELD',a.id);
    const source=D.assets.archive(a.pages[pageIndex]);
    const isPanel=a.kind==='panel';
    openModal(`<div class="archive-detail"><div class="archive-preview"><img src="${source}" alt="${a.title} ${pageIndex+1}페이지"><a class="full-image-link" href="${source}" target="_blank" rel="noopener">${isPanel?'실제 A3 패널 크게 보기':'이미지 크게 보기'} ↗</a></div><div class="archive-copy"><div class="modal-eyebrow">SESSION 02 / OFFITA FIELD ARCHIVE</div><h2>${a.title}</h2><div class="archive-step">${a.subtitle}</div><div class="modal-rule"></div><p>${a.description}</p><p class="archive-source">${isPanel?'첨부된 실제 전시 패널을 디지털로 옮겼습니다. 작은 글씨는 이미지 크게 보기로 읽어주세요.':'실제 전시 준비와 연암서당골 체류 중 남긴 사진·색채 기록입니다.'}</p><div class="archive-nav"><button class="action-btn ghost" id="archivePrev" ${pageIndex===0?'disabled':''}>← 이전</button><span>${pageIndex+1} / ${a.pages.length}</span><button class="action-btn" id="archiveNext">${pageIndex+1===a.pages.length?'산책 계속':'다음 →'}</button></div></div></div>`,'archive-modal');
    $('archivePrev').onclick=()=>openArchive(p,pageIndex-1,false);
    $('archiveNext').onclick=()=>pageIndex+1===a.pages.length?closeModal():openArchive(p,pageIndex+1,false);
  }
  function openPoster(p){
    const a=p.data,source=D.assets.poster(a.asset);
    openModal(`<div class="archive-detail poster-detail"><div class="archive-preview"><img src="${source}" alt="${a.title} 실제 전시 포스터"><a class="full-image-link" href="${source}" target="_blank" rel="noopener">포스터 크게 보기 ↗</a></div><div class="archive-copy"><div class="modal-eyebrow">ENTRANCE / ACTUAL EXHIBITION PRINT</div><h2>${a.title}</h2><div class="archive-step">${a.subtitle}</div><div class="modal-rule"></div><p>${a.description}</p><div class="tip-box">이 이미지는 실제 전시에 사용한 인쇄물을 바탕으로 가져왔습니다. 게임 속 전시장 배치는 디지털로 재구성했습니다.</div><div class="detail-buttons"><button class="action-btn" id="posterClose">전시 계속 걷기 ↗</button></div></div></div>`,'archive-modal');
    $('posterClose').onclick=closeModal;
  }
  const venuePhotos=[
    {file:'exterior',title:'전시장 입구',area:'ENTRANCE',note:'대굴대굴 로컬벤처 스테이지의 유리 출입문. 이곳에서 실제 전시가 시작됐습니다.'},
    {file:'introduction',title:'전시 인사와 대구의 색',area:'ENTRANCE',note:'OFFITA의 인사말과 대구의 도시 상징·색채를 설명하는 인쇄물을 입구에서 만납니다.'},
    {file:'hall',title:'본실의 전체 모습',area:'MAIN ROOM',note:'좁고 긴 본실의 한쪽에는 그림 선반, 맞은편에는 기록 타공판이 있습니다. 중앙에는 나무 안내대가 놓였습니다.'},
    {file:'art-wall',title:'도시 작품 선반',area:'LEFT WALL',note:'흰 벽의 얇은 선반 위로 대구 음식과 인물 작품의 작은 나무 액자가 한 줄로 이어집니다.'},
    {file:'art-detail',title:'대구 작품 가까이',area:'LEFT WALL',note:'액자 아래 개별 작품 설명 카드가 붙고, 선반 아래 긴 테이블에는 인쇄 자료가 펼쳐져 있습니다.'},
    {file:'archive-wall',title:'연암 기록 타공판',area:'RIGHT WALL',note:'베이지색 타공판에 버킷리스트, 현장 기록, 지도와 세션 패널이 흩어지듯 배치됐습니다.'},
    {file:'archive-detail',title:'기록 패널 가까이',area:'RIGHT WALL',note:'사진과 글이 담긴 실제 기록 패널을 타공판의 질감과 함께 살펴봅니다.'},
    {file:'reverse-view',title:'입구를 돌아보다',area:'MAIN ROOM',note:'안쪽에서 출입문을 향해 본 시야. 양쪽 전시 벽과 나무 안내대의 관계를 확인할 수 있습니다.'},
    {file:'music-room',title:'안쪽 음악 공간',area:'MUSIC ROOM',note:'안쪽 작은 방에는 나무 테이블, 음악 아트워크 액자, OFFITA 로고와 초상 포스터가 놓였습니다.'},
    {file:'music-detail',title:'음악 공간의 표정',area:'MUSIC ROOM',note:'테이블 위 액자와 인쇄 테이스팅 노트, 스피커가 함께 놓인 실제 전시 모습입니다.'},
    {file:'album-detail',title:'앨범 아트워크',area:'MUSIC ROOM',note:'나무 액자 속 음악 아트워크와 작품 설명 카드의 실제 크기감과 배열을 볼 수 있습니다.'}
  ];
  function showVenue(start=2){
    openModal(`<div class="venue-tour"><div class="venue-main"><div class="venue-photo"><img id="venueImage" alt="" src="" loading="eager"></div><div class="venue-photo-foot"><span id="venueCounter"></span><a id="venueOriginal" class="full-image-link" href="" target="_blank" rel="noopener">사진 크게 보기 ↗</a></div></div><div class="venue-aside"><div class="modal-eyebrow">OFFITA × DAEGU / ON SITE</div><h2>실제 전시장<br>사진으로 걷기</h2><p>현장 사진으로 공간의 재료와 배치를 확인하세요. 게임 화면은 양쪽 벽을 펼쳐 놓은 탐험형 재구성입니다.</p><div class="venue-rule"></div><small id="venueArea" class="venue-area"></small><h3 id="venueTitle"></h3><p id="venueNote"></p><div class="venue-points" aria-label="전시장 주요 장면"><button type="button" data-venue="0">입구</button><button type="button" data-venue="3">작품 선반</button><button type="button" data-venue="5">기록 벽</button><button type="button" data-venue="8">음악 공간</button></div><div class="venue-controls"><button type="button" id="venuePrev" class="action-btn ghost">← 이전 사진</button><button type="button" id="venueNext" class="action-btn">다음 사진 →</button></div></div></div>`,'venue-modal');
    const render=index=>{const photo=venuePhotos[index],src=`assets/venue/${photo.file}.webp`;$('venueImage').src=src;$('venueImage').alt=`${photo.title}: ${photo.note}`;$('venueOriginal').href=src;$('venueCounter').textContent=`${String(index+1).padStart(2,'0')} / ${venuePhotos.length}`;$('venueArea').textContent=photo.area;$('venueTitle').textContent=photo.title;$('venueNote').textContent=photo.note;$('venuePrev').disabled=index===0;$('venueNext').disabled=index===venuePhotos.length-1;el.content.querySelectorAll('[data-venue]').forEach(button=>button.setAttribute('aria-pressed',String(Number(button.dataset.venue)===index)));$('venuePrev').onclick=()=>render(index-1);$('venueNext').onclick=()=>render(index+1);};
    el.content.querySelectorAll('[data-venue]').forEach(button=>button.onclick=()=>render(Number(button.dataset.venue)));
    render(start);
  }
  function openBird(p){const newBird=!progress.birds.includes(p.id);award('SEBI',p.id);openModal(`<div class="modal-content-pad" style="text-align:center;max-width:580px;margin:auto"><div class="modal-eyebrow">YEONAM SEODANGGOL / LITTLE GUIDE</div><div class="swallow-doodle">⌁ 𓅪 ⌁</div><h2>서비를 만났어요!</h2><p>연암서당골의 제비 캐릭터, 서비입니다.<br>마을을 지나온 시간을 작은 흔적으로 남겨요.</p><div class="done-panel">${newBird?'새로운 제비 발견!':'이미 만나 본 서비예요.'}<br>발견한 서비 <b>${progress.birds.length} / 3</b></div><div class="detail-buttons" style="justify-content:center"><button class="action-btn" id="birdClose">산책 계속하기 →</button></div></div>`);$('birdClose').onclick=closeModal;}
  function showHelp(){openModal(`<div class="modal-content-pad"><div class="modal-eyebrow">HOW TO WALK / GUIDE</div><h2>천천히 걸어도 괜찮아요.</h2><p>실제 대구온나 전시의 원화·인쇄 엽서·포스터·기록 패널을 둘러보는 작은 웹 전시관입니다. 미션은 선택 사항이며 자유롭게 관람할 수 있습니다.</p><div class="intro-grid"><div class="intro-card"><strong>01 / 이동하기</strong><p>PC는 WASD 또는 방향키로 이동합니다. 바닥을 클릭하면 해당 위치로 걸어갑니다. 모바일은 왼쪽 조이스틱을 움직입니다.</p></div><div class="intro-card"><strong>02 / 작품 감상</strong><p>액자에 가까이 다가가 E키 또는 살펴보기 버튼을 누르세요. 액자 자체를 눌러도 해당 작품으로 이동합니다.</p></div><div class="intro-card"><strong>03 / 작은 미션</strong><p>원화, 실제 전시 패널, 음악 아트워크를 감상하고 숨어 있는 제비를 찾으면 스탬프가 쌓입니다. 엽서를 만들면 기록을 저장할 수 있습니다.</p></div></div><div class="tip-box">게임의 이동 경로는 실제 본실의 양쪽 벽을 가로로 펼친 재구성 화면입니다. 현장 사진은 ‘실제 전시장’에서 별도로 볼 수 있습니다. 정밀 평면도나 인물 실사 재현은 아닙니다. 관람 결과는 현재 브라우저에만 저장됩니다.</div><div class="detail-buttons"><button class="action-btn" id="helpClose">전시로 돌아가기 ↗</button><a class="action-btn ghost" href="/daegu-onna/">대구온나 프로젝트 ↗</a></div><p class="footer-credits">OFFITA × DAEGUL DAEGUL DAEGU ONNA · 2026</p></div>`);$('helpClose').onclick=closeModal;}
  function showMissions(){const counts=allCounts(),n=completed();openModal(`<div class="modal-content-pad"><div class="modal-eyebrow">MISSION NOTE / FIELD STAMPS</div><h2>나의 전시 산책 기록</h2><p>미션을 완료하면 스탬프가 하나씩 쌓입니다. 다섯 개를 모두 모아도 좋고, 마음에 드는 작품 앞에 오래 머물러도 좋습니다.</p><div class="progress-bar"><div class="progress-fill" style="width:${n/D.missions.length*100}%"></div></div><p class="image-count">COLLECTED STAMPS — ${n} / ${D.missions.length}</p>${D.missions.map((m,i)=>{const done=counts[m.id]>=m.goal;return `<div class="mission-card ${done?'completed':''}"><div class="mission-no">${done?'✓':String(i+1).padStart(2,'0')}</div><div class="mission-copy"><strong>${m.title}</strong><p>${m.desc}</p></div><div class="mission-state ${done?'yes':''}">${done?'COMPLETE':`${Math.min(counts[m.id],m.goal)} / ${m.goal}`}</div></div>`}).join('')}<div class="detail-buttons"><button class="action-btn" id="missionPostcard">나만의 디지털 엽서 만들기 ↗</button><button class="action-btn ghost" id="missionClose">전시로 돌아가기</button>${n===5?'<button class="action-btn ghost" id="missionEnding">완료증 보기</button>':''}</div></div>`);$('missionPostcard').onclick=openPostcard;$('missionClose').onclick=closeModal;if($('missionEnding'))$('missionEnding').onclick=showCompletion;}
  function jumpTo(zone){const z=ZONES[zone];player.x=z.spawn;player.y=551;camera.x=clamp(player.x-cw/camera.scale/2,0,WORLD.w-cw/camera.scale);camera.y=clamp(551-ch/camera.scale/2,0,Math.max(0,WORLD.h-ch/camera.scale));lastZone=-1;closeModal();zoneVisit();}
  function showMap(){const current=sectionFor(player.x);openModal(`<div class="modal-content-pad"><div class="modal-eyebrow">EXHIBITION MAP / TAP TO TRAVEL</div><h2>한 전시, 네 개의 장면</h2><p>입구와 본실 양쪽 벽, 안쪽 음악 방을 가로로 펼쳐 구성한 탐험형 화면입니다. 현장 배치는 사진 관람에서 확인할 수 있습니다.</p><div class="map-board">${ZONES.map((z,i)=>`<button class="map-section ${i===current?'active':''}" data-jump="${i}"><small>${z.label}</small><strong>${z.ko}</strong>${i===current?'<span class="you-marker" aria-label="현재 위치"></span>':''}</button>`).join('')}</div><div class="tip-box">작품에 직접 다가가는 산책 경험을 권장하지만, 모바일에서는 지도에서 구역을 바로 선택하는 것이 편리할 수 있습니다.</div><div class="detail-buttons"><button class="action-btn ghost" id="mapClose">지도 닫기</button></div></div>`);el.content.querySelectorAll('[data-jump]').forEach(b=>b.onclick=()=>jumpTo(Number(b.dataset.jump)));$('mapClose').onclick=closeModal;}
  function openPostcard(){const favorite=D.artworks.find(a=>a.id===progress.favorite)||D.artworks[0];openModal(`<div class="modal-content-pad"><div class="modal-eyebrow">EXIT / TAKE ONE MEMORY HOME</div><h2>나만의 디지털 엽서</h2><p>전시에서 마음에 남은 작품을 고르고 한 줄을 남겨보세요. 선택한 작품으로 된 이미지 엽서를 기기에 저장할 수 있습니다. 메시지는 온라인에 공개되지 않습니다.</p><div class="postcard-form"><div class="postcard-preview"><img id="postcardImage" src="${D.assets.artwork(favorite.index)}" alt="선택한 작품"></div><div class="postcard-fields"><label for="artSelect">마음에 남은 작품</label><select id="artSelect">${D.artworks.map(a=>`<option value="${a.id}" ${a.id===favorite.id?'selected':''}>${a.title}</option>`).join('')}</select><label for="postcardMessage">오늘의 관람 한 줄</label><textarea id="postcardMessage" maxlength="80" placeholder="이곳에서 남기고 싶은 한 문장을 적어보세요."></textarea><small>최대 80자 · 엽서 이미지는 개인 기기에만 저장됩니다.</small><button class="action-btn" id="makePostcard" style="width:100%">나의 엽서 저장하기 ↓</button><div id="postcardFeedback"></div></div></div><p class="footer-credits">OFFITA × DAEGU ONNA · SCORCHED MODERN · 2026</p></div>`,'postcard-modal');$('postcardMessage').value=progress.memo||'';$('artSelect').onchange=()=>{const a=D.artworks.find(v=>v.id===$('artSelect').value);$('postcardImage').src=D.assets.artwork(a.index);};$('makePostcard').onclick=savePostcard;}
  function lineWrap(c,text,x,y,maxWidth,lineHeight){const chars=[...text];let line='',row=0;for(const ch of chars){const test=line+ch;if(c.measureText(test).width>maxWidth&&line){c.fillText(line,x,y+row*lineHeight);line=ch;row++;}else line=test;}if(line)c.fillText(line,x,y+row*lineHeight);return row+1;}
  function savePostcard(){
    const selected=D.artworks.find(a=>a.id===$('artSelect').value)||D.artworks[0];
    const message=$('postcardMessage').value.trim();
    const feedback=$('postcardFeedback');
    if(message.length<2){feedback.textContent='두 글자 이상 감상 한 줄을 적어주세요.';return;}
    $('makePostcard').disabled=true;
    feedback.textContent='엽서 이미지를 만들고 있습니다…';
    const art=new Image();
    art.onload=()=>{
      try {
        const exportCanvas=document.createElement('canvas');exportCanvas.width=1200;exportCanvas.height=1650;
        const c=exportCanvas.getContext('2d');
        c.fillStyle='#efe3d0';c.fillRect(0,0,1200,1650);c.strokeStyle='#977c5d';c.lineWidth=3;c.strokeRect(50,50,1100,1550);c.strokeStyle='#d7c7b1';c.lineWidth=2;c.strokeRect(66,66,1068,1518);
        c.fillStyle='#44382d';c.font='bold 46px Georgia,serif';c.textAlign='left';c.fillText('OFFITA  ×  DAEGU',94,131);
        c.fillStyle='#8b7259';c.font='24px Georgia,serif';c.fillText('WALK THROUGH THE ART   /   2026',94,176);
        c.fillStyle='#d7c7b1';c.fillRect(98,225,1004,1004);c.drawImage(art,113,240,974,974);
        c.fillStyle='#352d27';c.font='bold 42px "Malgun Gothic",sans-serif';c.fillText(selected.title,98,1301);
        c.fillStyle='#766658';c.font='27px "Malgun Gothic",sans-serif';lineWrap(c,message,98,1380,1010,45);
        c.strokeStyle='#bda58a';c.lineWidth=2;c.beginPath();c.moveTo(98,1523);c.lineTo(1102,1523);c.stroke();
        c.font='23px Georgia,serif';c.fillStyle='#7a6450';c.fillText('빛은 바랬고, 소리는 남았다.',98,1564);
        c.textAlign='right';c.fillText('SCORCHED MODERN',1095,1564);
        exportCanvas.toBlob(blob=>{
          $('makePostcard').disabled=false;
          if(!blob){feedback.textContent='엽서 이미지를 만드는 데 실패했습니다.';return;}
          const url=URL.createObjectURL(blob);
          progress.favorite=selected.id;progress.memo=message;award('NOTE',selected.id);
          feedback.innerHTML='<div class="done-panel">엽서가 완성되었습니다. 아래 버튼으로 저장하거나 공유하세요. 관람 기록 스탬프도 획득했습니다.</div><div class="save-options"><a id="saveFileLink" download="OFFITA_DAEGU_POSTCARD.png">이미지 다운로드 ↓</a><button type="button" id="sharePostcard" class="hidden">사진 공유 / 저장 ↗</button></div><div id="iosSaveTip" class="save-tip">iPhone에서 다운로드가 되지 않으면 아래 이미지를 길게 눌러 사진 앱에 저장하세요.</div><div class="save-options"><img id="savePreview" alt="완성된 OFFITA 전시 디지털 엽서"></div>';
          $('saveFileLink').href=url;
          $('savePreview').src=url;
          const file=typeof File==='function'?new File([blob],'OFFITA_DAEGU_POSTCARD.png',{type:'image/png'}):null;
          if(file&&navigator.canShare&&navigator.canShare({files:[file]})){
            $('sharePostcard').classList.remove('hidden');
            $('sharePostcard').onclick=async()=>{try{await navigator.share({files:[file],title:'OFFITA × DAEGU 엽서'});}catch(e){if(e.name!=='AbortError')toast('공유할 수 없습니다. 이미지를 길게 눌러 저장하세요.');}};
          }
        },'image/png');
      } catch(e){$('makePostcard').disabled=false;feedback.textContent='저장 중 문제가 발생했습니다. 기기 저장 공간을 확인해주세요.';}
    };
    art.onerror=()=>{$('makePostcard').disabled=false;feedback.textContent='원화 이미지를 불러오지 못했습니다.';};
    art.src=D.assets.artwork(selected.index);
  }
  function showCompletion(){openModal(`<div class="modal-content-pad" style="max-width:660px;margin:auto;text-align:center"><div class="modal-eyebrow">A SMALL WALK, A LASTING MEMORY</div><div class="completion-seal">OFFITA<br>DAEGU<br>COMPLETE<br>2026</div><h2>전시의 모든 흔적을 모았어요.</h2><p>작품을 바라보고, 연암서당골의 하루를 열고, 음악과 제비를 만났습니다.<br>오늘의 산책을 기록으로 남겨주셔서 감사합니다.</p><div class="done-panel">수집한 스탬프 5 / 5<br><strong>빛은 바랬고, 소리는 남았다.</strong></div><div class="detail-buttons" style="justify-content:center"><button class="action-btn" id="doneToPostcard">엽서 다시 만들기</button><button class="action-btn ghost" id="doneClose">전시 다시 걷기</button></div><p class="footer-credits">OFFITA · DAEGUL DAEGUL DAEGU ONNA · YEONAM SEODANGGOL</p></div>`);$('doneToPostcard').onclick=openPostcard;$('doneClose').onclick=closeModal;}
  function startGame(){el.splash.classList.add('hidden');el.game.classList.remove('hidden');running=true;resize();zoneVisit();let seen=false;try{seen=!!sessionStorage.getItem('offita_walk_help_seen');if(!seen)sessionStorage.setItem('offita_walk_help_seen','1');}catch(_){}if(!seen)setTimeout(()=>toast(touchPresentation?'왼쪽 조이스틱으로 걷고, 오른쪽 살펴보기 버튼으로 작품을 감상하세요.':'방향키·WASD로 걷고, E키로 작품을 감상하세요.',4),450);}
  $('startBtn').addEventListener('click',startGame);$('aboutBtn').addEventListener('click',showHelp);$('venueSplashBtn').addEventListener('click',()=>showVenue());
  for(const b of document.querySelectorAll('[data-action]'))b.onclick=()=>{const action=b.dataset.action;if(action==='venue')showVenue();else if(action==='map')showMap();else if(action==='missions')showMissions();else if(action==='help')showHelp();else if(action==='reset'){closeModal();el.game.classList.add('hidden');el.splash.classList.remove('hidden');running=false;keys.clear();$('startBtn').focus();}};
  // Basic browser smoke-test hooks, intentionally read-only except jump/interaction actions.
  window.__OFFITA_TEST__={getState:()=>({running,modalOpen,player:{...player},zone:sectionFor(player.x),progress:JSON.parse(JSON.stringify(progress)),completed:completed(),objects:positions.length}),jump:jumpTo,openMissions:showMissions};
})();
