import React, { useState } from "react";
import { Badge, Card, Col, ListGroup, Row } from "react-bootstrap";
import { rupiah } from "../utils/utils";
import TotalBayar from "./TotalBayar";
import ModalKeranjang from "./ModalKeranjang";
import { API_URL } from "../utils/constant";
import axios from "axios";
import swal from "sweetalert";

const Hasil = ({ keranjang }) => {
  const [show, setShow] = useState(false);
  const [keranjangDetail, setKeranjangDetail] = useState(false);
  const [jumlah, setJumlah] = useState(0);
  const [keterangan, setKeterangan] = useState("");
  const [totalHarga, setTotalHarga] = useState(0);

  const handleShow = (menus) => {
    setShow(true);
    setKeranjangDetail(menus);
    setJumlah(menus.qty);
    setKeterangan(menus.keterangan);
    setTotalHarga(menus.total);
  };

  const handleClose = () => setShow(false);

  const addQty = () => {
    setJumlah(jumlah + 1);
    setTotalHarga((jumlah + 1) * keranjangDetail.menu.harga);
  };
  const minQty = () => {
    if (jumlah >= 1) {
      setJumlah(jumlah - 1);
      setTotalHarga((jumlah - 1) * keranjangDetail.menu.harga);
    }
  };

  const changeHandler = (e) => {
    setKeterangan(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setShow(false);
    // console.log(e)
    const data = {
      qty: jumlah,
      total: totalHarga,
      menu: keranjangDetail.menu,
      keterangan: keterangan,
    };
    axios
      .put(API_URL + "keranjangs/" + keranjangDetail.id, data)
      .then((res) => {
        swal({
          title: "Update Pesanan!",
          text: "Sukses Update Pesanan " + data.menu.nama,
          icon: "success",
          button: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.log("Error yaa ", error);
      });
  };
  const deleteCart = (product) => {
    console.log(product);
    axios
      .delete(API_URL + "keranjangs/" + product.id)
      .then((res) => {
        swal({
          title: "Hapus Pesanan!",
          text: "Sukses Hapus Pesanan " + keranjangDetail.menu.nama,
          icon: "success",
          button: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.log("Error yaa ", error);
      });
      setShow(false);
    // console.log("Berhasil dihapus");
  };

  return (
    <Col mt="2">
      <h4>Keranjang</h4>
      <hr />
      {keranjang.length !== 0 ? (
        <>
          <Card className="overflow-auto hasilnya">
          <ListGroup variant="flush">
            {keranjang.map((menukeranjang) => (
              <ListGroup.Item
                key={menukeranjang.id}
                onClick={() => handleShow(menukeranjang)}
                style={{ cursor: "pointer" }}
              >
                <Row>
                  <Col xs={2} md={2}>
                    <Badge pill bg="success">
                      {menukeranjang.qty}
                    </Badge>
                  </Col>
                  <Col>
                    <h5>{menukeranjang.menu.nama}</h5>
                    <p>{rupiah(menukeranjang.menu.harga)}</p>
                  </Col>
                  <Col>
                    <strong className="float-end">
                      {rupiah(menukeranjang.total)}
                    </strong>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
          </Card>

          <ModalKeranjang
            show={show}
            handleClose={handleClose}
            products={keranjangDetail}
            qty={jumlah}
            keterangan={keterangan}
            totalHarga={totalHarga}
            addQty={addQty}
            minQty={minQty}
            handleSubmit={handleSubmit}
            changeHandler={changeHandler}
            deleteCart={deleteCart}
          />
          <TotalBayar keranjang={keranjang} />
        </>
      ) : (
        <h3>Cart Empty</h3>
      )}
    </Col>
  );
};

export default Hasil;
