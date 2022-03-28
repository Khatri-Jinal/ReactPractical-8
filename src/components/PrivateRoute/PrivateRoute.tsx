import { Navigate } from "react-router";

function PrivateRoute({
  children,
  value,
  loggedIn,
}: {
  children: JSX.Element;
  value: string;
  loggedIn: boolean;
}) {
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
