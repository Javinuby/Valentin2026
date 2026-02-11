const memoryIcons = ['🍕', '🎸', '✈️', '❤️', '🐱', '🌙']; 
let memoryCards = []; 
let flippedCards = [];
let matchedPairs = 0;
let attempts = 0;

function startMemoryGame() {
    const modal = document.getElementById('memory-modal');
    const grid = document.getElementById('memory-grid');
    modal.style.display = 'block';
    grid.innerHTML = ''; 
    
    memoryCards = [...memoryIcons, ...memoryIcons];
    memoryCards.sort(() => 0.5 - Math.random());

    memoryCards.forEach((icon, index) => {
        const card = document.createElement('div');
        card.classList.add('memory-card');
        card.dataset.icon = icon;
        card.dataset.index = index;
        card.onclick = flipCard;
        grid.appendChild(card);
    });

    flippedCards = [];
    matchedPairs = 0;
    attempts = 0;
    document.getElementById('memory-status').innerText = "Intentos: 0";
}

function flipCard() {
    if (flippedCards.length === 2) return;
    if (this.classList.contains('flipped')) return;

    this.classList.add('flipped');
    this.innerText = this.dataset.icon;
    flippedCards.push(this);

    if (flippedCards.length === 2) {
        attempts++;
        document.getElementById('memory-status').innerText = "Intentos: " + attempts;
        checkMatch();
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;

    if (card1.dataset.icon === card2.dataset.icon) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        flippedCards = [];
        matchedPairs++;

        if (matchedPairs === memoryIcons.length) {
            setTimeout(() => {
                closeMemory();
                found('gato'); // LLAMA A MAIN.JS
            }, 500);
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card1.innerText = '';
            card2.classList.remove('flipped');
            card2.innerText = '';
            flippedCards = [];
        }, 1000);
    }
}

function closeMemory() {
    document.getElementById('memory-modal').style.display = 'none';
}