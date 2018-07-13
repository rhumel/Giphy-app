$(document).ready(function () {

// Initial array of Gifs
 var gifArray = ["Dog", "Cat", "Hello", "Happy Birtday"];
 var addedGif;  


  // handles events where a GIF Search button is clicked
    $("#add-gif").on("click", function(event) {
      event.preventDefault();
      
      // This line grabs the input from the textbox
      addedGif = $("#gif-input").val().trim();
      console.log(addedGif);
      
      // Adding new GIF to  gifArray
      gifArray.push(addedGif);

      $('#gif-input').val('');
         
      // This will create, and append the buttons to div
      renderButtons();
    });

 // handles events where any of the buttons in the buttons-view div are pressed
  
      $(document).on("click",".gif-btn", function(event) {
      event.preventDefault();
      addedGif = $(this).attr("data-name");
        console.log(addedGif + " on button click");


      //call to GIPHY for GIF  
      ajaxCall(addedGif);

     });

// handle click events on gifs
$(document).on("click", ".gif", function() {
  // set the state value s/b either animate or still
  var state = $(this).attr("data-state");
  console.log(state);
  // alternate between animate and still gif when clicked
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
});

function ajaxCall(query) {
  var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=HkjK4ZbPCa08m82JFOGCEzAuICSYLnwQ&limit=1&offset=0&rating=G&lang=en&q=" + query;
      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {

        console.log(response);
        
        // Saving the  url
          var imageUrl = response.data[0].images.fixed_height.url;
         //added for start and stop
          var animateUrl = response.data[0].images.fixed_height.url;
          var stillUrl = response.data[0].images.fixed_height_still.url;
         
          console.log(imageUrl + "just saved link from object");
          // Creating and storing an image tag
          var gifImage = $("<img>");

          // Setting the gif  src attribute to imageUrl
          gifImage.attr("src", imageUrl);
          console.log(imageUrl);
          gifImage.attr("alt", "gif image");
         //adding for the start and stop
          gifImage.attr("data-still",stillUrl);
          gifImage.attr("data-animate",animateUrl);
          gifImage.attr("data-state", "animate");
          gifImage.addClass("gif");


          // Prepending the catImage to the images div
          console.log(gifImage);
          $("#gif-view").prepend(gifImage);
       });
    
      }
  

//function appendImages() {


    

 
      // Function for displaying initial Array of buttons
      function renderButtons() {

        //delete array of buttons each time
        $("#buttons-view").empty();
        $("#gif-input").val(" ");

        // Looping through the array of Gifs
        for (var i = 0; i < gifArray.length; i++) {

          // Then dynamicaly generating buttons for each Gif listed in the array
          
          var button = $("<button>");
          // Adding a class of movie-btn to our button
          button.addClass("gif-btn");
          // Adding a data-attribute
          button.attr("data-name", gifArray[i]);
          // Providing the initial button text
          button.text(gifArray[i]);
          // Adding the button to the buttons-view div
          $("#buttons-view").append(button);

         
        }
      }
    
  
     
     // Calling the renderButtons function to display the intial buttons           
     renderButtons();
  
}); 

