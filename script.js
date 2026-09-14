  // ── countdown ──
  const wedding = new Date('2026-09-18T19:00:00');
  function tick(){
    const d = Math.max(0, wedding - new Date());
    document.getElementById('cd-d').textContent = Math.floor(d/864e5);
    document.getElementById('cd-h').textContent = Math.floor(d/36e5)%24;
    document.getElementById('cd-m').textContent = Math.floor(d/6e4)%60;
    document.getElementById('cd-s').textContent = Math.floor(d/1e3)%60;
  }
  tick(); setInterval(tick,1000);

  // ── scroll reveal for cards ──
  const cards = document.querySelectorAll('.card-row');
  const io = new IntersectionObserver(e=>{
    e.forEach(x=>{ if(x.isIntersecting){ x.target.classList.add('in'); io.unobserve(x.target); } });
  },{threshold:.15});
  cards.forEach(c=>io.observe(c));

  // ── audio ──
  const audio = document.getElementById('song');
  const musicToggle = document.getElementById('musicToggle');
  let playing = false;

  async function playMusic(){
    try{
      audio.currentTime = 40;
      await audio.play();
      playing = true;
      musicToggle.classList.add('playing');
    } catch(e){ console.warn('autoplay blocked',e); }
  }
  function stopMusic(){
    audio.pause();
    playing = false;
    musicToggle.classList.remove('playing');
  }

  musicToggle.addEventListener('click',()=>{
    playing ? stopMusic() : playMusic();
  });

  // ── envelope open ──
  const envelope = document.getElementById('envelope');
  const gate = document.getElementById('gate');
  const main = document.getElementById('main');
  const hps = document.querySelectorAll('[data-hp]');

  document.getElementById('openInvite').addEventListener('click',()=>{
    // 1. open flap
    envelope.classList.add('opening');
    // 2. start music
    playMusic();
    // 3. show page under envelope
    setTimeout(()=>{
      envelope.classList.add('away');
      main.classList.add('show');
      document.body.classList.remove('locked');
      musicToggle.classList.add('show');
    }, 900);
    // 4. hero text stagger
    setTimeout(()=>{
      hps.forEach((el,i)=>setTimeout(()=>el.classList.add('in'), i*160));
    }, 1100);
    // 5. remove gate
    setTimeout(()=>gate.classList.add('hidden'), 2000);
  });
