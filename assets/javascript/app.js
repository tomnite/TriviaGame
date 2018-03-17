$(document).ready(function() {
  // Create an object to hold the properties and values
  var options = [
    {
      question:
        'What planet caused C-3PO to exclaim, "What a desolate place this is"?',
      choice: ["Hoth", "Dagobah", "Earth (in 20 years)", "Tattooine"],
      answer: 3,
      photo: "assets/images/binary-sunset.jpg"
    },
    {
      question:
        "Who told Ackbar, 'Han will have that shield down. We've got to give him more time'?",
      choice: [
        "Wedge Antilles",
        "Nien Numb",
        "Lando Calrissian",
        "General Dodonna"
      ],
      answer: 2,
      photo: "assets/images/lando.jpg"
    },
    {
      question: "What shape is a blaster's stun bolt?",
      choice: ["Triangular", "Circular", "Trapezoidal", "Square"],
      answer: 1,
      photo: "assets/images/leia-stun.jpeg"
    },
    {
      question: "What was Obi Wan Kenobi's other first name?",
      choice: ["Ben", "Alex", "Larry", "Nicholson"],
      answer: 0,
      photo: "assets/images/obi-wan.jpg"
    },
    {
      question:
        "Whose passage down the Sarlacc's throat caused it to emit a satisfied belch?",
      choice: ["Chewbacca", "Han Solo", "Lando Calrissian", "Boba Fett"],
      answer: 3,
      photo: "assets/images/slave-i.png"
    },
    {
      question: "Whose earliest job involved programming binary load lifters?",
      choice: ["R2-D2", "Han Solo", "C-3PO", "Biggs Darklighter"],
      answer: 2,
      photo: "assets/images/c-3po.jpg"
    },
    {
      question:
        'Who warned Jabba, "You can either profit by this, or be destroyed"?',
      choice: ["Princess Leia", "Luke Skywalker", "Sy Snootles", "Jango Fett"],
      answer: 1,
      photo: "assets/images/luke.jpg"
    },
    {
      question: "What creature killed Luke's tauntaun?",
      choice: ["Wampa", "Ewok", "Ugnaught", "Mynock"],
      answer: 0,
      photo: "assets/images/wampa.jpg"
    }
  ];

  // Create variables for the game
  var correctCount = 0;
  var wrongCount = 0;
  var unansweredCount = 0;
  var timer = 20;
  var intervalId;
  var userResponse = "";
  var running = false;
  var qCount = options.length;
  var pick;
  var index;
  var newArray = [];
  var holder = [];

  // hide reset button
  $("#reset").hide();

  // click start button to start game
  $("#start").on("click", function() {
    // hide start button until game resets
    $("#start").hide();
    // call function
    displayQuestion();
    // call function, start timer
    runTimer();
    for (var i = 0; i < options.length; i++) {
      holder.push(options[i]);
    }
  });
  // start timer
  function runTimer() {
    if (!running) {
      intervalId = setInterval(decrement, 1000);
      running = true;
    }
  }
  // timer countdown
  function decrement() {
    $("#timeleft").html("<h3>Time remaining: " + timer + "</h3>");
    timer--;

    // stop timer when it reaches zero
    if (timer === 0) {
      unansweredCount++;
      stop();
      // display timeout message w correct answer
      $("#answer").html(
        "<p>Time is up! The correct answer is: " +
          pick.choice[pick.answer] +
          "</p>"
      );
      hidepicture();
    }
  }

  // timer stop
  function stop() {
    running = false;
    clearInterval(intervalId);
  }

  function displayQuestion() {
    // generate random index in array
    index = Math.floor(Math.random() * options.length);
    pick = options[index];

    // display question
    $("#question").html("<h2>" + pick.question + "</h2>");
    for (var i = 0; i < pick.choice.length; i++) {
      var userChoice = $("<div>");
      userChoice.addClass("answerchoice");
      userChoice.html(pick.choice[i]);
      // assign array position to it so can check answer
      userChoice.attr("data-guessvalue", i);
      $("#answer").append(userChoice);
      //		}
    }

    // on-click function to select answer and outcomes
    $(".answerchoice").on("click", function() {
      // get array position from userGuess
      userResponse = parseInt($(this).attr("data-guessvalue"));

      // right or wrong guess outcomes
      if (userResponse === pick.answer) {
        stop();
        correctCount++;
        userResponse = "";
        $("#answer").html("<p>Correct!</p>");
        hidepicture();
      } else {
        stop();
        wrongCount++;
        userResponse = "";
        $("#answer").html(
          "<p>Wrong! The correct answer is: " +
            pick.choice[pick.answer] +
            "</p>"
        );
        hidepicture();
      }
    });
  }

  function hidepicture() {
    $("#answer").append("<img src=" + pick.photo + ">");
    newArray.push(pick);
    options.splice(index, 1);

    // Checks if answer times out
    var hidpic = setTimeout(function() {
      $("#answer").empty();
      timer = 20;

      // Display the score screen if all questions answered or timed out
      if (wrongCount + correctCount + unansweredCount === qCount) {
        $("#question").empty();
        $("#question").html("<h3>Game Over!  Here's how you did: </h3>");
        $("#answer").append("<h4> Correct: " + correctCount + "</h4>");
        $("#answer").append("<h4> Incorrect: " + wrongCount + "</h4>");
        $("#answer").append("<h4> Unanswered: " + unansweredCount + "</h4>");
        $("#reset").show();
        correctCount = 0;
        wrongCount = 0;
        unansweredCount = 0;
      } else {
        runTimer();
        displayQuestion();
      }
    }, 3000);
  }
  // Run reset
  $("#reset").on("click", function() {
    $("#reset").hide();
    $("#answer").empty();
    $("#question").empty();
    for (var i = 0; i < holder.length; i++) {
      options.push(holder[i]);
    }
    runTimer();
    displayQuestion();
  });
});
