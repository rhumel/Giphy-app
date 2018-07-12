$(document).ready(function () {

// Initial array of Gifs
 var gifArray = ["Dog", "Cat", "Hello", "Happy Birtday"];

 var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=HkjK4ZbPCa08m82JFOGCEzAuICSYLnwQ&q="
  +addedGif + "&limit=10&offset=0&rating=G&lang=en";


  var addedGif;  
  var gifSearch = $("#gif-input").val().trim();
  console.log(gifSearch);
  console.log(addedGif);
  
  // handles events where a GIF Search button is clicked
    $("#add-gif").on("click", function(event) {
      event.preventDefault();
      // This line grabs the input from the textbox
      addedGif = $("#gif-input").val().trim();
      console.log(addedGif);
      // Adding movie from the textbox to our array
      gifArray.push(addedGif);


      console.log(queryURL);
      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        console.log(gifSearch);
        console.log(response);
    
      });
  
      // Calling renderButtons which handles the processing of our movie array
      renderButtons();
    });

 // handles events where any of the buttons are pressed
     $(".gif-btn").on("click", function(event) {
      event.preventDefault();
    

 
      // Function for displaying movie data
      function renderButtons() {

        // Deleting the movies prior to adding new movies
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();
       // $("<input>").empty();

        // Looping through the array of movies
        for (var i = 0; i < gifArray.length; i++) {

          // Then dynamicaly generating buttons for each movie in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $("<button>");
          // Adding a class of movie-btn to our button
          a.addClass("gif-btn");
          // Adding a data-attribute
          a.attr("data-name", gifArray[i]);
          // Providing the initial button text
          a.text(gifArray[i]);
          // Adding the button to the buttons-view div
          $("#buttons-view").append(a);
        }
      }

 
  
     // Adding a click event listener to all elements with a class of "movie-btn"
    // $(document).on("click", ".movie-btn", displayMovieInfo);
  
     // Calling the renderButtons function to display the intial buttons
     renderButtons();
  
});


