import React from 'react';
import './App.css';
import CalcButton from './CalcButton';

let numChars = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
let opChars = ["+", "-", "*", "/", "="];


class App extends React.Component 
{
  constructor(props) {
    super(props);

    this.state = {
      calcInput: ""
    };
    
  }

  onInput = (event) => {
    // Capture the value from the target's <button>'s innerText
    let newInput = event.target.innerText;
    let newCalcInput;
    switch (newInput)
    {
    case "=":
      {
        // Process the calculation and display the result
        newCalcInput = eval(this.state.calcInput);
        break;
      }
      default:  
      {
        newCalcInput = this.state.calcInput + newInput;
      }
    }
    this.setState({ calcInput: newCalcInput });
    
  }

  updateState = (key, value) => {
    this.setState({ [key]: value });
  }

  render()
  {
    return (
      <>
      <div id="calcDisplay">
        <input type="text" id="calcOutput" value={this.state.calcInput} onChange={(event) => this.updateState("calcInput", event.target.value)} />
      </div>
      <div id="calcControls">
          {numChars.map(numChar => <CalcButton renderVal={numChar} className="btnNumbers" onClick={this.onInput}/>)}
          {opChars.map(opChar => <CalcButton renderVal={opChar} className="btnOpers" onClick={this.onInput} />)}
          {<CalcButton renderVal="C" className="btnCalcFunc" onClick={this.onInput} />}
      </div>
      </>
    );
  }

}

export default App;
