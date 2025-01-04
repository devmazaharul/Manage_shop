"use client";
import { baseURL } from "@/connection/baseurl";
import { registerValidation } from "@/utils/formvalidation";

import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import toast from "react-hot-toast";

function RegisterForm() {
  const registerobj = {
    name: "",
    email: "",
    password: "",
    address: "",
    phone: "",
  };

  const [state, setstate] = useState({ ...registerobj });
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(null);

  const handleChange = (event) => {
    setstate({ ...state, [event.target.id]: event.target.value });
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    setloading(true);

    const res = registerValidation(state);

    if (res.error.length > 0) {
      seterror(res.error);
      setloading(false);
      return;
    }
    try {
      seterror(null);
      //call the api to sign in
      const { status, data } = await axios.post(
        baseURL + "/admin/register",
        state
      );
      console.log(status);
      if (status === 201) {
        //redirect to dashboard
        toast.success("Register successfull please verify and login");
      }
    } catch (error) {
      //display error message
      const err = error.response.data;
      if (err) {
        toast.error(err.message);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="container w-[90%] form mt-10 max-w-[400px] mx-auto">
      <h2 className="h4 text-center py-2">Register</h2>
      {/* register simple text */}
      <p className="text-center text-gray-600">Register to your account</p>
      {/* form */}

      <form onSubmit={handleRegister}>
        <div>
          <label htmlFor="email" className="form__label">
            Name
          </label>
          <input
            value={state.name}
            onChange={handleChange}
            type="text"
            placeholder="Name"
            id="name"
            className="form__input"
          />
        </div>
        <div>
          <label htmlFor="email" className="form__label">
            Email
          </label>
          <input
            value={state.email}
            onChange={handleChange}
            type="email"
            placeholder="Email"
            id="email"
            className="form__input"
          />
        </div>
        <div>
          <label htmlFor="email" className="form__label">
            Phone
          </label>
          <input
            value={state.phone}
            onChange={handleChange}
            type="number"
            placeholder="Number"
            id="phone"
            className="form__input"
          />
        </div>
        <div className="my-2">
          <label htmlFor="password">Address</label>
          <input
            value={state.address}
            onChange={handleChange}
            type="text"
            placeholder="Address"
            id="address"
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
        <button className="btn_primary w-full mt-2">
          {loading ? "Registering" : "Register"}
        </button>
      </form>
      <div className="text-center mt-4">
        {/* already have account*/}
        <Link href="/signin" className="text-center block mt-2">
          Already have an account? Sign In
        </Link>
      </div>

      <div className="mt-4">
        {error &&
          error.map((err, index) => (
            <div key={index} className="text-red-500">
              <p>
                {index + 1}. {err.message}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default RegisterForm;
