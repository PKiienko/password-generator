import React, { useState } from 'react';
import './App.css';

const App = () => {

  const [textPassword, setTextPassword] = useState('Your password here');
  const [passwordLength, setPasswordLength] = useState('10');
  const [includeUppercase, setIncludeUppercase] = useState(false);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSymbols, setIncludeSymbols] = useState(false);

  const copyPassword = async (e) => {
    e.preventDefault();
    await navigator.clipboard.writeText(textPassword);
  }

  const passwordGenerating = (e) => {
    e.preventDefault();
    const lowerCaseLetters = "abcdefghijklmnopqrstuvwxyz";
    const upperCaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "1234567890"
    const symbols = "!@#$%^&*()-+[]{}<>/?";

    let charset = lowerCaseLetters;
    charset = includeUppercase ? charset + upperCaseLetters : charset;
    charset = includeNumbers ? charset + numbers : charset;
    charset = includeSymbols ? charset + symbols : charset;
    const password = [];

    for (let i = 0; i < passwordLength; i++) {
      let characterIndex = Math.floor(Math.random() * charset.length)
      password.push(charset[characterIndex]);
    }
    setTextPassword(password.join(''));
  }

  return (
    <div className="App">
      <div className='container'>
        <section className='password-header'>
          <h1>Password Generator</h1>
          <h2>{textPassword}</h2>
        </section>

        <form className='checkboxes'>
          <div className='length-block'>
            <input type="range" min='8' max='50' value={passwordLength} onChange={(e) => setPasswordLength(e.target.value)} />
            <input className='length-input' type="number" min='8' max='50' value={passwordLength} onChange={(e) => setPasswordLength(e.target.value)} />
            <h4>Length</h4>
          </div>
          <div className='uppercase-block'>
            <input type="checkbox" onClick={() => { setIncludeUppercase(!includeUppercase) }} />
            <h4>Include Uppercase</h4>
          </div>
          <div className='numbers-block'>
            <input type="checkbox" onClick={() => { setIncludeNumbers(!includeNumbers) }} />
            <h4>Include Numbers</h4>
          </div>
          <div className='symbols-block'>
            <input type="checkbox" onClick={() => { setIncludeSymbols(!includeSymbols) }} />
            <h4>Include Symbols</h4>
          </div>
          <div>
            <button className='btn' type='submit' onClick={passwordGenerating}>Generate</button>
            <button className='btn' onClick={copyPassword}>Copy</button>
          </div>
        </form>

      </div>
    </div>
  );
}

export default App;