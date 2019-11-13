import React, {Component,  useState, useEffect,} from 'react';
import { Form, Button, Container, Col, Row } from 'react-bootstrap';
import MyGraph from "./MyGraph";
import MyTable from "./MyTable";
import Loader from "./Loader";
import axios from 'axios';


function SearchProductForm() {
    const [allProducts, setAllProducts] = React.useState([]);
    const [allDates, setAllDates] = React.useState([]);
    const [selectedProducts, setSelectedProducts] = React.useState(['1']);
    const [selectedDates, setSelectedDates] = React.useState(['15-11-2019']);
    const [results, setResults] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    useEffect(() => {
        firstRender();
    }, []);

    function firstRender() {
        return axios.get('http://localhost:5000/api/all_products_dates')
                .then(function (response) {
                    setAllProducts(response.data['products_dates'][0]);
                    setAllDates(response.data['products_dates'][1]);
                })
    }


    function handler(newInventory, singleDate, singleName) {
        let resultsToModify = results
        let index_product_date = allDates.indexOf(singleDate)

        let i;
        for (i = 0; i < (resultsToModify["selected_products"]).length; i++) {
            let productName = resultsToModify["selected_products"][i]["product_name"]
            let productAllInventory = resultsToModify["selected_products"][i]["inventory"]
            if (singleName === productName )
                {
                    productAllInventory[index_product_date] = parseInt(newInventory, 10)
                    setResults(resultsToModify)
                }
        }
    }


    function searchProducts(selectedProducts, selectedDates) {
        var myParams = {
            "products_query": selectedProducts,
            "dates_query": selectedDates,
        }


        return axios.post('http://localhost:5000/api/search', myParams)
            .then(function(response){
                setLoading(true)
            })
            .catch(function(error){
                console.log(error, "Error on AXIOS post");
                throw error;
            });
    }


    function getProductsData() {
        return axios.get('http://localhost:5000/api/results')
            .then(function (response) {
                setResults(response.data);
                setLoading(false)
            })
    }

    function handleSubmit(event){
        event.preventDefault();
        searchProducts(selectedProducts, selectedDates)
            .then(() => getProductsData())

    }

    function addSelectedProducts(event) {
        const selectedOptions = [...event.target.selectedOptions].map(o => o.value)
        setSelectedProducts(selectedOptions)
    }

    function addSelectedDates(event) {
        const selectedOptions = [...event.target.selectedOptions].map(o => o.value)
        setSelectedDates(selectedOptions)
    }

    return (
        <div>
            <Container>

            <Form>
                <Form.Group controlId="productForm">
                    <Form.Label style={{marginTop: "40px"}}>
                        <h4>Select the product(s) and the date(s) you are interested in:</h4>
                    </Form.Label>
                    <Row>
                        <Col>
                            <Form.Control as="select" onChange={(event) => addSelectedProducts(event)} multiple>
                                {allProducts.map((product, idx) =>
                                    <option key={idx} value={idx+1} selected={idx===0} >{product}</option>
                                )}
                            </Form.Control>
                        </Col>
                        <Col>
                            <Form.Control as="select" onChange={(event) => addSelectedDates(event)} multiple>
                                {allDates.map((date, idx) =>
                                    <option key={idx} value={date} selected={idx===0}>{date}</option>
                                )}
                            </Form.Control>
                        </Col>

                    </Row>
                </Form.Group>
                <Button variant="secondary" type="submit" onClick={handleSubmit}
                        style={{marginBottom: "20px"}}
                >
                    Search
                </Button>
            </Form>
            <Loader loading={loading}/>

            <MyGraph allDates={allDates} results={results} handler={handler}/>

            <MyTable allDates={allDates} results={results} handler={handler}/>
            </Container>

        </div>
    );
}

export default SearchProductForm;