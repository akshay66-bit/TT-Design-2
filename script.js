document.addEventListener('DOMContentLoaded',()=>{
  const pages={home:document.getElementById('page-home'),about:document.getElementById('page-about'),purchase:document.getElementById('page-purchase'),thankyou:document.getElementById('page-thankyou'),userhome:document.getElementById('page-userhome'),settings:document.getElementById('page-settings'),contact:document.getElementById('page-contact')};
  const navLinks=document.querySelectorAll('.nav-link');const protoBtns=document.querySelectorAll('.proto-btn');
  function showPage(route){if(!pages[route])return;Object.values(pages).forEach(p=>p.classList.remove('page-active'));pages[route].classList.add('page-active');navLinks.forEach(l=>l.classList.toggle('active',l.dataset.route===route));protoBtns.forEach(b=>b.classList.toggle('active',b.dataset.route===route));window.scrollTo({top:0,behavior:'instant'});}
  document.body.addEventListener('click',(e)=>{const t=e.target.closest('[data-route]');if(t){e.preventDefault();showPage(t.dataset.route);}});
  document.querySelector('.proto-btn[data-route="home"]').classList.add('active');
});
function flash(id){document.getElementById(id).classList.add('show');}
function switchAcctTab(tab){
  document.querySelectorAll('.acct-panel').forEach(p=>p.classList.remove('active'));
  document.getElementById('acct-'+tab).classList.add('active');
  document.querySelectorAll('.acct-tab').forEach(t=>t.classList.toggle('active',t.dataset.tab===tab));
}

/* ===== scroll reveal: slide + fade sections in/out as they enter/leave the viewport ===== */
(function(){
  if(window.matchMedia && window.matchMedia('(prefers-reduced-motion:reduce)').matches) return;
  var sel=['.manifesto-inner','.practice-inner','.foryou-inner','.testi-inner','.nextwatch-single','.pricing-inner','.suggest-inner','.footer-inner','.about-hero-content','.mission-grid','.story-inner','.instructors-header','.instructor','.advisory-inner','.page-head-inner','.plan-panel','.userhome','.settings-wrap','.contact-body'];
  var els=Array.prototype.slice.call(document.querySelectorAll(sel.join(',')));
  if(!els.length) return;
  var counts=new Map();
  els.forEach(function(el,idx){
    el.classList.add('reveal', (idx%2===0)?'from-left':'from-right');   // alternate sides
    var p=el.parentElement, i=counts.get(p)||0; counts.set(p,i+1);
    if(i>0) el.style.transitionDelay=(i*120)+'ms';                       // gentle cascade for siblings
  });
  var io=('IntersectionObserver' in window)?new IntersectionObserver(function(entries){
    entries.forEach(function(e){ e.target.classList.toggle('in', e.isIntersecting); });
  },{threshold:0,rootMargin:'-12% 0px -12% 0px'}):null;
  if(io){ els.forEach(function(el){io.observe(el);}); }
  // On page switch (display toggles + scroll-to-top), reveal whatever is in view on the new page.
  function sweep(){
    els.forEach(function(el){
      var r=el.getBoundingClientRect();
      if(r.width||r.height){ el.classList.toggle('in', r.bottom>0 && r.top < window.innerHeight*0.88); }
    });
  }
  document.body.addEventListener('click',function(e){
    if(e.target.closest('[data-route]')) requestAnimationFrame(function(){requestAnimationFrame(sweep);});
  });
  if(!io){ window.addEventListener('scroll',sweep,{passive:true}); }
  requestAnimationFrame(sweep);
})();
