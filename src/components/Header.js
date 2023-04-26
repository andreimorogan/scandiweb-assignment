import React, { Component } from 'react';

class Header extends Component {

    render() {
        const { title, children } = this.props;

        return (
            <div className="m-4">
                <div className="d-md-flex flex-row pt-3">
                    <h2 className="mb-3">{title}</h2>
                    <div className="ms-auto d-flex gap-3">
                        {children}
                    </div>
                </div>
                <hr className="bg-dark border-2 border-top border-white" />
            </div>
        );
    }

};

export default Header;
