/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { Button, Form, Modal } from "react-bootstrap";

const Order = () => {
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");
  const [modalShow, setModalShow] = React.useState(false);
  const [orderId, setOrderId] = useState("");

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        "http://ec2-65-1-248-95.ap-south-1.compute.amazonaws.com:5004/api/v1/admin/orders",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const postHandler = async (id) => {
    try {
      const { data } = await axios.post(
        `http://ec2-65-1-248-95.ap-south-1.compute.amazonaws.com:5004/api/v1/user/paymentstatus/${id}`
      );
      console.log(data);
      fetchData();
    } catch (e) {
      console.log(e);
    }
  };

  function MyVerticallyCenteredModal(props) {
    const [driver, setDriver] = useState([]);
    const [driverId, setDriverId] = useState("");

    const fetchD = async () => {
      try {
        const { data } = await axios.get(
          "http://ec2-65-1-248-95.ap-south-1.compute.amazonaws.com:5004/api/v1/driver/alldriver"
        );
        setDriver(data.message);
      } catch (E) {
        console.log(E);
      }
    };

    useEffect(() => {
      if (props.show === true) {
        fetchD();
      }
    }, [props.show]);

    const assingOrder = async (e) => {
      e.preventDefault()
      try {
        const { data } = await axios.post(
          "http://ec2-65-1-248-95.ap-south-1.compute.amazonaws.com:5004/api/v1/driver/addOrder ",
          {
            orderId,
            driverId,
          }
        );
        console.log(data);
        alert("Assigned");
        props.onHide();
      } catch (e) {
        console.log(e);
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
            Assign Order
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={assingOrder}>
            <Form.Select
              aria-label="Default select example"
              className="mb-3"
              onChange={(e) => setDriverId(e.target.value)}
            >
              <option>Open this select menu</option>
              {driver?.map((i, index) => (
                <option key={index} value={i._id}>
                  {" "}
                  {i.Name}{" "}
                </option>
              ))}
            </Form.Select>
            <Button type="submit" > Submit</Button>
          </Form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    );
  }

  return (
    <>
    <MyVerticallyCenteredModal show={modalShow} onHide={() => setModalShow(false)} />
      <section>
        <div className="pb-4 sticky top-0  w-full flex justify-between items-center bg-white">
          <span className="tracking-widest text-slate-900 font-semibold uppercase ">
            All Orders
          </span>
        </div>
        {/* Add Form */}

        <div style={{ maxWidth: "100%", overflow: "auto" }}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>User Name</th>
                <th>User Phone</th>
                <th>User COD Status</th>
                <th>Discount</th>
                <th>Shipping Price</th>
                <th>Grand Total</th>
                <th>Product</th>
                <th>Payment Status</th>
                <th>Delivered</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.orders?.map((i, index) => (
                <tr key={index}>
                  <td>{i.user?.name} </td>
                  <td>{i.user?.phone} </td>
                  <td>{i.user?.cod_count} </td>
                  <td>{i.discount} </td>
                  <td>{i.shippingPrice} </td>
                  <td>{i.amountToBePaid} </td>
                  <td>{i.products?.map((a) => a.product)}</td>
                  <td>{i.paymentStatus} </td>
                  <td>{i.delivered === true ? "Yes" : "No"} </td>
                  <td>
                  <span className="d-flex gap-2">
                  <i
                      className="fa-solid fa-file-pen"
                      style={{ color: "blue", cursor: "pointer" }}
                      onClick={() => {
                        postHandler(i.user?._id);
                      }}
                    ></i>
                    <Button onClick={() => {
                      setOrderId(i._id)
                      setModalShow(true)
                    }}>Assign Order</Button>
                  </span>
                 
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

export default HOC(Order);
