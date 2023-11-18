/** @format */

import React, { useEffect } from "react";
import HOC from "../../layout/HOC";
import Table from "react-bootstrap/Table";
import { useState } from "react";
import axios from "axios";
import { Baseurl, Auth, showMsg } from "../../../../../Baseurl";

const Driver = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const { data } = await axios.get(`${Baseurl}driver/all`, Auth);
      setData(data.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(`${Baseurl}driver/${id}`, Auth);
      const msg = data.msg;
      showMsg("Success", msg, "success");
      fetchData();
    } catch {}
  };

  return (
    <>
      <section>
        <div className="pb-4 sticky top-0  w-full flex justify-between items-center bg-white">
          <span className="tracking-widest text-slate-900 font-semibold uppercase ">
            All Driver
          </span>
        </div>

        <div className="Table_Component">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Aadhar/Voter</th>
                <th>Driver License</th>
                <th> Phone </th>
                <th> Country Code </th>
                <th> Vehicel Registered </th>
                <th> Document Uploaded </th>
                <th>Aadhar / voter cade </th>
                <th>Driver License Number</th>
                {/* <th></th> */}
              </tr>
            </thead>
            <tbody>
              {data?.map((i, index) => (
                <tr key={index}>
                  <td>
                    <img
                      src={i.aadhaarOrVoterCard?.[0]}
                      alt=""
                      style={{ width: "100px" }}
                    />
                  </td>
                  <td>
                    <img
                      src={i.driverLicense}
                      alt=""
                      style={{ width: "100px" }}
                    />
                  </td>
                  <td> {i.phoneNumber} </td>
                  <td> {i.countryCode} </td>
                  <td> {i.isVehicleRegistered === false ? "No" : "Yes"} </td>
                  <td> {i.areDocumentsUploaded === false ? "No" : "Yes"} </td>
                  <td> {i.aadhaarOrVoterCardNumber} </td>
                  <td> {i.driverLicenseNumber} </td>
                  {/* <td>
                    <i
                      className="fa-solid fa-trash"
                      onClick={() => deleteHandler(i.id)}
                    ></i>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </section>
    </>
  );
};

export default HOC(Driver);
