import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import { UserStore } from "../../redux/store";

function PrivateRoute({
  children,
  value,
}: {
  children: JSX.Element;
  value: string;
}) {
  const loggedIn = useSelector((state: UserStore) => state.loggedIn);
  if (!loggedIn) {
    console.log(loggedIn);
    if (value === "/signup") {
      return <Navigate replace to={value} />;
    } else {
      return children;
    }
  } else {
    console.log(loggedIn);
    if (value === "/home") {
      return <Navigate replace to={value} />;
    } else {
      return children;
    }
  }
}

export default PrivateRoute;
