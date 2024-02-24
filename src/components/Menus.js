import React from "react";
import { Button, Card, Col } from "react-bootstrap";
import { rupiah } from "../utils/utils";
const Menus = ({ menu, addKeranjang }) => {
  return (
      <Col md={4} xs={6} className="mb-2">
        <Card className="shadow" >
          <Card.Img variant="top" src={"assets/images/" + menu.category.nama.toLowerCase()+"/"+menu.gambar} />
          <Card.Body>
            <Card.Title>{menu.nama} <strong>({menu.kode})</strong></Card.Title>
            <Card.Text>
              {rupiah(menu.harga)}
            </Card.Text>
            <Button variant="primary" onClick={() => addKeranjang(menu)}>Add Cart</Button>
          </Card.Body>
        </Card>
      </Col>
  );
};

export default Menus;
