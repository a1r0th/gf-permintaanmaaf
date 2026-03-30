/* ── PETALS ── */
function initPetals() {
  const bg = document.getElementById('petalsBg');
  if (!bg) return;
  for (let i = 0; i < 18; i++) {
    const p = document.createElement('div');
    p.className = 'petal';
    const size = 6 + Math.random() * 10;
    p.style.cssText = [
      'width:' + size + 'px',
      'height:' + size + 'px',
      'left:' + Math.random() * 100 + '%',
      'top:' + Math.random() * -20 + '%',
      'animation-duration:' + (7 + Math.random() * 10) + 's',
      'animation-delay:' + Math.random() * 10 + 's',
      'opacity:' + (0.15 + Math.random() * 0.3)
    ].join(';');
    bg.appendChild(p);
  }
}

/* ── COUNTER ── */
function initCounter() {
  const startDate = new Date('2026-03-24T00:00:00');
  function tick() {
    const diff = Date.now() - startDate;
    const d = document.getElementById('days');
    const h = document.getElementById('hours');
    const m = document.getElementById('mins');
    const s = document.getElementById('secs');
    if (!d) return;
    d.textContent = String(Math.floor(diff / 86400000)).padStart(3, '0');
    h.textContent = String(Math.floor(diff % 86400000 / 3600000)).padStart(2, '0');
    m.textContent = String(Math.floor(diff % 3600000 / 60000)).padStart(2, '0');
    s.textContent = String(Math.floor(diff % 60000 / 1000)).padStart(2, '0');
  }
  tick(); setInterval(tick, 1000);
}

/* ── GAME 1: FORGIVE ── */
function initForgiveGame() {
  let noHits = 0;
  const noMsgs = ['beneran nggak mau?', 'ih jahat...', 'ayo dong 🥺', 'please...', 'oke aiyy nyerah 😭'];

  window.forgiveYes = function() {
    document.getElementById('btnRow').style.display = 'none';
    document.querySelector('.forgive-q').style.display = 'none';
    const win = document.getElementById('forgiveWin');
    win.innerHTML = 'yesss!! makasih Sindi!! aiyy sayang banget sama kamu ❤️❤️❤️<br><small style="font-size:13px;color:var(--text-m);">ini membuat aiyy sangat bahagia :)</small>';
    win.style.display = 'block';
  };

  window.moveNoBtn = function() {
    noHits++;
    const btn = document.getElementById('btnNo');
    btn.textContent = noMsgs[Math.min(noHits - 1, noMsgs.length - 1)];
    btn.style.left = (Math.random() * 160 - 80) + 'px';
    btn.style.top  = (Math.random() * 40 - 20) + 'px';
    if (noHits >= 5) btn.disabled = true;
  };
}

/* ── GAME 2: HEART CATCH ── */
function initHeartGame() {
  let heartCount = 0;
  const heartEmojis = ['❤️','💕','💗','💖','💘'];

  window.spawnHearts = function() {
    const field = document.getElementById('heartField');
    for (let i = 0; i < 9; i++) {
      setTimeout(() => {
        const h = document.createElement('span');
        h.className = 'fly-heart';
        h.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        h.style.left = (5 + Math.random() * 85) + '%';
        h.style.bottom = '8px';
        h.style.animationDuration = (1.8 + Math.random() * 0.8) + 's';
        field.appendChild(h);
        h.addEventListener('click', () => {
          heartCount++;
          document.getElementById('heartScore').textContent = heartCount;
          h.remove();
        });
        setTimeout(() => { if (h.parentNode) h.remove(); }, 2500);
      }, i * 160);
    }
  };
}

