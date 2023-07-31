import { message } from "antd";
import React, { useState, useEffect} from "react";
import { Link , useNavigate} from "react-router-dom";


const Header = () => {
  const [LoginUser, setLoginUser] = useState("");
  const navigate = useNavigate();
 

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setLoginUser(user);
    }
  },[])

  
  return (
    <>
      <nav className="navbar navbar-expand-lg ">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link className="navbar-brand" to="/">
              Expense Tracker App
            </Link>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="navbar-brand" to={"/user"}  >
                  {LoginUser && `User : ${LoginUser.name}`}
                </Link>{" "}
              </li>
              {LoginUser && (
                <li className="nav-item">
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      localStorage.removeItem("user");
                      navigate("/login");
                      message.success("LogOut Successfully");
                    }}
                  >
                    LogOut
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
