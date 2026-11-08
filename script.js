/* Pet Shop Bem Estar Animal — interações (v2) */
(() => {
  const CONFIG = { whatsapp: '5547992347020', mensagem: 'Olá! Encontrei o Pet Shop Bem Estar Animal pelo site e gostaria de conversar sobre o meu pet.' };
  const wa = m => `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(m)}`;
  const root = document.documentElement;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (s, c = document) => c.querySelector(s), $$ = (s, c = document) => [...c.querySelectorAll(s)];

  $$('[data-wa]').forEach(a => { a.href = wa(CONFIG.mensagem); a.target = '_blank'; a.rel = 'noopener noreferrer'; });
  $$('[data-service]').forEach(a => { a.href = wa(`Olá! Vim pelo site e gostaria de saber mais sobre ${a.dataset.service} para o meu pet.`); a.target = '_blank'; a.rel = 'noopener noreferrer'; });
  const year = $('#year'); if (year) year.textContent = new Date().getFullYear();

  /* Abertura: uma vez por sessão */
  try { sessionStorage.setItem('bea-intro', '1'); } catch (e) {}
  const intro = $('.intro');
  if (intro && !root.classList.contains('no-intro')) setTimeout(() => intro.remove(), 2000);
  const introMs = root.classList.contains('no-intro') || reduce ? 0 : 1500;

  /* Títulos linha a linha */
  $$('[data-lines]').forEach(h => { h.innerHTML = h.innerHTML.split(/<br\s*\/?>/i).map((p, i) => `<span class="tl" style="--li:${i}"><span>${p.trim()}</span></span>`).join(''); });

  /* Revelações */
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -10% 0px', threshold: .12 });
  $$('[data-reveal],[data-lines]').forEach(el => io.observe(el));

  /* Cabeçalho e progresso */
  const header = $('#header'), progress = $('.progress'); let lastY = 0;
  const onScroll = () => {
    const y = scrollY;
    header.classList.toggle('scrolled', y > 30);
    header.classList.toggle('hide', y > lastY && y > 700 && !document.body.classList.contains('locked'));
    lastY = y;
    const max = root.scrollHeight - innerHeight;
    progress.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
  };
  addEventListener('scroll', () => requestAnimationFrame(onScroll), { passive: true }); onScroll();

  /* Menu do celular */
  const mb = $('.menu-btn'), menu = $('#menu'); let lenis = null;
  const setMenu = o => { mb.setAttribute('aria-expanded', o); mb.setAttribute('aria-label', o ? 'Fechar menu' : 'Abrir menu'); menu.classList.toggle('open', o); menu.inert = !o; document.body.classList.toggle('locked', o); if (lenis) o ? lenis.stop() : lenis.start(); };
  mb.addEventListener('click', () => setMenu(mb.getAttribute('aria-expanded') !== 'true'));
  $$('a', menu).forEach(a => a.addEventListener('click', () => setMenu(false)));
  addEventListener('keydown', e => { if (e.key === 'Escape' && menu.classList.contains('open')) { setMenu(false); mb.focus(); } });

  /* Contador da nota */
  const count = $('[data-count]');
  if (count && !reduce) setTimeout(() => { const t0 = performance.now(); const f = n => { const p = Math.min(1, (n - t0) / 1400), e = 1 - Math.pow(1 - p, 4); count.textContent = (4.6 * e).toFixed(1).replace('.', ','); if (p < 1) requestAnimationFrame(f); }; count.textContent = '0,0'; requestAnimationFrame(f); }, introMs + 700);

  /* Manifesto: palavras acendem com a rolagem */
  const words = $('[data-words]');
  if (words && !reduce) {
    words.innerHTML = words.textContent.trim().split(/\s+/).map(w => `<span class="w">${w}</span>`).join(' ');
    const ws = $$('.w', words);
    const light = () => { const r = words.getBoundingClientRect(); const p = Math.max(0, Math.min(1, (innerHeight * .82 - r.top) / (r.height + innerHeight * .35))); const n = Math.round(p * ws.length); ws.forEach((w, i) => { w.style.opacity = i < n ? 1 : .16; }); };
    addEventListener('scroll', () => requestAnimationFrame(light), { passive: true }); light();
  }

  /* Cuidados: seleção guiada pela rolagem */
  const items = $$('.care-item'), imgs = $$('.care-frame img'), label = $('#care-label'); let cur = 0;
  const setScene = i => {
    if (i === cur) return;
    items.forEach((it, k) => it.classList.toggle('on', k === i));
    imgs.forEach((im, k) => { im.classList.toggle('prev', k === cur); im.classList.toggle('on', k === i); if (k !== cur && k !== i) im.classList.remove('prev'); });
    if (label) label.textContent = $('h3', items[i]).textContent;
    cur = i;
  };
  const desk = matchMedia('(min-width:1001px)');
  const careScroll = () => { if (!desk.matches) return; const line = innerHeight * .5; let n = 0; items.forEach((it, k) => { if (it.getBoundingClientRect().top + it.offsetHeight * .3 < line) n = k; }); setScene(n); };
  addEventListener('scroll', () => requestAnimationFrame(careScroll), { passive: true });

  /* Montador de mensagem */
  const form = $('#composer'), out = $('#bubble-text'), bubble = $('.bubble');
  const build = () => {
    const f = new FormData(form), s = f.get('servico'), nome = ($('#pet-name').value || '').trim(), nota = ($('#pet-note').value || '').trim();
    let m = `Olá! Encontrei o Pet Shop Bem Estar Animal pelo site.\nGostaria de conversar sobre ${s}${nome ? ` para o ${nome}` : ' para o meu pet'}.`;
    if (nota) m += `\n${nota}`;
    return m;
  };
  const refresh = () => { out.textContent = build(); bubble.classList.remove('pop'); void bubble.offsetWidth; bubble.classList.add('pop'); };
  form.addEventListener('input', refresh); refresh();
  form.addEventListener('submit', e => { e.preventDefault(); window.open(wa(build()), '_blank', 'noopener,noreferrer'); });

  /* Avaliações: esteira contínua */
  (() => {
    const vp = $('.rv-viewport'), track = $('#rv-track'), orig = [...track.children], n = orig.length, play = $('.rv-play');
    orig.forEach((c, i) => c.style.setProperty('--d', Math.min(i, 5) * .08 + 's'));
    orig.forEach(c => { const k = c.cloneNode(true); k.setAttribute('aria-hidden', 'true'); k.inert = true; k.style.setProperty('--d', '0s'); track.appendChild(k); });
    new IntersectionObserver(([e], o) => { if (e.isIntersecting) { track.classList.add('in'); o.disconnect(); } }, { threshold: .15 }).observe(vp);
    let half = 0, step = 0; const measure = () => { const all = track.children; half = all[n].offsetLeft - all[0].offsetLeft; step = all[1].offsetLeft - all[0].offsetLeft; }; measure(); addEventListener('resize', measure);
    const base = () => innerWidth < 700 ? 32 : 44;
    let pos = 0, speed = 0, on = !reduce, visible = false, hover = false, drag = null, fling = 0, tween = null, last = performance.now();
    const wrap = x => half ? ((x % half) + half) % half : x;
    const setPlay = v => { on = v; play.setAttribute('aria-pressed', v); play.querySelector('span').textContent = v ? 'Pausar' : 'Reproduzir'; };
    setPlay(on); play.addEventListener('click', () => setPlay(!on));
    new IntersectionObserver(([e]) => { visible = e.isIntersecting; }).observe(vp);
    vp.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse') hover = true; }); vp.addEventListener('pointerleave', () => hover = false);
    vp.addEventListener('focusin', () => hover = true); vp.addEventListener('focusout', () => hover = false);
    const nudge = d => { tween = { from: pos, to: pos + d * step, t0: performance.now(), dur: reduce ? 1 : 700 }; };
    $$('[data-rv]').forEach(b => b.addEventListener('click', () => nudge(+b.dataset.rv)));
    vp.addEventListener('keydown', e => { if (e.key === 'ArrowRight') { e.preventDefault(); nudge(1); } if (e.key === 'ArrowLeft') { e.preventDefault(); nudge(-1); } });
    vp.addEventListener('pointerdown', e => { if (e.button) return; drag = { x: e.clientX, p: pos, moved: false, lx: e.clientX, lt: performance.now(), v: 0, id: e.pointerId }; tween = null; fling = 0; });
    addEventListener('pointermove', e => { if (!drag || e.pointerId !== drag.id) return; const dx = e.clientX - drag.x; if (!drag.moved) { if (Math.abs(dx) < 6) return; drag.moved = true; vp.classList.add('dragging'); } const now = performance.now(); drag.v = (drag.lx - e.clientX) / Math.max(1, now - drag.lt) * 1000; drag.lx = e.clientX; drag.lt = now; pos = drag.p - dx; });
    const end = e => { if (!drag || (e && e.pointerId !== drag.id)) return; if (drag.moved) { fling = Math.max(-2400, Math.min(2400, drag.v)); vp.classList.remove('dragging'); } drag = null; };
    addEventListener('pointerup', end); addEventListener('pointercancel', end);
    const ease = t => 1 - Math.pow(1 - t, 4);
    const frame = now => {
      const dt = Math.min(.05, (now - last) / 1000); last = now;
      const target = (on && !drag && !document.hidden) ? base() * (hover ? .25 : 1) : 0;
      speed += (target - speed) * Math.min(1, dt * 3.2);
      if (tween) { const t = Math.min(1, (now - tween.t0) / tween.dur); pos = tween.from + (tween.to - tween.from) * ease(t); if (t >= 1) tween = null; }
      else if (!drag) { pos += speed * dt + fling * dt; fling *= Math.pow(.04, dt); }
      if (visible || drag || tween) track.style.transform = `translate3d(${-wrap(pos)}px,0,0)`;
      requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  })();

  if (reduce || !window.gsap || !window.ScrollTrigger) return;
  const { gsap, ScrollTrigger } = window; gsap.registerPlugin(ScrollTrigger);

  /* Rolagem suave */
  if (window.Lenis) {
    lenis = new Lenis({ duration: 1.15, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    lenis.on('scroll', ScrollTrigger.update); gsap.ticker.add(t => lenis.raf(t * 1000)); gsap.ticker.lagSmoothing(0); window.lenis = lenis;
    $$('a[href^="#"]').forEach(a => a.addEventListener('click', e => { const id = a.getAttribute('href'); if (id.length < 2) return; const t = $(id); if (!t) return; e.preventDefault(); lenis.scrollTo(t, { offset: id === '#inicio' ? 0 : -10, duration: 1.4 }); }));
  }

  /* Topo: a pilha de fotos se endireita e ganha profundidade */
  gsap.to('#stack', { rotateX: 0, rotateY: 4, y: -40, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
  gsap.to('.card-yorkie', { y: -90, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
  gsap.to('.card-cat', { y: 60, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
  gsap.to('.hero-copy', { yPercent: -14, opacity: .3, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });

  /* Faixa com velocidade da rolagem */
  const band = $('.band-track'); band.innerHTML += band.innerHTML + band.innerHTML + band.innerHTML;
  const loop = gsap.to(band, { xPercent: -25, ease: 'none', duration: 18, repeat: -1 });
  ScrollTrigger.create({ onUpdate: s => { const v = s.getVelocity(); gsap.to(loop, { timeScale: 1 + Math.min(Math.abs(v) / 300, 4) * (v < 0 ? -1 : 1), duration: .2, overwrite: true }); gsap.to(loop, { timeScale: 1, duration: 1.2, delay: .25 }); } });

  /* Manifesto: fotos em camadas */
  $$('.m-photo').forEach(el => gsap.fromTo(el, { yPercent: +el.dataset.depth }, { yPercent: -el.dataset.depth, ease: 'none', scrollTrigger: { trigger: '.manifesto', start: 'top bottom', end: 'bottom top', scrub: true } }));

  /* Faixa escura: zoom lento */
  gsap.fromTo('.calm-media', { yPercent: -6, scale: 1.12 }, { yPercent: 6, scale: 1, ease: 'none', scrollTrigger: { trigger: '.calm', start: 'top bottom', end: 'bottom top', scrub: true } });

  /* Vínculos: anel 3D que gira com a rolagem */
  const sec = $('#vinculos'), ring = $('#ring'), cards = $$('figure', ring), N = cards.length;
  sec.classList.remove('ring-flat');
  let radius = 0;
  const layout = () => { const w = cards[0].offsetWidth; radius = Math.round((w / 2) / Math.tan(Math.PI / N) + w * .18); cards.forEach((c, i) => { c.dataset.a = i * 360 / N; }); };
  const paint = rot => {
    ring.style.transform = `translateZ(${-radius}px) rotateX(-8deg) rotateY(${rot}deg)`;
    cards.forEach(c => {
      const a = +c.dataset.a; c.style.transform = `rotateY(${a}deg) translateZ(${radius}px)`;
      const face = Math.cos((a + rot) * Math.PI / 180);         // 1 = de frente para a câmera
      c.style.filter = `brightness(${(.32 + .68 * Math.max(0, face)).toFixed(3)}) saturate(${(.6 + .4 * Math.max(0, face)).toFixed(3)})`;
      c.style.zIndex = Math.round(face * 100) + 100;
    });
  };
  layout(); paint(0);
  const ringState = { r: 0 };
  ScrollTrigger.create({
    trigger: sec, start: 'top top', end: () => '+=' + Math.round(innerHeight * 1.6), pin: '.ring-pin', scrub: 1, anticipatePin: 1, invalidateOnRefresh: true,
    onUpdate: s => gsap.to(ringState, { r: -s.progress * 360 * .875, duration: .6, ease: 'power3.out', overwrite: true, onUpdate: () => paint(ringState.r) })
  });
  addEventListener('resize', () => { layout(); paint(ringState.r); });

  addEventListener('load', () => ScrollTrigger.refresh());
})();
