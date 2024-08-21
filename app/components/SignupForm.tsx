"use client";

import { signIn } from "next-auth/react";
import React, { FormEvent, useState } from "react";
import OtpVerify from "../Otp_verify/form";
import Link from "next/link";

const SignupForm: React.FC = () => {
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [nameError, setNameError] = useState<string | null>(null);
  const [isSignup, setIsSignup] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [signupError, setSignupError] = useState<String>();

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);

    let valid = true;

    if (!formData.get("name")) {
      setNameError("Name is required");
      valid = false;
    } else {
      setNameError(null);
    }

    if (
      !formData.get("email") ||
      !validateEmail(formData.get("email") as string)
    ) {
      setEmailError("Valid email is required");
      valid = false;
    } else {
      setEmailError(null);
    }

    if (formData.get("password") !== formData.get("confirmPassword")) {
      setPasswordError("Passwords don't match");
      valid = false;
    } else {
      setPasswordError(null);
    }

    if (!valid) {
      setLoading(false);
      return;
    }

    const response = await signIn("akil_signUp", {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      name: formData.get("name") as string,
      confirmPassword: formData.get("confirmPassword") as string,
      role: "user",
      redirect: false,
    });
    setLoading(false);

    if (response?.error) {
      setSignupError(response.error);
      console.log("Error");
    } else {
      setIsSignup(true);
      setEmail(formData.get("email") as string);
      setPassword(formData.get("password") as string);
      setName(formData.get("name") as string);
      setConfirmPassword(formData.get("confirmPassword") as string);
      console.log("Success");
    }

    console.log({ response });
  };

  const handleGoogleSignin = () => {
    signIn("google", { callbackUrl: "/" });
  };

  return !isSignup ? (
    <div className="bg-slate-100 h-screen flex items-center justify-center">
      <div className="mx-auto max-w-md bg-white flex flex-col px-20 py-5 my-7">
        <div className="flex flex-col gap-4">
          <h1 className="text-center font-bold text-[16pt]"> Sign Up Today!</h1>
          <div className="border border-gray-300 px-16 py-2 text-[9pt] text-center flex gap-3">
            <img src="/google.png" className="w-3 h-3" />
            <button onClick={handleGoogleSignin}>Sign Up with Google</button>
          </div>
          <div className="flex items-center">
            <hr className="w-[30%] border-gray-300" />
            <p className="w-[45%] text-gray-600 text-[8pt] mx-3">
              Or Sign Up with Email
            </p>
            <hr className="w-[30%] border-gray-300" />
          </div>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 mt-6">
          <p className="text-red-500 text-[10pt] text-center">
            {" "}
            {signupError}{" "}
          </p>
          <label className="text-gray-700 text-[9pt]"> Full Name </label>
          <input
            name="name"
            className="border border-gray-300 p-2 px-2 text-[9pt] rounded-[4pt]"
            type="text"
            placeholder="Enter your full name"
          />
          {nameError && (
            <p className="text-red-500 text-[9pt] mt-2">{nameError}</p>
          )}

          <label className="text-gray-700 text-[9pt]"> Email Address </label>
          <input
            name="email"
            className="border border-gray-300 p-2 px-2 text-[9pt] rounded-[4pt]"
            type="email"
            placeholder="Enter email address"
          />
          {emailError && (
            <p className="text-red-500 text-[9pt] mt-2">{emailError}</p>
          )}

          <label className="text-gray-700 text-[9pt]"> Password </label>
          <input
            name="password"
            className="border border-gray-300 p-2 px-2 text-[9pt] rounded-[4pt]"
            type="password"
            placeholder="Enter password"
          />

          <label className="text-gray-700 font-medium text-[9pt]">
            {" "}
            Confirm Password
          </label>
          <input
            name="confirmPassword"
            className="border border-gray-300 p-2 px-2 text-[9pt] rounded-[4pt]"
            type="password"
            placeholder="Enter password"
          />
          {passwordError && (
            <p className="text-red-500 text-[9pt] mt-2">{passwordError}</p>
          )}

          <button
            onClick={() => setPasswordError("")}
            className="bg-blue-900 rounded-[50px] p-2 text-[9pt] mt-4 text-white"
            type="submit"
          >
            {" "}
            {loading ? "Loading..." : "continue"}{" "}
          </button>
        </form>
        <div className="flex gap-1 text-[9pt] mt-3">
          <p> Already have an account?</p>
          <Link className="text-blue-900 font-bold" href={"/Login"}>
            {" "}
            Login{" "}
          </Link>
        </div>
        <p className="text-[6pt] mt-3">
          {" "}
          By clicking &apos;Continue&apos;, you acknowledge that you have read
          and accepted our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  ) : (
    <OtpVerify
      email={email}
      name={name}
      password={password}
      confirmPassword={confirmPassword}
      role={"user"}
    />
  );
};

export default SignupForm;
