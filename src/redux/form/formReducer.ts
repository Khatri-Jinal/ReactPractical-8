import { SubmitLogoutType, userDetailType } from './formAction';
import { LOGOUT, SUBMIT_FORM } from "./formTypes";

const loginData = localStorage.getItem("loggedIn") === "true" ? true : false;
const userName = localStorage.getItem("userName");
const userEmail = localStorage.getItem("userEmail")
const userPass = localStorage.getItem("userPassword");
const userCpass = localStorage.getItem("userCpassword");
const userPhoto = localStorage.getItem("userPhoto");
let photo = userPhoto ? userPhoto : null;
const userPhone = localStorage.getItem("userPhone")

export interface InitialStateType {
  userDetail: userDetailType | null,
  loggedIn: boolean
}

export const initialState: InitialStateType = {
  userDetail: {
    photo: photo,
    name: userName,
    email: userEmail,
    phone: userPhone,
    password: userPass,
    cpassword: userCpass
  },
  loggedIn: loginData
};

const resetState: userDetailType = {
  photo: null,
  name: "",
  email: "",
  phone: "",
  password: "",
  cpassword: "",
};

const formReducer = (state = initialState, action: SubmitLogoutType) => {
  switch (action.type) {
    case SUBMIT_FORM:
      return {
        userDetail: action.payload,
        loggedIn: true
      };
    case LOGOUT:
      return {
        userDetail: resetState,
        loggedIn: false
      };
    default:
      return state;
  }
};
export default formReducer;
