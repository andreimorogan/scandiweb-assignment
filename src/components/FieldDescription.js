import React, { Component } from 'react';

class FieldDescriptions extends Component {
    render() {
        return (
            <div className="container ms-3 mb-3">
                <div className="row">
                    <div className="col col-md-5 me-5">
                        {this.props.desc}
                    </div>
                </div>
            </div>
        );
    }
};

export default FieldDescriptions;