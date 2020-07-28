import React from 'react';

class CalcButton extends React.Component
{
    onButtonClicked = (event) => {
           this.props.onClick(event);
    }

    render()
    {
        return (
            <button id={"calcButton" + (this.props.renderVal.toString() === "." ? "dot": this.props.renderVal.toString())}
                className={this.props.className}
                onClick={(event) => this.onButtonClicked(event)}>
                {this.props.renderVal}
            </button>
        );
    }
}

export default CalcButton;