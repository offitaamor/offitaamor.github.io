(() => {
  'use strict';
  const NS='http://www.w3.org/2000/svg';
  const svg=(name,attributes={})=>{const node=document.createElementNS(NS,name);for(const [key,value] of Object.entries(attributes))node.setAttribute(key,String(value));return node;};
  const frames=document.getElementById('artFrames');
  const labels=document.getElementById('artLabels');
  const artwork=[1,2,3,4,5,6,13,14,15];
  const frameX=[126,203,270,327,373,410,439,462,481];
  const frameW=[70,61,53,46,39,33,28,24,20];
  artwork.forEach((index,i)=>{
    const x=frameX[i],w=frameW[i],bottom=426-i*.8,y=bottom-w;
    const group=svg('g');
    group.append(svg('rect',{x:x-3,y:y-3,width:w+6,height:w+6,fill:'#b18a63',stroke:'#765b43','stroke-width':2}));
    group.append(svg('rect',{x,y,width:w,height:w,fill:'#efe8d8'}));
    group.append(svg('image',{x:x+3,y:y+3,width:w-6,height:w-6,href:`assets/art-${String(index).padStart(2,'0')}-thumb.webp`,preserveAspectRatio:'xMidYMid slice'}));
    frames.append(group);
    if(i<7){const card=svg('rect',{x:x+w*.17,y:446-i*1.7,width:Math.max(11,w*.55),height:Math.max(11,w*.25),fill:'#faf9f5',stroke:'#cacac5','stroke-width':.8});labels.append(card);}
  });
  const sheets=document.getElementById('archiveSheets');
  const docs=[
    {x:1264,y:260,w:69,h:88,file:'session02-01.webp'},
    {x:1188,y:344,w:62,h:81,file:'session02-02.webp'},
    {x:1300,y:436,w:45,h:59,file:'session02-03.webp'},
    {x:1090,y:337,w:52,h:69,file:'session02-01.webp'},
    {x:1023,y:426,w:38,h:52,file:'session02-02.webp'}
  ];
  docs.forEach((doc,i)=>{
    const g=svg('g',{transform:`rotate(${[-2,1,-1,2,1,-2,1][i]} ${doc.x+doc.w/2} ${doc.y+doc.h/2})`});
    g.append(svg('rect',{x:doc.x-2,y:doc.y-2,width:doc.w+4,height:doc.h+4,fill:'#554f48',opacity:.2}));
    g.append(svg('rect',{x:doc.x,y:doc.y,width:doc.w,height:doc.h,fill:'#f8f7f2'}));
    g.append(svg('image',{x:doc.x+3,y:doc.y+3,width:doc.w-6,height:doc.h-6,href:`assets/${doc.file}`,preserveAspectRatio:'xMidYMid meet'}));
    sheets.append(g);
  });
  // Graphic placeholder for the large hand-drawn field map visible on the real pegboard.
  const map=svg('g',{transform:'rotate(-2 1155 488)'});
  map.append(svg('rect',{x:1100,y:432,width:107,height:113,fill:'#f7f3e9',stroke:'#8f8370','stroke-width':2}));
  map.append(svg('path',{d:'M1113 447q28 9 37-4t42 7M1114 459q31 8 43-3t36 6M1114 510q37-20 70-1m-68 10q42-16 75-3',fill:'none',stroke:'#9ca38d','stroke-width':1.5,opacity:.7}));
  map.append(svg('path',{d:'M1115 479q15 9 25 0t20 9t30-8M1121 532q14-29 30-31t32-31',fill:'none',stroke:'#6e827b','stroke-width':3,opacity:.75}));
  for(const [x,y] of [[1130,482],[1151,501],[1183,473],[1169,521]])map.append(svg('circle',{cx:x,cy:y,r:4,fill:'#b7815c'}));
  const mapTitle=svg('text',{x:1111,y:444,fill:'#51473e','font-size':7,'font-weight':700});mapTitle.textContent='YEONAM FIELD MAP';map.append(mapTitle);
  sheets.append(map);
  const spots={
    art:{title:'왼쪽 작품 선반',text:'흰 벽의 얇은 선반 위에 대구 작품의 작은 나무 액자가 한 줄로 놓입니다. 아래에는 천이 덮인 긴 자료 테이블이 이어집니다.',photo:'art-wall.webp',alt:'실제 전시장 왼쪽 작품 선반'},
    archive:{title:'오른쪽 기록 타공판',text:'맞은편 베이지 타공판에는 버킷리스트, 연암서당골 기록, 지도와 인쇄 패널이 다양한 간격으로 붙습니다.',photo:'archive-wall.webp',alt:'실제 전시장 오른쪽 기록 타공판'},
    counter:{title:'중앙 나무 안내대',text:'전시장 한가운데의 나무 안내대는 입구에서 안쪽 방으로 향하는 동선의 기준점입니다. 장면에서는 통로가 보이도록 높이를 절제했습니다.',photo:'hall.webp',alt:'안내대가 보이는 실제 본실 전경'},
    annex:{title:'안쪽 음악 방 입구',text:'본실 끝의 열린 통로 너머로 나무 테이블과 음악 작품이 보입니다. 이 장면에서는 방의 존재만 보여주고, 내부 관람은 다음 화면으로 남겼습니다.',photo:'music-room.webp',alt:'실제 안쪽 음악 방'}
  };
  const sceneScroll=document.getElementById('sceneScroll');
  function select(name){
    const item=spots[name];if(!item)return;
    document.getElementById('detailTitle').textContent=item.title;
    document.getElementById('detailText').textContent=item.text;
    const photo=document.getElementById('referencePhoto');photo.src=`assets/venue/${item.photo}`;photo.alt=item.alt;
    document.querySelectorAll('.spot-list [data-spot]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.spot===name)));
    document.querySelectorAll('#markers [data-spot]').forEach(marker=>marker.classList.toggle('selected',marker.dataset.spot===name));
  }
  document.querySelectorAll('[data-spot]').forEach(target=>{
    target.addEventListener('click',()=>select(target.dataset.spot));
    if(target.classList.contains('marker'))target.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();select(target.dataset.spot);}});
  });
  select('art');
  const zoomButton=document.getElementById('zoomScene');
  zoomButton.addEventListener('click',()=>{
    const zoomed=sceneScroll.classList.toggle('is-zoomed');
    zoomButton.setAttribute('aria-pressed',String(zoomed));
    zoomButton.textContent=zoomed?'전체 장면 보기 ↙':'장면 확대해서 보기 ↗';
    sceneScroll.scrollLeft=zoomed?Math.max(0,(sceneScroll.scrollWidth-sceneScroll.clientWidth)/2):0;
  });
})();
