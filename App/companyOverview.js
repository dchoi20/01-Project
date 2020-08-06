let $dateSelected = $("#dateSelected");
let $dateBtn = $("#dateBtn");

params = new URL(document.location).searchParams;
stockSelected = params.get("stock");

stockApiKey = "AIOFXIT69F29K1ID";

function companyDailyStockInfo() {
  stockQueryUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stockSelected}&apikey=${stockApiKey}`;
  $.ajax({
    url: stockQueryUrl,
    method: "GET",
  }).then(function (response) {
    $dateBtn.on("click", function () {
      console.log(response);
      let selectedDate = $dateSelected.val();
      console.log(selectedDate);
      let dailyView = response["Time Series (Daily)"];

      $(
        `<div class="uk-card uk-card-default uk-margin">
      
      <div id="cardDailyInfo" class="uk-card-body">
      <p> Date: ${selectedDate}</p>
        <p>Open: $${parseInt(dailyView[selectedDate]["1. open"]).toFixed(2)}</p>
          <p>High: $${parseInt(
            dailyView[selectedDate]["2. high"]
          ).toFixed()}</p>
          <p>Low: $${parseInt(dailyView[selectedDate]["3. low"]).toFixed()}</p>
          <p>Previous Close: $${parseInt(
            dailyView[selectedDate]["4. close"]
          ).toFixed()}</p>
          <p>Volume: $${parseInt(
            dailyView[selectedDate]["5. volume"]
          ).toFixed()}</p>
      </div>`
      ).appendTo("#companyDailyStockInfo");
    });
  });
}
companyDailyStockInfo();

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
        <h3 class="uk-card-title">${response["Name"]} (${response["Symbol"]})</h3>
      
      </div>
      <div class="uk-card-body">
        <p>${response["Description"]}</p>
      </div>
      `
    ).appendTo("#companyName");
  });
}
companyOverview();

function companyInfo() {
  let stockQueryUrl = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${stockSelected}&apikey=AIOFXIT69F29K1ID`;

  $.ajax({
    url: stockQueryUrl,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    $(
      `<div class="uk-card uk-card-default uk-margin">
      <div class="uk-card-body">
        <p>Sector: ${response["Sector"]}</p>
        <p>Industry: ${response["Industry"]}</p>
        <p>Exchange: ${response["Exchange"]}</p>
        <p>52 Week High: ${response["52WeekHigh"]}</p>
        <p>52 Week Low: ${response["52WeekLow"]}</p>

      </div>
      `
    ).appendTo("#companyInfo");
  });
}

companyInfo();
