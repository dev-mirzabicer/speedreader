import React, { useState } from "react";
import SpeedReader from "./SpeedReader";
import raw from "./text.txt";

function App() {
  const [text, setText] = useState();
  fetch(raw)
    .then((r) => r.text())
    .then((text) => setText(text));
  // const text =
  //   "Much of what we know about the types of repeated DNA sequences in the";
  const wordsPerMinute = 250;
  const theme = "light";

  if (text)
    return (
      <div className="App">
        <SpeedReader
          text={text}
          wordsPerMinute={wordsPerMinute}
          theme={theme}
        />
      </div>
    );
  else return <p>Loading...</p>;
}

export default App;
