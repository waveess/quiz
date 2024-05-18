document.addEventListener('DOMContentLoaded', function() {
  const maxQuestions = 6;
  let questionCount = 1;

  const quizForm = document.getElementById('quiz-form');
  const addQuestionButton = document.getElementById('add-question');
  const questionsContainer = document.getElementById('questions-container');
  const quizzesContainer = document.getElementById('quizzes-container');

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

      const quiz = document.createElement('div');
      quiz.classList.add('quiz');
      quiz.innerHTML = `
          <h3>Quiz ${quizzesContainer.childElementCount + 1}</h3>
          ${questions.map((q, questionIndex) => `
              <div class="question">
                  <p>${q.text}</p>
                  ${q.image ? `<img src="${q.image}" alt="Question Image">` : ''}
                  ${q.options.map((option, optionIndex) => `
                      <div class="option">
                          <input type="radio" name="question-${questionIndex}" value="${option.result}" id="option-${questionIndex}-${optionIndex}">
                          <label for="option-${questionIndex}-${optionIndex}">${option.text}</label>
                      </div>
                  `).join('')}
              </div>
          `).join('')}
          <button type="button" class="submit-quiz">Submit Quiz</button>
      `;
      quizzesContainer.appendChild(quiz);
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
  });
});