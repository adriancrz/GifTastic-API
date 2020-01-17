    var topics = ["pikachu", "tepig", "mudkip", "treeko", "onyx", "lugia", "salamance", "charmander", "greninja", "jolteon"];

    var pokemonButton;
    var pokemonImage;

    function makeButton() {
    $("#pkmn-btn-div").empty(); //Deleting initial inputs.

    for (var j = 0; j < topics.length; j++) {
        var pokemonButton = $("<button>");
        pokemonButton.text(topics[j]);
        pokemonButton.attr("data-name", topics[j]);
        pokemonButton.addClass("btn btn-primary p-2 mr-3 mb-2 pkmn-btn");
        $("#pkmn-btn-div").append(pokemonButton);
    }
}

//Function for when clicking a Pokémon button and display the selected content.
    function showPkmnGifs() {
        $("#results-div-col1").empty(); //Deleting previous content each time a new button is clicked.
        $("#results-div-col2").empty();
        $("#results-div-col3").empty();
        $("#click-to-play-text").empty();

        var pokemon = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + pokemon + "&api_key=dc6zaTOxFJmzC&limit=10";
        $.ajax({
            url: queryURL,
            method: "GET"
          })
    
          .done(function(response) {
            console.log(response);
            var results = response.data;
            $("#click-to-play-text").append("<h4>" + "Click a gif to play or pause." + "</h4>");
    
            for (var i = 0; i < results.length; i++) {
    
              if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
    
                //Create div element to hold gif image. 
                var gifDiv = $("<div class='item'>");
    
                //Save and store in rating variable.
                var rating = results[i].rating;
    
                //Display rating of gif.
                var p = $("<p>").text("Rating: " + rating);
    
                var pokemonImage = $("<img>");
                pokemonImage.attr("src", results[i].images.fixed_height_still.url);
                pokemonImage.attr("data-still", results[i].images.fixed_height_still.url);
                pokemonImage.attr("data-animate", results[i].images.fixed_height.url);
                pokemonImage.attr("data-state", "still");
                pokemonImage.addClass ("img-fluid gif border border-primary");
    
                gifDiv.prepend(p);
                gifDiv.prepend(pokemonImage);
    
                if (i >= 0 && i < 3) {
                  $("#results-div-col1").append(gifDiv);
                }
    
                else if (i >= 3 && i < 7) {
                  $("#results-div-col2").append(gifDiv);
                }
    
                else {
                  $("#results-div-col3").append(gifDiv);
                }
              }
    
    
            }
    
            //When the user clicks a gif in the search results section.
            $(".gif").on("click", function() {
              var state = $(this).attr("data-state");
              if (state === "still") {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
              } 
              else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
              }
            });
    
          });
    }
    
      //When submit button is clicked add pkmn-input from the search box to topics array.
      $("#submit-button").on("click", function(event) {
    
        event.preventDefault();
        var pokemonInput = $("#pkmn-input").val().toLowerCase();
    
        $("#pkmn-input").val("");
    
        if (topics.indexOf(pokemonInput) > -1) {
          alert(pokemonInput + " is already available.");
        }
    
        else if (pokemonInput === "" || pokemonInput === null) {
          return false;
        }
    
        else if (topics.indexOf(pokemonInput) === -1) {
        topics.push(pokemonInput);
        console.log(topics);
        makeButton();
        }
      });
    
      //Display initial buttons.
      makeButton();
    
    $(document).on("click", ".pkmn-btn", showPkmnGifs);
    
    function displayHeaderImage () {
        var queryURL = "https://api.giphy.com/v1/stickers/search?q=pokemon&api_key=dc6zaTOxFJmzC";
        
        $.ajax({
            url: queryURL,
            method: "GET"
          })
    
          .done(function(response) {
            console.log(response);
            var results = response.data
    
            var gifDiv = $("<div class='item'>");
    
            var headerImageUrl = results[3].images.fixed_height.url;
    
            var headerImage = $("<img>");
            headerImage.attr("id", "spinning-ball");
            headerImage.attr("src", headerImageUrl);
            headerImage.addClass ("img-fluid gif");
    
            gifDiv.append(headerImage);
    
            $("#main-header-image").append(gifDiv).addClass("mt-2");
          });
    
    }
    
    displayHeaderImage();
    
    
    
    
    
    