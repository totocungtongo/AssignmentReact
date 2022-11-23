import "./App.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import React, { useState, useEffect } from "react";
import Axios from "axios";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";

function App() {
  const [data, setData] = useState([]);
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState(1);
  const [description, setDesc] = useState("");

  const [nameEdit, setNameEdit] = useState("");
  const [priceEdit, setPriceEdit] = useState(1);
  const [imageEdit, setImageEdit] = useState("");
  const [descEdit, setDescEdit] = useState("");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (id) => setShow(id);

  const getData = () => {
    Axios({
      method: "get",
      url: "http://localhost:7777/product",
    }).then(function (response) {
      setData(response.data.data);
    });
  };
  const handleAdd = (e) => {
    e.preventDefault();
    Axios({
      method: "post",
      url: "http://localhost:7777/product",
      data: {
        name: name,
        price: parseInt(price),
        image: image,
        description: description,
      },
    }).then(function (response) {
      setName("");
      setImage("");
      setPrice(1);
      getData();
    });
  };
  const handleEdit = () => {
    Axios({
      method: "put",
      url: `http://localhost:7777/product/${show}`,
      data: {
        name: nameEdit,
        price: parseInt(priceEdit),
        image: imageEdit,
        description: descEdit,
      },
    }).then(function (response) {
      handleClose();
      setNameEdit("");
      setImageEdit("");
      setPriceEdit(1);
      setDescEdit("");
      getData();
    });
  };

  const handleDelete = (id) => {
    if (window.confirm(`Delete ID ${id}?`)) {
      Axios({
        method: "post",
        url: `http://localhost:7777/product/delete/${id}`,
      }).then(function (response) {
        getData();
      });
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Form onSubmit={handleAdd}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            value={name}
            name="name"
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter product name"
            type="text"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicImage">
          <Form.Label>Image</Form.Label>
          <Form.Control
            value={image}
            name="name"
            onChange={(e) => setImage(e.target.value)}
            type="url"
            placeholder="Input url image"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPrice">
          <Form.Label>Description</Form.Label>
          <Form.Control
            value={description}
            name="description"
            onChange={(e) => setDesc(e.target.value)}
            type="text"
            placeholder="Description"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPrice">
          <Form.Label>Price</Form.Label>
          <Form.Control
            value={price}
            name="price"
            onChange={(e) => setPrice(e.target.value)}
            type="text"
            placeholder="Price"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Addgit remote add origin
          https://github.com/totocungtongo/AssignmentReact.git
        </Button>
      </Form>
      <Row className="cardProduct">
        {data.map((item, index) => {
          return (
            <Col>
              <Card style={{ width: "18rem" }} key={index}>
                <Card.Img variant="top" src={item.image} />
                <Card.Body>
                  <Card.Title>
                    {index + 1}.{item.name}
                  </Card.Title>
                  <Card.Text>Description: {item.description}</Card.Text>
                  <Card.Text>Rp.{item.price}</Card.Text>
                  <Button variant="primary" onClick={() => handleShow(item.id)}>
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>New Name</Form.Label>
              <Form.Control
                value={nameEdit}
                type="text"
                onChange={(e) => setNameEdit(e.target.value)}
                placeholder="Enter Edited  name"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicAge">
              <Form.Label>New image</Form.Label>
              <Form.Control
                value={imageEdit}
                type="text"
                onChange={(e) => setImageEdit(e.target.value)}
                placeholder="Enter Edited image"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicAge">
              <Form.Label>New Description</Form.Label>
              <Form.Control
                value={descEdit}
                type="text"
                onChange={(e) => setDescEdit(e.target.value)}
                placeholder="Enter Edited Description"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicAge">
              <Form.Label>New Price</Form.Label>
              <Form.Control
                value={priceEdit}
                type="text"
                onChange={(e) => setPriceEdit(e.target.value)}
                placeholder="Enter Edited Price"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEdit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default App;
