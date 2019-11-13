import React, { useState } from 'react'
import './App.css'
import { postJson } from './utils'

const Spam = () => {
  const [spam, setSpam] = useState('Spam or not spam')
  const [text, setText] = useState('')

  const checkForSpam = async () => {
    console.log('checking for spam with the text', text)

    const url = 'http://localhost:5000/model'
    let body = {
      text: text
    }
    const value = await postJson(url, body)

    if (value === 0) {
      setSpam('The text is spam')
    } else if (value === 1) {
      setSpam('The text is not spam')
    }
  }

  const handleChange = (event) => {
    setText(event.target.value)
  }

  return (
    <div className='App'>
      <header className='App-header'>

        <h2>{spam}</h2>

        <input value={text} onChange={(e) => handleChange(e)} onplaceholder='email text' />

        <button onClick={() => checkForSpam()}>Check for spam</button>

      </header>
    </div>
  )
}

export default Spam
