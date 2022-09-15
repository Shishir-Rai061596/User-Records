import { useNavigate } from "react-router-dom";

const NewRecord = () => {
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
