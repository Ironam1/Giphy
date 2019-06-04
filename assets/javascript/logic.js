var shownButtons = [
  "Nightcrawler",
  "The Scarlet Witch",
  "Black Panther",
  "Green Lantern",
  "Goku",
  "The Tick",
  "Teenage Mutant Ninja Turtles",
  "The Punisher",
  "Luke Cage",
  "Daredevil",
  "He-Man",
  "Vegeta",
  "Dr. Strange",
  "Puck",
  "Gambit"
];

function populateButtons() {
  for (var i = 0; i < shownButtons.length; i++) {
    var buttons = $("<button/>", {
      class: "super",
      text: shownButtons[i],
      "data-person": shownButtons[i]
    });
    $("#superheroes").append(buttons);
  }
}
function makeButton() {
  $("#create").on("click", function(event) {
    event.preventDefault();
    var title = $("#name").val();
    var newButton = $("<button/>", {
      type: "button",
      class: "super",
      id: "giphy",
      text: title,
      "data-person": title
    });
    // console.log("name" + data);
    $("#superheroes").append(newButton);
  });
}

function runGif() {
  $("body").on("click", ".super", function(event) {
    event.preventDefault();
    var person = $(this).attr("data-person");
    // console.log("title " + person);
    var queryURL =
      "https://api.giphy.com/v1/gifs/search?q=" +
      person +
      "&api_key=c8HTVwDM8IuUwBZDWhQxgK3PxohfQ6pd&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response);
      var results = response.data;

      for (var i = 0; i < results.length; i++) {
        var gifDiv = $("<div>");
        var rating = results[i].rating;
        var p = $("<p>").text("Rating: " + rating);
        var shownImage = $("<img>", {
          class: "shown",
          src: results[i].images.fixed_height_still.url,
          data_still: results[i].images.fixed_height_still.url,
          data_animate: results[i].images.fixed_height.url,
          data_state: "still"
        });

        gifDiv.prepend(p);
        gifDiv.prepend(shownImage);
        $("#hooray").prepend(gifDiv);
      }
    });
  });
}

function animateGif() {
  $("body").on("click", ".shown", function(event) {
    event.preventDefault();
    var state = $(this).attr("data_state");
    console.log("STATE " + state);
    if (state === "still") {
      // alert("correct");
      $(this).attr("src", $(this).attr("data_animate"));
      $(this).attr("data_state", "animate");
      console.log("state " + state);
    } else {
      $(this).attr("src", $(this).attr("data_still"));
      $(this).attr("data_state", "still");
    }
  });
}
