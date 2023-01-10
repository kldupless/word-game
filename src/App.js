import axios from 'axios'
import { useState, useEffect } from 'react'

const App = () => {
  const [chosenLevel, setChosenLevel] = useState(null)
  const [words, setWords] = useState(null)

const getRandomWords = () => {
  const options = {
    method: 'GET',
    url: 'https://twinword-word-association-quiz.p.rapidapi.com/type1/',
    params: {level: chosenLevel, area: 'sat'},
    headers: {
      'X-RapidAPI-Key': '0487984adfmshd79c56463345050p1660e8jsncef8d47bf3d5',
      'X-RapidAPI-Host': 'twinword-word-association-quiz.p.rapidapi.com'
    }
  }
  
  axios.request(options).then((response) => {
    console.log(response.data)
    setWords(response.data)

  }).catch((error) => {
    console.error(error)
  })
}

console.log(words && words.quizlist)

useEffect(() => {
  if(chosenLevel) getRandomWords()
  }, [chosenLevel])

  return (
    <div className="App">

      {!chosenLevel && <div className="level-selector">
        <h1>Word Association App</h1>
        <p>Select your level to start</p>
        <select
          name="levels"
          id="levels"
          value={chosenLevel}
          onChange={(e) => setChosenLevel(e.target.value)}>
          <option value={null}>Select a Level</option>
          <option value="1">Level 1</option>
          <option value="2">Level 2</option>
          <option value="3">Level 3</option>
        </select>
      </div>}
      {chosenLevel && words && <div className="question-area">
        <h1>Welcome to level {chosenLevel}</h1>

        {words.quizlist.map((question, questionIndex) => (
        <div className="bg-gray-100 p-3 rounded-2xl m-3 flex flex-col justify-start items-center">
          {question.quiz.map((tip, _index) => (
            <p key={_index}>{tip}</p>
          ))}
          <div className="flex flex-row">
            {question.option.map((option, optionIndex) => (
              <div className="flex flex-col">
                <button className="bg-purple-500 p-2 m-2 rounded-lg">{option}</button>
                </div>
            ))}
          </div>
          <p>{question.correct}</p>
          </div>
          ))}

      </div>}
    </div>
  )
}

export default App
