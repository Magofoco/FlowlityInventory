import React, {Component,  useState, useEffect, useCallback} from 'react';
import { Table, Container } from 'react-bootstrap';
import SingleInventoryChanger from "./SingleInventoryChanger";
// import MyGraph from "./MyGraph";

const MyTable = ({results, allDates, handler}) => {

    let indicesDates = []
    let selectedDates = results["selected_dates"]

    if (results.length !== 0) {
        let i
        for (i in selectedDates) {
            if (allDates.includes(selectedDates[i])){
                indicesDates.push(allDates.indexOf(selectedDates[i]))
            }
        }
    }

    function getInventory(inventory) {
        let inventory_at_date = []
        if (inventory) {
            inventory_at_date = indicesDates.map(idx => inventory[idx])
            return inventory_at_date
        } else {
            return null
        }
    }

    function getAllInventory(selected_products) {
        if (selected_products) {
            return(
                selected_products.map(product =>
                    <tr>
                        {product['product_name']}
                        {getInventory(product['inventory']).map((single_inventory, idx) =>
                            <td key={single_inventory}>
                                <SingleInventoryChanger
                                allDates={allDates}
                                results={results}
                                singleName={product['product_name']}
                                singleInventory={single_inventory}
                                singleDate={selectedDates[idx]}
                                allDates={allDates}
                                handler={handler}
                                />
                            </td>
                        )}
                    </tr>
                )
            )
        } else {
            return null
        }
    }


    if (results.length === 0) {
        return null
    } else {
        return(
            <div>
                <Container>
                    {/*<MyGraph allDates={allDates} results={results} style={{paddingBottom: "50px"}} />*/}
                    <br/>
                    <br/>
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>Product</th>
                                {selectedDates.map(date =>
                                    <th key={date}>{date}</th>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {getAllInventory(results['selected_products'])}
                        </tbody>
                    </Table>
                </Container>
            </div>
        )
    }
}

export default MyTable;