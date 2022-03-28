import "./Home.css";
import { useDispatch, useSelector } from "react-redux";
import { UserStore } from "../../redux/store";
import fallbackImg from "../../images/fallback_img.jpg";
import { logOut } from "../../redux/form/formAction";

function Home() {
  const dispatch = useDispatch();
  const user = useSelector((state: UserStore) => state.userDetail);
  const name = user?.name;
  const email = user?.email;
  const phoneNo = user?.phone;
  const ImageUrl = user?.photo ? user.photo : "";

  const handleLogout = () => {
    localStorage.setItem("loggedIn", "false");
    localStorage.setItem("userName", "");
    localStorage.setItem("userEmail", "");
    localStorage.setItem("userPassword", "");
    localStorage.setItem("userCpassword", "");
    localStorage.setItem("userPhoto", "");
    localStorage.setItem("userPhone", "");
    dispatch(logOut());
  };

  return (
    <div className="home">
      <div className="container">
        <div className="wrap">
          <img
            className="profile"
            src={ImageUrl}
            onError={(e) => (e.currentTarget.src = fallbackImg)}
            alt="user_img"
          />
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
        <p>
          “Hello {name}, you are registered with the email id - {email} and
          phone number - {phoneNo}”
        </p>
      </div>
    </div>
  );
}

export default Home;
