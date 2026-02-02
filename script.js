const emojis = ['🐶', '🐶', '🐱', '🐱', '🦁', '🦁', '🐯', '🐯', '🐷', '🐷', '🐸', '🐸', '🐵', '🐵', '🐼', '🐼'];
let flippedCards = [];
let matchedCount = 0;
let flips = 0;
let timer = 0;
let timerInterval;

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function createBoard() {
    const board = document.getElementById('game-board');
    const shuffledEmojis = shuffle([...emojis]);
    
    shuffledEmojis.forEach((emoji, index) => {
        const card = document.createElement('div');
        card.classList.add('card-item');
        card.dataset.emoji = emoji;
        card.dataset.index = index;
        card.addEventListener('click', flipCard);
        board.appendChild(card);
    });

    startTimer();
}

function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
        this.classList.add('flipped');
        this.innerText = this.dataset.emoji;
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            flips++;
            document.getElementById('flips').innerText = flips;
            checkMatch();
        }
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.emoji === card2.dataset.emoji) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedCount += 2;
        flippedCards = [];
        if (matchedCount === emojis.length) {
            clearInterval(timerInterval);
            new bootstrap.Modal(document.getElementById('winModal')).show();
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            card1.innerText = '';
            card2.innerText = '';
            flippedCards = [];
        }, 1000);
    }
}

function startTimer() {
    timerInterval = setInterval(() => {
        timer++;
        document.getElementById('timer').innerText = timer;
    }, 1000);
}

function resetGame() {
    location.reload();
}

createBoard();
