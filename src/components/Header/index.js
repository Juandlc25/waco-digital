import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./style.css";
import { Avatar } from "@material-ui/core";
import { useStateValue } from "../../contextAPI/StateProvider";
import { auth } from "../../firebase";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

function Header() {
  const history = useHistory();
  const [{ isAuth, user }, dispatch] = useStateValue();

  const logout = () => {
    auth.signOut();
    history.push("/");
    localStorage.removeItem("auth-token");
    dispatch({
      type: "SET_USER",
      isAuth: false,
      user: undefined,
      token: undefined,
    });
  };

  useEffect(() => {
    if (!isAuth) history.push("/");
    else history.push("/home");
  }, []);
  return (
    <div className="header">
      <img
        className="header__logo"
        src="https://wacoservices.com/wp-content/uploads/2019/02/Recurso-2.png"
        alt=""
      />
      <div className="header__titles">
        <Avatar src={user?.photoURL} />
        <h4 className="header__titles1">{user?.displayName}</h4>
        <h3 className="header__titlesLogout" onClick={logout}>
          Log out
          <ExitToAppIcon style={{ marginLeft: "5px" }} />
        </h3>
      </div>
    </div>
  );
}

export default Header;
