import './Styles/App.css';
import { useState } from 'react';
import { useEffect } from 'react';

function App() {
  const [themeOne, setThemeOne] = useState('themeOn');
  const [themeTwo, setThemeTwo] = useState('themeOff');
  const [themeThree, setThemeThree] = useState('themeOff');
  const [pageTheme, setPageTheme] = useState('ThemeOne App');
  const [equation, setEquation] = useState('00');
  const [resetFlag, setResetFlag] = useState(false);


  function handleEquation(target) {
    if (resetFlag === true) {
      setEquation(old => String(target));
      setResetFlag(old => false);
    } else if ((/^[0-9.+\-*/]+$/).test(target)) {
      setEquation(old => {
        let temp = old;
        if (temp === '00') {
          return String(target)
        }
        return temp += String(target)
      });
    }

    if (target === 'DEL' && resetFlag === true) {
      setEquation(old => '00');
      setResetFlag(old => false);
    } else if (target === 'DEL' && equation !== '00') {
      let arr = equation.split('');
      let temp = arr.slice(0, arr.length - 1);
      temp = temp.join('');
      if (temp === '') {
        setEquation(old => '00')
      } else if ((/^[0-9.+\-*/]+$/).test(temp)) {
        setEquation(old => temp)
      }
    }
  }


  function handleEvaluation(equation) {
    //Safer indirect eval call in strict mode
    //Regex check that only allowed character are in input string
    //Regex check that the math equation is valid. used chatGPT for this.
    if ((/^(\d+(\.\d+)?[+\-*\/])+(\d+(\.\d+)?)$/).test(equation)) {
      let answer = 0;
      answer = eval?.(`"use strict";(${equation})`);
      setResetFlag(old => true);
      setEquation(old => answer);
    }
  }

  function handleReset() {
    setEquation(old => '00');
    setResetFlag(old => false);
  }

  function handleTheme(target) {
    console.log(target === 'one');
    switch (target) {
      case 'one':
        setThemeOne(old => 'themeOn');
        setThemeTwo(old => 'themeOff');
        setThemeThree(old => 'themeOff');
        setPageTheme(old => 'ThemeOne App');
        break;
      case 'two':
        setThemeOne(old => 'themeOff');
        setThemeTwo(old => 'themeOn');
        setThemeThree(old => 'themeOff');
        setPageTheme(old => 'ThemeTwo App');
        break;
      case 'three':
        setThemeOne(old => 'themeOff');
        setThemeTwo(old => 'themeOff');
        setThemeThree(old => 'themeOn');
        setPageTheme(old => 'ThemeThree App');
        break;

      default:
        console.log('no match')
    }
  }

  return (
    <div className={pageTheme}>
      <section className='hero'>
        <h1>calc</h1>
        <div className='themeContainer'>
          <p>THEME</p>
          <div className='trippleStepSwitch'>
            <div className='labelContainer'>
              <label htmlFor='one'>1</label>
              <label htmlFor='two'>2</label>
              <label htmlFor='three'>3</label>
            </div>
            <div className='inputContainer'>
              <input id="one" name='button' type='radio'
                defaultChecked
                className={themeOne}
                onClick={() => handleTheme('one')} />
              <input id="two" name='button' type='radio'
                className={themeTwo}
                onClick={() => handleTheme('two')} />
              <input id="three" name='button' type='radio'
                className={themeThree}
                onClick={() => handleTheme('three')} />
            </div>
          </div>
        </div>
      </section>

      <section className='Display'>
        <h2 id='text'>{equation}</h2>
      </section>

      <section className='numpad'>
        <div className='row'>
          <button id='7' onClick={() => handleEquation(7)}><span className='front'>7</span></button>
          <button id='8' onClick={() => handleEquation(8)}><span className='front'>8</span></button>
          <button id='9' onClick={() => handleEquation(9)}><span className='front'>9</span></button>
          <button id='DEL' className='btn--del' onClick={() => handleEquation('DEL')}><span className='front'>DEL</span></button>
        </div>
        <div className='row'>
          <button id='4' onClick={() => handleEquation(4)}><span className='front'>4</span></button>
          <button id='5' onClick={() => handleEquation(5)}><span className='front'>5</span></button>
          <button id='6' onClick={() => handleEquation(6)}><span className='front'>6</span></button>
          <button id='PLUS' onClick={() => handleEquation('+')}><span className='front'>+</span></button>
        </div>
        <div className='row'>
          <button id='1' onClick={() => handleEquation(1)}><span className='front'>1</span></button>
          <button id='2' onClick={() => handleEquation(2)}><span className='front'>2</span></button>
          <button id='3' onClick={() => handleEquation(3)}><span className='front'>3</span></button>
          <button id='MINUS' onClick={() => handleEquation("-")}><span className='front'>-</span></button>
        </div>
        <div className='row'>
          <button id='PERIOD' onClick={() => handleEquation('.')}><span className='front'>.</span></button>
          <button id='0' onClick={() => handleEquation(0)}><span className='front'>0</span></button>
          <button id='DIVID' onClick={() => handleEquation('/')}><span className='front'>/</span></button>
          <button id='MULTIPLY' onClick={() => handleEquation('*')}><span className='front'>*</span></button>
        </div>
        <div className='row'>
          <button id='RESET' className='btn--reset' onClick={() => handleReset()}><span className='front'>RESET</span></button>
          <button id='EQUAL' className='btn--equal' onClick={() => handleEvaluation(equation)}><span className='front'>=</span></button>
        </div>
      </section>
    </div>
  );
}

export default App;
