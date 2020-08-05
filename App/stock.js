let apiKey = "AIOFXIT69F29K1ID";

$( document ).ready(function() {
  let stockSelected = window.location.search.split("=")[1].toLocaleLowerCase();

  let queryUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stockSelected}&apikey=${apiKey}`;

  console.log(queryUrl)
  $.ajax({
    url: queryUrl,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    $(`<p>${response["Meta Data"]["2. Symbol"]}</p>`).appendTo("#stockInfo");
    $(
      `<p>Open: $${parseInt(
        response["Time Series (Daily)"]["2020-08-03"]["1. open"]
      ).toFixed(2)}</p>`
    ).appendTo("#stockInfo");
  });

});