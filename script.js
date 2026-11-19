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

/* Education timeline: alternating sides, animated sketch for each stage */
(function(){
  var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  var tl=document.getElementById('tl'), fill=document.getElementById('tlFill');
  if(!tl)return;
  var EDU=[
    {stage:1,tag:'Stage 01',title:'Class 10',sub:'Secondary school'},
    {stage:2,tag:'Stage 02',title:'Class 12',sub:'Senior secondary school'},
    {stage:3,tag:'Stage 03',title:'Diploma',sub:'PHP-based Full-Stack Developer Diploma'},
    {stage:4,tag:'Stage 04',title:'BCA',sub:'Manipal University, currently in 5th semester'}
  ];
  var R='#e11d2e', K='#111', W='#fff';
  function arm(d){return '<path d="'+d+'" stroke="'+K+'" stroke-width="15" fill="none"/><path d="'+d+'" stroke="'+R+'" stroke-width="10.5" fill="none"/>'}
  function face(open){
    return '<circle cx="72" cy="50" r="2.2" fill="'+K+'" stroke="none"/><circle cx="88" cy="50" r="2.2" fill="'+K+'" stroke="none"/>'+
      (open?'<path d="M72 58 Q80 72 88 58Z" fill="'+K+'"/>':'<path d="M73 59 Q80 65 87 59" fill="none" stroke-width="2.5"/>');
  }
  var G={
    1:function(){return ''+
      '<g class="bob1">'+
      '<rect x="36" y="84" width="88" height="86" rx="14" fill="'+K+'"/>'+
      '<g class="lg l1"><rect x="58" y="150" width="20" height="66" rx="9" fill="'+K+'"/><ellipse cx="66" cy="221" rx="15" ry="7" fill="'+W+'"/></g>'+
      '<g class="lg l2"><rect x="82" y="150" width="20" height="66" rx="9" fill="'+K+'"/><ellipse cx="94" cy="221" rx="15" ry="7" fill="'+W+'"/></g>'+
      '<path d="M50 88 Q80 76 110 88 L114 160 Q80 168 46 160Z" fill="'+R+'"/>'+
      '<path d="M64 82 L60 142 M96 82 L100 142" stroke="'+K+'" stroke-width="7" fill="none"/>'+
      '<g class="ar a1"><rect x="34" y="88" width="17" height="60" rx="8.5" fill="'+R+'"/><circle cx="42.5" cy="151" r="7.5" fill="'+W+'"/></g>'+
      '<g class="ar a2"><rect x="109" y="88" width="17" height="60" rx="8.5" fill="'+R+'"/><circle cx="117.5" cy="151" r="7.5" fill="'+W+'"/></g>'+
      '<circle cx="50" cy="52" r="12" fill="'+K+'"/><circle cx="110" cy="52" r="12" fill="'+K+'"/>'+
      '<circle cx="80" cy="48" r="23" fill="'+W+'"/><path d="M57 46 C58 22 102 22 103 46 C92 34 68 34 57 46Z" fill="'+K+'"/>'+
      '<circle cx="44" cy="44" r="4.5" fill="'+R+'"/><circle cx="116" cy="44" r="4.5" fill="'+R+'"/>'+face(false)+
      '</g>'},
    2:function(){return ''+
      '<g class="jump">'+
      '<rect x="58" y="150" width="20" height="66" rx="9" fill="'+K+'" transform="rotate(7 68 150)"/><ellipse cx="60" cy="221" rx="15" ry="7" fill="'+W+'"/>'+
      '<rect x="82" y="150" width="20" height="66" rx="9" fill="'+K+'" transform="rotate(-7 92 150)"/><ellipse cx="102" cy="221" rx="15" ry="7" fill="'+W+'"/>'+
      '<path d="M50 88 Q80 76 110 88 L114 160 Q80 168 46 160Z" fill="'+R+'"/>'+
      '<g class="wv1">'+arm('M54 94 L30 52')+'<circle cx="28" cy="46" r="7.5" fill="'+W+'"/></g>'+
      '<g class="wv2">'+arm('M106 94 L130 52')+'<circle cx="131" cy="46" r="7.5" fill="'+W+'"/>'+
        '<path d="M131 40 C128 24 150 24 148 40" fill="none" stroke="'+K+'" stroke-width="4"/><rect x="122" y="2" width="34" height="38" rx="9" fill="'+K+'" transform="translate(0 4)"/></g>'+
      '<path d="M57 46 C52 14 108 14 103 46Z" fill="'+K+'"/><circle cx="106" cy="28" r="10" fill="'+K+'"/><circle cx="108" cy="22" r="4" fill="'+R+'"/>'+
      '<circle cx="80" cy="48" r="23" fill="'+W+'"/><path d="M57 44 C60 22 100 22 103 44 C92 34 68 34 57 44Z" fill="'+K+'"/>'+face(true)+
      '</g>'},
    3:function(){return ''+
      '<g class="nod3">'+
      '<path d="M22 208 C22 176 68 170 80 188 C92 170 138 176 138 208 C138 224 98 226 80 216 C62 226 22 224 22 208Z" fill="'+K+'"/>'+
      '<ellipse cx="38" cy="216" rx="14" ry="7" fill="'+W+'"/><ellipse cx="122" cy="216" rx="14" ry="7" fill="'+W+'"/>'+
      '<path d="M52 92 Q80 80 108 92 L112 190 Q80 198 48 190Z" fill="'+R+'"/>'+
      arm('M54 98 L44 140 L56 170')+arm('M106 98 L116 140 L104 170')+
      '<rect x="48" y="126" width="64" height="44" rx="4" fill="'+W+'"/><circle cx="80" cy="148" r="5" fill="'+K+'"/><rect x="40" y="170" width="80" height="6" rx="3" fill="'+K+'"/>'+
      '<circle class="ty1" cx="58" cy="172" r="7" fill="'+W+'"/><circle class="ty2" cx="102" cy="172" r="7" fill="'+W+'"/>'+
      '<g class="hd3"><path d="M54 50 C48 12 112 12 106 50 L112 100 L98 74 C92 56 68 56 62 74 L48 100Z" fill="'+K+'"/>'+
      '<circle cx="80" cy="48" r="23" fill="'+W+'"/><path d="M58 44 C60 22 100 22 102 44 C92 34 68 34 58 44Z" fill="'+K+'"/>'+face(false)+'</g>'+
      '<text class="cd c1" x="118" y="70" font-size="15" font-weight="700" stroke="none" fill="'+K+'">&lt;/&gt;</text>'+
      '<text class="cd c2" x="14" y="80" font-size="15" font-weight="700" stroke="none" fill="'+K+'">{ }</text>'+
      '</g>'},
    4:function(){return ''+
      '<ellipse cx="62" cy="230" rx="14" ry="6" fill="'+W+'"/><ellipse cx="98" cy="230" rx="14" ry="6" fill="'+W+'"/>'+
      '<path d="M44 92 Q80 78 116 92 L134 228 L26 228Z" fill="'+K+'"/>'+
      '<path d="M64 86 L80 118 L96 86Z" fill="'+W+'"/><path d="M72 90 L80 106 L88 90Z" fill="'+R+'"/>'+
      '<g class="wv1"><path d="M48 98 L34 152" stroke="'+K+'" stroke-width="20" stroke-linecap="round" fill="none"/><circle cx="33" cy="158" r="7.5" fill="'+W+'"/></g>'+
      '<g class="wv2"><path d="M112 98 L134 62" stroke="'+K+'" stroke-width="20" stroke-linecap="round" fill="none"/><circle cx="136" cy="56" r="7.5" fill="'+W+'"/>'+
        '<rect x="122" y="26" width="38" height="14" rx="5" fill="'+W+'" transform="rotate(-32 141 33)"/><path d="M136 28 L146 40" stroke="'+R+'" stroke-width="4"/></g>'+
      '<path d="M54 50 C48 12 112 12 106 50 L112 100 L98 74 C92 56 68 56 62 74 L48 100Z" fill="'+K+'"/>'+
      '<circle cx="80" cy="48" r="23" fill="'+W+'"/><path d="M58 46 C60 26 100 26 102 46 C92 38 68 38 58 46Z" fill="'+K+'"/>'+face(true)+
      '<g class="cap"><path d="M58 24 L58 38 Q80 50 102 38 L102 24Z" fill="'+K+'"/><polygon points="80,2 134,20 80,38 26,20" fill="'+K+'"/><path d="M80 20 L124 24 L124 50" fill="none" stroke="'+R+'" stroke-width="3"/><circle cx="124" cy="54" r="5" fill="'+R+'"/></g>'+
      '<circle class="cf f1" cx="30" cy="40" r="4" fill="'+R+'" stroke="none"/><rect class="cf f2" x="140" y="90" width="8" height="5" fill="'+K+'" stroke="none"/><circle class="cf f3" cx="20" cy="110" r="3" fill="'+K+'" stroke="none"/>'}
  };
  var SC={1:.58,2:.68,3:.8,4:.9};
  function sketch(stage){
    var s=SC[stage], extra='';
    if(stage===1)extra='<g class="school"><rect x="196" y="164" width="42" height="64" fill="#fff"/><path d="M190 164 L217 142 L244 164Z" fill="#fff"/><rect x="209" y="196" width="16" height="32" fill="#111"/><text x="198" y="182" font-size="8" font-weight="700" stroke="none" fill="#111">SCHOOL</text></g>';
    if(stage===2)extra='<g class="conf"><circle cx="40" cy="60" r="4" fill="#e11d2e" stroke="none"/><rect x="212" y="70" width="8" height="5" fill="#111" stroke="none"/><circle cx="224" cy="120" r="3.5" fill="#e11d2e" stroke="none"/><rect x="28" y="120" width="7" height="5" fill="#111" stroke="none"/></g>';
    return '<svg viewBox="0 0 260 250" role="img" aria-hidden="true"><g stroke="#111" stroke-width="3" stroke-linejoin="round" stroke-linecap="round">'+
      '<line class="road" x1="0" y1="232" x2="260" y2="232" stroke-dasharray="14 12" stroke-width="3"/>'+extra+
      '<ellipse class="shadow" cx="130" cy="232" rx="'+(46*s+10)+'" ry="5" fill="rgba(0,0,0,.12)" stroke="none"/>'+
      '<g class="fig s'+stage+'" transform="translate(130 228) scale('+s+') translate(-80 -228)">'+G[stage]()+'</g></g></svg>';
  }
  // Layout: timeline list on the LEFT, one sticky sketch panel on the RIGHT that changes with the active stage
  var line=tl.querySelector('.tl-line');
  var list=document.createElement('div');list.className='tl-list';list.appendChild(line);
  var stage=document.createElement('div');stage.className='tl-stage';
  var card=document.createElement('div');card.className='stage-card';
  var cap=document.createElement('div');cap.className='stage-cap';card.appendChild(cap);
  stage.appendChild(card);tl.append(list,stage);
  var items=[],sks=[];
  EDU.forEach(function(e,i){
    var it=document.createElement('div');it.className='tl-item';
    it.innerHTML='<div class="tl-node"><span></span></div><small></small><h3></h3><p></p>';
    it.querySelector('small').textContent=e.tag;it.querySelector('h3').textContent=e.title;it.querySelector('p').textContent=e.sub;
    it.addEventListener('click',function(){it.scrollIntoView({behavior:reduce?'auto':'smooth',block:'center'})});
    list.appendChild(it);items.push(it);
    var sk=document.createElement('div');sk.className='sk';sk.innerHTML=sketch(e.stage);card.appendChild(sk);sks.push(sk);
  });
  var cur=-1;
  function setStage(i){
    if(i===cur)return;cur=i;
    items.forEach(function(it,k){it.classList.toggle('active',k===i);it.classList.toggle('done',k<i)});
    sks.forEach(function(sk,k){sk.classList.toggle('on',k===i);sk.classList.toggle('past',k<i)});
    cap.textContent=EDU[i].tag+'  ·  '+EDU[i].title;
  }
  function upd(){
    var r=tl.getBoundingClientRect(),lr=list.getBoundingClientRect();
    var mid=innerHeight*.5, p=(mid-lr.top)/lr.height;p=Math.max(0,Math.min(1,p));fill.style.height=(p*100)+'%';
    var best=0,bd=1e9;
    items.forEach(function(it,k){var b=it.getBoundingClientRect(),d=Math.abs(b.top+b.height/2-mid);if(d<bd){bd=d;best=k}});
    setStage(best);
  }
  addEventListener('scroll',upd,{passive:true});addEventListener('resize',upd);upd();
})();
