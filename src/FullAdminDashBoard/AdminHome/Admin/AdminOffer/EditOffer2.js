import axios from "axios";
import React, { useEffect, useState } from "react";
import modulecss from "../../Style.module.css";

const EditOffer2 = () => {
  const [id, setId] = useState([]);
  const [treatmenttext, setTreatmentText] = useState([]);
  const [offer, setOffer] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:4000/offer`)
      .then((res) => {
      
     setTreatmentText(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const editData = (id) => {
    axios
      .get(`http://localhost:4000/offer/${id}`)
      .then((res) => {
        setId(res.data.id);
        setOffer(res.data.offer);

      
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let submitHandler = (e) => {
    e.preventDefault();

    axios
      .put(`https://naveenhealthcarebackend.onrender.com/offer/${id}`, { id,offer })
      .then((res) => {
        alert("student updated  sucessfully.......");
       
        setId("");
        setOffer("");

      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <>
      <h1 className='text-center'>
        Edit <span className="text-danger">Offer</span>{" "}
      </h1>

      <div className="container my-5 ">
        <div className="row my-5">
          
          <div className="col-lg-12">
            <form
              className={`${modulecss.boxshadow} py-5 px-5 `}
              onSubmit={submitHandler}
            >
              <div className="row">
                <div className="col-lg-12">
                  <input
                    type="text"
                    name="id"
                    placeholder="Id"
                    className="form-control mb-5"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                  />
                </div>

                <div className="col-md-12">
                  <textarea
                    name="Message"
                    placeholder="Add Latest News"
                    className="form-control mb-5"
                    value={offer}
                    onChange={(e) => setOffer(e.target.value)}
                  />
                  <input
                    type="submit"
                    placeholder="Send Message"
                    className=" form-control btn btn-success"
                  ></input>
                </div>
                <div className={`${modulecss}container mt-5 table-responsive`}>
                  <div className="row ">
                    <div className="col-lg-12">
                      <table className="table table-bordered display hover" id="myTable">
                        <thead>
                          <tr>
                            <th>id</th>
                            <th>lnews</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {treatmenttext.map((stu) => {
                            return (
                              <tr key={stu.id}>
                                <td>{stu.id}</td>
                                <td>{stu.offer}</td>

                                <td className="d-flex">
                                  <button
                                    className="btn btn-warning"
                                    onClick={() => editData(stu.id)}
                                  >
                                    <i className="bi bi-pencil"></i>
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditOffer2;
