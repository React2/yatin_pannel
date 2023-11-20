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

const Users = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${Baseurl}/user/all`, Auth());
      console.log(data.data);
      setData(data?.data);
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
      const { data } = await axios.delete(`${Baseurl}/api/v1/admin/user/${id}`);
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
    const [image, setImage] = useState(null);
    const [textdata, setTextdata] = useState("");
    const [userId, setUserId] = useState("");
    const [user, setUser] = useState([]);
    const [toggle, setToggle] = useState(null);
    const getAllUsers = () => {
      const authHeaders = Auth();

      axios
        .get(`${Baseurl}/api/v1/admin/users`, authHeaders)
        .then((res) => {
          setUser(res.data.users);
        })
        .catch((e) => {
          console.log(e);
        });
    };

    useEffect(() => {
      getAllUsers();
    }, [toggle]);

    const postData = async (e) => {
      e.preventDefault();
      const formdata = {};
      if (textdata) formdata.message = textdata;
      if (toggle === "user") if (userId) formdata.userId = userId;
      if (toggle === "driver") if (userId) formdata.driverId = userId;
      try {
        if (toggle === "user") {
          const { data } = await axios.post(
            `${Baseurl}/api/v1/notify`,
            formdata,
            Auth
          );
        } else if (toggle === "driver") {
          const { data } = await axios.post(
            `${Baseurl}/api/v1/notify`,
            formdata,
            Auth
          );
        }
        console.log(data);
        fetchData();
        props.onHide();
        Store.addNotification({
          title: "Success",
          message: "Notification Added Successfully",
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
            Add Notification
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={postData}>
            {toggle === "user" ? (
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Select
                  onChange={(e) => setUserId(e.target.value)}
                  required
                >
                  <option>Select User</option>
                  {user.length > 0 &&
                    user.map((i, index) => (
                      <option key={index} value={i._id}>
                        {i.name}
                      </option>
                    ))}
                </Form.Select>
              </Form.Group>
            ) : toggle === "driver" ? (
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Select
                  required
                  onChange={(e) => setUserId(e.target.value)}
                >
                  <option>Select Driver</option>
                  {user.length > 0 &&
                    user.map((i, index) => (
                      <option key={index} value={i._id}>
                        {i.Name}
                      </option>
                    ))}
                </Form.Select>
              </Form.Group>
            ) : (
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Select
                  required
                  onChange={(e) => setToggle(e.target.value)}
                >
                  <option> Select Type</option>
                  <option onClick={() => setToggle("user")} value="user">
                    User
                  </option>
                  <option onClick={() => setToggle("driver")} value="driver">
                    Driver
                  </option>
                </Form.Select>
              </Form.Group>
            )}
            {toggle === "user" || toggle === "driver" ? (
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Message</Form.Label>
                <Form.Control
                  type="text"
                  required
                  value={textdata}
                  onChange={(e) => setTextdata(e.target.value)}
                />
              </Form.Group>
            ) : null}

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
            All Users
          </span>
          {/* <Button
            variant="outline-success"
            onClick={() => {
              setModalShow(true);
            }}
          >
            Add-Notification
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
                <th>Phone</th>
                <th>Deliveries PerWeek (Lower/Upper)</th>
                <th>Verified</th>
                {/* <th></th> */}
              </tr>
            </thead>

            <tbody>
              {data?.map((i, index) => (
                <tr key={index}>
                  <td>#{index + 1} </td>
                  <td>
                    <img
                      src={i.profileImage}
                      alt=""
                      style={{ maxWidth: "100px", height: "70px" }}
                    />
                  </td>

                  <td>{i.name}</td>
                  <td>
                    {i.countryCode} {i.phoneNumber}
                  </td>
                  <td>
                    {i.deliveriesPerWeek?.lower
                      ? i.deliveriesPerWeek?.lower
                      : 0}{" "}
                    /{" "}
                    {i.deliveriesPerWeek?.upper
                      ? i.deliveriesPerWeek?.upper
                      : 0}
                  </td>
                  <td>{i.verified ? "Yes" : "No"}</td>

                  <td
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    <span className="flexCont" style={{ gap: "15px" }}>
                      {/* <Link to={`/admin/product/${i._id}`}>
                      <i className="fa-solid fa-eye" />
                    </Link> */}
                      {/* <i
                        className="fa-sharp fa-solid fa-trash"
                        onClick={() => deleteData(i._id)}
                      ></i> */}
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

export default HOC(Users);
