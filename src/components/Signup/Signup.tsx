import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import girlImage from "../../images/girl_img.png";
import "./Signup.css";
import submitForm from "../../redux/form/formAction";
import React from "react";
import ImageInput from "../ImageInput/ImageInput";

let photoString: string;

function Signup() {
  const dispatch = useDispatch();
  const phoneRegExp = /^[6-9]\d{9}$/;
  const SUPPORTED_FORMATS = [
    "image/jpg",
    "image/jpeg",
    "image/gif",
    "image/png",
  ];

  const formik = useFormik({
    initialValues: {
      photo: null,
      name: "",
      email: "",
      phone: "",
      password: "",
      cpassword: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("invalid email").required("email is required"),
      phone: Yup.string()
        .matches(phoneRegExp, "Phone number is not valid")
        .required("phone number is required"),
      password: Yup.string().required("Password is required"),
      name: Yup.string()
        .min(15, "min 15 characters are required")
        .required("name is required"),
      cpassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("confirm password is required"),
      photo: Yup.mixed()
        .nullable()
        .test("FILE_SIZE", "uploaded file is too large", (value) => {
          const filesize = value?.size / 1024 / 1024;
          if (filesize > 2) {
            return false;
          }
          return true;
        })
        .test(
          "FILE_FORMAT",
          "uploaded file has unsupported file format",
          (value) => !value || SUPPORTED_FORMATS.includes(value?.type)
        ),
    }),
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(false);
      const detail = {
        ...formik.values,
        photo: photoString,
      };

      dispatch(submitForm(detail));
      localStorage.setItem("userName", formik.values.name);
      localStorage.setItem("userEmail", formik.values.email);
      localStorage.setItem("userPhone", formik.values.phone);
      localStorage.setItem("loggedIn", "true");
      formik.resetForm();
    },
    validateOnMount: false,
    validateOnBlur: false,
    validateOnChange: false,
  });

  return (
    <div className="signup">
      <div className="container">
        <div className="two-col-wrap">
          <div className="left-block">
            <h1 className="title">Signup</h1>
            <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
              <div className="form-control">
                <label htmlFor="photo" id="photo-label">
                  Photo +
                </label>
                <ImageInput
                  inputProps={{
                    id: "photo",
                    name: "photo",
                    onBlur: () => formik.setFieldTouched("photo"),
                    onChange: (e) => {
                      formik.setFieldValue("photo", e.target.files?.[0]);
                      if (e.target.files?.[0]) {
                        const reader = new FileReader();
                        reader.readAsDataURL(e.target.files?.[0]);
                        reader.addEventListener("load", () => {
                          if (reader.result) {
                            photoString = String(reader.result);
                            localStorage["userPhoto"] = reader.result;
                          }
                        });
                      }
                    },
                  }}
                  onRemove={() => {
                    formik.setFieldValue("photo", null);
                  }}
                />

                {formik.errors.photo ? (
                  <p className="error">{formik.errors.photo}</p>
                ) : null}
              </div>
              <div className="form-control">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  {...formik.getFieldProps("name")}
                />
                {formik.errors.name ? (
                  <p className="error">{formik.errors.name}</p>
                ) : null}
              </div>
              <div className="form-control">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  autoComplete="username"
                  {...formik.getFieldProps("email")}
                />
                {formik.errors.email ? (
                  <p className="error">{formik.errors.email}</p>
                ) : null}
              </div>
              <div className="form-control">
                <label htmlFor="phone">PhoneNo</label>
                <input
                  type="tel"
                  id="phone"
                  {...formik.getFieldProps("phone")}
                />
                {formik.errors.phone ? (
                  <p className="error">{formik.errors.phone}</p>
                ) : null}
              </div>
              <div className="form-control">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  {...formik.getFieldProps("password")}
                />
                {formik.errors.password ? (
                  <p className="error">{formik.errors.password}</p>
                ) : null}
              </div>
              <div className="form-control">
                <label htmlFor="cpassword">Confirm Password</label>
                <input
                  type="password"
                  id="cpassword"
                  autoComplete="new-password"
                  {...formik.getFieldProps("cpassword")}
                />
                {formik.errors.cpassword ? (
                  <p className="error">{formik.errors.cpassword}</p>
                ) : null}
              </div>
              <div className="buttons-container">
                <button className="submit-btn" type="submit">
                  submit
                </button>
                <button
                  className="reset-btn"
                  type="reset"
                  onClick={formik.handleReset}
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
          <div className="right-block">
            <img src={girlImage} alt="girl" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
