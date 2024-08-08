import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import "./GeorgeVocabularyQuiz.css";
//import correctSound from "./sounds/correct.mp3";
//import incorrectSound from "./sounds/incorrect.mp3";

const GeorgeVocabularyQuiz = () => {
  const vocabularysample = {
    Medicine: "The central theme of the story",
    Grandma: "George's unpleasant grandmother",
    Concoction: "The mixture George creates",
    Ingredients: "Various items George uses in his medicine",
    Marvellous: "Describing the extraordinary nature of the medicine",
    "Shrink/Grow": "Effects of the medicine on Grandma and animals",
    Farm: "The setting of the story",
    "Chicken feed": "One of the ingredients George uses",
    Saucepan: "The container George uses to mix his medicine",
    Magical: "The seemingly supernatural effects of the medicine",
    Experiment: "George's process of creating the medicine",
    Transform: "How the medicine changes things",
    Nasty: "Describing Grandma's personality",
    Brew: "Another term for the mixture George creates",
    Potion: "Another word for the medicine",
    "Side effects": "Unexpected results of taking the medicine",
  };

  const [vocabulary, setVocabulary] = useState({ vocabularysample });
  const [currentWord, setCurrentWord] = useState("");
  const [currentDefinition, setCurrentDefinition] = useState("");
  const [options, setOptions] = useState([]);
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);
  const [questionsAsked, setQuestionsAsked] = useState(0);
  const [difficulty, setDifficulty] = useState("easy");
  const [timer, setTimer] = useState(30);
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [reviewList, setReviewList] = useState([]);
  const [showReview, setShowReview] = useState(false);

  const totalQuestions = 10;

  const fadeIn = useSpring({
    opacity: isQuizActive ? 1 : 0,
    from: { opacity: 0 },
  });

  const playSound = (isCorrect) => {
    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.type = "sine";
    oscillator.frequency.value = isCorrect ? 800 : 400; // higher pitch for correct, lower for incorrect
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(1, audioContext.currentTime + 0.01);
    gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.5);

    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.5);
  };

  // Then use it like this:
  playSound(true); // for correct answer
  playSound(false); // for incorrect answer

  useEffect(() => {
    // Load vocabulary based on difficulty
    const loadVocabulary = async () => {
      const response = await fetch(`/api/vocabulary?difficulty=${difficulty}`);
      const data = await response.json();
      setVocabulary(data);
    };
    loadVocabulary();
  }, [difficulty]);

  useEffect(() => {
    let interval;
    if (isQuizActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      handleAnswer(null);
    }
    return () => clearInterval(interval);
  }, [isQuizActive, timer]);

  const pickRandomWord = () => {
    // ... (existing code)
    setTimer(30); // Reset timer for each question
  };

  const handleAnswer = (selectedWord) => {
    const correct = selectedWord === currentWord;
    setQuestionsAsked(questionsAsked + 1);
    if (correct) {
      setScore(score + 1);
      setFeedback("Correct!");
      playSound(true);
    } else {
      setFeedback(`Sorry, the correct answer was "${currentWord}".`);
      playSound(false); // for correct answer

      //playSound(incorrectSound);
    }
    setReviewList([...reviewList, { word: currentWord, correct }]);

    if (questionsAsked + 1 < totalQuestions) {
      setTimeout(pickRandomWord, 2000);
    } else {
      setIsQuizActive(false);
      setShowReview(true);
    }
  };

  const startQuiz = () => {
    setIsQuizActive(true);
    setScore(0);
    setQuestionsAsked(0);
    setReviewList([]);
    pickRandomWord();
  };

  const changeDifficulty = (newDifficulty) => {
    setDifficulty(newDifficulty);
    setIsQuizActive(false);
  };

  if (!isQuizActive && !showReview) {
    return (
      <div className="quiz-container">
        <h1>George's Marvellous Medicine</h1>
        <h2>Vocabulary Quiz</h2>
        <div className="difficulty-selector">
          <button onClick={() => changeDifficulty("easy")}>Easy</button>
          <button onClick={() => changeDifficulty("medium")}>Medium</button>
          <button onClick={() => changeDifficulty("hard")}>Hard</button>
        </div>
        <button className="start-button" onClick={startQuiz}>
          Start Quiz
        </button>
      </div>
    );
  }

  if (showReview) {
    return (
      <div className="quiz-container">
        <h2>Quiz Review</h2>
        <p>
          Your score: {score} / {totalQuestions}
        </p>
        <div className="review-list">
          {reviewList.map((item, index) => (
            <div
              key={index}
              className={`review-item ${
                item.correct ? "correct" : "incorrect"
              }`}
            >
              <span>{item.word}</span>
              <span>{item.correct ? "✓" : "✗"}</span>
            </div>
          ))}
        </div>
        <button onClick={() => setShowReview(false)}>Back to Start</button>
      </div>
    );
  }

  return (
    <animated.div style={fadeIn} className="quiz-container">
      <h1>George's Marvellous Medicine</h1>
      <h2>Vocabulary Quiz</h2>
      <div className="score-board">
        <span>Score: {score}</span>
        <span>
          Question: {questionsAsked + 1} / {totalQuestions}
        </span>
      </div>
      <div className="progress-bar">
        <div
          className="progress"
          style={{ width: `${(questionsAsked / totalQuestions) * 100}%` }}
        ></div>
      </div>
      <div className="timer">Time left: {timer}s</div>
      <div className="question-box">
        <p className="definition">{currentDefinition}</p>
        {currentWord && (
          <img
            src={`/images/${currentWord.toLowerCase()}.jpg`}
            alt={currentWord}
            className="word-image"
          />
        )}
      </div>
      <div className="options-container">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(option)}
            className="option-button"
            disabled={!!feedback}
          >
            {option}
          </button>
        ))}
      </div>
      {feedback && (
        <p
          className={`feedback ${
            feedback === "Correct!" ? "correct" : "incorrect"
          }`}
        >
          {feedback}
        </p>
      )}
    </animated.div>
  );
};

export default GeorgeVocabularyQuiz;
