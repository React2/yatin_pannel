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
import { FormGroup, Table } from "react-bootstrap";
import { Store } from "react-notifications-component";
import Loader1 from "../../../../../Loader/Loader";

const Vehicle = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${Baseurl}/api/v1/driver/alldriver`,
        Auth()
      );
      console.log(data);
      setData(data?.message);
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
      const { data } = await axios.delete(`${Baseurl}/api/v1/driver/${id}`);
      Store.addNotification({
        title: "Success",
        message: "User Deleted Successfully",
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
    const [couponCode, setCouponCode] = useState("");
    const [expirationDate, setExpirationDate] = useState("");
    const [activationDate, setActivationDate] = useState(
      "2023-10-11T00:00:00.000Z"
    );
    const [discount, setDiscount] = useState();
    const [minOrder, setMinOrder] = useState();

    const postData = async (e) => {
      e.preventDefault();
      const formdata = {};
      if (couponCode) formdata.couponCode = couponCode;
      if (expirationDate) formdata.expirationDate = expirationDate;
      if (activationDate) formdata.activationDate = activationDate;
      if (discount) formdata.discount = discount;
      if (minOrder) formdata.minOrder = minOrder;

      try {
        axios.post(`${Baseurl}/api/v1/coupon`, formdata, Auth());
        fetchData();
        props.onHide();
        Store.addNotification({
          title: "Success",
          message: "Coupon Added Successfully",
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
        Store.addNotification({
          title: "Error",
          message: "Something went wrong",
          type: "danger",
          insert: "top",
          container: "top-right",
          animationIn: ["animated", "fadeIn"],
          animationOut: ["animated", "fadeOut"],
          dismiss: {
            duration: 3000,
            onScreen: true,
          },
        });
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
            Add Coupon
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={postData}>
            <FormGroup className="mb-3">
              <Form.Label>Coupon Code</Form.Label>
              <Form.Control
                type="text"
                value={couponCode}
                required
                onChange={(e) => setCouponCode(e.target.value)}
              />
            </FormGroup>

            <FormGroup className="mb-3">
              <Form.Label>Discount (%)</Form.Label>
              <Form.Control
                type="number"
                value={discount}
                required
                onChange={(e) => setDiscount(parseInt(e.target.value))}
              />
            </FormGroup>

            <FormGroup className="mb-3">
              <Form.Label>Minimum Order</Form.Label>
              <Form.Control
                type="number"
                required
                value={minOrder}
                onChange={(e) => setMinOrder(parseInt(e.target.value))}
              />
            </FormGroup>

            <FormGroup className="mb-3">
              <Form.Label>Activation Date</Form.Label>
              <Form.Control
                type="date"
                required
                value={activationDate}
                onChange={(e) => setActivationDate(e.target.value)}
              />
            </FormGroup>

            <FormGroup className="mb-3">
              <Form.Label>Expiration Date</Form.Label>
              <Form.Control
                type="date"
                required
                value={expirationDate}
                onChange={(e) => setExpirationDate(e.target.value)}
              />
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
            All Drivers
          </span>
          {/* <Button
            variant="outline-success"
            onClick={() => {
              setModalShow(true);
            }}
          >
            Add-Driver
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
        {loading ? (
          <Loader1 />
        ) : (
          <Table responsive style={{ width: "950px" }}>
            <thead>
              <tr>
                <th>No.</th>
                <th>Image</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Duty</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {data?.map((i, index) => (
                <tr key={index}>
                  <td>#{index + 1} </td>
                  <img
                    src={i.image}
                    alt=""
                    style={{ maxWidth: "100px", height: "110px" }}
                  />
                  {/* <td></td> */}

                  <td>{i.Name}</td>
                  <td>{i.email}</td>
                  <td>{i.phone}</td>
                  <td>{i.duty ? "Active" : "Inactive"}</td>
                  <td>{i.status}</td>

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

export default HOC(Vehicle);
