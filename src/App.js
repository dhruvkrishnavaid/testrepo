import CreateCustomer from "./CreateCustomer";
import Customer from "./Customer";
import AccountOperations from "./AccountOperations";
import BalanceDisplay from "./BalanceDisplay";
import "./index.css";
import { useSelector } from "react-redux";
function App() {
  const customer = useSelector((state) => state.customer);
  return (
    <>
      <h1>🏦 Redux bank task</h1>
      {!customer.name ? (
        <CreateCustomer />
      ) : (
        <>
          <Customer />
          <AccountOperations />
          <BalanceDisplay />
        </>
      )}
    </>
  );
}

export default App;
