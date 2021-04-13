import React from "react";
import fire from "../config/Fire";

const Transaction = ({ transaction }) => {
  const deleteHandler = () => {
    fire
      .database()
      .ref(
        `Transactions/${fire.auth().currentUser.uid}/${
          transaction.transactionKey
        }`
      )
      .remove();
  };

  const sign = transaction.amount < 0 ? "-" : "+";
  return (
    <li className={transaction.amount < 0 ? "minus" : "plus"}>
      {transaction.transactionName}{" "}
      <span>
        {sign}${Math.abs(transaction.amount)}
      </span>
      <button onClick={deleteHandler} className="delete-btn">
        x
      </button>
    </li>
  );
};

export default Transaction;
