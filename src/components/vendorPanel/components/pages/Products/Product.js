/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import { Form, FormGroup, Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";

import axios from "axios";
import { Baseurl, Auth, showMsg } from "../../../../../Baseurl";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import { Store } from "react-notifications-component";
import Loader1 from "../../../../../Loader/Loader";

const Product = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${Baseurl}/api/v1/products`, Auth());
      console.log(data);
      setData(data?.products);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteData = async (id) => {
    try {
      const { data } = await axios.delete(
        `${Baseurl}/api/v1/admin/product/${id}`,
        Auth()
      );
      Store.addNotification({
        title: "Success",
        message: "Product Deleted Successfully",
        type: "success",
        insert: "top",
        container: "top-right",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
          duration: 3000,
          onScreen: true,
        },
      });

      fetchData();
    } catch (e) {
      console.log(e);
    }
  };

  function MyVerticallyCenteredModal(props) {
    const [name, setName] = useState("");
    const [image, setImage] = useState([]);
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [countInStock, setCountInStock] = useState("");
    const [category, setCategory] = useState("");
    const [rating, setRating] = useState("");
    const [subCategory, setSubCategory] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [subCategoryId, setSubCategoryId] = useState("");

    const getAllCategories = () => {
      const authHeaders = Auth();

      axios
        .get(`${Baseurl}/api/v1/catogory/getAllCategory`, authHeaders)
        .then((res) => {
          console.log(res.data?.categories);
          setCategory(res.data?.categories);
        })
        .catch((e) => {
          console.log(e);
        });
    };

    const getAllSubCategory = () => {
      if (categoryId) {
        axios
          .get(
            Baseurl +
              `/api/v1/admin/subCategory/getAllsubCategory/${categoryId}`
          )
          .then((res) => {
            setSubCategory(res?.data?.data);
            console.log(res?.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    };

    useEffect(() => {
      getAllCategories();
      if (categoryId) {
        getAllSubCategory();
      }
    }, [categoryId]);

    const postData = async (e) => {
      e.preventDefault();
      const formdata = new FormData();
      if (name) formdata.append("name", name);
      if (image) formdata.append("image", image);
      if (description) formdata.append("description", description);
      if (price) formdata.append("price", price);
      if (countInStock) formdata.append("countInStock", countInStock);
      if (category) formdata.append("category", category);
      if (rating) formdata.append("rating", rating);
      if (subCategory) formdata.append("subCategory", subCategory);
      if (categoryId) formdata.append("categoryId", categoryId);
      if (subCategoryId) formdata.append("subCategoryId", subCategoryId);
      try {
        axios
          .post(Baseurl + "/api/v1/vender/product/new", formdata, Auth())
          .then((res) => {
            console.log(res);
          });
        console.log(data);
        fetchData();
        props.onHide();
        Store.addNotification({
          title: "Success",
          message: "Product Added Successfully",
          type: "success",
          insert: "top",
          container: "top-right",
          animationIn: ["animated", "fadeIn"],
          animationOut: ["animated", "fadeOut"],
          dismiss: {
            duration: 3000,
            onScreen: true,
          },
        });
      } catch (e) {
        console.log(e);
      }
    };

    return (
      <Modal
        {...props}
        size="lg-down"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add Product
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={postData}>
            <FormGroup className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                multiple
                required
                onChange={(e) => setImage(e.target.files[0])}
              />
            </FormGroup>

            <FormGroup className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                required
                onChange={(e) => setName(e.target.value)}
              />
            </FormGroup>

            <FormGroup className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                required
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormGroup>

            <FormGroup className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                required
                onChange={(e) => setPrice(e.target.value)}
              />
            </FormGroup>

            <FormGroup className="mb-3">
              <Form.Label>CountInStock</Form.Label>
              <Form.Control
                type="number"
                required
                onChange={(e) => setCountInStock(e.target.value)}
              />
            </FormGroup>

            <FormGroup className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select
                aria-label="Default select example"
                required
                onChange={(e) => setCategoryId(e.target.value)}
              >
                <option>Select Category</option>
                {category.length > 0 &&
                  category?.map((i, index) => (
                    <option key={index} value={i._id}>
                      {i.name}
                    </option>
                  ))}
              </Form.Select>
            </FormGroup>
            <FormGroup className="mb-3">
              <Form.Label>SubCategory</Form.Label>
              <Form.Select
                aria-label="Default select example"
                required
                onChange={(e) => setSubCategoryId(e.target.value)}
              >
                <option>Select Category</option>
                {subCategory.length > 0 &&
                  subCategory?.map((i, index) => (
                    <option key={index} value={i._id}>
                      {i.subCategory}
                    </option>
                  ))}
              </Form.Select>
            </FormGroup>

            <Button variant="outline-success" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    );
  }

  return (
    <>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />

      <section>
        <div className="pb-4 sticky top-0  w-full flex justify-between items-center bg-white">
          <span className="tracking-widest text-slate-900 font-semibold uppercase ">
            All Products
          </span>
          <Button
            variant="outline-success"
            onClick={() => {
              setModalShow(true);
            }}
          >
            Add-Product
          </Button>
        </div>
      </section>

      <section
        className="main-card--container"
        style={{
          color: "black",
          marginBottom: "10%",
        }}
      >
        {loading ? (
          <Loader1 />
        ) : (
          <Table responsive style={{ width: "950px" }}>
            <thead>
              <tr>
                <th>No.</th>
                <th>Image</th>
                <th>Name</th>
                <th>Price </th>
                <th>Ratings</th>
                <th>Category Name</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {data?.map((i, index) => (
                <tr key={index}>
                  <td>#{index + 1} </td>
                  <td>
                    <img
                      src={i.images[0]?.img}
                      alt=""
                      style={{ maxWidth: "100px", height: "70px" }}
                    />
                  </td>

                  <td>{i.name}</td>
                  <td>{i.price}</td>
                  <td>{i.ratings}</td>
                  <td>{i.category?.name}</td>

                  <td
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    <span className="flexCont" style={{ gap: "15px" }}>
                      {/* <Link to={`/admin/product/${i._id}`}>
                      <i className="fa-solid fa-eye" />
                    </Link> */}
                      <i
                        className="fa-sharp fa-solid fa-trash"
                        onClick={() => deleteData(i._id)}
                      ></i>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </section>
    </>
  );
};

export default HOC(Product);
