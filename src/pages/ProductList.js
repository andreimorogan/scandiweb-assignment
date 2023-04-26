import React, { Component } from 'react';
import Header from '../components/Header';
import Button from "../components/Button";
import Grid from '../containers/Grid';
import Product from '../components/Product';
import Footer from '../components/Footer';

class ProductList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            products: [],
            forDeletion: []
        };
    }

    componentDidMount() {
        this.grabProducts();
    }

    grabProducts = async () => {
        const response = await fetch("https://andreimorogan-scandiweb-assignment-backend.000webhostapp.com/")
        .then(response=>response.json())
        this.setState({ products: response });
    };

    handleCheckboxChange = (sku, isChecked) => {
        const forDeletion = [...this.state.forDeletion];
        if (isChecked) {
            forDeletion.push(sku);
        } else {
            const index = forDeletion.indexOf(sku);
            if (index > -1) {
                forDeletion.splice(index, 1);
            }
        }
        this.setState({ forDeletion });
    }

    massDelete = async () => {
        const { forDeletion } = this.state;
        if (forDeletion.length > 0) {
            const request = await fetch("https://andreimorogan-scandiweb-assignment-backend.000webhostapp.com/delete", {
                method: 'POST',
                body: JSON.stringify(forDeletion)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok.");
                }
                return response.json();
            })
            .then(data => {
                this.grabProducts();
            })
            .catch(error => {
                console.log("Error:", error);
            })
        } else {
            console.log("Please select at least one product to delete.");
        }
    }
    
    
    propertyUnits = {
        'Weight': "KG",
        'Size': "MB",
        'Dimensions': ""
    }

    render() {
        return (
            <>
                <Header title="Product List" >
                    <Button color="success" text="ADD" link="/add-product" />
                    <Button id="delete-product-btn" color="danger" text="MASS DELETE" handleSubmit={this.massDelete} />
                </Header>
                <Grid>
                    {this.state.products.map(product => (
                        <Product
                            key={product.product_id}
                            sku={product.sku}
                            name={product.name}
                            price={product.price}
                            typeProperty={product.property_type}
                            typeValue={product.property_value}
                            unit={this.propertyUnits[product.property_type]}
                            onCheckboxChange={this.handleCheckboxChange}
                        />
                    ))}
                </Grid>
                <Footer />
            </>

        );
    }
};

export default ProductList;
