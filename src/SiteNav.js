import React from 'react';
import { Link } from 'react-router-dom'

class SiteNav extends React.Component {
    render()
    {
        return (
            <nav>
                <ul>
                    <Link to="/">Calculator</Link>
                    <Link to="/history">History</Link>
                </ul>
          </nav>  
        );
    }
}

export default SiteNav;
