const slider = document.querySelector(".slider");
const images = document.querySelectorAll(".slider img");
const prev = document.getElementById("prev");
const next = document.getElementById("next");

let index = 0;

function updateSlider() {
    slider.style.transform = `translateX(-${index * 100}%)`;
}

next.addEventListener("click", () => {
    index = (index + 1) % images.length; // Nächstes Bild
    updateSlider();
});

prev.addEventListener("click", () => {
    index = (index - 1 + images.length) % images.length; // Vorheriges Bild
    updateSlider();
});

const textVarianten = {
    button1: "Im Jahr 1998 verwirklichte Clara Lehmann ihren lang gehegten Traum: die Eröffnung eines eigenen Buchladens. Mit einer großen Leidenschaft für Literatur und dem Wunsch, einen Ort der Begegnung für Bücherfreunde zu schaffen, gründete sie die Buchhandlung Kapitel & Co. in einer kleinen Seitenstraße im Herzen der Stadt. Anfangs bestand das Sortiment hauptsächlich aus Klassikern und zeitgenössischer Belletristik, doch schnell erkannte Clara, dass ihre Kunden auch ein Interesse an Fachbüchern, Kinderliteratur und regionalen Autoren hatten. Sie erweiterte das Angebot und begann, Lesungen sowie Signierstunden zu organisieren. Diese Veranstaltungen machten Kapitel & Co. zu einem beliebten Treffpunkt für Literaturliebhaber.",
    button2: "Mit der wachsenden Nachfrage zog die Buchhandlung im Jahr 2008 in ein größeres Ladenlokal. Neben neuen Büchern bot sie nun auch eine gemütliche Leseecke sowie ein kleines Café an, in dem Kunden bei einer Tasse Kaffee in Büchern schmökern konnten. Die Digitalisierung stellte eine Herausforderung dar, doch Clara reagierte mit einer eigenen Website und einem Onlineshop, um sowohl stationären als auch digitalen Vertrieb zu ermöglichen.",
    button3: "Ein besonderes Highlight der Buchhandlung Kapitel & Co. ist die jährliche Lesenacht, die Leseratten aller Altersgruppen anzieht. Bei gedämpftem Licht und gemütlicher Atmosphäre verwandelt sich der Buchladen in einen magischen Ort voller Geschichten. Renommierte Autoren lesen aus ihren neuesten Werken, während leise Musik im Hintergrund spielt. Besucher können bei einer Tasse Tee in ihre Lieblingsbücher eintauchen und mit anderen Literaturbegeisterten ins Gespräch kommen. Für Kinder gibt es eine eigene Ecke mit interaktiven Vorlesestunden. Diese Veranstaltung stärkt die lokale Lesekultur und macht Kapitel & Co. zu einem Treffpunkt für echte Buchliebhaber.",
    button4: "Heute, 100 Jahre nach der Gründung, ist Kapitel & Co. eine feste Institution in der Stadt. Der Buchladen ist nach wie vor in Familienhand, und Claras Tochter Anna führt das Geschäft mit neuen Ideen weiter. Trotz der Konkurrenz großer Onlinehändler bleibt die Buchhandlung dank ihres persönlichen Service, sorgfältig kuratierten Sortiments und regelmäßiger Veranstaltungen ein geschätzter Ort für alle, die Bücher lieben."
};

    document.getElementById("text-box").innerText = textVarianten.button1;


function changeText(key) {
    document.getElementById("text-box").innerText = textVarianten[key];
}


const imagePaths = [
    "Bilder/Fotos/Bild1.jpg", "Bilder/Fotos/Bild2.jpg", "Bilder/Fotos/Bild3.jpg", "Bilder/Fotos/Bild4.jpg",
    "Bilder/Fotos/Bild5.jpg", "Bilder/Fotos/Bild6.jpg", "Bilder/Fotos/Bild7.jpg", "Bilder/Fotos/Bild8.jpg"
];

let cards = [...imagePaths, ...imagePaths]; // Kartenpaare erzeugen
let flippedCards = [];
let matchedPairs = 0;

// Karten zufällig mischen
cards.sort(() => Math.random() - 0.5);

const gameBoard = document.getElementById("memory-game");

// Spielfeld mit Karten erstellen
cards.forEach((imagePath) => {
    const card = document.createElement("div");
    card.classList.add("card");

    const cardInner = document.createElement("div");
    cardInner.classList.add("card-inner");

    const cardFront = document.createElement("div");
    cardFront.classList.add("card-front");
    const img = document.createElement("img");
    img.src = imagePath;
    cardFront.appendChild(img);

    const cardBack = document.createElement("div");
    cardBack.classList.add("card-back");
    cardBack.textContent = "❓"; // Rückseite mit Fragezeichen

    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    card.appendChild(cardInner);
    card.dataset.image = imagePath;

    card.addEventListener("click", () => flipCard(card));

    gameBoard.appendChild(card);
});

function flipCard(card) {
    if (flippedCards.length < 2 && !flippedCards.includes(card)) {
        card.classList.add("flipped");
        flippedCards.push(card);

        if (flippedCards.length === 2) {
            setTimeout(checkMatch, 500);
        }
    }
}

function checkMatch() {
    if (flippedCards[0].dataset.image === flippedCards[1].dataset.image) {
        flippedCards.forEach(card => card.style.pointerEvents = "none");
        matchedPairs++;

        if (matchedPairs === imagePaths.length) {
            setTimeout(() => alert("Glückwunsch! Du hast gewonnen!"), 500);
        }
    } else {
        flippedCards.forEach(card => card.classList.remove("flipped"));
    }
    flippedCards = [];
}