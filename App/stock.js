let stockSelected = window.location.search.split("=")[1];

let today = new Date();
let dd = today.getDate() - 1;
let mm = today.getMonth() + 1;
let yyyy = today.getFullYear();
let yesterdayDate = yyyy + "-" + "0" + mm + "-" + "0" + dd;

let stockApiKey = "AIOFXIT69F29K1ID";
let stockQueryUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stockSelected}&apikey=${stockApiKey}`;

$.ajax({
  url: stockQueryUrl,
  method: "GET",
}).then(function (response) {
  console.log(response);
  let dailyView = response["Time Series (Daily)"];
  let yesterdayInfo = dailyView[yesterdayDate]; //get last day available in array
  $(`<div class="uk-card uk-card-default uk-margin">
      <div class="uk-card-header">
        <h3 class="uk-card-title">${response["Meta Data"]["2. Symbol"]}</h3>
      </div>
      <div class="uk-card-body">
        <p>Open: $${parseInt(yesterdayInfo["1. open"]).toFixed(2)}</p>
          <p>High: $${parseInt(yesterdayInfo["2. high"]).toFixed(2)}</p>
          <p>Low: $${parseInt(yesterdayInfo["3. low"]).toFixed(2)}</p>
          <p>Previous Close: $${parseInt(yesterdayInfo["4. close"]).toFixed(
            2
          )}</p>
          <p>Volume: $${parseInt(yesterdayInfo["5. volume"]).toFixed()}</p>
      </div>`).appendTo("#stockInfo");
});

let newsApiKey = "-WEIf8br859cG3nJvC1YU0KreUz80wPxADv8Xp8Z5DeQ5egI";
let newsQueryUrl = `https://api.currentsapi.services/v1/search?keywords=${stockSelected}&apiKey=${newsApiKey}`;

$.ajax({
  url: newsQueryUrl,
  method: "GET",
}).then(function (response) {
  console.log(newsQueryUrl);
  for (let i = 0; i < response.news.length; i++) {
    const article = response.news[i];
    $(`<div class="uk-card uk-card-default uk-margin">
    <div class="uk-card-header">
    <h3 class="uk-card-title">${article.title}</h3>
    </div>
    <div class="uk-card-body">
    <h4>${article.description}</h4>
    <p>Source: ${article.author}</p>
    <p>Published: ${article.published}</p>
    <a target="_blank" href="${article.url}">Click to Read</a> 
    </div>
    </div>`).appendTo("#stockNews");
  }
});

function renderStockPage(stockSelected) {
  window.location.href = `./stock.html?stock=${stockSelected}`;
}
