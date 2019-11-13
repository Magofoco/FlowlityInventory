import React, {Component,  useState, useEffect, useCallback, callback} from 'react';
import {Form, Col} from 'react-bootstrap';
import MyGraph from "./MyGraph";
import axios from "axios";

function SingleInventoryChanger({singleInventory, singleDate, singleName, handler}) {
    const [newInventory, setNewInventory] = React.useState([{singleInventory}]);

    function handleChange(event) {
        setNewInventory(event.target.value)
    }

    function handleSubmit(event){
        event.preventDefault();
        handler(newInventory, singleDate, singleName)

        var myParams = {
            "new_inventory": newInventory,
            "single_date": singleDate,
            "single_name": singleName
        }

        axios.post('http://localhost:5000/api/updating_inventory', myParams)
            .then(function(response){
                console.log("RESPONSE")
                console.log(response)
            })
            .catch(function(error){
                console.log(error, "Error on AXIOS post");
                throw error;
            });

    }

    return(
        <div>
            <Form onSubmit={handleSubmit}>
                <Form.Row>
                    <Col>
                        <Form.Control
                            placeholder={singleInventory} onChange={handleChange}
                            style={{backgroundColor: "transparent", border: "none", textAlign: "center" }}
                        />
                    </Col>
                </Form.Row>
            </Form>
        </div>
    )
}

export default SingleInventoryChanger;