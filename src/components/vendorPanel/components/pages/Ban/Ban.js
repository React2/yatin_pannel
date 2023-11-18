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
    const [image, setImage] = useState(null);
    const [textdata, setTextdata] = useState("");

    const postthumbImage = (e) => {
      const data = new FormData();
      data.append("file", e.target.files[0]);
      data.append("upload_preset", "ml_default");
      data.append("cloud_name", "dbcnha741");
      fetch("https://api.cloudinary.com/v1_1/dbcnha741/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setImage(data.url);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const postData = async (e) => {
      e.preventDefault();
      const formdata = new FormData();
      if (image) {
        formdata.append("image", image);
      }
      if (textdata) {
        formdata.append("desc", textdata);
      }

      try {
        const { data } = await axios.post(
          `${Baseurl}/api/v1/banner/add`,
          formdata,
          Auth
        );
        console.log(data);
        fetchData();
        props.onHide();
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
        <Modal.Body>
          <Form onSubmit={postData}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                required
                onChange={(e) => setImage(e.target.files[0])}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Discription</Form.Label>
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
            All Banner
          </span>
          <Button
            variant="outline-success"
            onClick={() => {
              setModalShow(true);
            }}
          >
            Add-Banner
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

                <th>Discription</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {data?.map((i, index) => (
                <tr key={index}>
                  <td>#{index + 1} </td>
                  <td>
                    <img
                      src={i.image}
                      alt=""
                      style={{ maxWidth: "100px", height: "70px" }}
                    />
                  </td>

                  <td>{i.desc}</td>

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

export default HOC(Ban);
