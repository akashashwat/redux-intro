import { useSelector } from "react-redux";

function Customer() {
  // useSelector is used to get access to store for acessing data.
  const customer = useSelector((store) => store.customer.fullName);

  return <h2>👋 Welcome, {customer}</h2>;
}

export default Customer;
