"use client";
// import React from "react";
import Link from "next/link";
// import { useRouter } from "next/router";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

async function loginUser(email, password) {
  const response = await fetch("http://24.199.76.128/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();
  console.log(data); // For debugging

  // Handle the response data as needed
  // For example, store the JWT token if the sign-in is successful
  if (data.token) {
    localStorage.setItem("token", data.token);
    return data; // Assuming data object contains additional info
  } else {
    // Handle unsuccessful login (e.g., display error message)
    throw new Error("Login failed: Invalid credentials or other reasons");
  }
}

const SigninPage = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState(""); // State to hold error message
  const [responseData, setResponseData] = useState(""); // State to hold response data

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Get the email and password values from the form
    const email = event.target.email.value;
    const password = event.target.password.value;

    try {
      const loginData = await loginUser(email, password);
      console.log(loginData); // For debugging (optional)

      // Redirect to home page after successful login
      router.push("/home");
    } catch (error) {
      console.error("Failed to sign in:", error);
      setErrorMessage("An error occurred. Please try again."); // Set error message
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 p-8 bg-white shadow-md rounded-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <form
          className="mt-8 space-y-6"
          action="#"
          method="POST"
          onSubmit={handleSubmit}
        >
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          {/* Error message display */}
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          {/* Response data display */}
          {responseData && <p>{responseData}</p>}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg
                  className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M14.707 7.293a1 1 0 0 1 0 1.414l-4 4a1 1 0 1 1-1.414-1.414L12.586 9H5a1 1 0 1 1 0-2h7.586l-2.293-2.293a1 1 0 1 1 1.414-1.414l4 4z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              Sign in
            </button>
          </div>
        </form>

        <div className="text-center">
          {/* <p className="text-sm text-gray-600">Don't have an account?</p> */}
          \<p className="text-sm text-gray-600">{"Don't have an account?"}</p>
          <Link
            href="/signup"
            className="mt-2 inline-block px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SigninPage;
