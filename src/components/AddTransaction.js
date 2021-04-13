import React, { useState } from "react";
import fire from "../config/Fire";

const AddTransaction = () => {
  const [transactionName, setTransactionName] = useState("");
  const [amount, setAmount] = useState(0);
  const [error, setError] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    const newTransaction = {
      id: Math.floor(Math.random() * 100000000),
      transactionName,
      amount: +amount,
      user_id: fire.auth().currentUser.uid,
    };

    if (!transactionName || amount === 0) {
      setError("Transaction name or amount not entered.");
      return;
    }

    fire
      .database()
      .ref(`Transactions/${fire.auth().currentUser.uid}`)
      .push(newTransaction)
      .then((data) => {
        setAmount(0);
        setTransactionName("");
        setError("");
      })
      .catch((err) => setError(err));
  };

  return (
    <>
      <h3>Add new transaction</h3>
      {error && <div className="error">{error}</div>}
      <form onSubmit={onSubmit}>
        <div className="form-control">
          <label htmlFor="transactionName">Transaction Name</label>
          <input
            type="text"
            value={transactionName}
            onChange={(e) => setTransactionName(e.target.value)}
            placeholder="Enter transaction..."
          />
        </div>
        <div className="form-control">
          <label htmlFor="amount">
            Amount <br />
            (negative - expense, positive - income)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount..."
          />
        </div>
        <button className="btn">Add transaction</button>
      </form>
    </>
  );
};

export default AddTransaction;
