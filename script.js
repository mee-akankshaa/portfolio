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

  // Projects (from projects.js)
  var list=$('#projList');
  (window.PROJECTS||[]).forEach(function(p,i){
    var el=document.createElement('article');el.className='proj reveal';
    var n=document.createElement('div');n.className='no';n.textContent=String(i+1).padStart(2,'0');
    var b=document.createElement('div');
    var h=document.createElement('h3');h.textContent=p.title;
    var d=document.createElement('p');d.textContent=p.desc;
    var t=document.createElement('div');t.className='tags';
    (p.tags||[]).forEach(function(x){var s=document.createElement('span');s.textContent=x;t.appendChild(s)});
    b.append(h,d,t);
    var l=document.createElement('div');l.className='pl';
    if(p.live){var a=document.createElement('a');a.href=p.live;a.target='_blank';a.rel='noopener';a.textContent='Live ↗';l.appendChild(a)}
    if(p.code){var c=document.createElement('a');c.href=p.code;c.target='_blank';c.rel='noopener';c.textContent='Code ↗';l.appendChild(c)}
    el.append(n,b,l);list.appendChild(el);
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

  // Footer crowd: illustrated people (SVG, line style)
  var crowd=$('#crowd'), W=innerWidth;
  var hairs=['M-24 -2 C-24 -34 24 -34 24 -2 C14 -18 -14 -18 -24 -2Z','M-26 4 C-30 -40 30 -40 26 4 C20 -22 -20 -22 -26 4Z','M-22 -6 C-18 -38 18 -38 22 -6 L26 18 L18 4 C8 -14 -8 -14 -18 4 L-26 18Z','M-24 -4 C-20 -36 20 -36 24 -4 C12 -14 -12 -14 -24 -4Z M-6 -34 L0 -44 L6 -34Z'];
  var fills=['#111','#fff','#d9d9d9','#444','#fff','#111','#bdbdbd'];
  function person(){
    var s=Math.random(), hair=hairs[(Math.random()*hairs.length)|0], body=fills[(Math.random()*fills.length)|0];
    var hf=Math.random()<.5?'#111':'#fff', glasses=Math.random()<.35, smile=Math.random()<.7;
    var d=document.createElement('div');d.className='person';
    var w=Math.round(78+s*52);d.style.width=w+'px';d.style.setProperty('--d',(2+Math.random()*1.8).toFixed(2)+'s');d.style.setProperty('--dl',(-Math.random()*3).toFixed(2)+'s');d.style.setProperty('--r',((Math.random()*10-5)).toFixed(1)+'deg');
    d.innerHTML='<svg viewBox="-60 -60 120 150"><g stroke="#111" stroke-width="3" stroke-linejoin="round" stroke-linecap="round">'+
      '<path d="M-50 90 C-50 36 -30 22 0 22 C30 22 50 36 50 90Z" fill="'+body+'"/>'+
      '<circle cx="0" cy="-6" r="24" fill="#fff"/>'+
      '<path d="'+hair+'" fill="'+hf+'" transform="translate(0,-8)"/>'+
      '<circle cx="-8" cy="-4" r="2.2" fill="#111" stroke="none"/><circle cx="8" cy="-4" r="2.2" fill="#111" stroke="none"/>'+
      (glasses?'<circle cx="-8" cy="-4" r="6.5" fill="none" stroke-width="2"/><circle cx="8" cy="-4" r="6.5" fill="none" stroke-width="2"/><path d="M-1.5 -4h3" stroke-width="2"/>':'')+
      (smile?'<path d="M-8 8 Q0 16 8 8" fill="none" stroke-width="2.5"/>':'<path d="M-6 10h12" fill="none" stroke-width="2.5"/>')+
      '</g></svg>';
    return d;
  }
  var count=Math.max(7,Math.ceil(W/78)+2);
  for(var i=0;i<count;i++)crowd.appendChild(person());
})();
