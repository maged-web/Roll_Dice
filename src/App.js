import { useEffect, useState } from "react";
import Die from "./Die";
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'
function App() {
  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)

  useEffect(function () {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value;
    const allSameVlaue = dice.every(die => die.value == firstValue)
    if (allHeld && allSameVlaue) {
      setTenzies(true)
    }
  }, [dice])

  function generateNewDie() {
    return { value: Math.ceil(Math.random() * 6), isHeld: false, id: nanoid() }
  }
  function allNewDice() {
    const newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie())
    }
    return newDice
  }
  function holdDice(id) {
    setDice(odlDic => odlDic.map(die => {
      return die.id === id ? { ...die, isHeld: !die.isHeld } : die
    }))
  }

  function rollDice() {
    if (!tenzies) {
      setDice(oldDice => oldDice.map(die => {
        return die.isHeld ? die : generateNewDie()
      }))
    }
    else {
      setTenzies(false)
      setDice(allNewDice())
    }
  }

  const diceElement = dice.map(die => <Die key={die.id} value={die.value} isHeld={die.isHeld} holdDice={() => holdDice(die.id)} />)
  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-container" >
        {diceElement}
      </div>
      <button className="roll-dice" onClick={rollDice}>{tenzies ? 'New Game' : 'Roll'}</button>
    </main>
  )
}

export default App;
