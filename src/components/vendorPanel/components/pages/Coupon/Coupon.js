/** @format */

import React, { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import HOC from "../../layout/HOC";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { toast } from "react-toastify";
import { Baseurl, Auth, showMsg } from "../../../../../Baseurl";

const Coupon = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");

  const fetchData = async () => {
    try {
      const { data } = await axios.get(`${Baseurl}coupon/all`, Auth);
      setData(data.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  function MyVerticallyCenteredModal(props) {
    const [couponCode, setCouponCode] = useState("");
    const [discountPercentage, setDiscountPercentage] = useState("");
    const [validFrom, setValidFrom] = useState("");
    const [validTill, setValidTill] = useState("");

    const payload = { couponCode, discountPercentage, validFrom, validTill };

    const postData = async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.post(`${Baseurl}coupon`, payload, Auth);
        showMsg("Success", "Coupon Created", "success");
        props.onHide();
        fetchData();
      } catch (e) {
        console.log(e);
        alert(e?.response?.data?.message);
      }
    };

    return (
      <Modal
        {...props}
        size="lg"
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
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Coupon Code</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setCouponCode(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Valid from</Form.Label>
              <Form.Control
                type="date"
                onChange={(e) => setValidFrom(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Valid Till</Form.Label>
              <Form.Control
                type="date"
                onChange={(e) => setValidTill(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Discount</Form.Label>
              <Form.Control
                type="number"
                min={1}
                onChange={(e) => setDiscountPercentage(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }

  const deleteData = async (id) => {
    try {
      const { data } = await axios.delete(`${Baseurl}coupon/${id}`, Auth);
      fetchData();
      showMsg("Success", "Coupon Deleted", "success");
    } catch (e) {
      console.log(e);
    }
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
            All Coupons
          </span>
          <Button onClick={() => setModalShow(true)} variant="outline-success">
            Add Coupon
          </Button>
        </div>

        <div style={{ maxWidth: "100%", overflow: "auto" }}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Coupon Code</th>
                <th>Valid From</th>
                <th>Valid Till</th>
                <th>Discount</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {data?.map((i, index) => (
                <tr key={index}>
                  <td> {i.couponCode} </td>
                  <td> {i.validFrom.slice(0, 10)} </td>
                  <td> {i.validTill.slice(0, 10)} </td>
                  <td> {i.discountPercentage} </td>
                  <td>
                    <AiFillDelete
                      color="red"
                      cursor="pointer"
                      onClick={() => deleteData(i.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </section>
    </>
  );
};

export default HOC(Coupon);
