import React, { useState } from "react";
import fire from "../config/Fire";
import { Link } from "react-router-dom";

const Register = ({ history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fireErrors, setFireErrors] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        let currentUser = fire.auth().currentUser;
        currentUser.updateProfile({
          displayName: name,
        });
        history.push("/");
      })
      .catch((err) => setFireErrors(err.message));
  };

  console.log(fire.auth().currentUser);

  return (
    <>
      <h1>Sign Up</h1>
      {fireErrors && <div className="error">{fireErrors}</div>}
      <form onSubmit={onSubmit}>
        <div className="form-control">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
        </div>
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
        <button className="btn">Register</button>
        <div className="underline">
          Already Registered ?{" "}
          <Link className="btn-link" to="/login">
            Login
          </Link>
        </div>
      </form>
    </>
  );
};

export default Register;
