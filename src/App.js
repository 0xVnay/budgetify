import { useContext, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { GlobalContext } from "./context/GlobalState";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Register from "./components/Register";
import fire from "./config/Fire";

function App() {
  const { login, logout } = useContext(GlobalContext);

  useEffect(() => {
    fire.auth().onAuthStateChanged((user) => {
      console.log(user);
      if (!user) {
        logout();
      }
      login(user);
    });
  }, []);

  return (
    <Router>
      <div className="container">
        <div className="title">Budgetify</div>
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/" exact component={Dashboard} />
      </div>
    </Router>
  );
}

export default App;
