// Profile.tsx
"use client";
import React, { useState } from "react";
import PrimaryButton from "./PrimaryButton";
import { toast } from "react-toastify";
import { HiPencil, HiCamera, HiLogout } from "react-icons/hi";
import Image from "next/image";
import afterImage from "../public/image/after.jpg";
import { baseURL } from "@/config";
import { HiTrash } from "react-icons/hi";
import { Dialog } from "@headlessui/react";


interface ProfileProps {
  onLogoutSuccess?: () => void;
  user?: {
    id: number;
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

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDeleteAccount = async () => {
    console.log("Deleting account for user:", user?.id, "with password:", deletePassword);
    try {
      const res = await fetch(`${baseURL}/api/delete-account`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user?.id,
          password: deletePassword,
        }),
      });
  
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Account deletion failed");
      }
  
      toast.success("Account deleted successfully");
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      onLogoutSuccess?.();
    } catch (error) {
      toast.error("Error deleting account");
      console.error("Delete error:", error);
    }
  };
  


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (showPasswordFields && formData.newPassword !== formData.confirmPassword) {
      toast.error("New passwords don't match");
      return;
    }
    try {
      // Include the user ID in the payload
      const payload = {
        id: user?.id, // make sure user?.id exists!
        ...formData,
      };
      const res = await fetch(
        `${baseURL}/api/update-profile`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
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
      await fetch(`${baseURL}/api/logout`, { method: "POST" });
      toast.success("Logged out successfully");
      localStorage.removeItem("user");
      localStorage.removeItem("token");
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
              <input type="file" className="hidden" onChange={(e) => console.log(e.target.files)} />
            </label>
          )}
        </div>
      </div>

      {/* Profile Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-hanken font-medium text-gray-700 mb-1">
            Username
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
        <div>
          <label className="block text-sm font-hanken font-medium text-gray-700 mb-1">
            Email
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
        {isEditing ? (
          <div className="flex gap-2">
            <PrimaryButton text="Save Changes" type="submit" className="w-full" />
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
      <>
        <PrimaryButton
          text="Delete Account"
          type="button"
          variant="danger"
          icon={<HiTrash className="mr-2" />}
          className="w-full mt-4"
          onClick={() => setIsDeleteModalOpen(true)}
        />

        {/* Delete Confirmation Modal */}
        <Dialog
          open={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          className="relative z-50"
        >
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="w-full max-w-md rounded-xl bg-white p-6">
              <Dialog.Title className="text-lg font-bold mb-4">
                Confirm Account Deletion
              </Dialog.Title>

              <p className="mb-4 text-red-600">
                Warning: This action is permanent and cannot be undone!
              </p>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Enter your password to confirm
                </label>
                <input
                  type="password"
                  value={deletePassword}
                  onChange={(e) => setDeletePassword(e.target.value)}
                  className="w-full p-2 border rounded-md"
                />
              </div>

              <div className="flex gap-2">
                <PrimaryButton
                  text="Cancel"
                  variant="secondary"
                  className="flex-1"
                  onClick={() => setIsDeleteModalOpen(false)}
                />
                <PrimaryButton
                  text="Delete Permanently"
                  variant="danger"
                  className="flex-1"
                  onClick={handleDeleteAccount}
                />
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      </>
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
