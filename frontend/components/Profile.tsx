"use client";
import React, { useState } from "react";
import PrimaryButton from "./PrimaryButton";
import { toast } from "react-toastify";
import { HiPencil, HiCamera, HiLogout } from "react-icons/hi";
import Image from "next/image";
import afterImage from "../public/image/after.jpg";

interface ProfileProps {
  onLogoutSuccess?: () => void;
  user?: {
    name: string;
    email: string;
  };
}

const Profile: React.FC<ProfileProps> = ({ onLogoutSuccess, user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (showPasswordFields && formData.newPassword !== formData.confirmPassword) {
      toast.error("New passwords don't match");
      return;
    }

    try {
      // Add your API call here to update user details
      const res = await fetch("/api/update-profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Update failed");

      toast.success("Profile updated successfully");
      setIsEditing(false);
      setShowPasswordFields(false);
    } catch (error) {
      toast.error("Error updating profile");
      console.error("Update error:", error);
    }
  };

  const handleLogout = async () => {
    try {
      // Add your logout API call here
      await fetch("/api/logout");
      toast.success("Logged out successfully");
      onLogoutSuccess?.();
    } catch (error) {
      toast.error("Error logging out");
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Profile Picture Section */}
      <div className="relative group text-center">
        <div className="relative inline-block">
          <Image
            src={afterImage}
            alt="Profile"
            width={96}
            height={96}
            className="w-24 h-24 rounded-full border-2 border-[var(--primary)]"
          />
          {isEditing && (
            <label className="absolute bottom-0 right-0 bg-[var(--primary)] p-2 rounded-full cursor-pointer">
              <HiCamera className="text-white" />
              <input
                type="file"
                className="hidden"
                onChange={(e) => console.log(e.target.files)} // Add your image upload logic
              />
            </label>
          )}
        </div>
      </div>

      {/* Profile Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Field */}
        <div>
          <label className="block text-sm font-hanken font-medium text-gray-700 mb-1">
            Username: {user?.name}
          </label>
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
            />
          ) : (
            <p className="p-2 bg-gray-100 rounded-md">{formData.name}</p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label className="block text-sm font-hanken font-medium text-gray-700 mb-1">
            Email: {user?.email}
          </label>
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
            />
          ) : (
            <p className="p-2 bg-gray-100 rounded-md">{formData.email}</p>
          )}
        </div>

        {/* Password Fields */}
        {isEditing && (
          <div className="space-y-4">
            {!showPasswordFields ? (
              <PrimaryButton
                text="Change Password"
                type="button"
                className="w-full"
                onClick={() => setShowPasswordFields(true)}
              />
            ) : (
              <>
                <div>
                  <label className="block text-sm font-hanken font-medium text-gray-700 mb-1">
                    Current Password
                  </label>
                  <input
                    type="password"
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-hanken font-medium text-gray-700 mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-hanken font-medium text-gray-700 mb-1">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md"
                  />
                </div>
              </>
            )}
          </div>
        )}

        {/* Action Buttons */}
        {isEditing ? (
          <div className="flex gap-2">
            <PrimaryButton
              text="Save Changes"
              type="submit"
              className="w-full"
            />
            <PrimaryButton
              text="Cancel"
              type="button"
              variant="secondary"
              className="w-full"
              onClick={() => {
                setIsEditing(false);
                setShowPasswordFields(false);
              }}
            />
          </div>
        ) : (
          <PrimaryButton
            text="Edit Profile"
            type="button"
            icon={<HiPencil className="mr-2" />}
            className="w-full"
            onClick={() => setIsEditing(true)}
          />
        )}
      </form>

      {/* Logout Button */}
      <PrimaryButton
        text="Logout"
        type="button"
        variant="secondary"
        icon={<HiLogout className="mr-2" />}
        className="w-full mt-6"
        onClick={handleLogout}
      />
    </div>
  );
};

export default Profile;