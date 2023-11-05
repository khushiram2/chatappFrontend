import {  useNavigate } from "react-router-dom";
import axios from "axios";
import { Api } from "./GlobalApi";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

export const Loginpage = () => {
    const validationSchema = Yup.object().shape({
        email: Yup.string().email("please enter a vaild email").required("email is required"),
        password: Yup.string().required("Password is required")
    });

    const navigate = useNavigate();

    const formik1 = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        onSubmit: (values, { resetForm }) => {
            axios.post(`${Api}/user/login`, { user: values })
                .then((res) => {
                    if (res.status === 200) {
                        toast.success(res.data.message, { autoClose: 5000 });
                        window.localStorage.setItem("token", res.data.token);
                        const data=JSON.stringify(res.data.data)
                        window.localStorage.setItem("data", data)
                        navigate("/chat");
                    } else {
                        toast.error(res.data.message, { autoClose: 5000 });
                        navigate("/login");
                    }
                })
                .then(() => resetForm())
                .catch((e) => {
                    console.log(e)
                    toast.error("some error occured");
                });
        },
        validationSchema: validationSchema
    });

    return (
        <div className="form-container">
            <div className="form">
                <div className="heading">
                    <h1>Log in</h1>
                </div>
                <div className="form-data">
                   
                    <label className="form-lable" htmlFor="email">
                        Enter your email
                    </label>
                    <input
                        onChange={formik1.handleChange}
                        type="email"
                        className="form-input"
                        name="email"
                    />
                    <div>
                        {formik1.touched.email && formik1.errors.email && (
                            <div className="error">{formik1.errors.email}</div>
                        )}
                        <label className="form-lable" htmlFor="password">
                            Enter your password
                        </label>
                    </div>
                    <input
                        onChange={formik1.handleChange}
                        type="password"
                        className="form-input"
                        name="password"
                    />
                    {formik1.touched.password && formik1.errors.password && (
                        <div className="error">{formik1.errors.password}</div>
                    )}
                    <button type="submit" onClick={formik1.handleSubmit} className="btn">
                        submit
                    </button>
                    <div style={{ Padding: "10px" }} className="sorR"> don't have an account? &nbsp;{" "}
                     <p style={{ margin: "0px", cursor: "pointer", color: "blue" }}
                        onClick={() => navigate("/register")}
                        >
                            {" "}
                            signup{" "}
                        </p>
                    </div>
                </div>
            </div>
            
        </div>
    );
};
