const baseURL = "http://numbersapi.com";

// 1.
let favoriteNumber = 3;
axios.get(`${baseURL}/${favoriteNumber}?json`).then((data) => {
    console.log(data.data.text);
});

//2.
let favoriteNumbers = [1, 3, 5];
axios.get(`${baseURL}/${favoriteNumbers}?json`).then((data) => {
    console.log(data);
});

//3.
let fourPromises = [];

for (let i = 1; i < 5; i++) {
    fourPromises.push(axios.get(`${baseURL}/${i}?json`));
}

Promise.all(fourPromises)
    .then((proArr) =>
        proArr.forEach((p) => $("body").append(`<p>${p.data.text}</p>`))
    )
    .catch((err) => console.log(err));
