(function () {

  const app = document.getElementById("app");
  if (!app) return;

  const QUESTIONS = [
    {
      q: "Première chose qu’Étienne veut en se levant ?",
      a: ["Un café", "Un grand verre d'eau", "Regarder son cell", "Aller se doucher"],
      correct: ["Un grand verre d'eau"]
    },
    {
      q: "Ses 2 activités préférées ?",
      a: ["Plongée sous marine et skidoo", "Jeux vidéo et sport", "Lecture et cuisine", "Randonnée et voyage"],
      correct: ["Plongée sous marine et skidoo"]
    },
    {
      q: "Son repas préféré ?",
      a: ["Sushi", "Steak", "Pizza", "Poutine"],
      correct: ["Sushi", "Steak"] // 2 bonnes réponses acceptées
    },
    {
      q: "Son breuvage préféré ?",
      a: ["Bière", "Café", "Eau pétillante", "Jus d'orange"],
      correct: ["Bière"]
    }
  ];

  let i = 0;
  let score = 0;

  function render(){
    const total = QUESTIONS.length;
    const curr = QUESTIONS[i];
    const pct = Math.round((i / total) * 100);

    app.innerHTML = `
      <h1>Question ${i+1}/${total}</h1>
      <div class="progress"><div style="width:${pct}%"></div></div>
      <p><strong>${curr.q}</strong></p>
      <div class="stack" id="answers"></div>
    `;

    const answersEl = document.getElementById("answers");

    curr.a.forEach(txt => {
      const b = document.createElement("button");
      b.className = "btn";
      b.textContent = txt;
      b.onclick = () => choose(txt);
      answersEl.appendChild(b);
    });
  }

  function choose(answer){
    const curr = QUESTIONS[i];

    if (curr.correct.includes(answer)) {
      score++;
    }

    if (i < QUESTIONS.length - 1) {
      i++;
      render();
    } else {
      finish();
    }
  }

  function finish(){
    let message;

    if (score === 4) {
      message = "🎯 Parfait ! Tu connais Étienne par cœur !";
    } else if (score >= 2) {
      message = `👏 Pas mal ! Score : ${score}/4`;
    } else {
      message = `😅 Oups... Score : ${score}/4`;
    }

    app.innerHTML = `
      <h1>Résultat</h1>
      <p style="font-size:20px">${message}</p>
      <div class="stack">
        <button class="btn" onclick="location.reload()">Rejouer</button>
        <a class="btn" href="index.html">Accueil</a>
      </div>
    `;
  }

  render();
})();
