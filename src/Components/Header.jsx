import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { UserRecordsContext } from "../App";

import API from "../Api/UserRecordsApi";

const Header = () => {
  const { isUserLoggedIn, logoutUser } = useContext(UserRecordsContext);

  const navigate = useNavigate();

  const logoutHandler = async () => {
    await API.put(`/loggedUser/currentUser`, {
      isLogged: false,
      userEmail: "",
      userPassWord: "",
    });
    logoutUser();
    navigate("/user");
  };

  return (
    <nav className="navbar navbar-light bg-success">
      <div className="container-fluid">
        <span className="navbar-brand mb-0 h1">User Records</span>

        <button
          className="btn btn-warning"
          onClick={isUserLoggedIn ? logoutHandler : undefined}
        >
          {isUserLoggedIn ? "Logout" : "Login"}
        </button>
      </div>
    </nav>
  );
};

export default Header;
