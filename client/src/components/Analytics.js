import { Progress } from "antd";
import React from "react";

const Analytics = ({ allTrans }) => {
  const totalTrans = allTrans.length;
  const totalIncomeTrans = allTrans.filter(
    (transaction) => transaction.type === "income"
  );
  const totalExpenseTrans = allTrans.filter(
    (transaction) => transaction.type === "expense"
  );
  const totalIncomePercent = (totalIncomeTrans.length / totalTrans) * 100;
  const totalExpensePercent = (totalExpenseTrans.length / totalTrans) * 100;

  const totalTurnOver = allTrans.reduce(
    (accumulator, transaction) => accumulator + transaction.amount,
    0
  );

  const totalIncomeTurnOver = allTrans
    .filter((transaction) => transaction.type === "income")
    .reduce((accumulator, transaction) => accumulator + transaction.amount, 0);

  // Or u can find totalTurn Over= totalIncomeTurnOver + totalExpenseTurnOver
  const totalExpenseTurnOver = allTrans
    .filter((transaction) => transaction.type === "expense")
        .reduce((accumulator, transaction) => accumulator + transaction.amount, 0);
    
    const totalIncomeTurnOverPercent = (totalIncomeTurnOver / totalTurnOver) * 100;
    const totalExpenseTurnOverPercent = (totalExpenseTurnOver / totalTurnOver) * 100;


  return (
    <>
      <div className="row m-3">
        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              Total Transactions : ₹ {totalTrans}
            </div>
            <div className="card-body">
              <h5 className="text-success">
                Income : ₹ {totalIncomeTrans.length}
              </h5>
              <h5 className="text-danger">
                Expense : ₹ {totalExpenseTrans.length}
              </h5>
              <div>
                <Progress
                  type="circle"
                  strokeColor={"green"}
                  className="mx-2"
                  percent={totalIncomePercent.toFixed(0)}
                />
                <Progress
                  type="circle"
                  strokeColor={"red"}
                  className="mx-2"
                  percent={totalExpensePercent.toFixed(0)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4 card-div">
          <div className="card">
            <div className="card-header">
              
              Total TurnOver : ₹ {totalTurnOver}
            </div>
            <div className="card-body">
              <h5 className="text-success">Income : ₹ {totalIncomeTurnOver}</h5>
              <h5 className="text-danger">
                Expense : ₹ {totalExpenseTurnOver}
              </h5>
              <div>
                <Progress
                  type="circle"
                  strokeColor={"green"}
                  className="mx-2"
                  percent={totalIncomeTurnOverPercent.toFixed(0)}
                />
                <Progress
                  type="circle"
                  strokeColor={"red"}
                  className="mx-2"
                  percent={totalExpenseTurnOverPercent.toFixed(0)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Analytics;
