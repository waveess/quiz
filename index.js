document.addEventListener('DOMContentLoaded', function() {
  const maxQuestions = 6;
  let questionCount = 1;

  const quizForm = document.getElementById('quiz-form');
  const addQuestionButton = document.getElementById('add-question');
  const questionsContainer = document.getElementById('questions-container');
  const quizzesContainer = document.getElementById('quizzes-container');

  function saveQuizzesToLocalStorage(quizzes) {
      localStorage.setItem('quizzes', JSON.stringify(quizzes));
  }

  function getQuizzesFromLocalStorage() {
      const quizzes = localStorage.getItem('quizzes');
      return quizzes ? JSON.parse(quizzes) : [];
  }

  function renderQuizzes() {
      quizzesContainer.innerHTML = '';
      const quizzes = getQuizzesFromLocalStorage();
      quizzes.forEach((quiz, index) => {
          const quizElement = document.createElement('div');
          quizElement.classList.add('quiz');
          quizElement.innerHTML = `
              <h3>${quiz.title}</h3>
              ${quiz.questions.map((q, questionIndex) => `
                  <div class="question">
                      <p>${q.text}</p>
                      ${q.image ? `<img src="${q.image}" alt="Question Image">` : ''}
                      ${q.options.map((option, optionIndex) => `
                          <div class="option">
                              <input type="radio" name="question-${index}-${questionIndex}" value="${option.result}" id="option-${index}-${questionIndex}-${optionIndex}">
                              <label for="option-${index}-${questionIndex}-${optionIndex}">${option.text}</label>
                          </div>
                      `).join('')}
                  </div>
              `).join('')}
              <button type="button" class="submit-quiz">Submit Quiz</button>
              <button type="button" class="delete-quiz" data-index="${index}">Delete Quiz</button>
          `;
          quizzesContainer.appendChild(quizElement);
      });
  }

  addQuestionButton.addEventListener('click', function() {
      if (questionCount < maxQuestions) {
          questionCount++;
          const questionItem = document.createElement('div');
          questionItem.classList.add('question-item');
          questionItem.innerHTML = `
              <label>Question ${questionCount}</label>
              <input type="text" class="question-text" placeholder="Enter your question" required>
              <input type="file" class="question-image" accept="image/*">
              <div class="options-container">
                  <input type="text" class="option-text" placeholder="Option 1" required>
                  <input type="text" class="result-text" placeholder="Result for Option 1" required>
                  <input type="text" class="option-text" placeholder="Option 2" required>
                  <input type="text" class="result-text" placeholder="Result for Option 2" required>
                  <input type="text" class="option-text" placeholder="Option 3">
                  <input type="text" class="result-text" placeholder="Result for Option 3">
                  <input type="text" class="option-text" placeholder="Option 4">
                  <input type="text" class="result-text" placeholder="Result for Option 4">
              </div>
          `;
          questionsContainer.appendChild(questionItem);
      } else {
          alert('You can only add up to 6 questions.');
      }
  });

  quizForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const quizTitle = document.getElementById('quiz-title').value;
      const questions = [];
      document.querySelectorAll('.question-item').forEach(item => {
          const questionText = item.querySelector('.question-text').value;
          const questionImage = item.querySelector('.question-image').files[0];
          const questionImageUrl = questionImage ? URL.createObjectURL(questionImage) : '';
          const options = Array.from(item.querySelectorAll('.option-text')).map((option, index) => ({
              text: option.value,
              result: item.querySelectorAll('.result-text')[index].value
          })).filter(option => option.text);
          questions.push({ text: questionText, image: questionImageUrl, options: options });
      });

      const newQuiz = { title: quizTitle, questions: questions };
      const quizzes = getQuizzesFromLocalStorage();
      quizzes.push(newQuiz);
      saveQuizzesToLocalStorage(quizzes);
      renderQuizzes();
      quizForm.reset();
      questionCount = 1;
      questionsContainer.innerHTML = `
          <div class="question-item">
              <label>Question 1</label>
              <input type="text" class="question-text" placeholder="Enter your question" required>
              <input type="file" class="question-image" accept="image/*">
              <div class="options-container">
                  <input type="text" class="option-text" placeholder="Option 1" required>
                  <input type="text" class="result-text" placeholder="Result for Option 1" required>
                  <input type="text" class="option-text" placeholder="Option 2" required>
                  <input type="text" class="result-text" placeholder="Result for Option 2" required>
                  <input type="text" class="option-text" placeholder="Option 3">
                  <input type="text" class="result-text" placeholder="Result for Option 3">
                  <input type="text" class="option-text" placeholder="Option 4">
                  <input type="text" class="result-text" placeholder="Result for Option 4">
              </div>
          </div>
      `;
  });

  quizzesContainer.addEventListener('click', function(event) {
      if (event.target.classList.contains('submit-quiz')) {
          const quizElement = event.target.parentElement;
          const selectedOptions = Array.from(quizElement.querySelectorAll('input[type="radio"]:checked'));
          const resultCounts = {};

          selectedOptions.forEach(option => {
              const result = option.value;
              resultCounts[result] = (resultCounts[result] || 0) + 1;
          });

          let finalResult = '';
          let maxCount = 0;
          for (const result in resultCounts) {
              if (resultCounts[result] > maxCount) {
                  maxCount = resultCounts[result];
                  finalResult = result;
              }
          }

          const resultElement = document.createElement('p');
          resultElement.classList.add('result');
          resultElement.innerText = `Your result: ${finalResult}`;
          quizElement.appendChild(resultElement);
          event.target.remove();
      }

      if (event.target.classList.contains('delete-quiz')) {
          const quizIndex = event.target.getAttribute('data-index');
          const quizzes = getQuizzesFromLocalStorage();
          quizzes.splice(quizIndex, 1);
          saveQuizzesToLocalStorage(quizzes);
          renderQuizzes();
      }
  });

  // Initial render of saved quizzes
  renderQuizzes();
});