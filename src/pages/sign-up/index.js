import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./style.css";
import ErrorNot from "../../components/ErrorNot";
import { useStateValue } from "../../contextAPI/StateProvider";
import { auth } from "../../firebase";
import EmailIcon from "@material-ui/icons/Email";
import LockIcon from "@material-ui/icons/Lock";
import Input from "../../components/Input";
import PersonIcon from "@material-ui/icons/Person";

function SignIn() {
  const [{}, dispatch] = useStateValue();
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [error, setError] = useState();

  const login = (e) => {
    e.preventDefault();
    history.push("/");
  };

  const register = async (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        auth.user.updateProfile({
          displayName: username,
        });
        dispatch({
          type: "SET_USER",
          isAuth: true,
          user: auth.user,
          token: auth.user.uid,
        });
        localStorage.setItem("auth-token", auth.user.uid);
        history.push("/home");
      })
      .catch((e) => setError(e.message));
  };

  // useEffect(() => {
  //   if (isAuth) history.push("/home");
  // }, []);

  return (
    <div className="login">
      <img
        className="login__logo"
        src="https://wacoservices.com/wp-content/uploads/2019/02/Recurso-2.png"
        alt="logoregister"
      />

      <div className="login__container">
        <h1>Sign Up</h1>
        {error && <ErrorNot msg={error} clear={() => setError(undefined)} />}
        <form>
          <h5>Username</h5>
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            Icon={PersonIcon}
            placeholder="Username"
          />
          <h5>Email</h5>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            Icon={EmailIcon}
            placeholder="Email"
          />
          <h5>Password</h5>
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            Icon={LockIcon}
            placeholder="Password"
          />
          <h5>Confirm Password</h5>
          <Input
            value={passwordCheck}
            onChange={(e) => setPasswordCheck(e.target.value)}
            type="password"
            Icon={LockIcon}
            placeholder="Repeat Password"
          />
          <button
            onClick={register}
            type="submit"
            className="login__signInButton"
          >
            Sign Up
          </button>
        </form>
        <p>
          By signing-in you agree to my website Conditions of Use and Sale.
          Please see our privacy notice, out cookies notice and our
          interest-based ads notice.
        </p>
        <p>If you're register already please Login</p>
        <button onClick={login} className="login__registerButton">
          Log In
        </button>
      </div>
    </div>
  );
}

export default SignIn;
