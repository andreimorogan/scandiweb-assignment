import React, { Component } from 'react';

class Errors extends Component {
    render() {
        const { err } = this.props;
        return (
            <div className="container ms-3 mb-3">
                <div className="row">
                    <div className="col col-md-5 me-5 text-danger">
                        {err}
                    </div>
                </div>
            </div>
        );
    }
};

export default Errors;