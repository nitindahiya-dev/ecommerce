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
    </>
  );
};

export default Register;
