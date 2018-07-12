$(document).ready(function () {

// Initial array of Gifs
 var gifArray = ["Dog", "Cat", "Hello", "Happy Birtday"];
 var addedGif;  
 var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=HkjK4ZbPCa08m82JFOGCEzAuICSYLnwQ&q="
 +addedGif + "&limit=1&offset=0&rating=G&lang=en";
  

 
 

  
  // handles events where a GIF Search button is clicked
    $("#add-gif").on("click", function(event) {
      event.preventDefault();
      
      // This line grabs the input from the textbox
      addedGif = $("#gif-input").val().trim();
      console.log(addedGif);
      
      // Adding new GIF to  gifArray
      gifArray.push(addedGif);

      //call to GIPHY for GIF
      ajaxCall();
      console.log(queryURL);
    
      // This will create, and append the buttons to div
      renderButtons();
    });

 // handles events where any of the buttons in the buttons-view div are pressed
  
      $("#buttons-view").on("click", function(event) {
      event.preventDefault();
      addedGif = $(this).attr("data-name");
        console.log(addedGif + " on button click");

      //call to GIPHY for GIF  
      ajaxCall();

     });



function ajaxCall() {

      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {

        console.log(response);
        
        // Saving the  url
          var imageUrl = response.data[0].images.downsized_small.mp4;
        
          // Creating and storing an image tag
          var gifImage = $("<img>");

          // Setting the catImage src attribute to imageUrl
          gifImage.attr("src", imageUrl);
          console.log(imageUrl);
          gifImage.attr("alt", "gif image");

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
       // $("<input>").empty();

        // Looping through the array of Gifs
        for (var i = 0; i < gifArray.length; i++) {

          // Then dynamicaly generating buttons for each Gif listed in the array
          
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
    
  
     
     // Calling the renderButtons function to display the intial buttons           
     renderButtons();
  
}); 

