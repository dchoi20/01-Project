let params = new URL(document.location).searchParams;
let stockSelected = params.get("stock");
let companyName = params.get("company");

today = moment().format("YYYY-MM-DD");
yesterday = moment().subtract(1, "days").format("YYYY-MM-DD");

let stockApiKey = "1IFT5IFSPJP7RUK6";
let stockQueryUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stockSelected}&apikey=${stockApiKey}`;

$.ajax({
  url: stockQueryUrl,
  method: "GET",
}).then(function (response) {
  let lastRefreshed = response["Meta Data"]["3. Last Refreshed"]; // get latest date available
  let dailyView = response["Time Series (Daily)"];
  let latestInfo = dailyView[lastRefreshed];

  $(`<div class="uk-card uk-card-default uk-margin">
      <div class="uk-card-header">
        <h3 class="uk-card-title">${companyName} (${stockSelected})</h3>
      </div>
      <div class="uk-card-body">
        <p>Open: $${parseInt(latestInfo["1. open"]).toFixed(2)}</p>
          <p>High: $${parseInt(latestInfo["2. high"]).toFixed(2)}</p>
          <p>Low: $${parseInt(latestInfo["3. low"]).toFixed(2)}</p>
          <p>Previous Close: $${parseInt(latestInfo["4. close"]).toFixed(2)}</p>
          <p>Volume: $${parseInt(latestInfo["5. volume"]).toLocaleString()}</p>
          <button id="companyOverviewBtn" class="uk-button uk-button-primary uk-button-small">Company Overview</button>
      </div>`).appendTo("#stockInfo");
});

let newsApiKey = "bslccuvrh5rb8ivkrml0";
let newsQueryUrl = `https://finnhub.io/api/v1/company-news?symbol=${stockSelected}&from=${yesterday}&to=${today}&token=${newsApiKey}`;

$.ajax({
  url: newsQueryUrl,
  method: "GET",
}).then(function (response) {
  for (let i = 0; i < response.length; i++) {
    const article = response[i];
    $(`<div class="uk-card uk-card-default uk-margin">
    <div class="uk-card-header">
    <h3 class="uk-card-title">${article.headline}</h3>
    </div>
    <div class="uk-card-body">
    <h4>${article.summary}</h4>
    <p>Source: ${article.source}</p>
    <p>Published: ${article.datetime}</p>
    <a target="_blank" href="${article.url}">Click to Read</a> 
    </div>
    </div>`).appendTo("#stockNews");
  }
});

$("#stockInfo").on("click", "#companyOverviewBtn", function () {
  renderCompanyOverview(stockSelected, companyName);
});

function renderCompanyOverview(stockSelected, companyName) {
  window.location.href = `./companyOverview.html?stock=${stockSelected}&company=${companyName}`;
}
