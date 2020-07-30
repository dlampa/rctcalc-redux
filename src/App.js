import React from 'react';
import './reset.css';
import './App.css';
import { connect } from 'react-redux';
import addToCalcHistory from './actions';
import CalcButton from './CalcButton';


let numChars = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
let opChars = ["+", "-", "*", "/", "="];

class App extends React.Component 
{
  constructor(props) {
    super(props);

    // Local state will stay
    this.state = {
      calcId: "",
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
    let lastOper = this.state.calcOper;

    switch (lastOper) {
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

    // Round to 
    // https://stackoverflow.com/a/12830454/12802214
    calcResult = Math.round((calcResult + Number.EPSILON) * 1000000000) / 1000000000;

    // Push calculation to history
    this.props.dispatch(addToCalcHistory(`${this.state.firstNumber.toString()} ${this.state.calcOper} ${this.state.secondNumber.toString()} = ${calcResult.toString()}`));

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
          let newInput;

          // Handle different possibilities for data input: 
          // 1. Starts off from 0 as displayed (could be firstNumber = blank too)
          // 2. If both the operator is set and secondNumber is blank
          // 3. If Operator is blank
          if (this.state.calcInput === "0"
            ||
            (this.state.calcOper !== "" && this.state.secondNumber === "")
            ||
            (this.state.calcOper === "" && this.state.firstNumber === this.state.secondNumber && this.state.firstNumber === "" && !this.state.calcInput.toString().includes(".")))
          {
            newInput = event.target.innerText.toString();
          } else if ((this.state.calcInput.length + 1) <= 10)
          {
            newInput = this.state.calcInput.toString() + event.target.innerText.toString();
          }
          
          // Prevent coma
          if (newInput != null) {
            // Change between storing first or second Number in the state object
            this.setState({ [this.state.calcOper !== "" ? "secondNumber" : "firstNumber"]: newInput, calcInput: newInput });
          }

          break;
        }
      case "btnOpers":
        {
          // Get the new operator, and save the old one
          let newOperator = event.target.innerText;
          let lastOperator = this.state.calcOper;

          // This entire section needs a rewrite to streamline the code.

          // Cater for change of operator mid-operation (only change operator)
          if (lastOperator !== newOperator) {
            // Apply new operator
            this.setState({ calcOper: newOperator });
          }

          if (this.state.firstNumber !== "") {
          
            // Cater for missing second number, and the user presses = (reset operator, keep value of first number on screen)
            if (this.state.secondNumber === "" && newOperator === "=") {
              this.setState({ calcOper: "", calcInput: this.state.firstNumber });
            }

            // Cater for user entered the second number, and the operator is = (perform calc)
            if (this.state.secondNumber !== "" && newOperator === "=") {
              // Perform calculation
              this.calcResult();

              // This ensures that on next entry we reset
              this.setState({ firstNumber: "" });
            }

            // Cater for user entering the second number, and the operator is not = (perform calc) 
            if (this.state.secondNumber !== "" && newOperator !== "=") {
         
              // Perform calculation first
              this.calcResult();

              // Assign the new operator
              this.setState({ calcOper: newOperator });
                        
              // Wait for next input... 
            }
          }

          // Reuse last value after user has completed the previous calc by pressing = (matches the conditions of state variable when that occurs)
          if (this.state.firstNumber === "" && this.state.secondNumber === "" && this.state.calcInput !== "" && newOperator !== "=") {
            this.setState({ firstNumber: this.state.calcInput });
          }
          
          break;
        }

      case "btnCalcFunc":
        {
          let calcFunc = event.target.innerText;
          switch (calcFunc)
          {
            case "AC":
              // Handle user pressing "AC" - clears firstNumber and secondNumber
              this.setState({
                firstNumber: "",
                secondNumber: "",
                calcInput: "0",
                calcOper: ""
              });
              break;
            
            case "C":
              // Handle user pressing "C" - clears only currentInput
              this.setState({
                calcInput: "0",
              });
              break;
            
            case ".":
              /* If there is a dot already in, do nothing. If the calcInput is string (which means it's not a result of the calc, but an input), proceed
                 This is really WEAK. There should have been another state parameter to track whether or not user is looking at a result,
                 independent of the vartype */
              
              if (!(this.state.calcInput.toString().indexOf(".") > -1) && typeof(this.state.calcInput)=="string") {
               
                this.setState({
                  calcInput: this.state.calcInput + "."
                });
              }
              break;
            case "_":
              let initialEntry = this.state.calcInput;
              let newEntry = initialEntry;


              if (typeof (initialEntry) == "string") {
                if (initialEntry[0] === "-") {
                  newEntry = initialEntry.substr(1);
                } else {
                  newEntry = "-" + initialEntry;
                }
                
                // Figure out where to place the new positive/negative value
                this.setState({
                  calcInput: newEntry,
                  [(this.state.firstNumber === "" || this.state.calcOper === "") ? "firstNumber" : "secondNumber"]: newEntry
                });
              }
              break;
            default:
              /* Nothing */
          }
          
          break;
        }
      default:
        /* Nothing */
    }
  }

  render()
  {
    // Needs key added to the .map method to prevent errors
    return (
      <>
        <div id="calcDisplay">
            <input type="text" id="calcOutput" value={this.state.calcInput} readOnly={true} />
        </div>
        <div id="calcControls">
          {numChars.map((numChar, index) => <CalcButton key={index} renderVal={numChar} className="btnNumbers" onClick={this.onInput} />)}
          {opChars.map((opChar, index) => <CalcButton key={index} renderVal={opChar} className="btnOpers" onClick={this.onInput} />)}
          {<CalcButton renderVal="." className="btnCalcFunc" onClick={this.onInput} />}
          {<CalcButton renderVal="C" className="btnCalcFunc" onClick={this.onInput} />}
          {<CalcButton renderVal="_" className="btnCalcFunc" onClick={this.onInput} />}
          {<CalcButton renderVal="AC" className="btnCalcFunc" onClick={this.onInput} />}
        </div>
        <div id="calcHistory">
          {/* Temporarily display the history until we set up React Router */}
          <h3>Calc history:</h3>
          <ul> {this.props.calcHistory.map((calcHistoryItem, index) => <li>{calcHistoryItem}</li>)} </ul>
        </div>
      </>
    );
  }

}

export default connect(
  state => { return { calcHistory: state }}
)(App);
