import React, { useEffect, useState } from "react";
import { textToSpeech, pauseSpeech } from "./TextToSpeech";

// Icons
import IconPlay from "../Icons/IconPlay";
import IconPause from "../Icons/IconPause";

const AudiobookPlayer = ({ text }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const playAudio = () => {
    textToSpeech(text);
    setIsPlaying(true);
  };

  const pauseAudio = () => {
    pauseSpeech();
    setIsPlaying(false);
  };

  useEffect(() => {}, [isPlaying]);

  return (
    <>
      {isPlaying ? (
        <button
          className="inline-flex bg-yellow hover:bg-pink text-white font-bold   px-4 rounded-full"
          value="Book Quiz"
          onClick={pauseAudio}
          disabled={!isPlaying}
        >
          <p className="py-2 mb-0 text-white">Audio Talks</p>
          <div className="w-6 mx-2 ml-3 mr-1 py-2 px-0">
            <IconPause />
          </div>
        </button>
      ) : (
        <button
          className="inline-flex bg-yellow hover:bg-pink text-white font-bold   px-4 rounded-full"
          value="Book Quiz"
          onClick={playAudio}
          disabled={isPlaying}
        >
          <p className="py-2 mb-0 text-white">Audio Talks</p>
          <div className="w-6 mx-2 py-2 px-0">
            <IconPlay />
          </div>
        </button>
      )}
    </>
  );
};

export default AudiobookPlayer;
