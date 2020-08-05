let $dateSelected = $("#dateSelected");
let $dateBtn = $("#dateBtn");

$dateBtn.on("click", function () {
  let selectedDate = $dateSelected.val();
  console.log(selectedDate);
});

let stockSelected = window.location.search.split("=")[1];

let today = new Date();
let dd = today.getDate() - 1;
let mm = today.getMonth() + 1;
let yyyy = today.getFullYear();
let yesterdayDate = yyyy + "-" + "0" + mm + "-" + "0" + dd;

let stockApiKey = "AIOFXIT69F29K1ID";
let stockQueryUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stockSelected}&apikey=${stockApiKey}`;

function dailyStockInfo() {
  $.ajax({
    url: stockQueryUrl,
    method: "GET",
  }).then(function (response) {
    let dailyView = response["Time Series (Daily)"];
    let yesterdayInfo = dailyView[yesterdayDate];
    $(
      `<div class="uk-card uk-card-default uk-margin">
      
      <div class="uk-card-body">
        <p>Open: $${parseInt(yesterdayInfo["1. open"]).toFixed(2)}</p>
          <p>High: $${parseInt(yesterdayInfo["2. high"]).toFixed(2)}</p>
          <p>Low: $${parseInt(yesterdayInfo["3. low"]).toFixed(2)}</p>
          <p>Previous Close: $${parseInt(yesterdayInfo["4. close"]).toFixed(
            2
          )}</p>
          <p>Volume: $${parseInt(yesterdayInfo["5. volume"]).toFixed()}</p>
      </div>`
    ).appendTo("#dailyStockInfo");
  });
}
dailyStockInfo();

function companyOverview() {
  let stockQueryUrl = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${stockSelected}&apikey=AIOFXIT69F29K1ID`;

  $.ajax({
    url: stockQueryUrl,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    $(
      `<div class="uk-card uk-card-default uk-margin">
      <div class="uk-card-header">
        <h3 class="uk-card-title">${response["Symbol"]}</h3>
      </div>
      <div class="uk-card-body">
        <p>${response["Description"]}</p>
      </div>
      `
    ).appendTo("#companyName");
  });
}
companyOverview();