/* ── GAME 3: QUIZ ── */
function initQuiz() {
  const qs = [
    { q: 'kalau aku lagi salah, kamu harus...', opts: ['marahin terus sampai puas', 'maafin karena aku minta maaf tulus', 'diam selamanya', 'blokir semua sosmed'], ans: 1, fb: 'betul!! ini jawaban paling benar di seluruh dunia ❤️' },
    { q: 'seberapa besar rasa kangенku ke kamu?', opts: ['biasa aja', 'lumayan', 'besar banget', 'sebesar galaksi bima sakti × 1000'], ans: 3, fb: 'tepat sekali! ini bukan lebay, ini fakta ilmiah 💡' },
    { q: 'apa yang aku rasain waktu kamu diam?', opts: ['biasa aja santai', 'sedikit gelisah', 'panik setengah mati', 'baik-baik aja'], ans: 2, fb: 'ya... panik banget. tolong jangan bikin aku panik lagi 😅' },
    { q: 'apa yang paling aku mau sekarang?', opts: ['makan bakso', 'tidur seharian', 'kamu senyum dan maafin aku', 'jalan-jalan sendiri'], ans: 2, fb: 'ding ding ding!! kamu dapet 1000 poin bonus 🎉' },
  ];
  let qIdx = 0, qScore = 0, qAnswered = false;

  function renderQ() {
    const q = qs[qIdx];
    document.getElementById('quizQ').textContent = q.q;
    document.getElementById('quizFb').textContent = '';
    document.getElementById('btnNext').style.display = 'none';
    document.getElementById('quizProg').textContent = 'soal ' + (qIdx + 1) + ' / ' + qs.length;
    qAnswered = false;
    const optsEl = document.getElementById('quizOpts');
    optsEl.innerHTML = '';
    q.opts.forEach((o, i) => {
      const b = document.createElement('button');
      b.className = 'quiz-opt';
      b.textContent = o;
      b.onclick = () => {
        if (qAnswered) return;
        qAnswered = true;
        Array.from(optsEl.children).forEach(btn => btn.disabled = true);
        if (i === q.ans) { b.classList.add('correct'); qScore++; }
        else { b.classList.add('wrong'); optsEl.children[q.ans].classList.add('correct'); }
        document.getElementById('quizFb').innerHTML = q.fb;
        if (qIdx < qs.length - 1) {
          document.getElementById('btnNext').style.display = 'block';
        } else {
          setTimeout(showResult, 800);
        }
      };
      optsEl.appendChild(b);
    });
  }

  function showResult() {
    document.getElementById('quizArea').style.display = 'none';
    const res = document.getElementById('quizResult');
    res.style.display = 'block';
    document.getElementById('qFinalScore').textContent = qScore + ' / ' + qs.length + ' benar (' + Math.round(qScore / qs.length * 100) + '%)';
    const msgs = ['kamu perlu belajar lagi tentang aku nih hehe', 'lumayan! masih banyak yang perlu dipelajari 😄', 'bagus! kamu cukup mengenalku ❤️', 'sempurna!! ini bukti kita memang jodoh 🎉❤️'];
    document.getElementById('qFinalMsg').innerHTML = msgs[qScore];
  }

  window.nextQ = function() { qIdx++; renderQ(); };
  renderQ();
}

/* ── GAME 4: SCRATCH ── */
function initScratch() {
  const canvas = document.getElementById('scratchCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const msgs = ['aku sayang sindi ❤️', 'please maafin aiyy 🥺', 'sindi segalanya buatku', 'I love you, Sindi ❤️❤️'];
  const chosen = msgs[Math.floor(Math.random() * msgs.length)];

  ctx.fillStyle = '#D4537E';
  ctx.beginPath();
  ctx.roundRect(0, 0, canvas.width, canvas.height, 12);
  ctx.fill();
  ctx.fillStyle = 'rgba(255,255,255,0.7)';
  ctx.font = '500 14px DM Sans, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('✦ gesek di sini ✦', canvas.width / 2, canvas.height / 2);

  let scratching = false, revealed = false;
  function pos(e) {
    const r = canvas.getBoundingClientRect();
    const src = e.touches ? e.touches[0] : e;
    return { x: (src.clientX - r.left) * (canvas.width / r.width), y: (src.clientY - r.top) * (canvas.height / r.height) };
  }
  function scratch(e) {
    if (!scratching) return;
    e.preventDefault();
    const {x, y} = pos(e);
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2);
    ctx.fill();
    if (!revealed) {
      const d = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      let cleared = 0;
      for (let i = 3; i < d.length; i += 4) if (d[i] < 128) cleared++;
      if (cleared / (canvas.width * canvas.height) > 0.45) {
        revealed = true;
        document.getElementById('scratchMsg').textContent = chosen;
      }
    }
  }
  canvas.addEventListener('mousedown',  e => { scratching = true; scratch(e); });
  canvas.addEventListener('mousemove',  scratch);
  canvas.addEventListener('mouseup',    () => scratching = false);
  canvas.addEventListener('mouseleave', () => scratching = false);
  canvas.addEventListener('touchstart', e => { scratching = true; scratch(e); }, { passive: false });
  canvas.addEventListener('touchmove',  scratch, { passive: false });
  canvas.addEventListener('touchend',   () => scratching = false);
}
