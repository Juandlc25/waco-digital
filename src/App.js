import "./App.css";
import Home from "./pages/home";
import Login from "./pages/login";
import signUp from "./pages/sign-up";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";
import { useStateValue } from "./contextAPI/StateProvider";
import { useEffect } from "react";
import { auth } from "./firebase";

function App() {
  const [{ isAuth }, dispatch] = useStateValue();
  const history = useHistory();

  // useEffect(() => {
  //   let token = localStorage.getItem("auth-token");
  //   let user = localStorage.getItem("user");
  //   if (token === null) {
  //     history.push("/");
  //   } else {
  //     dispatch({
  //       type: "SET_USER",
  //       isAuth: true,
  //       user,
  //       token,
  //     });
  //   }
  // }, []);

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/register" component={signUp} />
        <Route exact path="/home" component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
