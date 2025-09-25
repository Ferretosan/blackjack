# 🃏 Blackjack Game

A complete blackjack game implementation with both console and web versions, featuring a full deck of card images.

## Features

- **Full Deck of Cards**: Uses actual card images from the `/cards/` directory
- **Two Game Modes**: 
  - **Betting Mode**: Full casino experience with chips and wagering
  - **Practice Mode**: Pure blackjack gameplay without betting
- **Standard Blackjack Rules**: 
  - Dealer stands on 17
  - Blackjack pays 3:2 (in betting mode)
  - Aces count as 1 or 11 (whichever is better)
  - Face cards worth 10
- **Toggle Switch**: Easily switch between betting and practice modes
- **Interactive Web Interface**: Beautiful casino-style design with animations

## Game Files

### Web Version
- `index.html` - Main game interface with mode toggle
- `style.css` - Beautiful casino-style styling with animations and toggle switch
- `script.js` - Complete game logic with betting/practice mode switching

## How to Play

### Web Version
1. Open `index.html` in your web browser
2. **Choose your mode**:
   - **Betting Mode** (default): Play with $1000 starting chips
   - **Practice Mode**: Play without money for pure fun
3. **Betting Mode**: Place your bet using the betting buttons or custom amount
4. **Practice Mode**: Click "Start Game" to begin
5. Click "Hit" to take another card or "Stand" to keep your current hand
6. Try to get as close to 21 as possible without going over
7. Beat the dealer to win!

### Mode Toggle
- Use the toggle switch in the header to switch between modes
- **Betting Mode**: Includes chip tracking, wagering, and win/loss money
- **Practice Mode**: Pure blackjack gameplay without gambling elements

## Card Assets

The game uses high-quality card images located in the `/cards/` directory:
- Standard 52-card deck plus jokers
- Both regular and white-background versions
- Card backs for hidden dealer cards
- Format: `{rank}_{suit}.png` (e.g., `ace_spades.png`, `king_hearts.png`)

## Game Rules

1. **Objective**: Get a hand value closer to 21 than the dealer without going over
2. **Card Values**:
   - Number cards (2-10): Face value
   - Face cards (Jack, Queen, King): 10 points
   - Aces: 1 or 11 (automatically calculated for best hand)
3. **Blackjack**: 21 with first two cards (Ace + 10-value card)
4. **Dealer Rules**: Must hit on 16 and below, stand on 17 and above
5. **Winning**: 
   - Blackjack pays 3:2
   - Regular wins pay 1:1
   - Push (tie) returns your bet

## Technologies Used

- **HTML5**: Game structure and layout with mode toggle
- **CSS3**: Styling, animations, responsive design, and toggle switch
- **JavaScript ES6**: Game logic, mode switching, card handling, and UI interactions

## Features Highlight

- **Dual Game Modes**: Toggle between betting and practice modes instantly
- **Realistic Card Dealing**: Animated card dealing with proper timing
- **Smart Ace Handling**: Automatically adjusts Ace values for optimal hand
- **Flexible Gameplay**: Play with or without money/chips
- **Responsive Design**: Works on desktop and mobile devices
- **Visual Feedback**: Card animations, win/lose effects, and status indicators
- **Clean UI**: Toggle switch for seamless mode switching
- **Game State Management**: Proper handling of all game phases in both modes

## Getting Started

### For Web Version:
```bash
# Simply open the HTML file in a web browser
open index.html
# or
python3 -m http.server 8000  # For local server if needed
```

Enjoy playing blackjack! 🎰

### Game Modes
- **Default**: Practice mode is enabled by default for risk-free play
- **Switch**: Use the toggle in the header to turn on betting mode when you're ready
- **Betting**: Manage chips, place wagers, and experience full casino rules