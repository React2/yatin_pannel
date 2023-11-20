/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { Baseurl, Auth, showMsg } from "../../../../../Baseurl";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import { Store } from "react-notifications-component";
import Loader1 from "../../../../../Loader/Loader";

const Ban = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [textdata, setTextdata] = useState("");

  const postData = async (e) => {
    e.preventDefault();
    const formdata = {
      // image,
      image: textdata,
    };
    // if (image) {
    //   formdata.append("image", image);
    // }
    // if (textdata) {
    //   formdata.append("image", textdata);
    // }

    try {
      const { data } = await axios.post(`${Baseurl}/banner`, formdata, Auth);
      console.log(data);
      // fetchData();

      Store.addNotification({
        title: "Success",
        message: "Banner Added Successfully",
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

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${Baseurl}/api/v1/banner/all`, Auth);
      console.log(data.data);
      setData(data.data);
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
        `${Baseurl}/api/v1/banner/delete/${id}`
      );
      Store.addNotification({
        title: "Success",
        message: "Banner Deleted Successfully",
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
    return (
      <Modal
        {...props}
        size="lg-down"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add Banner
          </Modal.Title>
        </Modal.Header>
        <Modal.Body></Modal.Body>
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
            All Banner
          </span>
          {/* <Button
            variant="outline-success"
            onClick={() => {
              setModalShow(true);
            }}
          >
            Add-Banner1
          </Button> */}
        </div>
      </section>
      <section
        className="main-card--container"
        style={{
          color: "black",
          marginBottom: "10%",
        }}
      >
        <Form
          style={{
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
            padding: "20px",
            width: "800px",
            margin: "auto",
            marginTop: "30px",
            borderRadius: "10px",
            marginLeft: " 100px",
          }}
          onSubmit={postData}
        >
          {/* <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="file"
              required
              onChange={(e) => setImage(e.target.files[0])}
            />
          </Form.Group> */}
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Image Link</Form.Label>
            <Form.Control
              type="text"
              required
              value={textdata}
              onChange={(e) => setTextdata(e.target.value)}
            />
          </Form.Group>

          <Button variant="outline-success" type="submit">
            Submit
          </Button>
        </Form>
      </section>
    </>
  );
};

export default HOC(Ban);
