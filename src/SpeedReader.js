import React, { useState, useEffect, useCallback } from "react";
import { useInterval } from "react-use";
import "./SpeedReader.css";

const SpeedReader = ({ text, wordsPerMinute, theme }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentWord, setCurrentWord] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentDelay, setCurrentDelay] = useState(0);
  const words = text.split(" ");

  if (!(currentIndex < words.length - 1 && currentIndex >= 0)) {
    setCurrentIndex(0);
  }

  const wordDelay = (60 / wordsPerMinute) * 1000;

  const getDelayForWord = useCallback(
    (word) => {
      if (word.endsWith(",")) {
        return wordDelay * 1.25;
      } else if (word.endsWith(".")) {
        return wordDelay * 1.75;
      } else if (word.length > 11) {
        return wordDelay * 1.2;
      } else if (word.includes("\n")) {
        return 3 * wordDelay;
      } else {
        return wordDelay;
      }
    },
    [wordDelay]
  );

  const goBack = useCallback(() => {
    setCurrentIndex(currentIndex - 1);
  }, [currentIndex]);

  useInterval(
    () => {
      setCurrentIndex((currentIndex) => currentIndex + 1);
      setCurrentDelay(getDelayForWord(words[currentIndex + 1]));
    },
    isPlaying ? currentDelay : null
  );

  useEffect(() => {
    setCurrentWord(words[currentIndex]);
    setCurrentDelay(getDelayForWord(words[currentIndex]));
  }, [currentIndex, getDelayForWord, words]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  // const leftWords = words
  //   .slice(currentIndex - 3, currentIndex)
  //   .join(" ")
  //   .slice(-2, 0);
  // const rightWords = words
  //   .slice(currentIndex + 1, currentIndex + 4)
  //   .join(" ")
  //   .slice(0, 3);

  return (
    <>
      <div className={`speed-reader ${theme}`}>
        <div className="text-container">
          {/* <div className="left-words">{leftWords}</div> */}
          <div className="current-word" onClick={handlePlayPause}>
            {currentWord}
          </div>
          {/* <div className="right-words">{rightWords}</div> */}
        </div>
      </div>
      <div className="controls">
        <button onClick={goBack}>Go Back</button>
      </div>
    </>
  );
};

export default SpeedReader;
