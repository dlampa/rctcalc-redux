import React from 'react';
import { connect } from 'react-redux';

class CalcHistory extends React.Component {
    render()
    {
        return (
            <>
                <h3>Calc history:</h3>
                <ul>
                   {this.props.calcHistory.map((calcHistoryItem, index) => <li>{calcHistoryItem}</li>)}
                </ul>
            </>
        );
    }
}

export default connect(
    state => { return { calcHistory: state } }
)(CalcHistory);
