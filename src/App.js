import { useState, useEffect, createContext, useMemo } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import _ from "lodash";

import Header from "./Components/Header";
import Login from "./Components/Login";
import Records from "./Components/Records";
import AddRecord from "./Components/AddRecord";
import useDebounce from "./Components/CustomHooks/useDebounce";

import API from "./Api/UserRecordsApi";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

export const UserRecordsContext = createContext();

const App = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [searchRecords, setSearchRecords] = useState("");
  const [userRecords, setUserRecords] = useState([]);

  const navigate = useNavigate();
  const searchRecordDebounced = useDebounce(searchRecords, 300);

  useEffect(() => {
    const getUserRecords = async () => {
      const {
        data: [{ isLogged }],
      } = await API.get(`/loggedUser`);

      const { data: userRecords } = await API.get(`/userRecords`);
      if (!isLogged) {
        navigate("/user");
      }
      setIsUserLoggedIn(isLogged);
      setUserRecords(userRecords);
    };

    getUserRecords();
  }, []);

  const addNewRecord = async recordDetails => {
    const newRecord = {
      ...recordDetails,
      id: Math.floor(Math.random() * 100000) + 1,
      fullName: `${recordDetails.firstName} ${recordDetails.lastName}`,
    };
    setUserRecords(prevState => [...prevState, newRecord]);
    toast.success("Successfully added.", {
      position: toast.POSITION.BOTTOM_LEFT,
    });
    await API.post(`/userRecords`, newRecord);
  };

  const deleteRecord = async id => {
    const updatedRecords = userRecords.filter(record => record.id !== id);
    setUserRecords(updatedRecords);

    toast.success("Successfully deleted.", {
      position: toast.POSITION.BOTTOM_LEFT,
    });
    await API.delete(`userRecords/${id}`);
  };

  const editRecord = async recordDetails => {
    const userRecordsNew = [...userRecords];
    setUserRecords(
      userRecordsNew.map(userRecord =>
        userRecord.id === recordDetails.id ? recordDetails : userRecord
      )
    );

    toast.success("Successfully edited.", {
      position: toast.POSITION.BOTTOM_LEFT,
    });
    await API.put(`/userRecords/${recordDetails.id}`, recordDetails);
  };

  const filteredUserRecords = useMemo(() => {
    if (!searchRecordDebounced) return userRecords;

    return userRecords.filter(
      record =>
        record.firstName
          .toLowerCase()
          .includes(searchRecordDebounced.toLowerCase()) ||
        record.lastName
          .toLowerCase()
          .includes(searchRecordDebounced.toLowerCase()) ||
        record.fullName
          .toLowerCase()
          .includes(searchRecordDebounced.toLowerCase())
    );
  }, [userRecords, searchRecordDebounced]);

  const calculateAge = birthDate => {
    const ageInMilliseconds = new Date() - new Date(birthDate);
    return Math.floor(ageInMilliseconds / 1000 / 24 / 60 / 60 / 365);
  };

  const sortUserRecords = order => {
    const sortRecordsNew = _.cloneDeep(userRecords);
    switch (order % 2) {
      case 0:
        sortRecordsNew.sort(
          (a, b) => calculateAge(a.birthDate) - calculateAge(b.birthDate)
        );
        break;
      case 1:
        sortRecordsNew.sort(
          (a, b) => calculateAge(b.birthDate) - calculateAge(a.birthDate)
        );

        break;
      default:
        break;
    }

    setUserRecords(sortRecordsNew);
  };

  const loginUser = () => setIsUserLoggedIn(true);
  const logoutUser = () => setIsUserLoggedIn(false);
  const setSearchRecordsHandler = e => setSearchRecords(e.target.value);

  return (
    <UserRecordsContext.Provider
      value={{
        userRecords: filteredUserRecords,
        isUserLoggedIn,
        searchRecords,
        addNewRecord,
        deleteRecord,
        editRecord,
        logoutUser,
        setSearchRecordsHandler,
        sortUserRecords,
      }}
    >
      <div>
        <Header />
        <div className="container mt-3 mb-1">
          <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
              <Routes>
                <Route path="/" element={<Records />} />
                <Route path="/newRecord" element={<AddRecord />} />
                <Route path="/user" element={<Login loginUser={loginUser} />} />
                <Route path="*" element={<h1>Page not found</h1>} />
              </Routes>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </UserRecordsContext.Provider>
  );
};

export default App;
