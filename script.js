// Blackjack Game Logic

class Card {
    constructor(rank, suit) {
        this.rank = rank;
        this.suit = suit;
        this.imagePath = `cards/${rank}_${suit}.png`;
    }

    getValue() {
        if (['jack', 'queen', 'king'].includes(this.rank)) {
            return 10;
        } else if (this.rank === 'ace') {
            return 11; // Aces are handled in hand calculation
        } else {
            return parseInt(this.rank);
        }
    }

    toString() {
        return `${this.rank} of ${this.suit}`;
    }
}

class Deck {
    constructor() {
        this.cards = [];
        this.reset();
    }

    reset() {
        this.cards = [];
        const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king', 'ace'];
        const suits = ['hearts', 'diamonds', 'clubs', 'spades'];

        for (let suit of suits) {
            for (let rank of ranks) {
                this.cards.push(new Card(rank, suit));
            }
        }
        this.shuffle();
    }

    shuffle() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }

    dealCard() {
        return this.cards.pop();
    }
}

class Hand {
    constructor() {
        this.cards = [];
    }

    addCard(card) {
        this.cards.push(card);
    }

    getValue() {
        let total = 0;
        let aces = 0;

        for (let card of this.cards) {
            if (card.rank === 'ace') {
                aces++;
                total += 11;
            } else {
                total += card.getValue();
            }
        }

        // Adjust for aces
        while (total > 21 && aces > 0) {
            total -= 10;
            aces--;
        }

        return total;
    }

    isBlackjack() {
        return this.cards.length === 2 && this.getValue() === 21;
    }

    isBust() {
        return this.getValue() > 21;
    }

    isFiveCardCharlie() {
        return this.cards.length === 5 && !this.isBust();
    }

    clear() {
        this.cards = [];
    }
}

class BlackjackGame {
    constructor() {
        this.deck = new Deck();
        this.playerHand = new Hand();
        this.dealerHand = new Hand();
        this.gameState = 'ready'; // ready, playing, dealer-turn, game-over
        this.dealerCardHidden = true;
        
        this.updateDisplay();
        this.showStartControls();
    }

    startGame() {
        if (this.gameState === 'ready' || this.gameState === 'game-over') {
            this.gameState = 'playing';
            this.deck.reset();
            this.playerHand.clear();
            this.dealerHand.clear();
            this.dealerCardHidden = true;
            this.clearDisplay();
            
            this.dealInitialCards();
            
            // Check for immediate blackjack
            if (this.playerHand.isBlackjack()) {
                this.dealerCardHidden = false;
                if (this.dealerHand.isBlackjack()) {
                    this.endGame('dealer-blackjack-tie');
                } else {
                    this.endGame('player-blackjack');
                }
            } else {
                this.setMessage('Your turn! Hit or Stand?');
                this.showGameControls();
            }
            
            this.hideStartControls();
        }
    }

    dealInitialCards() {
        // Clear previous hands
        this.playerHand.clear();
        this.dealerHand.clear();

        // Deal cards with animation delay
        setTimeout(() => this.dealCardToPlayer(), 200);
        setTimeout(() => this.dealCardToDealer(), 400);
        setTimeout(() => this.dealCardToPlayer(), 600);
        setTimeout(() => this.dealCardToDealer(), 800);
    }

    dealCardToPlayer() {
        const card = this.deck.dealCard();
        this.playerHand.addCard(card);
        this.addCardToDisplay('player', card);
        this.updateHandValue('player');
    }

    dealCardToDealer() {
        const card = this.deck.dealCard();
        this.dealerHand.addCard(card);
        this.addCardToDisplay('dealer', card, this.dealerHand.cards.length === 1 && this.dealerCardHidden);
        this.updateHandValue('dealer');
    }

    playerHit() {
        if (this.gameState !== 'playing') return;

        const card = this.deck.dealCard();
        this.playerHand.addCard(card);
        this.addCardToDisplay('player', card);
        this.updateHandValue('player');

        if (this.playerHand.isBust()) {
            this.endGame('player-bust');
        } else if (this.playerHand.isFiveCardCharlie()) {
            this.endGame('player-5-card-charlie');
        } else if (this.playerHand.getValue() === 21) {
            this.playerStand();
        }
    }

    playerStand() {
        if (this.gameState !== 'playing') return;

        this.gameState = 'dealer-turn';
        this.dealerCardHidden = false;
        this.hideGameControls();
        
        // Reveal dealer's hidden card
        this.revealDealerCard();
        
        setTimeout(() => this.dealerPlay(), 1000);
    }

    dealerPlay() {
        this.setMessage('Dealer is playing...');

        const dealerTurn = () => {
            const dealerValue = this.dealerHand.getValue();

            if (dealerValue > 21) {
                setTimeout(() => this.endGame('dealer-bust'), 500);
                return;
            }

            if (dealerValue < 17) {
                setTimeout(() => {
                    this.dealCardToDealer();
                    setTimeout(dealerTurn, 800);
                }, 800);
            } else {
                setTimeout(() => this.endGame('compare'), 500);
            }
        };

        dealerTurn();
    }

