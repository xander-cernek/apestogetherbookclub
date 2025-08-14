(function () {
    const logo = document.querySelector('.logo');
    let clickCount = 0;
    let clickTimer;

    function resetClicks() {
        clickCount = 0;
        clearTimeout(clickTimer);
    }

    function emojiShower() {
        const emojis = ['🦍', '🐒', '🙈', '🙉', '🙊', '🍌', '📚', '🧠'];
        const showerDuration = 10000; // 10 seconds
        const intervalTime = 100;

        const interval = setInterval(() => {
            const emoji = document.createElement('div');
            emoji.className = 'ape-emoji';

            // Pick a random emoji from the list
            emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];

            emoji.style.left = Math.random() * 100 + 'vw';
            emoji.style.animationDuration = 3 + Math.random() * 2 + 's';

            document.body.appendChild(emoji);

            // Remove the emoji after it finishes falling
            setTimeout(() => emoji.remove(), 5000);
        }, intervalTime);

        setTimeout(() => clearInterval(interval), showerDuration);
    }

    logo.addEventListener('click', () => {
        clickCount++;
        if (clickCount === 1) {
            clickTimer = setTimeout(resetClicks, 2000); // Start 2 second window
        }

        if (clickCount === 7) {
            resetClicks();
            emojiShower();
        }
    });
})();