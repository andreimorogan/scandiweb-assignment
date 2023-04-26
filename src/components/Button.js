import React, { Component } from 'react';

import { Link } from 'react-router-dom';

class Button extends Component {
    render () {
        const { color, text, id, link, handleSubmit} = this.props;

        return (
            <Link to={link}>
                <button onClick={handleSubmit} id={id} type="submit" className={`btn btn-${color}`}>
                    {text}
                </button>
            </Link>
        );
    }
};

export default Button;