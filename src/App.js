import "./style.css";
import React, { useEffect, useState, useRef } from "react";

const App = () => {
  const [quotes, setQuotes] = useState("");
  const textRef = useRef();
  let colors = ["#ffff00", "#90ee90", "#ffa500", "#ff68ff", "#a9a9e7"];
  const getQuote = () => {
    fetch("https://type.fit/api/quotes")
      .then((res) => res.json())
      .then((data) => {
        let randomNum = Math.floor(Math.random() * data.length);
        setQuotes(data[randomNum]);
        console.log(data[randomNum]);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    getQuote();
  }, []);

  useEffect(() => {
    textRef.current.style.color =
      colors[Math.floor(Math.random() * colors.length)];
  }, [quotes]);

  return (
    <div className="App">
      <div className="quote">
        <p>
          <h3 ref={textRef}>{quotes.text}</h3>
        </p>
        <p>
          <h3>Author: {quotes.author}</h3>
        </p>
        <div className="btnContainer">
          <button onClick={getQuote} className="btn">
            Get Quotes
          </button>
          <a
            href={`https://twitter.com/intent/tweet?text=${quotes.text}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn"
          >
            Tweet
          </a>
        </div>
      </div>
    </div>
  );
};

export default App;
