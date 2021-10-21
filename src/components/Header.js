import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class Header extends React.Component {
    static propTypes = {
        clearToken: PropTypes.func.isRequired
    };

    render() {
        return (
            <div id="header">
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                </ul>
                <hr />
                <ul>
                    <li>
                        <Link to="/" onClick={this.props.clearToken}>
                            Sign out
                        </Link>
                    </li>
                </ul>
            </div>
        );
    }
}

export default Header;
