import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { rupiah } from "../utils/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";

const ModalKeranjang = ({ show, handleClose, products, qty, totalHarga, addQty, minQty, changeHandler, handleSubmit, keterangan, deleteCart }) => {
  if (products) {
    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <strong>{qty}</strong> {products.menu.nama}{" "}
            <strong>({rupiah(totalHarga)})</strong>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => handleSubmit(e)}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>Total Harga: </Form.Label>
              <p>
                <strong>{rupiah(totalHarga)}</strong>
              </p>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label >Jumlah: </Form.Label> <br></br>
              <Button size="sm" className="me-2" onClick={() =>minQty()}>
                <FontAwesomeIcon icon={faMinus} />
              </Button>
              {qty}
              <Button size="sm" className="ms-2" onClick={() =>addQty()}>
                <FontAwesomeIcon icon={faPlus} />
              </Button>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Keterangan</Form.Label>
              <Form.Control as="textarea" rows={3} name="keterangann" value={keterangan}
                onChange={(event) => changeHandler(event)}/>
            </Form.Group>
            <Button variant="primary" type="submit">Save Changes</Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => deleteCart(products)}><FontAwesomeIcon icon={faTrash} /> Hapus</Button>
        </Modal.Footer>
      </Modal>
    );
  }
};

export default ModalKeranjang;
