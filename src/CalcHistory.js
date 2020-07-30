import React from 'react';
import { connect } from 'react-redux';

class CalcHistory extends React.Component {
    render()
    {
        return (
            <div id="calcHistory">
                <h3>Calc history</h3>
                <ul>
                   {this.props.calcHistory.map((calcHistoryItem, index) => <li>{calcHistoryItem}</li>)}
                </ul>
            </div>
        );
    }
}

export default connect(
    state => { return { calcHistory: state } }
)(CalcHistory);