    endGame(result) {
        this.gameState = 'game-over';
        this.dealerCardHidden = false;
        this.hideGameControls();

        let message = '';

        switch (result) {
            case 'player-blackjack':
                message = '🎉 BLACKJACK! You win!';
                break;
            case 'player-5-card-charlie':
                message = '🎉 5-Card Charlie! You win!';
                break;
            case 'dealer-blackjack-tie':
                message = '😞 Dealer wins ties! Both started with blackjack.';
                break;
            case 'player-bust':
                message = '💥 BUST! You went over 21!';
                break;
            case 'dealer-bust':
                message = '🎉 Dealer busts! You win!';
                break;
            case 'compare':
                const playerValue = this.playerHand.getValue();
                const dealerValue = this.dealerHand.getValue();
                
                if (dealerValue > 21) {
                    message = '🎉 Dealer busts! You win!';
                    break;
                }

                if (playerValue > dealerValue) {
                    message = `🎉 You win! ${playerValue} beats ${dealerValue}!`;
                } else if (dealerValue > playerValue) {
                    message = `😞 Dealer wins! ${dealerValue} beats ${playerValue}!`;
                } else {
                    message = `😞 Dealer wins ties! Both show ${dealerValue}.`;
                }
                break;
        }

        this.setMessage(message);
        this.updateDisplay();
        this.showNewGameControls();
    }

    newGame() {
        this.gameState = 'ready';
        this.setMessage('Click Start Game to play another round!');
        this.showStartControls();
        this.hideNewGameControls();
        this.clearDisplay();
        this.updateDisplay();
    }

    // UI Methods
    updateDisplay() {
        this.updateHandValue('player');
        this.updateHandValue('dealer');
    }

    updateHandValue(player) {
        const hand = player === 'player' ? this.playerHand : this.dealerHand;
        const valueElement = document.getElementById(`${player}-value`);
        
        if (player === 'dealer' && this.dealerCardHidden) {
            valueElement.textContent = `Value: ?`;
        } else {
            valueElement.textContent = `Value: ${hand.getValue()}`;
            
            // Add color based on value
            const value = hand.getValue();
            if (value > 21) {
                valueElement.style.color = '#f48fb1'; // Light pink for bust
            } else if (value === 21) {
                valueElement.style.color = '#ce93d8'; // Lighter purple for 21
            } else {
                valueElement.style.color = '#b39ddb'; // Light purple for normal
            }
        }
    }

    addCardToDisplay(player, card, isHidden = false) {
        const handElement = document.getElementById(`${player}-hand`);
        const cardElement = document.createElement('div');
        cardElement.className = 'card new-card';

        if (isHidden) {
            cardElement.innerHTML = `<img src="cards/back_blue_basic.png" alt="Hidden Card">`;
            cardElement.dataset.hidden = 'true';
            cardElement.dataset.cardRank = card.rank;
            cardElement.dataset.cardSuit = card.suit;
        } else {
            cardElement.innerHTML = `<img src="${card.imagePath}" alt="${card.toString()}">`;
        }

        handElement.appendChild(cardElement);
    }

    revealDealerCard() {
        const dealerHand = document.getElementById('dealer-hand');
        const hiddenCard = dealerHand.querySelector('[data-hidden="true"]');
        
        if (hiddenCard) {
            const rank = hiddenCard.dataset.cardRank;
            const suit = hiddenCard.dataset.cardSuit;
            hiddenCard.innerHTML = `<img src="cards/${rank}_${suit}.png" alt="${rank} of ${suit}">`;
            hiddenCard.removeAttribute('data-hidden');
        }
        
        this.updateHandValue('dealer');
    }

    clearDisplay() {
        document.getElementById('player-hand').innerHTML = '';
        document.getElementById('dealer-hand').innerHTML = '';
    }

    setMessage(message) {
        document.getElementById('game-message').textContent = message;
    }

    showGameControls() {
        document.getElementById('game-controls').style.display = 'block';
    }

    hideGameControls() {
        document.getElementById('game-controls').style.display = 'none';
    }

    showNewGameControls() {
        document.getElementById('new-game-controls').style.display = 'block';
    }

    hideNewGameControls() {
        document.getElementById('new-game-controls').style.display = 'none';
    }

    showStartControls() {
        document.getElementById('simple-start-controls').style.display = 'block';
    }

    hideStartControls() {
        document.getElementById('simple-start-controls').style.display = 'none';
    }
}

// Global game instance
let game;

// Game functions called by HTML
function playerHit() {
    game.playerHit();
}

function playerStand() {
    game.playerStand();
}

function newGame() {
    game.newGame();
}

function startGame() {
    game.startGame();
}

// Initialize game when page loads
document.addEventListener('DOMContentLoaded', function() {
    game = new BlackjackGame();
});