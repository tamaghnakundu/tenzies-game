import { useState, useEffect } from "react";
import Dice from "./components/Dice";
import Confetti from "react-confetti";

function generateAllNewDice() {
  const newDice = [];
  for (let i = 0; i < 10; i++) {
    newDice.push({
      value: Math.floor(Math.random() * 6) + 1,
      id: i + 1,
      isHeld: false,
    });
  }
  return newDice;
}

export default function App() {
  const [dice, setDice] = useState(generateAllNewDice());
  const [tenzies, setTenzies] = useState(false);

  function checkWinCondition(currentDice) {
    return (
      currentDice.length === 10 &&
      currentDice.every((die) => die.isHeld) &&
      currentDice.every((die) => die.value === currentDice[0].value)
    );
  }

  const diceElements = dice.map((die) => (
    <Dice
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ));

  function holdDice(id) {
    setDice((prevDice) => {
      const newDice = prevDice.map((die) =>
        die.id === id ? { ...die, isHeld: !die.isHeld } : die
      );
      setTenzies(checkWinCondition(newDice));
      return newDice;
    });
  }

  function rollDice() {
    if (tenzies) {
      // Start a new game
      const newDice = generateAllNewDice();
      setDice(newDice);
      setTenzies(false);
    } else {
      setDice((prevDice) => {
        const newDice = prevDice.map((die) =>
          die.isHeld
            ? die
            : { ...die, value: Math.floor(Math.random() * 6) + 1 }
        );
        setTenzies(checkWinCondition(newDice));
        return newDice;
      });
    }
  }

  return (
    <>
      {tenzies && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={1000}
          gravity={0.2}
        />
      )}
      <main>
        {tenzies && <h1 className="win-message">You Won! 🎉</h1>}
        <h1 className="title">Tenzies</h1>
        <p className="instructions">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <div className="dice-container">{diceElements}</div>
        <button className="roll-button" onClick={rollDice}>
          {tenzies ? "New Game" : "Roll"}
        </button>
      </main>
    </>
  );
}
