/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../layout/HOC";
import { Button, Form, Modal, Table } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DeliveryPartner = () => {
  const [data, setData] = useState([]);
  const [id, setId] = useState("");
  const [ modalShow , setModalShow ] = useState(false)
  const navigate = useNavigate()
  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        "http://ec2-65-1-248-95.ap-south-1.compute.amazonaws.com:5004/api/v1/driver/alldriver"
      );
      setData(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(
        `http://ec2-65-1-248-95.ap-south-1.compute.amazonaws.com:5004/api/v1/driver/${id}`
      );
      console.log(data);
      alert("Deleted");
      fetchData();
    } catch (e) {
      console.log(e);
    }
  };

  function MyVerticallyCenteredModal(props) {
    const [status, setStatus] = useState("");

    const postHandler = async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.post(
          `http://ec2-65-1-248-95.ap-south-1.compute.amazonaws.com:5004/api/v1/driver/status/${id}`,
          {
            status,
          }
        );
        console.log(data);
        fetchData();
        alert("Edited");
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
            Edit Status
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={postHandler}>
            <Form.Select
              aria-label="Default select example"
              className="mb-3"
              onChange={(e) => setStatus(e.target.value)}
            >
              <option>Open this select menu</option>
              <option value="Approve">Approve</option>
              <option value="Disapprove">Disapprove</option>
            </Form.Select>

            <Button variant="outline-success" type="submit">
              Submit{" "}
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    );
  }

  return (
    <>
    <MyVerticallyCenteredModal show={modalShow} onHide={() => setModalShow(false) } />


      <section>
        <div className="pb-4 sticky top-0  w-full flex justify-between items-center bg-white">
          <span className="tracking-widest text-slate-900 font-semibold uppercase ">
            All Delivery Partner's ( Total : {data?.message?.length})
          </span>
        </div>

        <div style={{ maxWidth: "100%", overflow: "auto" }}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>SNo.</th>
                <th> Name</th>
                <th> Phone</th>
                <th> Email</th>
                <th>Status</th>
                <th>Order</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.message?.map((i, index) => (
                <tr key={index}>
                  <td> #{index + 1} </td>
                  <td> {i.Name} </td>
                  <td> {i.phone} </td>
                  <td> {i.email} </td>
                  <td> {i.status} </td>
                  <td>
                    <Button onClick={() => navigate(`/deliveryOrder/${i._id}`)}>View</Button>
                  </td>
                  <td>
                  <span className="d-flex gap-2" >
                  <i
                      className="fa-solid fa-trash"
                      onClick={() => deleteHandler(i._id)}
                      style={{ color: "red", cursor: "pointer" }}
                    />
                    <i
                      className="fa-solid fa-edit"
                      onClick={() => {
                        setId(i._id)
                        setModalShow(true)}}
                      style={{ color: "blue", cursor: "pointer" }}
                    />
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

export default HOC(DeliveryPartner);
