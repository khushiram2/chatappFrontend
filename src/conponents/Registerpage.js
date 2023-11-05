import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Api } from "./GlobalApi";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from 'react-toastify';



export const Registerpage = () => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("not valid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf(
        [Yup.ref("password")],
        "Password and confirm password must be same"
      )
      .required("Confirm Password is required"),
  });

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    onSubmit: (values, { resetForm }) => {
      axios
        .post(`${Api}/user/register`, { user: values })
        .then((res) => {if(res.status===200){
          window.localStorage.setItem("token",res.data.token)
          const data=JSON.stringify(res.data.data)
          window.localStorage.setItem("data",data)
            toast.success(res.data.message,{autoClose:5000})
            navigate("/chat")
        }else{
          toast.error(res.data.message,{autoClose:5000})
          navigate("/login")
        }})
        .then(() => resetForm())
        .catch(() => {
          toast.error("some error occured")
          navigate("/login")
        });
    },
    validationSchema: validationSchema,
  });





  return (
    <div className="form-container">
      <div className="form" style={{ height: "500px" }}>
        <div className="heading">
          <h1>Register</h1>
        </div>
        <div className="form-data">
          <label className="form-lable" htmlFor="name">
            Enter your name
          </label>
          <input
            onChange={formik.handleChange}
            type="text"
            className="form-input"
            name="name"
          />
          {formik.touched.name && formik.errors.name && (
            <div className="error">{formik.errors.name}</div>
          )}
          <label className="form-lable" htmlFor="email">
            Enter your email
          </label>
          <input
            onChange={formik.handleChange}
            type="email"
            className="form-input"
            name="email"
          />
          {formik.touched.email && formik.errors.email && (
            <div className="error">{formik.errors.email}</div>
          )}
          <label className="form-lable" htmlFor="password">
            Enter your password
          </label>
          <input
            onChange={formik.handleChange}
            type="password"
            className="form-input"
            name="password"
          />
          {formik.touched.password && formik.errors.password && (
            <div className="error">{formik.errors.password}</div>
          )}
          <label className="form-lable" htmlFor="confirm-password">
            confirm password
          </label>
          <input
            onChange={formik.handleChange}
            type="password"
            className="form-input"
            name="confirmPassword"
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <div className="error">{formik.errors.confirmPassword}</div>
          )}
          <button type="submit" onClick={formik.handleSubmit} className="btn">
            submit
          </button>
          <div className="sorR" style={{ marginTop: "10px" }}>
            already have an account? &nbsp;{" "}
            <p
              style={{ margin: "0px", cursor: "pointer", color: "blue" }}
              onClick={() => navigate("/login")}
            >
              {" "}
              sign in{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
