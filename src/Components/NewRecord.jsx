import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChallengeContex } from "../App";

const NewRecord = () => {
  //   const [searchChallenge, setSearchChallenge] = useState("");
  //   const [sortChallenge, setSortChallenge] = useState("");

  //   const { searchChallenge: onSearchChallenge, sortChallenge: onSortChallenge } =
  //     useContext(ChallengeContex);

  //   useEffect(() => {
  //     const timer = setTimeout(() => {
  //       onSearchChallenge(searchChallenge);
  //     }, 500);
  //     return () => clearTimeout(timer);
  //   }, [searchChallenge]);

  //   const searchChallengeHandler = e => {
  //     const { value } = e.target;
  //     setSearchChallenge(value);
  //   };

  //   const sortChallengeHandler = e => {
  //     const { value } = e.target;
  //     setSortChallenge(value);
  //     onSortChallenge(value);
  //   };

  const navigate = useNavigate();
  return (
    <div className="d-flex justify-content-end align-items-center text-right mb-4">
      <div className="row">
        <div className="col-md-12">
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
