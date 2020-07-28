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
      calcInput: "0",
      firstNumber: "",
      secondNumber: "",
      calcOper: ""
    };
    
  }

  calcResult() {
    // Change to manual calculation without eval
    let calcResult;
    let firstNumber = Number.parseFloat(this.state.firstNumber);
    let secondNumber = Number.parseFloat(this.state.secondNumber);

    switch (this.state.calcOper) {
      case "+":
        calcResult = firstNumber + secondNumber;
        break;
      case "-":
        calcResult = firstNumber - secondNumber;
        break;
      case "/":
        // Insert div/0 checks here maybe?
        calcResult = firstNumber / secondNumber;
        break;
      case "*":
        calcResult = firstNumber * secondNumber;
        break;
      default:
    }

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
          let newInput = (this.state.calcInput === "0") ? event.target.innerText : this.state.calcInput.toString() + event.target.innerText.toString();
          this.setState({ [this.state.calcOper !== "" ? "secondNumber" : "firstNumber"]: newInput, calcInput: newInput })

          break;
        }
      case "btnOpers":
        {
          // Get the new operator
          let newOperator = event.target.innerText;
          
          // Check if we already have the first number defined
          if (this.state.secondNumber !== "" && newOperator !== "=") {
         
            // Perform calculation first
            this.calcResult();

            // Assign the new operator
            this.setState({ calcOper: newOperator, calcInput: "" });
            
            // Wait for next input
          }
          else if (newOperator === "=")
          {
            if (this.state.calcOper !== "") {
              // Perform the calculation
              this.calcResult();
            }

          } else {
            this.setState({ calcOper: newOperator, calcInput: "0" });
          }
          
          break;
        }

      case "btnCalcFunc":
        {
          let calcFunc = event.target.innerText;
          switch (calcFunc)
          {
            case "C":
              // Handle user pressing "C" - clears firstNumber and secondNumber
              this.setState({
                firstNumber: "",
                secondNumber: "",
                calcInput: "0",
                calcOper: ""
              });
              break;
            case ".":
              if (!(this.state.calcInput.indexOf(".") > -1)) {
                this.setState({
                  calcInput: this.state.calcInput + "."
                });
              }
              break;
            default:

          }
          
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
          <input type="text" id="calcOutput" value={this.state.calcInput} readOnly={true} />
      </div>
      <div id="calcControls">
          {numChars.map(numChar => <CalcButton renderVal={numChar} className="btnNumbers" onClick={this.onInput} />)}
          {opChars.map(opChar => <CalcButton renderVal={opChar} className="btnOpers" onClick={this.onInput} />)}
          {<CalcButton renderVal="." className="btnCalcFunc" onClick={this.onInput} />}
          {<CalcButton renderVal="C" className="btnCalcFunc" onClick={this.onInput} />}

      </div>
      </>
    );
  }

}

export default App;

//onChange={(event) => this.updateState("calcInput", event.target.value)}
