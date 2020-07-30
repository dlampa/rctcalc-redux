import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class SiteNav extends React.Component {

    render()
    {
        /*  Wanted to apply CSS to the anchors depending on which page is currently open via CSS class .activeLink. To get this information,
            I had to wrap the component in withRouter() in order to inject location into props.
            Ref: https://stackoverflow.com/a/51203964 */
        
        return (
            <nav>
                <Link to="/" className={this.props.location.pathname === "/" ? "activeLink" : ""} >Calculator</Link>
                <Link to="/history" className={this.props.location.pathname === "/history"  ? "activeLink" : ""} >History</Link>
          </nav>  
        );
    }
}

export default withRouter(SiteNav);
