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
    this.setState({calcInput: event.target.innerText})
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
        {opChars.map(opChar => <CalcButton renderVal={opChar} className="btnOpers" /> )}
      </div>
      </>
    );
  }

}

export default App;
