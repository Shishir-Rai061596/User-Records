import { useContext, useState } from "react";
import { UserRecordsContext } from "../App";
import NewRecord from "./NewRecord";
import Record from "./Record";

const Records = () => {
  const [ageSortedOrder, setAgeSortedOrder] = useState(0);

  const { userRecords, sortUserRecords } = useContext(UserRecordsContext);

  const sortAgeHandler = () => {
    setAgeSortedOrder(prevAge => ++prevAge);
    sortUserRecords(ageSortedOrder);
  };
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
              <th width="20%" onClick={sortAgeHandler}>
                Age
                <span style={{ float: "right" }}>
                  <i
                    className={`fa fa-sort-${
                      ageSortedOrder % 2 ? "asc" : "desc"
                    }`}
                    aria-hidden="true"
                  ></i>
                </span>
              </th>
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
