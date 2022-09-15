import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserRecordsContext } from "../App";

const Record = ({ record, ID }) => {
  const { deleteRecord } = useContext(UserRecordsContext);

  const navigate = useNavigate();

  const deleteRecordhandler = () => deleteRecord(record.id);
  const editRecordhandler = () => {
    navigate("/newRecord", {
      state: {
        record,
      },
    });
  };

  const calculateAge = birthDate => {
    const ageInMilliseconds = new Date() - new Date(birthDate);
    return Math.floor(ageInMilliseconds / 1000 / 24 / 60 / 60 / 365);
  };

  return (
    <tr>
      <td width="20%">{ID}</td>
      <td width="20%">{record.firstName}</td>
      <td width="20%">{record.lastName}</td>
      <td width="20%">{calculateAge(record.birthDate)}</td>
      <td width="20%">
        <div className="d-flex justify-content-evenly">
          <span className="fa fa-edit" onClick={editRecordhandler}></span>
          <span className="fa fa-trash" onClick={deleteRecordhandler}></span>
        </div>
      </td>
    </tr>
  );
};

export default Record;
