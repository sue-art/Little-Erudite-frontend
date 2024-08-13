import React, { useState, useEffect } from "react";

const TextToSpeech = () => {
  const [text, setText] = useState("");
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);

  useEffect(() => {
    const synth = window.speechSynthesis;
    const updateVoices = () => {
      const voiceList = synth.getVoices();
      setVoices(voiceList);
      if (voiceList.length > 0 && !selectedVoice) {
        setSelectedVoice(voiceList[0]);
      }
    };

    updateVoices();
    synth.onvoiceschanged = updateVoices;

    return () => {
      // Stop any ongoing speech synthesis when the component unmounts
      synth.cancel();
    };
  }, [selectedVoice]);

  const handleSpeak = () => {
    if (text.trim() !== "") {
      // Stop any ongoing speech synthesis before starting a new one
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = selectedVoice;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows="4"
        cols="50"
        placeholder="Enter text to read aloud"
      />
      <div>
        <label htmlFor="voices">Select Voice: </label>
        <select
          id="voices"
          onChange={(e) =>
            setSelectedVoice(
              voices.find((voice) => voice.name === e.target.value)
            )
          }
          value={selectedVoice ? selectedVoice.name : ""}
        >
          {voices.map((voice) => (
            <option key={voice.name} value={voice.name}>
              {voice.name} ({voice.lang})
            </option>
          ))}
        </select>
      </div>
      <button onClick={handleSpeak}>Speak</button>
    </div>
  );
};

export default TextToSpeech;
