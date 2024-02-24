import React, { Component } from "react";
import { Col, Container, Row } from "react-bootstrap";
// import "./App.css";
import ListCategories from "../components/ListCategories";
import Hasil from "../components/Hasil";
import { API_URL } from "../utils/constant";
import axios from "axios";
import Menus from "../components/Menus";
import swal from "sweetalert";
import NavbarComponent from "../components/NavbarComponent";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menus: [],
      categorySelected: "Minuman",
      keranjangs: [],
    };
  }
  componentDidMount() {
    axios
      .get(API_URL + "products?category.nama=" + this.state.categorySelected)
      .then((res) => {
        const menus = res.data;
        this.setState({ menus });
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(API_URL + "keranjangs")
      .then((res) => {
        const keranjang = res.data;
        this.setState({ keranjangs: keranjang });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  componentDidUpdate(prevState) {
    if (this.state.keranjangs !== prevState.keranjangs) {
      axios
        .get(API_URL + "keranjangs")
        .then((res) => {
          const keranjang = res.data;
          this.setState({ keranjangs: keranjang });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
  changeCategory = (value) => {
    this.setState({
      categorySelected: value,
      menus: [],
    });
    axios
      .get(API_URL + "products?category.nama=" + value)
      .then((res) => {
        const menus = res.data;
        this.setState({ menus });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  addToKeranjang = (datanya) => {
    // console.log(datanya)
    axios
      .get(API_URL + "keranjangs?menu.id=" + datanya.id)
      .then((res) => {
        if (res.data.length === 0) {
          const cart = {
            qty: 1,
            total: datanya.harga,
            menu: datanya,
          };
          axios
            .post(API_URL + "keranjangs", cart)
            .then((res) => {
              swal({
                title: "Sukses!",
                text: "Sukses Masuk Keranjang " + cart.menu.nama,
                icon: "success",
                button: false,
                timer: 1000,
              });
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          const cart = {
            qty: res.data[0].qty + 1,
            total: res.data[0].total + datanya.harga,
            menu: datanya,
          };
          axios
            .put(API_URL + "keranjangs/" + res.data[0].id, cart)
            .then((res) => {
              console.log(res);
              swal({
                title: "Sukses!",
                text: "Sukses Masuk Keranjang " + cart.menu.nama,
                icon: "success",
                button: false,
                timer: 1000,
              });
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  render() {
    const { menus, categorySelected, keranjangs } = this.state;
    return (
      <>
        <NavbarComponent />
          <Container fluid className="mt-4">
            <Row>
              <ListCategories
                categorySelected={categorySelected}
                changeCategory={this.changeCategory}
              />
              <Col md={7}>
                <h4>Daftar Produk</h4>
                <hr />
                <Row>
                  {menus &&
                    menus.map((menu) => (
                      <Menus
                        key={menu.id}
                        menu={menu}
                        addKeranjang={this.addToKeranjang}
                      />
                    ))}
                </Row>
              </Col>
              <Hasil keranjang={keranjangs} {...this.props} />
            </Row>
          </Container>
      </>
    );
  }
}
