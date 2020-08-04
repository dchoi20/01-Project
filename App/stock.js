let apiKey = "AIOFXIT69F29K1ID";

let today = new Date();
let dd = today.getDate() - 1;
let mm = today.getMonth() + 1;
let yyyy = today.getFullYear();
let todayDate = yyyy + "-" + "0" + mm + "-" + "0" + dd;

$(document).ready(function () {
  let stockSelected = window.location.search.split("=")[1].toLocaleLowerCase();

  let queryUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stockSelected}&apikey=${apiKey}`;

  console.log(queryUrl);
  $.ajax({
    url: queryUrl,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    $(`<p>${response["Meta Data"]["2. Symbol"]}</p>`).appendTo("#stockInfo");
    $(
      `<p>Open: $${parseInt(
        response["Time Series (Daily)"][todayDate]["1. open"]
      ).toFixed(2)}</p>
      <p>High: $${parseInt(
        response["Time Series (Daily)"][todayDate]["2. high"]
      ).toFixed(2)}</p>
      <p>Low: $${parseInt(
        response["Time Series (Daily)"][todayDate]["3. low"]
      ).toFixed(2)}</p>
      <p>Previous Close: $${parseInt(
        response["Time Series (Daily)"][todayDate]["4. close"]
      ).toFixed(2)}</p>
      <p>Volume: $${parseInt(
        response["Time Series (Daily)"][todayDate]["5. volume"]
      ).toFixed()}</p>
      `
    ).appendTo("#stockInfo");
  });
});
