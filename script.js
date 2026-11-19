(function(){
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.getElementById('year').textContent = new Date().getFullYear();

  // Scroll reveal
  var io = new IntersectionObserver(function(es){
    es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
  },{threshold:.15});
  document.querySelectorAll('.reveal').forEach(function(el,i){ el.style.transitionDelay=(i%4)*80+'ms'; io.observe(el); });

  // Counters
  var cio = new IntersectionObserver(function(es){
    es.forEach(function(e){
      if(!e.isIntersecting) return;
      var el=e.target, end=+el.dataset.count, n=0, step=Math.max(1,Math.ceil(end/40));
      var t=setInterval(function(){ n=Math.min(end,n+step); el.textContent=n; if(n>=end) clearInterval(t); },30);
      cio.unobserve(el);
    });
  });
  document.querySelectorAll('[data-count]').forEach(function(el){ cio.observe(el); });

  // Typing effect
  var words=['Frontend Developer','Creative Coder','Problem Solver'], w=0, c=0, del=false, out=document.getElementById('typed');
  function type(){
    var word=words[w];
    out.textContent=word.slice(0,c);
    if(!del && c<word.length){ c++; setTimeout(type,90); }
    else if(!del){ del=true; setTimeout(type,1200); }
    else if(c>0){ c--; setTimeout(type,45); }
    else { del=false; w=(w+1)%words.length; setTimeout(type,300); }
  }
  if(reduce){ out.textContent=words[0]; } else { type(); }

  // Scroll progress
  var bar=document.getElementById('progress');
  addEventListener('scroll',function(){
    var h=document.documentElement; bar.style.width=(h.scrollTop/(h.scrollHeight-h.clientHeight)*100)+'%';
  },{passive:true});

  // Cursor glow
  var glow=document.getElementById('glow');
  addEventListener('pointermove',function(e){ glow.style.left=e.clientX+'px'; glow.style.top=e.clientY+'px'; });

  // 3D tilt cards
  document.querySelectorAll('.tilt').forEach(function(card){
    card.addEventListener('pointermove',function(e){
      var r=card.getBoundingClientRect(), x=(e.clientX-r.left)/r.width-.5, y=(e.clientY-r.top)/r.height-.5;
      card.style.transform='perspective(700px) rotateY('+x*10+'deg) rotateX('+(-y*10)+'deg) translateY(-4px)';
    });
    card.addEventListener('pointerleave',function(){ card.style.transform=''; });
  });

  // Particle network background
  var cv=document.getElementById('bg'), ctx=cv.getContext('2d'), P=[], mouse={x:-999,y:-999};
  function size(){ cv.width=innerWidth; cv.height=innerHeight; }
  size(); addEventListener('resize',size);
  addEventListener('pointermove',function(e){ mouse.x=e.clientX; mouse.y=e.clientY; });
  var N=Math.min(70,Math.floor(innerWidth/18));
  for(var i=0;i<N;i++) P.push({x:Math.random()*cv.width,y:Math.random()*cv.height,vx:(Math.random()-.5)*.4,vy:(Math.random()-.5)*.4});
  function draw(){
    ctx.clearRect(0,0,cv.width,cv.height);
    P.forEach(function(p,i){
      p.x+=p.vx; p.y+=p.vy;
      if(p.x<0||p.x>cv.width) p.vx*=-1;
      if(p.y<0||p.y>cv.height) p.vy*=-1;
      ctx.fillStyle='rgba(0,212,255,.7)'; ctx.beginPath(); ctx.arc(p.x,p.y,1.6,0,6.283); ctx.fill();
      for(var j=i+1;j<P.length;j++){
        var q=P[j], d=Math.hypot(p.x-q.x,p.y-q.y);
        if(d<120){ ctx.strokeStyle='rgba(124,92,255,'+(1-d/120)*.35+')'; ctx.beginPath(); ctx.moveTo(p.x,p.y); ctx.lineTo(q.x,q.y); ctx.stroke(); }
      }
      var m=Math.hypot(p.x-mouse.x,p.y-mouse.y);
      if(m<150){ ctx.strokeStyle='rgba(0,212,255,'+(1-m/150)*.5+')'; ctx.beginPath(); ctx.moveTo(p.x,p.y); ctx.lineTo(mouse.x,mouse.y); ctx.stroke(); }
    });
    requestAnimationFrame(draw);
  }
  if(!reduce) draw();
})();
