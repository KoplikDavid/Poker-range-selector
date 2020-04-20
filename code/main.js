const cards = ["2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"];
const colors = ["white", "red", "orange", "dark-blue", "light-blue", "green", "yellow", "brown"];
window.selectedColor = colors[0];
window.colorGroups = {};

function isPrimaryMouseDown(event) {
    const primaryMouseButton = 1;
    return event.buttons & primaryMouseButton;
}

function updateGroupCounts() {
    const div = document.getElementsByClassName("group-counts")[0];
    let result = "";
    colors.forEach((color) => {
        const group = window.colorGroups[color];
        result += color + ":" + group.size + " ";
    });

    div.innerText = result;
}

function init() {
    colors.forEach(color => {
        window.colorGroups[color] = new Set();
    });
    generateColorGrid();
    generateComboGrid();
}

function generateColorGrid() {
    const gridHolder = document.getElementsByClassName("grid-color")[0];
    for(let c = 0; c < colors.length; c++) {
        generateColor(gridHolder, c);
    }
}

function generateColor(gridHolder, c) {
    const newTile = generateColorTile(c);

    gridHolder.appendChild(newTile);
}

function generateColorTile(c) {
    const color = colors[c];
    const newTile = document.createElement("div");
    newTile.classList.add("color-tile");
    newTile.classList.add("color-" + color);

    newTile.addEventListener("mousedown", (event) => {
        if (isPrimaryMouseDown(event)) {
            const selectedColor = document.getElementsByClassName("selected-color")[0];
            selectedColor.classList.remove("color-" + window.selectedColor);
            selectedColor.classList.add("color-" + color);
            window.selectedColor = color;
        }
    });

    return newTile;
}

function generateComboGrid() {
    const gridHolder = document.getElementsByClassName("grid-holder")[0];
    for(let y = cards.length-1; y >= 0; y--) {
        for(let x = cards.length-1; x >= 0; x--) {
            generateCardCombo(gridHolder, x, y);
        }
    }
}

function generateCardCombo(gridHolder, x, y) {
    const newTile = generateComboTile(x, y);
    const newLabel = generateComboLabel(x, y);

    newTile.appendChild(newLabel);
    gridHolder.appendChild(newTile);
}

function generateComboTile(x, y) {
    const newTile = document.createElement("div");
    newTile.classList.add("combo-tile");
    const newModel = new ComboModel(newTile);

    return newTile;
}

function getSuffix(x, y) {
    let suffix = "";
    if (x > y) {
        suffix = "o";
    }
    if (x < y) {
        suffix = "s";
    }
    return suffix;
}

function getLabel(x, y) {
    const card1 = cards[x];
    const card2 = cards[y];
    let label = "";

    if (x > y) {
        label = card1 + card2;
    } else {
        label = card2 + card1;
    }
    return label;
}

function generateComboLabel(x, y) {
    const label = getLabel(x, y);
    const suffix = getSuffix(x, y);
    const newLabel = document.createElement("div");

    newLabel.classList.add("combo-label");
    newLabel.innerText = label + suffix;

    return newLabel;
}