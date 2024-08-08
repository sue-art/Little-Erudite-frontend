export const textToSpeech = (text) => {
  const speechSynthesis = window.speechSynthesis;
  const maxChunkLength = 200;
  let selectedVoice;

  const setVoice = () => {
    const voices = speechSynthesis.getVoices();
    const googleVoice = voices.find(
      (voice) => voice.name === "Google UK English Female"
    );
    if (googleVoice) {
      selectedVoice = googleVoice;
    }
  };

  if (speechSynthesis.getVoices().length > 0) {
    setVoice();
  } else {
    speechSynthesis.onvoiceschanged = setVoice;
  }

  const speakChunk = (startIndex) => {
    const chunk = text.substr(startIndex, maxChunkLength);
    const utterance = new SpeechSynthesisUtterance(chunk);
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    utterance.onend = () => {
      if (startIndex + maxChunkLength < text.length) {
        speakChunk(startIndex + maxChunkLength);
      }
    };

    speechSynthesis.speak(utterance);
  };

  speechSynthesis.cancel();
  speakChunk(0);
};

export const stopSpeech = () => {
  const speechSynthesis = window.speechSynthesis;
  speechSynthesis.cancel();
};

export const pauseSpeech = () => {
  const speechSynthesis = window.speechSynthesis;
  speechSynthesis.pause();
};
