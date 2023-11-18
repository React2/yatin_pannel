/** @format */

import React, { useEffect } from "react";
import { AiFillDelete } from "react-icons/ai";
import HOC from "../../layout/HOC";
import Table from "react-bootstrap/Table";
import { Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import axios from "axios";

const SubAdmin = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        "http://ec2-65-1-248-95.ap-south-1.compute.amazonaws.com:5004/api/v1/subadmin"
      );
      setData(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  
  const token = localStorage.getItem("token");
  
  function MyVerticallyCenteredModal(props) {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");

    const postData = async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.post(
          "http://ec2-65-1-248-95.ap-south-1.compute.amazonaws.com:5004/api/v1/register",
          {
            name,
            phone,
            password,
            role: "subadmin",
          }
        );
        console.log(data);
        fetchData();
        props.onHide();
        toast.success("Sub-Admin Added");
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
            Add Sub-Admin
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={postData}>
          <Form.Group className='mb-3'>
            <Form.Label > Name </Form.Label>
            <Form.Control type='text' onChange={(e) => setName(e.target.value)} minLength={4} />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label > Phone Number </Form.Label>
            <Form.Control type="tel" pattern="[0-9]{10}" onChange={(e) => setPhone(e.target.value)} />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label > Password </Form.Label>
            <Form.Control type='password' onChange={(e) => setPassword(e.target.value)} minLength={8} />
          </Form.Group>
            <Button variant="outline-success" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }

  const deleteData = async (id) => {
    try {
      const { data } = await axios.delete(
        `http://ec2-65-1-248-95.ap-south-1.compute.amazonaws.com:5004/api/v1/admin/user/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchData();
      toast.success(data.message);
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
            All Sub-Admin
          </span>
          <Button
            variant="outline-success"
            onClick={() => {
              setModalShow(true);
            }}
          >
            Add Sub-Admin
          </Button>
        </div>

        <div style={{ maxWidth: "100%", overflow: "auto" }}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone Number</th>

                <th>Role </th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.result?.map((i, index) => (
                <tr key={index}>
                  <td> {i.name} </td>
                  <td> {i.phone} </td>
                  <td> {i.role} </td>
                  <td>
                    <div style={{ display: "flex" }}>
                      <AiFillDelete
                        color="red"
                        cursor={"pointer"}
                        onClick={() => deleteData(i._id)}
                      />
                    </div>
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

export default HOC(SubAdmin);
