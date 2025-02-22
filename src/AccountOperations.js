import { use, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { withdraw, deposit, requestLoan, payLoan } from "./customerSlice";
import axios from "axios";

function AccountOperations() {
  const [depositAmount, setDepositAmount] = useState(0);
  const [withdrawalAmount, setWithdrawalAmount] = useState(0);
  const [loanAmount, setLoanAmount] = useState(0);
  const [loanPurpose, setLoanPurpose] = useState("");
  const [currency, setCurrency] = useState("USD");
  const cList = [{ code: "INR", name: "Indian Rupee" }, { code: "USD", name: "US Dollar" }, { code: "EUR", name: "Euro" }, { code: "GBP", name: "British Pound" }];
  const dispatch = useDispatch();
  const customer = useSelector((state) => state.customer);

  async function handleDeposit() {
    if (currency == "INR") {
      dispatch(deposit(depositAmount));
      setDepositAmount(0);
    } else {
      const res = await axios({
        url: `https://api.frankfurter.app/latest?amount=${depositAmount}&from=${currency}&to=inr`,
      });
      dispatch(deposit(res.data.rates.INR));
      setDepositAmount(0);
    }
  }

  function handleWithdrawal() {
    if (customer.balance >= withdrawalAmount) {
      dispatch(withdraw(withdrawalAmount));
      setWithdrawalAmount(0);
    } else {
      alert("Insufficient Balance!");
    }
  }

  function handleRequestLoan() {
    if (customer.loan.pending) {
      alert("Please pay the previous loan!");
    } else {
      dispatch(
        requestLoan({
          amount: loanAmount,
          purpose: loanPurpose,
        })
      );
      setLoanAmount(0);
      setLoanPurpose("");
    }
  }

  function handlePayLoan() {
    if (customer.balance) {
      dispatch(payLoan(customer.loan.pending));
    } else {
      alert("Please add sufficient balance!");
    }
  }

  useEffect(() => {
    console.log(depositAmount, currency, withdrawalAmount, loanAmount, loanPurpose);
  }, [depositAmount, currency, withdrawalAmount, loanAmount, loanPurpose]);
  return (
    <div>
      <h2>Your account operations</h2>
      <div className="inputs">
        <div>
          <label>Deposit</label>
          <input
            type="number"
            value={depositAmount}
            onChange={(e) => setDepositAmount(+e.target.value)}
          />
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            {cList.map((c) => (
              <option key={c.code} value={c.code}>
                {c.name}
              </option>
            ))}
          </select>

          <button onClick={handleDeposit}>
            Deposit {depositAmount > 0 ? depositAmount : null}
          </button>
        </div>

        <div>
          <label>Withdraw</label>
          <input
            type="number"
            value={withdrawalAmount}
            onChange={(e) => setWithdrawalAmount(+e.target.value)}
          />
          <button onClick={handleWithdrawal}>
            Withdraw {withdrawalAmount > 0 ? withdrawalAmount : null}
          </button>
        </div>

        <div>
          <label>Request loan</label>
          <input
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(+e.target.value)}
            placeholder="Loan amount"
          />
          <input
            value={loanPurpose}
            onChange={(e) => setLoanPurpose(e.target.value)}
            placeholder="Loan purpose"
          />
          <button onClick={handleRequestLoan}>Request loan</button>
        </div>

        <div>
          <span>Pay back ₹{customer.loan.pending ?? 0} </span>
          <button onClick={handlePayLoan}>Pay loan</button>
        </div>
      </div>
    </div>
  );
}

export default AccountOperations;
