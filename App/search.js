let apiKey = "AIOFXIT69F29K1ID";

//--------- TODAYS DATE --------------------
let today = new Date();

let dd = today.getDate();
let mm = today.getMonth() + 1;
let yyyy = today.getFullYear();
let todayDate = yyyy + "-" + "0" + mm + "-" + "0" + dd;

function searchSymbol() {
  event.preventDefault();
  let searchSymbol = $("#stockInput").val();

  let queryURL =
    "https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=" +
    searchSymbol +
    `&apikey=${apiKey}`;

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response.bestMatches);
    for (let i = 0; i < response.bestMatches.length; i++) {
      let stockBestMatches = response.bestMatches[i];
      let companyName = stockBestMatches["2. name"];
      $(
        `<p class="stockListItems" data-name="${companyName}"data-symbol="${stockBestMatches["1. symbol"]}">${companyName}</p>`
      ).appendTo("#searchResults");
    }
  });
}

$("#stockInputBtn").on("click", searchSymbol);

$("#searchResults").on("click", ".stockListItems", function () {
  let stockSelected = $(this).attr("data-symbol");
  let companyName = $(this).attr("data-name");
  renderStockPage(stockSelected, companyName);
});

function renderStockPage(stockSelected, companyName) {
  window.location.href = `./stock.html?stock=${stockSelected}&company=${companyName}`;
};
