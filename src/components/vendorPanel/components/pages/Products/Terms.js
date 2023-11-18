import React, { useEffect, useState } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import HOC from "../../layout/HOC";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { toast } from "react-toastify";

const Terms = () => {
    const [modalShow, setModalShow] = React.useState(false);
    const [data, setData] = useState([]);
    const token = localStorage.getItem("token");
  
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          "http://ec2-15-206-210-177.ap-south-1.compute.amazonaws.com:5005/api/v1/terms",

        );
        setData(data);
      } catch (e) {
        console.log(e);
      }
    };
  
    useEffect(() => {
      fetchData();
    }, []);
  
    function MyVerticallyCenteredModal(props) {
      const [couponCode, setCouponCode] = useState("");
  
      const postData = async (e) => {
        e.preventDefault();
        try {
          const { data } = await axios.put(
            "http://ec2-15-206-210-177.ap-south-1.compute.amazonaws.com:5005/api/v1/terms/63e4d098eb79be1cd58ad351",
            { terms : couponCode }
          );
          console.log(data);
          props.onHide();
          fetchData();
          toast.success("Terms Updated Added");
        } catch (e) {
          console.log(e);
          alert(e?.response?.data?.message)
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
              Update Terms&Condition
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={postData}>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Terms&Condition</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setCouponCode(e.target.value)}
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

    return (
      <>
        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
  
        <section>
          <div className="pb-4 sticky top-0  w-full flex justify-between items-center bg-white">
            <span className="tracking-widest text-slate-900 font-semibold uppercase ">
             Privacy Policy
            </span>
         
          </div>
  
          <div style={{ maxWidth: "100%", overflow: "auto" }}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Terms&Condition</th>
                  <th>Actions</th>
                </tr>
              </thead>
  
              <tbody>
                  <tr >
                    <td> {data?.terms?.terms} </td>
                    <td>
                      <AiFillEdit color="blue" cursor="pointer" onClick={() => setModalShow(true)}  />
                    </td>
                  </tr>
         
              </tbody>
            </Table>
          </div>
        </section>
      </>
    );
  };

export default HOC(Terms)