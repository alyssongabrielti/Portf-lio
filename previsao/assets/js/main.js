const apiKey = "f66efc739fe66e3a1639e6e22689305b";
const lang = "pt_br";
const units = "metric";

const app = angular.module("weatherApp", []);

app.controller("weatherController", function ($scope, $http) {
  $scope.cityInput = "";
  $scope.cityDisplay = "";
  $scope.cardActive = false;

  $scope.temperature = "";
  $scope.feelslike = "";
  $scope.minTemperature = "";
  $scope.maxTemperature = "";
  $scope.humidity = "";
  $scope.windVelocity = "";
  $scope.windOrientation = "";
  $scope.iconUrl = "";

  $scope.callApi = function (cityParam) {
    const city =
      cityParam ||
      $scope.cityInput ||
      localStorage.getItem("city") ||
      "Curitiba";

    $http
      .get(
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
        const data = response.data;

        $scope.cityDisplay = data.name;
        $scope.temperature = Math.round(data.main.temp) + "°";
        $scope.feelslike = Math.round(data.main.feels_like) + "°";
        $scope.minTemperature = Math.round(data.main.temp_min) + "°";
        $scope.maxTemperature = Math.round(data.main.temp_max) + "°";
        $scope.humidity = data.main.humidity + "%";
        $scope.windVelocity = data.wind.speed + " m/s";
        $scope.windOrientation = data.wind.deg;
        $scope.iconUrl =
          "https://openweathermap.org/img/wn/" +
          data.weather[0].icon +
          "@4x.png";

        $scope.cardActive = true;

        localStorage.setItem("city", data.name);

        $scope.cityInput = "";
      })
      .catch(function (error) {
        console.error("Erro ao buscar dados:", error);
        alert("Não foi possível obter os dados da cidade.");
      });
  };

  const lastCity = localStorage.getItem("city");
  if (lastCity) {
    $scope.callApi(lastCity);
  } else {
    $scope.callApi("Curitiba");
  }
});
