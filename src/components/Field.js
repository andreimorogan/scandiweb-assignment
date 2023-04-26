import React, { Component } from 'react';

class Field extends Component {
    render() {
        const { fieldId, fieldLabel, fieldType, topMargin, step, minLength, maxLength, onChangeMethod } = this.props;
        return (
            <div className="container ms-3 mb-3" style={{ marginTop: topMargin }}>
                <div className="row">
                    <div className="col col-md-5 me-5">
                        <div className="input-group">
                            <label htmlFor={fieldId} className="input-group-text">{fieldLabel}</label>
                            <input
                                id={fieldId}
                                onChange={onChangeMethod}
                                className="form-control is-invalid"
                                aria-label="Sizing example input"
                                aria-describedby="inputGroup-sizing-default"
                                required
                                type={fieldType}
                                minLength={minLength}
                                maxLength={maxLength}
                                step={step}
                                min={step}
                            />
                            <div className="invalid-feedback">
                                {`Please provide a valid ${fieldId}.`}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default Field;