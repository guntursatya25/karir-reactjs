import React, { useEffect } from "react";
import NavbarComponent from "../components/NavbarComponent";
import { Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../utils/constant";

const Succes = () => {
  useEffect(() => {
    axios
      .get(API_URL + "keranjangs")
      .then((res) => {
        const keranjang = res.data;
        keranjang.forEach((item) => {
          if (item.id){
            axios
            .delete(API_URL + "keranjangs/" + item.id)
            .then((res) => {
              // console.log(res);
            })
            .catch((error) => {
              console.log(error);
            });
          }
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <NavbarComponent />
      <div className="text-center mt-5">
        <Image src="assets/images/sukses_order.svg" width="500" />
        <h2 className="mt-2">Order Successful!</h2>
        <Button
          variant="primary"
          size="lg"
          className="mt-1 mb-2"
          as={Link}
          to="/"
        >
          Kembali
        </Button>
      </div>
    </>
  );
};

export default Succes;
