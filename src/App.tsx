import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home/Home";
import Signup from "./components/Signup/Signup";
import { useSelector } from "react-redux";
import { UserStore } from "./redux/store";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

function App() {
  const loggedIn = useSelector((state: UserStore) => state.loggedIn);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate replace to="/home" />} />
          <Route
            path="/home"
            element={
              <PrivateRoute
                children={<Home />}
                value={"/signup"}
                loggedIn={loggedIn}
              />
            }
          />
          <Route
            path="/signup"
            element={
              <PrivateRoute
                children={<Signup />}
                value={"/home"}
                loggedIn={loggedIn}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
