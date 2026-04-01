const apiKey = "f66efc739fe66e3a1639e6e22689305b";
const lang = "pt_br";
const units = "metric";

const cardEl = document.querySelector(".card");
const cityEl = document.querySelector(".city");
const iconEl = document.querySelector(".icon");
const tempEl = document.querySelector("h2");
const feelslikeEl = document.querySelector(".feels-like span");
const tempMinEl = document.querySelector(".min");
const tempMaxEl = document.querySelector(".max");
const humidityEl = document.querySelector(".humidity span");
const windImgEl = document.querySelector(".wind img");
const windTextEl = document.querySelector(".wind span");
const inputEl = document.querySelector(".input input");
const buttonEl = document.querySelector(".input button");

function callApi() {
  const city = inputEl.value.trim();
  if (!city) return alert("Digite o nome de uma cidade!");

  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&appid=" +
      apiKey +
      "&units=" +
      units +
      "&lang=" +
      lang,
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      cityEl.innerHTML = data.name;

      const icon = data.weather[0].icon;
      iconEl.src = "https://openweathermap.org/img/wn/" + icon + "@4x.png";

      tempEl.innerHTML = Math.round(data.main.temp) + "°";
      feelslikeEl.innerHTML = Math.round(data.main.feels_like) + "°";
      tempMinEl.innerHTML = Math.round(data.main.temp_min) + "°";
      tempMaxEl.innerHTML = Math.round(data.main.temp_max) + "°";

      humidityEl.innerHTML = data.main.humidity + "%";

      windTextEl.innerHTML = data.wind.speed + " m/s";
      windImgEl.style.transform = "rotate(" + data.wind.deg + "deg)";

      cardEl.classList.add("active");
    })
    .catch(function (error) {
      console.error("Erro ao buscar dados:", error);
      alert("Não foi possível obter os dados da cidade.");
    });
}

buttonEl.addEventListener("click", callApi);

inputEl.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    callApi();
  }
});
