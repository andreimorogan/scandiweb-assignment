import React, { Component } from 'react';
import Header from '../components/Header';
import Button from '../components/Button';
import Field from '../components/Field';
import FieldDescription from '../components/FieldDescription';
import Errors from '../components/Errors';

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            option: 'dvd',
            errors: [],
            isValid: {
                sku: false,
                name: false,
                price: false
            },
            product: {
                sku: '',
                name: '',
                price: '',
                typeProperty: 'Size',
                typeValue: ''
            },
            dimensions: {
                height: '',
                width: '',
                length: '',
            }
        };
    };

    checkValidity = (e) => {
        const input = e.target;
        const valid = input.checkValidity();
        const { id } = input;
        this.setState(prevState => ({
            isValid: {
                ...prevState.isValid,
                [id]: valid,
            },
        }));
        if (valid) {
            input.classList.remove("is-invalid");
            input.classList.add("is-valid");
        } else {
            input.classList.remove("is-valid");
            input.classList.add("is-invalid");
        }
    }

    handleOptions = (e) => {
        const { isValid } = this.state;
        const option = e.target.value;
        const typeProperties = {
            dvd: 'Size',
            book: 'Weight',
            furniture: 'Dimensions'
        };
        this.setState(prevState => ({
            option,
            product: {
                ...prevState.product,
                typeValue: '',
                typeProperty: typeProperties[option]
            },
            isValid: {
                sku: isValid.sku,
                name: isValid.name,
                price: isValid.price
            }
        }));
    };

    handleBase = (e) => {
        this.checkValidity(e);
        const { id, value } = e.target;
        this.setState(prevState => ({
            product: {
                ...prevState.product,
                [id]: value
            }
        }));
    };

    handleSizeWeight = (e) => {
        this.checkValidity(e)
        const { value } = e.target;
        this.setState(prevState => ({
            product: {
                ...prevState.product,
                typeValue: value
            }
        }));
    };

    handleDimensions = (e) => {
        this.checkValidity(e);
        const { id, value } = e.target;
        this.setState(prevState => ({
          dimensions: {
            ...prevState.dimensions,
            [id]: value
          },
          product: {
            ...prevState.product,
            typeValue: Object.values({
              ...prevState.dimensions,
              [id]: value
            }).join("x")
          }
        }));
      };
      

    handleSubmit = async () => {
        const { product, isValid } = this.state;
        const isAllValid = Object.values(isValid).every(value => value === true);
        if (isAllValid) {
            const request = await fetch("https://andreimorogan-scandiweb-assignment-backend.000webhostapp.com/", {
                method: 'POST',
                body: JSON.stringify(product)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok.");
                }
                return response.json();
            })
            .then(data => {
                if (data === "Product created successfully") {
                    window.location.href = '/scandiweb-assignment';
                } else {
                    this.setState({ errors: data });
                }
            })
            .catch(error => {
                console.log("Error:", error);
            })
        }
    }

    extraFields = {
        dvd: [
            <div key="dvd-field">
                <Field key="size" fieldId="size" fieldLabel="Size (MB)" fieldType="number" minLength="1" step="1" max="10000"  topMargin="1em" onChangeMethod={this.handleSizeWeight} />
                <FieldDescription key="size-desc" desc="Please provide the size in MBs. (max. 10.000)" />
            </div>

        ],
        book: [
            <div key="book-field">
                <Field key="weight" fieldId="weight" fieldLabel="Weight (KG)" fieldType="number" minLength="1" step="0.01" max="100"  topMargin="1em" onChangeMethod={this.handleSizeWeight} />
                <FieldDescription key="weight-desc" desc="Please provide the weight in KGs. (max. 100)" />
            </div>
        ],
        furniture: [
            <div key="furniture-field">
                <Field key="height" fieldId="height" fieldLabel="Height (CM)" fieldType="number" minLength="1" step="0.01" max="3000" topMargin="1em" onChangeMethod={this.handleDimensions} />
                <Field key="width" fieldId="width" fieldLabel="Width (CM)" fieldType="number" minLength="1" step="0.01" max="3000" onChangeMethod={this.handleDimensions} />
                <Field key="length" fieldId="length" fieldLabel="Length (CM)" fieldType="number" minLength="1" step="0.01" max="3000" onChangeMethod={this.handleDimensions} />
                <FieldDescription key="dimension-desc" desc="Please provide the dimensions in the HxWxL format. (max. 3000 for each)" />
            </div>
        ]
    };
    

    render() {
        const { option, errors } = this.state;
        return (
            <form onSubmit={this.handleSubmit} className="needs-validation product-form">
                <Header title="Add Products" >
                    <Button color="success" text="Save" link="/add-product" handleSubmit={this.handleSubmit} />
                    <Button id="delete-product-btn" color="danger" text="Cancel" link="/" />
                </Header>
                <div id="product_form">
                    <Field fieldId="sku" fieldLabel="SKU" fieldType="text" minLength="1" maxLength="50" onChangeMethod={this.handleBase} />
                    <FieldDescription key="sku-desc" desc="SKU needs to be unique." />
                    <Field fieldId="name" fieldLabel="Name" fieldType="text" minLength="1" maxLength="255" onChangeMethod={this.handleBase} />
                    <Field fieldId="price" fieldLabel="Price ($)" fieldType="number" minLength="1" step="0.01"  onChangeMethod={this.handleBase} />
                    <div className="container ms-3">
                        <div className="row">
                            <div id="productType" className="col col-md-5 me-5">
                                <div className="input-group">
                                    <label htmlFor="switcher" className="input-group-text">Type Switcher:</label>
                                    <select className="form-select w-25" id="switcher" value={option} onChange={this.handleOptions}>
                                        <option value="dvd">DVD</option>
                                        <option value="book">Book</option>
                                        <option value="furniture">Furniture</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    {this.extraFields[option]}
                    {errors ? <Errors err={errors} /> : null}
                </div>
            </form>
        );
    }
};

export default Form;