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

const Coupon = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [validCoupon, setValidCoupon] = useState(true);

  const validHandler = async () => {
    try {
      const response = await axios.get(`${Baseurl}/coupon/valid`);
      setData(response?.data?.data);
      console.log(response?.data);
    } catch (error) {
      console.error("Error fetching valid coupons:", error);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${Baseurl}/coupon/all`, Auth());
      setData(response?.data?.data);
    } catch (error) {
      console.error("Error fetching all coupons:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!validCoupon) fetchData();
    if (validCoupon) validHandler();
  }, [validCoupon]);

  const deleteData = async (id) => {
    try {
      const { data } = await axios.delete(`${Baseurl}/coupon/${id}`);
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

    const postData = async (e) => {
      e.preventDefault();
      const formdata = {};
      if (couponCode) formdata.couponCode = couponCode;
      if (expirationDate) formdata.validTill = expirationDate;
      if (activationDate) formdata.validFrom = activationDate;
      if (discount) formdata.discountPercentage = discount;

      try {
        axios.post(`${Baseurl}/coupon`, formdata, Auth());
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
          <span
            className="tracking-widest text-slate-900 font-semibold uppercase  "
            style={{ alignItems: "center", display: "flex" }}
          >
            All Coupons
            <span>
              <Button
                style={{
                  height: "20px",
                  textAlign: " center",
                  margin: "10px",
                  alignItems: "center",
                  fontSize: "14px",
                  display: "flex",
                }}
                onClick={() => {
                  // validHandler();
                  setValidCoupon(!validCoupon);
                }}
              >
                {validCoupon ? "All" : "Valid"}
              </Button>
            </span>
          </span>
          <Button
            variant="outline-success"
            onClick={() => {
              setModalShow(true);
            }}
          >
            Add-Coupon
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
                <th>Coupon Code</th>
                <th>Discount (%)</th>
                <th>IsExpired</th>
                <th>Activation Date</th>
                <th>ExpirationDate</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {data.length > 0 &&
                data?.map((i, index) => (
                  <tr key={index}>
                    <td>#{index + 1} </td>

                    <td>{i.couponCode}</td>
                    <td>{i.discountPercentage}</td>
                    <td>{i.expired ? "Expired" : "Not Expired"}</td>
                    <td>{i.validFrom}</td>
                    <td>{i.validTill}</td>

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
                          onClick={() => deleteData(i.id)}
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

export default HOC(Coupon);
