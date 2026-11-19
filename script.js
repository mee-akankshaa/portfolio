(function(){
  var $=function(s){return document.querySelector(s)};
  var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  $('#yr').textContent=new Date().getFullYear(); $('#yr2').textContent=new Date().getFullYear();

  // Menu (mobile)
  var burger=$('#burger'), menu=$('#menu');
  burger.addEventListener('click',function(){var o=menu.classList.toggle('open');burger.setAttribute('aria-expanded',o)});
  menu.addEventListener('click',function(){menu.classList.remove('open')});

  // Skills
  var SKILLS={
    "Frontend":["React","HTML","JavaScript","Bootstrap","jQuery"],
    "Backend":["Python","C","Next.js","Node.js"],
    "AI & Automation":["Automation","Agentic AI"],
    "Data":["Excel","PostgreSQL"],
    "Soft skills":["Determined","Always learning"]
  };
  var grid=$('#skillGrid');
  Object.keys(SKILLS).forEach(function(k){
    var d=document.createElement('div');d.className='skill-box reveal';
    d.innerHTML='<h3></h3><ul></ul>';d.querySelector('h3').textContent=k;
    SKILLS[k].forEach(function(s){var li=document.createElement('li');li.textContent=s;d.querySelector('ul').appendChild(li)});
    grid.appendChild(d);
  });

  // Projects: grid of pockets, cards fanned out of each pocket, details below
  var list=$('#projList'), P=window.PROJECTS||[];
  P.forEach(function(p,i){
    var el=document.createElement('article');el.className='ptile reveal';
    var pocket=document.createElement('div');pocket.className='pocket';
    var tags=(p.tags||[]).slice(0,3);while(tags.length<3)tags.push(['Code','Demo','Build'][tags.length]);
    tags.forEach(function(t,k){
      var c=document.createElement('div');c.className='pc c'+(k+1);
      var lb=document.createElement('span');lb.textContent=t;c.appendChild(lb);
      c.insertAdjacentHTML('beforeend','<i></i><i></i><i class="s"></i>');
      pocket.appendChild(c);
    });
    var fr=document.createElement('div');fr.className='front';
    fr.innerHTML='<span class="no"></span><span class="pk"></span>';
    fr.querySelector('.no').textContent=String(i+1).padStart(2,'0');
    pocket.appendChild(fr);
    var info=document.createElement('div');info.className='pinfo';
    var h=document.createElement('h3');h.textContent=p.title;
    var d=document.createElement('p');d.textContent=p.desc;
    var t=document.createElement('div');t.className='tags';
    (p.tags||[]).forEach(function(x){var sp=document.createElement('span');sp.textContent=x;t.appendChild(sp)});
    var l=document.createElement('div');l.className='pl';
    if(p.live){var a1=document.createElement('a');a1.href=p.live;a1.target='_blank';a1.rel='noopener';a1.textContent='Live \u2197';l.appendChild(a1)}
    if(p.code){var c2=document.createElement('a');c2.href=p.code;c2.target='_blank';c2.rel='noopener';c2.textContent='Code \u2197';l.appendChild(c2)}
    info.append(h,d,t,l);
    el.append(pocket,info);list.appendChild(el);
  });

  // Reveal + counters
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12});
  document.querySelectorAll('.reveal').forEach(function(el){io.observe(el)});
  var cio=new IntersectionObserver(function(es){es.forEach(function(e){
    if(!e.isIntersecting)return;var el=e.target,end=+el.dataset.count,n=0;
    var t=setInterval(function(){n++;el.textContent=n;if(n>=end)clearInterval(t)},120);cio.unobserve(el)})});
  document.querySelectorAll('[data-count]').forEach(function(el){cio.observe(el)});

  // Intro: scroll-driven
  var intro=$('#home'), big=$('#big'), hi=$('#hi'), photo=$('#photo'), ml=document.querySelector('.meta-l'), mr=document.querySelector('.meta-r'), hint=document.querySelector('.hint');
  function clamp(x,a,b){return Math.min(b,Math.max(a,x))}
  function frame(){
    var max=intro.offsetHeight-innerHeight, p=clamp(scrollY/max,0,1);
    var a=clamp(p/0.45,0,1);               // big title phase
    var b=clamp((p-0.35)/0.4,0,1);         // hero reveal phase
    big.style.opacity=1-clamp((p-0.15)/0.3,0,1);
    big.style.transform='translate(-50%,-50%) scale('+(1-a*0.35)+')';
    ml.style.opacity=mr.style.opacity=hint.style.opacity=1-clamp(p/0.2,0,1);
    hi.style.opacity=b; hi.style.transform='translateY('+(1-b)*40+'px)';
    photo.style.transform='translateY('+(1-b)*70+'px)';
    document.getElementById('progress').style.width=(scrollY/(document.documentElement.scrollHeight-innerHeight)*100)+'%';
  }
  if(reduce){big.style.display='none';hi.style.opacity=1;}
  else{addEventListener('scroll',frame,{passive:true});addEventListener('resize',frame);frame();}

  // Footer: sketched walkers + a girl with laptop, headphones and bag (all line-art SVG)
  var wrap=document.querySelector('.crowd-wrap'), crowd=$('#crowd');
  var BW=['#111','#fff'];
  function rnd(a,b){return a+Math.random()*(b-a)}
  function walker(){
    var shirt=BW[(Math.random()*2)|0], pants=shirt==='#111'?'#fff':BW[(Math.random()*2)|0], hair=Math.random()<.8?'#111':'#fff';
    var hairs=['M31 28 C28 2 72 2 69 28 C60 14 40 14 31 28Z','M29 34 C24 -2 76 -2 71 34 C66 18 34 18 29 34Z','M31 30 C30 4 70 4 69 30 L73 52 L64 34 C58 20 42 20 36 34L27 52Z','M30 26 C34 8 66 8 70 26 L66 14 L50 8 L34 14Z'];
    var hp=hairs[(Math.random()*hairs.length)|0], bag=Math.random()<.5, gl=Math.random()<.3, sm=Math.random()<.7;
    var d=document.createElement('div');d.className='walker';
    var left=Math.random()<.5, h=rnd(44,60), dur=rnd(16,34);
    d.style.height=h+'%';d.style.bottom=rnd(-2,14).toFixed(1)+'%';
    d.style.setProperty('--t',dur.toFixed(1)+'s');d.style.setProperty('--dl',(-Math.random()*dur).toFixed(1)+'s');
    d.style.setProperty('--sp',rnd(.55,.9).toFixed(2)+'s');
    d.classList.add(left?'wl':'wr');
    d.innerHTML='<svg viewBox="0 0 100 210" style="'+(left?'transform:scaleX(-1)':'')+'"><g stroke="#111" stroke-width="3" stroke-linejoin="round" stroke-linecap="round">'+
      '<g class="wbody">'+(bag?'<rect x="24" y="58" width="52" height="56" rx="10" fill="#111"/>':'')+
      '<g class="lg l1"><rect x="36" y="112" width="14" height="78" rx="7" fill="'+pants+'"/><ellipse cx="44" cy="193" rx="12" ry="6" fill="#fff"/></g>'+
      '<g class="lg l2"><rect x="50" y="112" width="14" height="78" rx="7" fill="'+pants+'"/><ellipse cx="58" cy="193" rx="12" ry="6" fill="#fff"/></g>'+
      '<path d="M30 56 Q50 48 70 56 L74 118 Q50 126 26 118Z" fill="'+shirt+'"/>'+
      '<g class="ar a1"><rect x="19" y="54" width="11" height="58" rx="5.5" fill="'+shirt+'"/><circle cx="24.5" cy="114" r="5.5" fill="#fff"/></g>'+
      '<g class="ar a2"><rect x="70" y="54" width="11" height="58" rx="5.5" fill="'+shirt+'"/><circle cx="75.5" cy="114" r="5.5" fill="#fff"/></g>'+
      '<circle cx="50" cy="32" r="19" fill="#fff"/><path d="'+hp+'" fill="'+hair+'"/>'+
      '<circle cx="43" cy="34" r="1.9" fill="#111" stroke="none"/><circle cx="57" cy="34" r="1.9" fill="#111" stroke="none"/>'+
      (gl?'<circle cx="43" cy="34" r="5.5" fill="none" stroke-width="2"/><circle cx="57" cy="34" r="5.5" fill="none" stroke-width="2"/><path d="M48.5 34h3" stroke-width="2"/>':'')+
      (sm?'<path d="M43 44 Q50 50 57 44" fill="none" stroke-width="2.4"/>':'<path d="M44 46h12" stroke-width="2.4"/>')+
      '</g></g></svg>';
    return d;
  }
  var N=Math.max(6,Math.min(12,Math.round(innerWidth/120)));
  for(var i=0;i<N;i++)crowd.appendChild(walker());

  var girl=document.createElement('div');girl.className='girl';
  girl.innerHTML='<svg viewBox="0 0 160 240"><g stroke="#111" stroke-width="3" stroke-linejoin="round" stroke-linecap="round">'+
   '<g class="gbody">'+
   '<rect x="38" y="80" width="84" height="84" rx="14" fill="#111"/>'+                       /* backpack */
   '<rect x="58" y="150" width="21" height="74" rx="9" fill="#111"/><rect x="81" y="150" width="21" height="74" rx="9" fill="#111"/>'+ /* black jeans */
   '<ellipse cx="68" cy="228" rx="14" ry="6.5" fill="#fff"/><ellipse cx="92" cy="228" rx="14" ry="6.5" fill="#fff"/>'+
   '<path d="M50 86 Q80 74 110 86 L114 158 Q80 166 46 158Z" fill="#e11d2e"/>'+                 /* red top */
   '<path d="M64 80 L60 142 M96 80 L100 142" stroke="#111" stroke-width="7" fill="none"/>'+     /* bag straps */
   '<path d="M54 92 L44 130 L50 148" stroke="#111" stroke-width="15" fill="none"/><path d="M54 92 L44 130 L50 148" stroke="#e11d2e" stroke-width="10.5" fill="none"/>'+
   '<path d="M106 92 L116 130 L110 148" stroke="#111" stroke-width="15" fill="none"/><path d="M106 92 L116 130 L110 148" stroke="#e11d2e" stroke-width="10.5" fill="none"/>'+
   '<g class="lap"><rect x="46" y="104" width="68" height="42" rx="4" fill="#fff"/><circle cx="80" cy="125" r="5" fill="#111"/><rect x="42" y="146" width="76" height="5" rx="2.5" fill="#111"/></g>'+
   '<circle cx="50" cy="148" r="6" fill="#fff"/><circle cx="110" cy="148" r="6" fill="#fff"/>'+
   '<g class="ghead">'+
     '<path d="M54 50 C48 10 112 10 106 50 L112 98 L98 72 C92 54 68 54 62 72 L48 98Z" fill="#111"/>'+  /* long hair */
     '<circle cx="80" cy="48" r="23" fill="#fff"/>'+
     '<path d="M58 44 C60 22 100 22 102 44 C92 34 68 34 58 44Z" fill="#111"/>'+
     '<circle cx="72" cy="50" r="2.2" fill="#111" stroke="none"/><circle cx="88" cy="50" r="2.2" fill="#111" stroke="none"/>'+
     '<path d="M73 59 Q80 65 87 59" fill="none" stroke-width="2.5"/>'+
     '<path d="M55 46 C52 8 108 8 105 46" fill="none" stroke-width="5"/>'+                       /* headphone band */
     '<rect class="cup" x="46" y="38" width="12" height="22" rx="6" fill="#111"/><rect class="cup" x="102" y="38" width="12" height="22" rx="6" fill="#111"/>'+
   '</g></g>'+
   '<text class="note n1" x="118" y="30" font-size="16" stroke="none" fill="#111">♪</text>'+
   '<text class="note n2" x="30" y="34" font-size="14" stroke="none" fill="#111">♫</text>'+
   '</g></svg>';
  wrap.appendChild(girl);

  // Interactive background name: letters rise and darken near the cursor, pop on click
  var giant=document.querySelector('.giant'), letters=[];
  giant.textContent='';
  'AKANKSHA.'.split('').forEach(function(ch){var sp=document.createElement('span');sp.className='gl';sp.textContent=ch;giant.appendChild(sp);letters.push(sp)});
  if(!reduce){
    wrap.addEventListener('pointermove',function(e){
      letters.forEach(function(l){
        var r=l.getBoundingClientRect(), dx=e.clientX-(r.left+r.width/2), dy=e.clientY-(r.top+r.height/2), t=Math.max(0,1-Math.hypot(dx,dy)/300);
        l.style.transform='translateY('+(-t*46)+'px) scale('+(1+t*.1)+') rotate('+(dx/-40*t)+'deg)';
        var g=Math.round(236-t*220);l.style.color='rgb('+g+','+g+','+g+')';
      });
    });
    wrap.addEventListener('pointerleave',function(){letters.forEach(function(l){l.style.transform='';l.style.color=''})});
    letters.forEach(function(l){l.addEventListener('click',function(){l.classList.remove('pop');void l.offsetWidth;l.classList.add('pop')})});
  }
  if(reduce){document.querySelectorAll('.walker').forEach(function(w,i){w.style.animation='none';w.style.left=(8+i*(84/N))+'%'})}
})();
