import React, {Component} from 'react';
import { Spinner } from 'react-bootstrap';

function Loader({loading}) {
    if (loading) {
        return (
            <div>
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            </div>
        );
    } else {
        return null

    }
}


export default Loader;