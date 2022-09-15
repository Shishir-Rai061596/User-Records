import { useContext } from "react";
import { UserRecordsContext } from "../App";
import NewRecord from "./NewRecord";
import Record from "./Record";

const Records = () => {
  const { userRecords } = useContext(UserRecordsContext);
  return (
    <div>
      <NewRecord />
      {userRecords.length > 0 && (
        <table className="table table-bordered mb-0 userRecords">
          <thead>
            <tr>
              <th width="20%">ID</th>
              <th width="20%">First Name</th>
              <th width="20%">Last Name</th>
              <th width="20%">Age</th>
              <th width="20%">Action</th>
            </tr>
          </thead>

          <tbody>
            {userRecords.map((userRecord, index) => (
              <Record key={userRecord.id} record={userRecord} ID={index + 1} />
            ))}
          </tbody>
        </table>
      )}
      <p className="text-end m-2">Total of {userRecords.length} Records</p>
    </div>
  );
};

export default Records;
