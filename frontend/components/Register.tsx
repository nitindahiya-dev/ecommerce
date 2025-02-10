// frontend/components/Register.tsx
"use client";
import React, { useState } from "react";
import PrimaryButton from "./PrimaryButton";
import { toast } from "react-toastify";
import { baseURL } from "@/config";

interface RegisterProps {
  onContentTypeChange?: (type: "login" | "register" | "forgetPassword") => void;
}

const Register: React.FC<RegisterProps> = ({ onContentTypeChange }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (password !== confirm) {
      setError("Passwords do not match.");
      toast.error("Passwords do not match.");
      return;
    }

    try {
      const res = await fetch(`${baseURL}/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Registration failed");
        toast.error(data.message || "Registration failed");
      } else {
        toast.success("Registration successful");
        if (onContentTypeChange) {
          onContentTypeChange("login");
        }
      }
    } catch (err) {
      console.error("Registration error", err);
      setError("An error occurred");
      toast.error("An error occurred");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4 mb-4">
        <div>
          <label htmlFor="name" className="block font-hanken text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full border font-hanken border-gray-300 rounded-md p-2"
            placeholder="Enter your name"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block font-hanken text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full border font-hanken border-gray-300 rounded-md p-2"
            placeholder="Enter your email"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-hanken font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full border font-hanken border-gray-300 rounded-md p-2"
            placeholder="Enter your password"
            required
          />
        </div>
        <div>
          <label htmlFor="confirm-password" className="block text-sm font-hanken font-medium text-gray-700">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirm-password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="mt-1 block w-full border font-hanken border-gray-300 rounded-md p-2"
            placeholder="Confirm your password"
            required
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <PrimaryButton text="Register" type="submit" className="w-full" />
      </form>
      <div className="flex items-center justify-center mb-4">
        <button
          type="button"
          onClick={() => {
            if (onContentTypeChange) onContentTypeChange("login");
          }}
          className="text-sm text-[var(--primary)] hover:underline font-hanken"
        >
          Already have an account? Login
        </button>

      </div>
      <PrimaryButton
        text="Login with Google"
        type="button"
        className="w-full"
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24" height="24" className="mr-2">
            <path
              fill="#EA4335"
              d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
            />
            <path
              fill="#4285F4"
              d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
            />
            <path
              fill="#FBBC05"
              d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
            />
            <path
              fill="#34A853"
              d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
            />
          </svg>
        }
      />
    </>
  );
};

export default Register;
