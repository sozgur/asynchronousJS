const baseURL = "http://numbersapi.com";

// 1.
async function favoriteNumber(favNum) {
  let { data } = await axios.get(`${baseURL}/${favNum}?json`);
  console.log(data.text);
}

favoriteNumber(3);

//2.
async function favoriteNumbers(favNums) {
  let { data } = await axios.get(`${baseURL}/${favNums}?json`);
  console.log(data);
}

favoriteNumbers([1, 3, 5]);

// 3.
async function allFavNumbers() {
  let fourPromises = [];
  for (let i = 1; i < 5; i++) {
    fourPromises.push(await axios.get(`${baseURL}/${i}?json`));
  }

  fourPromises.forEach((res) => {
    $("body").append(`<p>${res.data.text}</p>`);
  });
}

allFavNumbers();
