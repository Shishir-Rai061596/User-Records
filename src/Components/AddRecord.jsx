import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { UserRecordsContext } from "../App";
import styles from "./AddRecord.module.css";

const initialRecordDetails = {
  id: "",
  firstName: "",
  lastName: "",
  birthDate: "",
  fullName: "",
};

const AddRecord = () => {
  const { addNewRecord, editRecord } = useContext(UserRecordsContext);
  const [recordDetails, setRecordDetails] = useState(initialRecordDetails);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      setRecordDetails(location.state.record);
    }
  }, [location]);

  const recordChangeHandler = e => {
    const { name, value } = e.target;
    setRecordDetails(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const clearRecordDetails = () => setRecordDetails(initialRecordDetails);

  const addRecordHandler = e => {
    e.preventDefault();
    navigate("/");
    if (location.state) {
      editRecord(recordDetails);
    } else {
      addNewRecord(recordDetails);
    }
  };

  const getCurrentDay = () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const yyyy = today.getFullYear();
    return `${yyyy}-${mm}-${dd}`;
  };

  return (
    <div className={`${styles.addrecord__container}`}>
      <h3 className="text-center mb-4">ADD A NEW RECORD</h3>
      <form onSubmit={addRecordHandler}>
        <div className="row mb-3">
          <label htmlFor="recordFirstName" className="col-sm-3 col-form-label">
            First Name
          </label>
          <div className="col-sm-8">
            <input
              type="text"
              className="form-control"
              id="recordFirstName"
              name="firstName"
              required
              value={recordDetails.firstName}
              onChange={recordChangeHandler}
            />
          </div>
        </div>

        <div className="row mb-3">
          <label htmlFor="recordLastName" className="col-sm-3 col-form-label">
            Last Name
          </label>
          <div className="col-sm-8">
            <input
              type="text"
              className="form-control"
              id="recordLastName"
              name="lastName"
              required
              value={recordDetails.lastName}
              onChange={recordChangeHandler}
            />
          </div>
        </div>

        <div className="row mb-3">
          <label htmlFor="recordBirthDate" className="col-sm-3 col-form-label">
            Birth Name
          </label>
          <div className="col-sm-8">
            <input
              type="date"
              className="form-control"
              id="recordBirthDate"
              name="birthDate"
              required
              max={getCurrentDay()}
              value={recordDetails.birthDate}
              onChange={recordChangeHandler}
            />
          </div>
        </div>

        <div className="d-flex mt-3 mb-1 ">
          <button
            type="button"
            className="btn btn-danger flex-fill me-1 mx-2 mb-1"
            onClick={clearRecordDetails}
          >
            Clear
          </button>
          <button
            type="button"
            className="btn btn-secondary flex-fill me-1 mx-2 mb-1"
            onClick={() => navigate("/")}
          >
            Go back
          </button>
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Add Record
        </button>
      </form>
    </div>
  );
};

export default AddRecord;
