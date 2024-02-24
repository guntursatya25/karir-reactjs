import axios from "axios";
import React, { Component } from "react";
import { Col, ListGroup } from "react-bootstrap";
import { API_URL } from "../utils/constant";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUtensils,
  faCoffee,
  faCheese,
} from "@fortawesome/free-solid-svg-icons";

const Icon = ({ nama }) => {
  if (nama === "makanan") {
    return <FontAwesomeIcon icon={faUtensils} className="me-2" />;
  }
  if (nama === "minuman") {
    return <FontAwesomeIcon icon={faCoffee} className="me-1" />;
  }
  if (nama === "cemilan") {
    return <FontAwesomeIcon icon={faCheese} className="me-2" />;
  }

  return <FontAwesomeIcon icon={faUtensils} />;
};
export default class ListCategories extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
    };
  }
  componentDidMount() {
    axios
      .get(API_URL + "categories")
      .then((res) => {
        const data = res.data;
        this.setState({ categories: data });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    const { categories } = this.state;
    const { changeCategory, categorySelected } = this.props;
    return (
      <Col md={2} mt="2">
        <h4>Daftar Kategori</h4>
        <hr />
        <ListGroup as="ul">
          {categories &&
            categories.map((category) => (
              <ListGroup.Item
                as="li"
                style={{ cursor: "pointer" }}
                key={category.id}
                active={categorySelected === category.nama}
                onClick={() => changeCategory(category.nama)}
              >
                <Icon nama={category.nama.toLowerCase()} /> {category.nama}
              </ListGroup.Item>
            ))}
        </ListGroup>
      </Col>
    );
  }
}
