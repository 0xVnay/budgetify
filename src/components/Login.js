import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalState";
import { Link } from "react-router-dom";
import fire from "../config/Fire";

const Login = ({ history }) => {
  const { user } = useContext(GlobalContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fireErrors, setFireErrors] = useState("");

  useEffect(() => {
    console.log(user);
    if (user) {
      history.push("/");
    }
  }, [history, user]);

  const onSubmit = (e) => {
    e.preventDefault();
    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((err) => setFireErrors(err.message));
  };

  return (
    <>
      <h1>Sign In</h1>
      {fireErrors && <div className="error">{fireErrors}</div>}
      <form onSubmit={onSubmit}>
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
          />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
        </div>
        <button className="btn">Login</button>
        <div className="underline">
          Not Registered ?{" "}
          <Link className="btn-link" to="/register">
            Create an account
          </Link>
        </div>
      </form>
    </>
  );
};

export default Login;
