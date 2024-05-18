const quizForm = document.getElementById('quizForm');
const questionsContainer = document.getElementById('questionsContainer');
const addQuestionBtn = document.getElementById('addQuestionBtn');
let questionCount = 0;

function addQuestion() {
  if (questionCount >= 6) {
    alert('You can add up to 6 questions.');
    return;
  }

  const questionDiv = document.createElement('div');
  questionDiv.classList.add('question');
  questionDiv.innerHTML = `
    <label for="question${questionCount + 1}">Question ${questionCount + 1}:</label>
    <input type="text" id="question${questionCount + 1}" name="question${questionCount + 1}" required>
    <br>
    <label for="options${questionCount + 1}">Options:</label>
    <input type="text" id="options${questionCount + 1}" name="options${questionCount + 1}" placeholder="Option 1" required>
    <input type="text" id="options${questionCount + 1}" name="options${questionCount + 1}" placeholder="Option 2" required>
    <input type="text" id="options${questionCount + 1}" name="options${questionCount + 1}" placeholder="Option 3" required>
    <input type="text" id="options${questionCount + 1}" name="options${questionCount + 1}" placeholder="Option 4" required>
    <br><br>
  `;

  questionsContainer.appendChild(questionDiv);
  questionCount++;
}

addQuestionBtn.addEventListener('click', addQuestion);