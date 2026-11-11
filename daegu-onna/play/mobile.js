// Mobile entry, orientation and installable web-app enhancements.
(() => {
  'use strict';
  const mobile=matchMedia('(pointer:coarse)');
  const welcome=document.getElementById('mobileWelcome');
  const accept=document.getElementById('mobileWelcomeOK');
  const start=document.getElementById('startBtn');
  const game=document.getElementById('game');
  const open=()=>{
    if(!mobile.matches)return;
    let seen=false;
    try{seen=sessionStorage.getItem('offita-mobile-intro-v2')==='yes';}catch(_){}
    if(!seen){welcome.classList.remove('hidden');welcome.setAttribute('aria-hidden','false');setTimeout(()=>accept.focus(),60);}
  };
  start.addEventListener('click',()=>setTimeout(open,70));
  accept.addEventListener('click',()=>{
    welcome.classList.add('hidden');welcome.setAttribute('aria-hidden','true');
    try{sessionStorage.setItem('offita-mobile-intro-v2','yes');}catch(_){}
    game.focus?.();
  });
  window.addEventListener('orientationchange',()=>{setTimeout(()=>window.dispatchEvent(new Event('resize')),250);});
})();