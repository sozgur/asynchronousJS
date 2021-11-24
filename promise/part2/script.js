//1
const baseURL = "http://deckofcardsapi.com/api/deck";

axios.get(`${baseURL}/new/draw/`).then((data) => {
    let { suit, value } = data.data.cards[0];
    console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
});

//2
let firstCard;

axios
    .get(`${baseURL}/new/draw/`)
    .then((data) => {
        firstCard = data.data.cards[0];
        console.log(data.data.deck_id);
        return axios.get(`${baseURL}/${data.data.deck_id}/draw/`);
    })
    .then((data) => {
        let secondCard = data.data.cards[0];
        [firstCard, secondCard].forEach((card) => {
            console.log(
                `${card.value.toLowerCase()} of ${card.suit.toLowerCase()}`
            );
        });
    });

//3

let deckId;
let firstCardData;
let $btn = $("button");
let $cards = $("#cards");
let finish = false;
let remaining;

axios.get(`${baseURL}/new/draw/`).then((data) => {
    deckId = data.data.deck_id;
    firstCardData = data.data.cards[0];
    $btn.show();
});

$btn.on("click", function () {
    let angle = Math.random() * 90 - 45;
    let randomX = Math.random() * 40 - 20;
    let randomY = Math.random() * 40 - 20;

    if (finish === false) {
        axios.get(`${baseURL}/${deckId}/draw/`).then((data) => {
            remaining = data.data.remaining;
            showCard(data.data.cards[0].image, angle, randomX, randomY);
        });
    } else {
        showCard(firstCardData.image, angle, randomX, randomY);
        $btn.remove();
    }

    if (remaining === 0) {
        finish = true;
    }
});

function showCard(imgURL, angle, randomX, randomY) {
    $cards.append(
        $("<img>", {
            src: imgURL,
            css: {
                transform: `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`,
            },
        })
    );
}
