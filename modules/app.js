const cardsContainer = document.getElementById("board");
const imagesFolder = "./media/images/animauxdomestiques/";    // variable = String of the image path 
const imageFormat = ".jpg";    // variable = String of the image extension 
const backImage = `${imagesFolder}back.png`;  // variable = String of the image path for back.png
const gridSize = 4; // 1st grid size fix
const totalPairs = 6; // quantity of unique images

const images = [];
for (let i = 1; i <= totalPairs; i++) {
    images.push(`${imagesFolder}${i}${imageFormat}`);  // populating array ; fill in the grid with img
}
const imagesPicklist = [...images, ...images];  // duplicating imgs ;creating the pairs of cards
const cardCount = imagesPicklist.length;  //  getting a full set of cards for a game

let revealedCount = 0;
let activeCard = null;    // assign the activeCard variable to be able to follow the game flow
let awaitingEndOfMove = false;
let moveCount = 0;

// function to deal the cards as hidden

function buildCard(imageSrc) {
    const cardElement = document.createElement("div");
    const image = document.createElement("img");

    cardElement.classList.add("card");
    cardElement.setAttribute("data-image", imageSrc);
    cardElement.setAttribute("data-revealed", "false");

    image.src = backImage; // how to hide a card behind the back.png
    image.style.width = "100%";
    image.style.height = "100%";
    image.style.objectFit = "cover";

    cardElement.appendChild(image);

    // function to play compare 2 cards on a click with the previously added date-revealed attribute

    cardElement.addEventListener("click", () => {
        const revealed = cardElement.getAttribute("data-revealed");

        if (awaitingEndOfMove || revealed === "true" || cardElement === activeCard) {
            return;
        }

        image.src = imageSrc; //  display the card face up
        if (!activeCard) {
            activeCard = cardElement;  //sets the clicked card as the active one and then waits for the next click to compare cards.
            moveCount += 1;
            return;
        }
        document.getElementById("moveCountDisplay").innerText = moveCount;

        const imageToMatch = activeCard.getAttribute("data-image");

        if (imageToMatch === imageSrc) {
            cardElement.setAttribute("data-revealed", "true");
            activeCard.setAttribute("data-revealed", "true");

            activeCard = null;
            awaitingEndOfMove = false;
            revealedCount += 2;
            document.getElementById("revealedCountDisplay").innerText = revealedCount/2;

            if (revealedCount === cardCount) {
                alert("Tu as gagné, appuie sur espace pour relancer une partie!");
            }
            return;
        }
     
        awaitingEndOfMove = true;
     

        setTimeout(() => {
            image.src = backImage;
            activeCard.querySelector("img").src = backImage;

            awaitingEndOfMove = false;
            activeCard = null;
        }, 1000);
    });

    return cardElement;
}

function shuffle(array) {
    let currentIndex = array.length;
    let temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

shuffle(imagesPicklist);


for (let i = 0; i < cardCount; i++) {
    const image = imagesPicklist[i];
    const card = buildCard(image);

    cardsContainer.appendChild(card);
}


cardsContainer.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;


document.addEventListener('keydown', function (event) {
    if (event.code === 'Space') {
        restartGame();
    }
});


function restartGame() {
    revealedCount = 0;   // reset the card count
    cardsContainer.innerHTML = '';   // empty the div that was occupied by the board

    activeCard = null;   // set card variables to the iniitial state
    awaitingEndOfMove = false;  // set card variables to the iniitial state


    shuffle(imagesPicklist);  // shuffle images


    for (let i = 0; i < cardCount; i++) {   // deal the cards from scratch
        const image = imagesPicklist[i];
        const card = buildCard(image);
        cardsContainer.appendChild(card);
    }
}