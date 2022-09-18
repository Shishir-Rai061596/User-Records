import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { UserRecordsContext } from "../App";

const NewRecord = () => {
  const { searchRecords, setSearchRecordsHandler } =
    useContext(UserRecordsContext);
  const navigate = useNavigate();
  return (
    <div className="d-flex justify-content-end align-items-center text-right mb-4">
      <div className="row">
        <div className="col-md-6">
          <input
            className="form-control col-md-4 mr-2"
            type="text"
            name="searchInput"
            placeholder="Search"
            aria-label="Search"
            autoComplete="none"
            value={searchRecords}
            onChange={setSearchRecordsHandler}
          />
        </div>
        <div className="col-md-6">
          <button
            className="btn btn-primary w-100"
            onClick={() => navigate("/newRecord")}
          >
            ADD Item
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewRecord;
