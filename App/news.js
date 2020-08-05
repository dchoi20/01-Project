let apiKey = "-WEIf8br859cG3nJvC1YU0KreUz80wPxADv8Xp8Z5DeQ5egI";

let queryUrl = `https://api.currentsapi.services/v1/latest-news?category=business&apiKey=${apiKey}`

$.ajax({
    url: queryUrl, 
    method: "GET"
}).then( function (response) {
    console.log(response);
    for (let i=0; i < response.news.length; i++){
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
            </div>
            <hr class="uk-divider-icon">`).appendTo(".uk-container")
    };
});
