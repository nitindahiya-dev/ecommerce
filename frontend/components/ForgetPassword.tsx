// frontend/components/ForgetPassword.tsx
"use client";
import React, { useState } from "react";
import PrimaryButton from "./PrimaryButton";
import { toast } from "react-toastify";
import { baseURL } from "@/config";


interface ForgetPasswordProps {
  onContentTypeChange?: (type: "login" | "register" | "forgetPassword") => void;
}

const ForgetPassword: React.FC<ForgetPasswordProps> = ({ onContentTypeChange }) => {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmitEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch(`${baseURL}/api/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Failed to send reset email");
        toast.error(data.message || "Failed to send reset email");
      } else {
        setStep(2);
        toast.success("Check your email for the reset token");
      }
    } catch (err) {
      console.error("Error sending reset email:", err);
      setError("An error occurred");
      toast.error("An error occurred");
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      toast.error("Passwords do not match");
      return;
    }
    try {
      const res = await fetch(`${baseURL}/api/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, email, newPassword }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Password reset failed");
        toast.error(data.message || "Password reset failed");
      } else {
        setMessage("Password reset successful! You can now login with your new password.");
        toast.success("Password reset successful");
        if (onContentTypeChange) onContentTypeChange("login");
      }
    } catch (err) {
      console.error("Error resetting password:", err);
      setError("An error occurred");
      toast.error("An error occurred");
    }
  };

  return (
    <form onSubmit={step === 1 ? handleSubmitEmail : handleResetPassword} className="space-y-4">
      {step === 1 ? (
        <>
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
          <PrimaryButton text="Send Reset Link" type="submit" className="w-full" />
        </>
      ) : (
        <>
          <div>
            <label htmlFor="token" className="block font-hanken text-sm font-medium text-gray-700">
              Reset Token
            </label>
            <input
              type="text"
              id="token"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="mt-1 block w-full border font-hanken border-gray-300 rounded-md p-2"
              placeholder="Enter the reset token from your email"
              required
            />
          </div>
          <div>
            <label htmlFor="newPassword" className="block font-hanken text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="mt-1 block w-full border font-hanken border-gray-300 rounded-md p-2"
              placeholder="Enter your new password"
              required
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block font-hanken text-sm font-medium text-gray-700">
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 block w-full border font-hanken border-gray-300 rounded-md p-2"
              placeholder="Confirm your new password"
              required
            />
          </div>
          <PrimaryButton text="Reset Password" type="submit" className="w-full" />
        </>
      )}
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {message && <p className="text-green-500 text-sm">{message}</p>}
      <div className="flex items-center justify-between">
        {step === 2 && (
          <button
            type="button"
            onClick={() => setStep(1)}
            className="text-sm text-[var(--primary)] hover:underline font-hanken"
          >
            Resend Reset Link
          </button>
        )}
        <button
          type="button"
          onClick={() => {
            if (onContentTypeChange) onContentTypeChange("login");
          }}
          className="text-sm text-[var(--primary)] hover:underline font-hanken"
        >
          Back to Login
        </button>
      </div>
    </form>
  );
};

export default ForgetPassword;
