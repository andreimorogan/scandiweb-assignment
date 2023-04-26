import React, { Component } from 'react';

class Product extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isChecked: false
        };
    }

    handleCheckboxChange = (e) => {
        const isChecked = e.target.checked;
        const sku = this.props.sku;
        this.props.onCheckboxChange(sku, isChecked);
        this.setState({ isChecked });
    }

    render() {
        const { sku, name, price, typeProperty, typeValue, unit } = this.props;
        return (
            <div className="col">
                <div className="card shadow-sm h-100">
                    <div className="card-body d-flex flex-column flex-wrap align-items-center">
                        <div className="align-self-start">
                            <input className="form-check-input delete-checkbox" type="checkbox" id="flexCheckDefault" onChange={this.handleCheckboxChange} />
                        </div>
                        <p className="card-text">{sku}</p>
                        <p className="card-text">{name}</p>
                        <p className="card-text">{`${price} $`}</p>
                        <p className="card-text text-center">{`${typeProperty}: ${typeValue} ${unit}`}</p>
                    </div>
                </div>
            </div>
        );
    }
};

export default Product;