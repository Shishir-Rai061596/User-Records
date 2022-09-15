import { useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./Login.module.css";
import UserLogin from "../Images/user.jpg";

import API from "../Api/UserRecordsApi";

const Login = ({ loginUser }) => {
  const [userDetails, setUserDetails] = useState({
    userEmail: "",
    userPassWord: "",
  });

  const navigate = useNavigate();

  const userDetailsChangeHandler = e => {
    const { name, value } = e.target;

    setUserDetails(prevDetails => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const loginHandler = async e => {
    e.preventDefault();
    await API.put(`/loggedUser/currentUser`, {
      isLogged: true,
      userEmail: userDetails.userEmail,
      userPassWord: userDetails.userPassWord,
    });
    loginUser();
    navigate("/");
  };

  const disableEvent = e => e.preventDefault();

  return (
    <div className={styles.modal}>
      <form
        className={`${styles.modal__content} ${styles.animate}`}
        onSubmit={loginHandler}
      >
        <div className={styles.imgcontainer}>
          <img src={UserLogin} alt="Avatar" className={styles.avatar} />
        </div>

        <div className={styles.container}>
          <input
            type="email"
            placeholder="Enter Email address.."
            name="userEmail"
            required
            className={styles.userLogin}
            value={userDetails.userEmail}
            onChange={userDetailsChangeHandler}
          />

          <input
            type="password"
            placeholder="Enter Password.."
            name="userPassWord"
            required
            className={styles.userLogin}
            value={userDetails.userPassWord}
            onChange={userDetailsChangeHandler}
            onCopy={disableEvent}
            onPaste={disableEvent}
            onCut={disableEvent}
          />

          <div
            style={{ color: "black" }}
            className="d-flex justify-content-between my-2"
          >
            <div>
              <a href="#">Recover Password</a>
            </div>
            <div>
              {" "}
              <a href="#">Sign-up</a>
            </div>
          </div>

          <button type="submit" className={styles.login}>
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
