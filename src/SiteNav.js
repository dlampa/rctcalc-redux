import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class SiteNav extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeLink: [true, false]
        };
    }
    render()
    {
        return (
            <nav>
                <Link to="/" className={(this.state.activeLink[0] ? "activeLink" : "")} onClick={()=>this.setState({ activeLink: [true, false] })}><FontAwesomeIcon icon="coffee"/>Calculator</Link>
                <Link to="/history" className={(this.state.activeLink[1] ? "activeLink" : "")} onClick={() => this.setState({ activeLink: [false, true] })}>History</Link>
          </nav>  
        );
    }
}

export default SiteNav;
