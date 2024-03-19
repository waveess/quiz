const quizData = [
    {
      question: "What's your favorite cuisine?",
      options: ["Italian", "Mexican", "Japanese", "Indian"],
    },
    {
      question: "What's your go-to comfort food?",
      options: ["Pizza", "Tacos", "Ramen", "Curry"],
    },
    {
      question: "What's your favorite dessert?",
      options: ["Tiramisu", "Churros", "Mochi", "Ice Cream"],
    },
  ];

  const foodieTypes = [
    { type: "Casual Foodie", image: "https://www.nrn.com/sites/nrn.com/files/Food_1.jpeg" },
    { type: "Adventurous Foodie", image: "https://hashtagcoloradolife.com/wp-content/uploads/2019/08/cooking-smores-camping.png" },
    { type: "Gourmet Foodie", image: "https://www.discoveryvillages.com/wp-content/uploads/2022/05/7-benefits-of-gourmet-meals-for-your.jpg" },
    { type: "Food Connoisseur", image: "https://media3.giphy.com/media/PZAh5BdoD8Vlm/200w.gif?cid=6c09b952gn9p62msozj6jd94raxax6i2g89v529hhbbit2iv&ep=v1_gifs_search&rid=200w.gif&ct=g" },
  ];

  const questionElement = document.getElementById("question");
  const optionsElement = document.getElementById("options");
  const nextButton = document.getElementById("nextButton");
  const resultElement = document.getElementById("result");

  let currentQuestion = 0;
  let score = 0;

  function loadQuestion() {
    const currentQuizData = quizData[currentQuestion];
    questionElement.innerText = currentQuizData.question;
    optionsElement.innerHTML = "";
    currentQuizData.options.forEach((option) => {
      const button = document.createElement("button");
      button.innerText = option;
      button.classList.add("optionButton");
      button.addEventListener("click", () => checkAnswer(option));
      optionsElement.appendChild(button);
    });
  }

  function checkAnswer(selectedOption) {
    const currentQuizData = quizData[currentQuestion];
    if (selectedOption === currentQuizData.options[0]) {
      score += 25;
    }
    currentQuestion++;
    if (currentQuestion < quizData.length) {
      loadQuestion();
    } else {
      showResult();
    }
  }

  function showResult() {
    questionElement.style.display = "none";
    optionsElement.style.display = "none";
    nextButton.style.display = "none";
    const foodieType = calculateFoodieType(score);
    const foodieTypeObj = foodieTypes.find((type) => type.type === foodieType);
    resultElement.innerHTML = `
      <h2>Your Score: ${score}</h2>
      <h3>You are a ${foodieType}!</h3>
      <img src="${foodieTypeObj.image}" alt="${foodieType}" width="200">
    `;
  }

  function calculateFoodieType(score) {
    if (score <= 25) {
      return "Casual Foodie";
    } else if (score <= 50) {
      return "Adventurous Foodie";
    } else if (score <= 75) {
      return "Gourmet Foodie";
    } else {
      return "Food Connoisseur";
    }
  }

  loadQuestion();