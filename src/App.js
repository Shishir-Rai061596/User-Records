import { useState, useEffect, createContext } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import Header from "./Components/Header";
import Login from "./Components/Login";
import Records from "./Components/Records";
import AddRecord from "./Components/AddRecord";

import API from "./Api/UserRecordsApi";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

export const UserRecordsContext = createContext();

const App = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [userRecords, setUserRecords] = useState([]);

  const navigate = useNavigate();

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

  const loginUser = () => setIsUserLoggedIn(true);
  const logoutUser = () => setIsUserLoggedIn(false);

  return (
    <UserRecordsContext.Provider
      value={{
        userRecords,
        isUserLoggedIn,
        addNewRecord,
        deleteRecord,
        editRecord,
        logoutUser,
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
