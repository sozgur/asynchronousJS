const baseURL = "http://deckofcardsapi.com/api/deck";

//1
async function singleCard() {
    let { data } = await axios.get(`${baseURL}/new/draw/`);
    let { suit, value } = data.cards[0];
    console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
}

singleCard();

//2
async function twoCards() {
    let firstData = await axios.get(`${baseURL}/new/draw/`);
    const deckId = firstData.data.deck_id;

    let secondData = await axios.get(`${baseURL}/${deckId}/draw/`);

    [firstData, secondData].forEach((data) => {
        let { suit, value } = data.data.cards[0];
        console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
    });
}

twoCards();

//3

async function setupCards() {
    let finish = false;
    let $btn = $("button");

    let firstData = await axios.get(`${baseURL}/new/draw/`);
    let deckId = firstData.data.deck_id;
    $btn.show();

    $btn.on("click", async function () {
        let angle = Math.random() * 90 - 45;
        let randomX = Math.random() * 40 - 20;
        let randomY = Math.random() * 40 - 20;

        if (finish === false) {
            let { data } = await axios.get(`${baseURL}/${deckId}/draw/`);
            showCard(data.cards[0].image, angle, randomX, randomY);
            if (data.remaining === 0) {
                finish = true;
            }
        } else {
            showCard(firstData.data.cards[0].image, angle, randomX, randomY);
            $btn.remove();
        }
    });
}

function showCard(imgURL, angle, randomX, randomY) {
    $("#cards").append(
        $("<img>", {
            src: imgURL,
            css: {
                transform: `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`,
            },
        })
    );
}

setupCards();
