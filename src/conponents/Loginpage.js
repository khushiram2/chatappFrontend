import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Api } from "./GlobalApi";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

export const Loginpage = () => {


    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        password: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .required("Password is required")
    });

    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        onSubmit: (values, { resetForm }) => {
            axios.post(`${Api}/user/login`, { user: values })
                .then((res) => {
                    if (res.status === 200) {
                        toast.success(res.data.message, { autoClose: 5000 });
                        window.localStorage.setItem("chatAppUserData", res.data);
                        navigate("/chats");
                    } else {
                        toast.error(res.data.message, { autoClose: 5000 });
                        navigate("/login");
                    }
                })
                .then(() => resetForm())
                .catch(() => {
                    toast.error("some error occured");
                });
        },
        validationSchema: validationSchema,
    });

    return (
        <div className="form-container">
            <form>
            <div className="form">
                <div className="heading">
                    <h1>Log in</h1>
                </div>
                <div className="form-data">
                    <label className="form-lable" htmlFor="email">
                        Enter your email
                    </label>
                    <input
                        onChange={formik.handleChange}
                        type="email"
                        className="form-input"
                        name="email"
                    />
                    <div>
                        {formik.touched.email && formik.errors.email && (
                            <div className="error">{formik.errors.email}</div>
                        )}
                        <label className="form-lable" htmlFor="password">
                            Enter your password
                        </label>
                        <p
                            style={{ cursor: "pointer", color: "blue" }}
                            onClick={() => navigate("/forgotpassword")}
                        >
                            {" "}
                            forgot password?
                        </p>
                    </div>
                    <input
                        onChange={formik.handleChange}
                        type="password"
                        className="form-input"
                        name="password"
                    />
                    {formik.touched.password && formik.errors.password && (
                        <div className="error">{formik.errors.password}</div>
                    )}
                    <button type="submit" onClick={formik.handleSubmit} className="btn">
                        submit
                    </button>
                    
                    <div style={{ Padding: "10px" }} className="sorR">
                        don't have an account? &nbsp;{" "}
                        <p
                            style={{ margin: "0px", cursor: "pointer", color: "blue" }}
                            onClick={() => navigate("/register")}
                        >
                            {" "}
                            signup{" "}
                        </p>
                    </div>
                </div>
            </div>
            </form>
        </div>
    );
};
