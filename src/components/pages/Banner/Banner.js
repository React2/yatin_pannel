/** @format */

import React, { useState } from "react";
import HOC from "../../layout/HOC";
import Table from "react-bootstrap/Table";
import { AiFillDelete, AiOutlineEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import { Auth, Baseurl } from "../../../Baseurl";

const BannerImage = [
  {
    image:
      "https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp",
    name: "Image Of Banner",
  },
  {
    image: "https://mdbcdn.b-cdn.net/img/Photos/Vertical/mountain1.webp",
    name: "Image Of Banner",
  },
  {
    image: "https://mdbcdn.b-cdn.net/img/Photos/Vertical/mountain2.webp",
    name: "Image Of Banner",
  },
  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-A0sC9efi8q1WcBOSxiL54JeverkoprDEEw&usqp=CAU",
    name: "Image Of Banner",
  },
  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShlG4Urst44E0RNXFWEHFZsLucIj1DzOE7CA&usqp=CAU",
    name: "Image Of Banner",
  },
  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScy9iUuq9tuI8od0d9Ekpzmcpdy3U2uS8JZjHfGy9L7w_SRqB4iwhQI3FhMeLU1r_3h_c&usqp=CAU",
    name: "Image Of Banner",
  },
];

const Banner = () => {
  const [modalShow, setModalShow] = React.useState(false);

  const [edit, setEdit] = useState(false);
  const [data, setData] = useState([]);

  const BannerImages = () => {
    axios.get(Baseurl + "/api/v1/banner/all", Auth).then((res) => {
      console.log(res.data);

      setData(res.data);
    });
  };
  useEffect(() => {
    BannerImages();
  }, []);
  function MyVerticallyCenteredModal(props) {
    const submitHandler = async (e) => {
      e.preventDefault();
      toast.success("Banner Added Successfully");
      setModalShow(false);
    };
    const editBan = async (e) => {
      e.preventDefault();
      toast.success("Banner Edit Successfully");
      setModalShow(false);
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
            {edit ? "Edit Banner" : "Add Banner"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            style={{
              color: "black",
              margin: "auto",
            }}
            onSubmit={edit ? editBan : submitHandler}
          >
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Image</Form.Label>
              <Form.Control type="file" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="New" required />
            </Form.Group>

            <Button variant="outline-success" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  const deleteData = async (name) => {
    toast.info("Banner Deleted SuccessFully");
  };

  return (
    <>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />

      <section>
        <div className="pb-4 sticky top-0  w-full flex justify-between items-center bg-white">
          <span className="tracking-widest text-slate-900 font-semibold uppercase ">
            All Banner
          </span>
          <Button
            variant="outline-success"
            onClick={() => {
              setEdit(false);
              setModalShow(!modalShow);
            }}
          >
            Add-Banner
          </Button>
        </div>
      </section>

      <section
        className="main-card--container"
        style={{ color: "black", marginBottom: "10%" }}
      >
        <Table>
          <thead>
            <tr>
              <th>No.</th>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Sub-Category</th>
              <th>MRP</th>
              <th>Selling Price</th>
              <th>Discount</th>
              <th>Stock</th>
              <th>Vendor</th>
              <th>Created At</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {data?.map((i, index) => (
              <tr key={index}>
                <td>#{index + 1} </td>
                <td>
                  <img
                    src={i.productImage?.[0]}
                    alt=""
                    style={{ maxWidth: "80px" }}
                  />
                </td>
                <td>{i.productName}</td>
                <td>{i.categoryId?.name}</td>
                <td>{i.subcategoryId?.name}</td>
                <td>₹{i.originalPrice}</td>
                <td>₹{i.discountPrice}</td>
                <td>{i.discount}%</td>
                <td>{i.stock}</td>
                <td> {i.vendorId?.fullName} </td>
                <td>{i.createdAt?.slice(0, 10)}</td>
                <td>
                  <span className="flexCont">
                    <Link to={`/admin/product/${i._id}`}>
                      <i className="fa-solid fa-eye" />
                    </Link>
                    <i
                      className="fa-sharp fa-solid fa-trash"
                      onClick={() => deleteHandler(i._id)}
                    ></i>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </section>
    </>
  );
};

export default HOC(Banner);
