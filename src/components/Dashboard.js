import React, { useContext, useEffect, useState } from "react";
import Balance from "./Balance";
import IncomeExpenses from "./IncomeExpenses";
import TransationList from "./TransationList";
import AddTransaction from "./AddTransaction";
import { GlobalContext } from "../context/GlobalState";
import fire from "../config/Fire";
import Loader from "./Loader";

const Dashboard = ({ history }) => {
  const { listTransactions, user } = useContext(GlobalContext);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(user);
    if (!user) {
      history.push("/login");
    }
  }, [history, user]);

  useEffect(() => {
    fire
      .database()
      .ref(
        `Transactions/${fire.auth().currentUser && fire.auth().currentUser.uid}`
      )
      .on("value", (snapshot) => {
        const fetchedTransactions = [];
        console.log(snapshot.val());
        snapshot.forEach((childSnapshot) => {
          fetchedTransactions.push({
            ...childSnapshot.val(),
            transactionKey: childSnapshot.key,
          });
        });
        listTransactions(fetchedTransactions);
      });
    setLoading(false);
  }, []);

  const signOut = () => {
    fire.auth().signOut();
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="dashboard-header">
            <h2>
              Welcome{" "}
              {fire.auth().currentUser && fire.auth().currentUser.displayName}
            </h2>
            <button className="btn btn-inline" onClick={signOut}>
              Sign Out
            </button>
          </div>
          <Balance />
          <IncomeExpenses />
          <TransationList />
          <AddTransaction />
        </>
      )}
    </>
  );
};

export default Dashboard;
