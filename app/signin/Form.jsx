"use client";
import { baseURL } from "@/connection/baseurl";
import { loginValidation } from "@/utils/formvalidation";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

//dynamic metadata create

function LoginForm() {
  const router = useRouter();
  const signInobj = {
    phone: "",
    password: "",
  };

  const [state, setstate] = useState({ ...signInobj });
  const [erorr, seterorr] = useState(null);
  const [loading, setLaoding] = useState(false);
  const handleChange = (event) => {
    event.preventDefault();
    setstate({ ...state, [event.target.id]: event.target.value });
  };
  const handleSignin = async (event) => {
    event.preventDefault();
    //validation
    const { error } = loginValidation(state);

    if (error.length > 0) {
      seterorr(error);
      setLaoding(false);
      return;
    }

    try {
      seterorr(null);
      //call the api to sign in
      const { data, status } = await axios.post(
        baseURL + "/admin/login",
        state
      );
      //if successfull redirect to dashboard
      if (status === 200) {
        //redirect to dashboard
        localStorage.setItem("token", `Bearer ${data.data.token}`);
        toast.success("Login successfull");
        router.push("/dashboard");
        //else show error message
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      //display error message
      const err = error.response.data;
      if (err) {
        toast.error(err.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <div className="container w-[90%] form mt-10 max-w-[400px] mx-auto">
      <h2 className="h4 text-center py-2">Sign In</h2>
      {/* sign in simple text */}
      <p className="text-center text-gray-600">Sign in to your account</p>
      {/* form */}

      <form onSubmit={handleSignin}>
        <div>
          <label htmlFor="email" className="form__label">
            Phone
          </label>
          <input
            value={state.phone}
            onChange={handleChange}
            type="number"
            placeholder="Phone"
            id="phone"
            className="form__input"
          />
        </div>
        <div className="my-2">
          <label htmlFor="password">Password</label>
          <input
            value={state.password}
            onChange={handleChange}
            type="password"
            placeholder="Password"
            id="password"
            className="form__input"
          />
        </div>
        <button className="btn_primary w-full mt-2">Sign In</button>
      </form>
      <div className="text-center mt-4">
        {/* forget password */}
        <Link href="#" className="text-center block mt-2">
          Forget Password?
        </Link>
        {/* sign up */}
        <Link href="/register" className="text-center block mt-2">
          Don't have an account? Register
        </Link>
      </div>
    </div>
  );
}

export default LoginForm;
