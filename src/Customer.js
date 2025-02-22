import { useSelector } from "react-redux";

function Customer() {
  const customerName = useSelector((state) => state.customer.name) || "User";
  return <h2>👋 Welcome, {customerName}</h2>;
}

export default Customer;
