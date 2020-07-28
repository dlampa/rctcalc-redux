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
      calcInput: "",
      firstNumber: "",
      secondNumber: "",
      calcOper: ""
    };
    
  }

  calcResult() {
    // Change to manual calculation without eval
    let calcResult = eval(this.state.firstNumber + this.state.calcOper + this.state.secondNumber);

    this.setState({
      calcInput: calcResult,
      firstNumber: calcResult,
      calcOper: "",
      secondNumber: ""
    });


  }

  onInput = (event) => {
    // Discern what was pressed based on the className of the button pressed
    switch (event.target.className)
    {
      case "btnNumbers":
        {
          let newInput = event.target.innerText;
          this.setState({ [this.state.firstNumber !== "" ? "secondNumber" : "firstNumber"]: newInput, calcInput: newInput })

          break;
        }
      case "btnOpers":
        {
          console.log("oper");
          // Get the new operator
          let newOperator = event.target.innerText;
          
          // Check if we already have the first number defined
          if (this.state.secondNumber !== "" && newOperator !== "=") {
         
            // Perform calculation first
            this.calcResult();

            // Assign the new operator
            this.setState({ calcOper: newOperator });
            
            // Wait for next input
          }
          else if (newOperator === "=")
          {
            // Perform the calculation
            this.calcResult();

          } else {
            this.setState({ calcOper: newOperator });
          }
          
          break;
        }

      case "btnCalcFunc":
        {
          // Handle user pressing "C" - clears firstNumber and secondNumber
          this.setState({
            firstNumber: "",
            secondNumber: "",
            calcInput: "",
            calcOper: ""
          })
          break;
        }
      default:
    }


   /*
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
    case "C":
      {
          newCalcInput = "";
          break;
      }
    default:  
      {
        newCalcInput = this.state.calcInput + newInput;
      }
    }
    this.setState({ calcInput: newCalcInput });
    */
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
