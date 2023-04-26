import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NoMatch extends Component {
    render() {
        return (
            <>
                <div className="px-4 pt-5 my-5 text-center border-bottom">
                    <h1 className="display-4 fw-bold text-body-emphasis">404</h1>
                    <div className="col-lg-6 mx-auto">
                        <p className="lead mb-4">Page not found or unavailable.</p>
                        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
                            <Link to="/"><button type="button" className="btn btn-primary btn-lg px-4 me-sm-3">Return to home page</button></Link>
                        </div>
                    </div>
                </div>
            </>
        );
    }
};

export default NoMatch;
