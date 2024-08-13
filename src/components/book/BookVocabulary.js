import React, { useState, useEffect } from "react";
import { getVocabularyByTitle } from "../admin/vocabulary/VocabulraryFetchAPI";

import "./GeorgeVocabularyQuiz.css"; // We'll create this CSS file

const BookVocabulary = ({ title, slug }) => {
  const quizDataSample = {
    title: "George's Marvellous Medicine Vocabulary",
    vocabulary: [
      {
        term: "Medicine",
        definition: "The central theme of the story",
      },
      {
        term: "Grandma",
        definition: "George's unpleasant grandmother",
      },
      {
        term: "Concoction",
        definition: "The mixture George creates",
      },
      {
        term: "Ingredients",
        definition: "Various items George uses in his medicine",
      },
      {
        term: "Marvellous",
        definition: "Describing the extraordinary nature of the medicine",
      },
      {
        term: "Shrink/Grow",
        definition: "Effects of the medicine on Grandma and animals",
      },
      {
        term: "Farm",
        definition: "The setting of the story",
      },
      {
        term: "Chicken feed",
        definition: "One of the ingredients George uses",
      },
      {
        term: "Saucepan",
        definition: "The container George uses to mix his medicine",
      },
      {
        term: "Magical",
        definition: "The seemingly supernatural effects of the medicine",
      },
      {
        term: "Experiment",
        definition: "George's process of creating the medicine",
      },
      {
        term: "Transform",
        definition: "How the medicine changes things",
      },
      {
        term: "Nasty",
        definition: "Describing Grandma's personality",
      },
      {
        term: "Brew",
        definition: "Another term for the mixture George creates",
      },
      {
        term: "Potion",
        definition: "Another word for the medicine",
      },
      {
        term: "Side effects",
        definition: "Unexpected results of taking the medicine",
      },
    ],
  };
  const [quizData, setQuizData] = useState(quizDataSample);
  const [currentTerm, setCurrentTerm] = useState("");
  const [currentDefinition, setCurrentDefinition] = useState("");
  const [options, setOptions] = useState([]);
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);
  const [questionsAsked, setQuestionsAsked] = useState(0);

  const fetchVocabularyByTitle = async (slug) => {
    console.log(slug);

    try {
      console.log(slug);
      const data = await getVocabularyByTitle(slug);
      setQuizData(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const pickRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * quizData.vocabulary.length);
    const randomVocab = quizData.vocabulary[randomIndex];
    setCurrentTerm(randomVocab.term);
    setCurrentDefinition(randomVocab.definition);
    setOptions(generateOptions(randomVocab.term));
    setFeedback("");
  };

  const generateOptions = (correctTerm) => {
    let optionsSet = new Set([correctTerm]);
    while (optionsSet.size < 4) {
      const randomVocab =
        quizData.vocabulary[
          Math.floor(Math.random() * quizData.vocabulary.length)
        ];
      optionsSet.add(randomVocab.term);
    }
    return shuffleArray(Array.from(optionsSet));
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  useEffect(() => {
    fetchVocabularyByTitle(slug);
    pickRandomWord();
  }, []);

  const handleAnswer = (selectedTerm) => {
    setQuestionsAsked(questionsAsked + 1);
    if (selectedTerm === currentTerm) {
      setFeedback("Correct!");
      setScore(score + 1);
    } else {
      setFeedback(`Sorry, the correct answer was "${currentTerm}".`);
    }
    setTimeout(pickRandomWord, 2000);
  };

  return (
    <div className="quiz-container">
      <h1>{title}</h1>
      <h2>Vocabulary Quiz</h2>
      <div className="score-board">
        <span className="item-center">Score: {score}</span>
        <span>Questions: {questionsAsked}</span>
      </div>
      <div className="question-box">
        <p className="definition">{currentDefinition}</p>
      </div>
      <div className="options-container">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(option)}
            className="option-button bg-pink hover:bg-pink-700 focus:ring-4 focus:outline-none"
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
    </div>
  );
};

export default BookVocabulary;
