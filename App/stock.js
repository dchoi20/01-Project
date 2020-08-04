let stockApiKey = "AIOFXIT69F29K1ID";

$(document).ready(function () {
  let stockSelected = window.location.search.split("=")[1].toLocaleLowerCase();

  let stockQueryUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stockSelected}&apikey=${stockApiKey}`;

  console.log(stockQueryUrl)
  $.ajax({
    url: stockQueryUrl,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    $(`<p>${response["Meta Data"]["2. Symbol"]}</p>`).appendTo("#stockInfo");
    $(
      `<p>Open: ${parseInt(
        response["Time Series (Daily)"]["2020-08-03"]["1. open"]
      ).toFixed(2)}</p>`
    ).appendTo("#stockInfo");
  });

  let newsApiKey = "-WEIf8br859cG3nJvC1YU0KreUz80wPxADv8Xp8Z5DeQ5egI";

  let newsQueryUrl = `https://api.currentsapi.services/v1/search?keywords=${stockSelected}&apiKey=${newsApiKey}`

  $.ajax({
    url: newsQueryUrl,
    method: "GET"
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
            </div>`).appendTo("#stockNews")
    };
  });


});