const cards = ["2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"];
const suite = ["clubes", "diamonds", "hearts", "spades"];

function generateCardsGrid() {
    const gridHolder = document.getElementsByClassName("grid-cards")[0];
    const suiteSize = suite.length;
    const cardsSize = cards.length;
    let s = 0;
    let c = 0;

    for (; s < suiteSize; s++) {
        for (; c < cardsSize; c++) {
            generateCard(gridHolder, s, c)
        }
    }

}

//TODO generate tile and card and connect them
function generateCard(gridHolder, s, c) {
    const newTile = generateCardTile(s, c);
    const card = new Card(s, c)

    gridHolder.appendChild(newTile);
}


//TODO change to ID? or add events
class Card {
    constructor(s, c) {
        this.suite = s;
        this.value = c;
        this.bloked = false;
    }

}