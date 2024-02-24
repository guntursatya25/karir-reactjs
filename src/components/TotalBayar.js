import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { rupiah } from "../utils/utils";
import { Button, Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { API_URL } from "../utils/constant";

const TotalBayar = ({ keranjang }) => {
  const [totalBayar, setTotalBayar] = useState(0);
  const navigate = useNavigate();

  const submitCart = () => {
    const pesanans = {
      total_bayar: totalBayar,
      menu: keranjang,
    };
    axios
      .post(API_URL + "pesanans", pesanans)
      .then((res) => {
        navigate("/sukses");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const total = keranjang.reduce((acc, item) => acc + item.total, 0);
    setTotalBayar(total);
  }, [keranjang]);

  return (
    <Row>
      <Col
        md={3}
        className="px-4 mb-3"
        style={{ position: "fixed", right: 0, bottom: 0 }}
      >
        <h4>
          Total Bayar:
          <strong className="float-end me-2">{rupiah(totalBayar)}</strong>
        </h4>
        <Button
          variant="primary"
          size="lg"
          className="mt-1 mb-2"
          style={{ width: "100%" }}
          onClick={submitCart}
        >
          <FontAwesomeIcon icon={faShoppingCart} /> <strong>Bayar</strong>
        </Button>
      </Col>
    </Row>
  );
};

export default TotalBayar;
