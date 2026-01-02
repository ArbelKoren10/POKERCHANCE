// הגדרת דירוגים וחליפות
const Ranks = {
    TWO: 2, THREE: 3, FOUR: 4, FIVE: 5, SIX: 6, SEVEN: 7, 
    EIGHT: 8, NINE: 9, TEN: 10, JACK: 11, QUEEN: 12, KING: 13, ACE: 14
};

const Suits = {
    SPADES: 'spades', HEARTS: 'hearts', DIAMONDS: 'diamonds', CLUBS: 'clubs'
};

// פונקציה ליצירת חבילת קלפים מלאה
function generateFullDeck() {
    const deck = [];
    for (const suit in Suits) {
        for (const rank in Ranks) {
            deck.push({ rank: Ranks[rank], suit: Suits[suit] });
        }
    }
    return deck;
}

// חישוב סיכויי ניצחון (Current Odds)
function calculateWinRate(userHand, activeBoard) {
    if (activeBoard.length < 3) return 0;

    let deck = generateFullDeck();
    
    // הסרת הקלפים הידועים מהחבילה
    const knownCards = [...userHand, ...activeBoard];
    deck = deck.filter(deckCard => 
        !knownCards.some(known => known.rank === deckCard.rank && known.suit === deckCard.suit)
    );

    let wins = 0;
    let ties = 0;
    let totalCombinations = 0;

    // ציון היד הנוכחית של המשתמש
    const userScore = evaluateHand(userHand, activeBoard);

    // מעבר על כל האפשרויות ליד של היריב (2 קלפים מתוך היתרה)
    for (let i = 0; i < deck.size; i++) {
        for (let j = i + 1; j < deck.size; j++) {
            totalCombinations++;
            const opponentHand = [deck[i], deck[j]];
            const opponentScore = evaluateHand(opponentHand, activeBoard);

            if (userScore > opponentScore) wins++;
            else if (userScore === opponentScore) ties++;
        }
    }

    // נוסחת סיכויי הניצחון:
    // $$WinRate = \frac{Wins + \frac{Ties}{2}}{Total} \times 100$$
    return ((wins + (ties / 2)) / totalCombinations) * 100;
}

// כאן תבוא פונקציית ה-evaluateHand שתרגמנו (זיהוי זוג, שלישייה וכו')
