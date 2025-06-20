document.getElementById('birthdayForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const day = document.getElementById('daySelect').value;
  const month = document.getElementById('monthSelect').value;
if (day === "17" && month === "6") {
  // existing code...
  startEmojiRain(); // 🎉 Add this line to trigger emojis
}

  if (day === "17" && month === "6") {
    document.getElementById('welcomeSection').classList.add('hidden');
    document.getElementById('cardsSection').classList.remove('hidden');
    launchConfetti();

    if (window.innerWidth <= 768) {
      animateCardsOnTap();
    } else {
      animateCardsAuto();
    }
  } else {
    document.getElementById('errorText').style.display = 'block';
  }
});

function launchConfetti() {
  const duration = 100 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };

  const interval = setInterval(function () {
    const timeLeft = animationEnd - Date.now();
    if (timeLeft <= 0) return clearInterval(interval);
    confetti({
      ...defaults,
      particleCount: 50 * (timeLeft / duration),
      origin: { x: Math.random(), y: Math.random() - 0.2 }
    });
  }, 250);
}

function animateCardsAuto() {
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => card.classList.remove("animate-left", "animate-right"));

  cards.forEach((card, i) => {
    const direction = (i % 2 === 0) ? 'left' : 'right';
    setTimeout(() => {
      card.classList.add(`animate-${direction}`);
    }, i * 2000);
  });
}

function animateCardsOnTap() {
  const cards = document.querySelectorAll('.card');
  let current = 0;

  const revealNext = () => {
    if (current < cards.length) {
      const direction = (current % 2 === 0) ? 'left' : 'right';
      cards[current].classList.add(`animate-${direction}`);
      current++;
    }
  };

  document.getElementById('cardsSection').addEventListener('click', revealNext);
  revealNext();
}

document.getElementById('replayBtn').addEventListener('click', function(e) {
  e.stopPropagation();
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => card.classList.remove("animate-left", "animate-right"));

  if (window.innerWidth <= 768) {
    animateCardsOnTap();
  } else {
    animateCardsAuto();
  }
});


function startEmojiRain() {
  const emojis = ['🎉', '🎂', '🎈', '🎊', '💖', '🥳', '✨'];
  setInterval(() => {
    const emoji = document.createElement('div');
    emoji.classList.add('emoji');
    emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    emoji.style.left = Math.random() * 100 + 'vw';
    emoji.style.animationDuration = 3 + Math.random() * 2 + 's';
    document.body.appendChild(emoji);

    // Remove after animation
    setTimeout(() => {
      emoji.remove();
    }, 5000);
  }, 300); // Frequency of emojis
}

