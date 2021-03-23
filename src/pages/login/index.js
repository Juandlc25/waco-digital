import React, { useState } from "react";
import "./style.css";
import { Link, useHistory } from "react-router-dom";
import ErrorNot from "../../components/ErrorNot";
import { auth, provider, providerFB } from "../../firebase";
import { useStateValue } from "../../contextAPI/StateProvider";
import Input from "../../components/Input";
import EmailIcon from "@material-ui/icons/Email";
import LockIcon from "@material-ui/icons/Lock";

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();
  const [{}, dispatch] = useStateValue();

  const login = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        // logged in, redirect to homepage...
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

  const signInGoogle = (e) => {
    e.preventDefault();
    auth
      .signInWithPopup(provider)
      .then((result) => {
        dispatch({
          type: "SET_USER",
          isAuth: true,
          user: result.user,
        });
        history.push("/home");
      })
      .catch((error) => setError(error.message));
  };

  const signInFB = (e) => {
    e.preventDefault();
    auth
      .signInWithPopup(providerFB)
      .then((result) => {
        dispatch({
          type: "SET_USER",
          isAuth: true,
          user: result.user,
        });
        history.push("/home");
      })
      .catch((error) => setError(error.message));
  };

  const register = (e) => {
    e.preventDefault();
    history.push("/register");
  };

  // useEffect(() => {
  //   if (isAuth) history.push("/home");
  // }, []);

  return (
    <div className="login">
      <Link to="/">
        <img
          className="login__logo"
          src="https://wacoservices.com/wp-content/uploads/2019/02/Recurso-2.png"
          alt=""
        />
      </Link>

      <div className="login__container">
        <h1>Sign in</h1>
        {error && <ErrorNot msg={error} clear={() => setError(undefined)} />}
        <form>
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
          <button onClick={login} type="submit" className="login__signInButton">
            Sign in
          </button>
          <button
            onClick={signInGoogle}
            type="submit"
            className="login__signInGoogle"
          >
            Sign in with Google
          </button>
          <button onClick={signInFB} type="submit" className="login__signInFB">
            Sign in with Facebook
          </button>
        </form>
        <p>
          By signing-in you agree to our Conditions of Use and Sale. Please see
          our privacy notice, out cookies notice and our interest-based ads
          notice.
        </p>
        <button onClick={register} className="login__registerButton">
          Create your Account
        </button>
      </div>
    </div>
  );
}

export default Login;
