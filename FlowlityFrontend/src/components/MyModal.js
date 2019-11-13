import React, {Component} from 'react';
import { Modal, Button, ButtonToolbar } from 'react-bootstrap';

function MyVerticallyCenteredModal(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Modify inventory
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h6>Change the inventory of an existing product</h6>


            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

function MyModal() {
    const [modalShow, setModalShow] = React.useState(false);

    return (
        <ButtonToolbar>
            <Button variant="secondary" size="xl" onClick={() => setModalShow(true)}>
                Modify a product
            </Button>

            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </ButtonToolbar>
    );
}

export default MyModal;