var quizContainer = document.getElementById('quiz-container');
var submitButton = document.getElementById('submit-button');
var scoreValueContainer = document.getElementById('score-value');
var data = null; 
var score = 0; 

// Create and display the quiz
function displayQuiz() {
  fetch('https://5d76bf96515d1a0014085cf9.mockapi.io/quiz')
    .then(response => response.json())
    .then(apiData => {
      data = apiData; 
      var quizHTML = '';

      for (var i = 0; i < data.length; i++) {
        var question = data[i].question;
        var options = data[i].options;
        var questionNumber = 'Q' + (i + 1) + '. '; // Generate the question number

        quizHTML += '<div class="question">' + questionNumber + question + '</div>';

        for (var j = 0; j < options.length; j++) {
          quizHTML += '<div class="option"><input type="radio" name="answer' + i + '" value="' + j + '"> ' + options[j] + '</div>';
        }

        quizHTML += '<hr>'; // Add a horizontal line after each options section
      }

      quizContainer.innerHTML = quizHTML;
    })
    .catch(error => {
      console.log('Error fetching quiz data:', error);
    });
}

// Calculate and display the score
function calculateScore() {
    score = 0;
  
    for (var i = 0; i < data.length; i++) {
      var selectedOption = document.querySelector('input[name="answer' + i + '"]:checked');
      if (selectedOption && parseInt(selectedOption.value) === data[i].answer - 1) {
        score++;
      }
    }
  
    scoreValueContainer.textContent = score + '/5';
}

submitButton.addEventListener('click', calculateScore);

displayQuiz();
