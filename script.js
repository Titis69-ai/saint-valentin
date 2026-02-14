(function () {
  const canvas = document.getElementById("hearts");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let w, h, hearts = [];
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resize);
  resize();

  function rand(min, max) { return Math.random() * (max - min) + min; }

  function spawnHeart(x = rand(0, w), y = h + 30, big = false) {
    const size = big ? rand(18, 34) : rand(10, 22);
    hearts.push({
      x, y,
      vx: rand(-0.6, 0.6),
      vy: rand(-2.4, -1.0),
      rot: rand(0, Math.PI * 2),
      vr: rand(-0.03, 0.03),
      size,
      life: 0,
      maxLife: rand(160, 280),
      wobble: rand(0, Math.PI * 2)
    });
  }

  function drawHeart(x, y, s, rot) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rot);
    ctx.scale(s / 20, s / 20);
    ctx.beginPath();
    ctx.moveTo(0, 6);
    ctx.bezierCurveTo(0, -6, -12, -6, -12, 3);
    ctx.bezierCurveTo(-12, 12, 0, 16, 0, 22);
    ctx.bezierCurveTo(0, 16, 12, 12, 12, 3);
    ctx.bezierCurveTo(12, -6, 0, -6, 0, 6);
    ctx.closePath();

    const grad = ctx.createLinearGradient(-12, -6, 12, 22);
    grad.addColorStop(0, "rgba(255, 31, 90, 0.95)");
    grad.addColorStop(1, "rgba(255, 179, 198, 0.95)");
    ctx.fillStyle = grad;
    ctx.fill();

    ctx.globalAlpha = 0.25;
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.ellipse(-5, 2, 3.5, 6, -0.6, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
    ctx.globalAlpha = 1;
  }

  function tick() {
    if (!prefersReduced) {
      if (hearts.length < 80 && Math.random() < 0.7) spawnHeart();
    }

    ctx.clearRect(0, 0, w, h);

    hearts = hearts.filter(p => p.life < p.maxLife && p.y > -50);

    for (const p of hearts) {
      p.life++;
      p.wobble += 0.05;
      p.x += p.vx + Math.sin(p.wobble) * 0.6;
      p.y += p.vy;
      p.rot += p.vr;

      const t = p.life / p.maxLife;
      ctx.globalAlpha = Math.max(0, 1 - Math.max(0, (t - 0.75) / 0.25));
      drawHeart(p.x, p.y, p.size, p.rot);
    }
    ctx.globalAlpha = 1;

    requestAnimationFrame(tick);
  }
  tick();

  const burstBtn = document.getElementById("burst");
  if (burstBtn) {
    burstBtn.addEventListener("click", () => {
      const cx = w * 0.5, cy = h * 0.4;
      for (let i = 0; i < 28; i++) spawnHeart(cx + rand(-60, 60), cy + rand(-40, 40), true);
    });
  }
})();