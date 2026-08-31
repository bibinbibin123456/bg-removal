import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Profile = () => {
  const navigate = useNavigate();
  const { user, credit, token } = useContext(AppContext);

  useEffect(() => {
    if (!token) {
      navigate("/signIn");
    }
  }, [token, navigate]);

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl rounded-[32px] border border-slate-200 bg-white p-8 shadow-[0_20px_50px_rgba(15,23,42,0.08)]">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-600">
              My Profile
            </p>
            <h1 className="mt-4 text-3xl font-semibold text-slate-900">Account details</h1>
            <p className="mt-2 text-sm text-slate-500">
              Manage your BG Removal account and view subscription credits.
            </p>
          </div>

          <div className="rounded-3xl bg-slate-100 px-5 py-4 text-center">
            <p className="text-sm text-slate-500">Available credits</p>
            <p className="mt-2 text-3xl font-semibold text-slate-900">{credit}</p>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <h2 className="text-lg font-semibold text-slate-900">Personal information</h2>
            <div className="mt-5 space-y-4 text-sm text-slate-600">
              <div>
                <p className="font-medium text-slate-800">Name</p>
                <p>{user.name || user.fullName || "User"}</p>
              </div>
              <div>
                <p className="font-medium text-slate-800">Email</p>
                <p>{user.email}</p>
              </div>
              <div>
                <p className="font-medium text-slate-800">Joined</p>
                <p>{new Date(user.createdAt || user.created_at || Date.now()).toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <h2 className="text-lg font-semibold text-slate-900">Account activity</h2>
            <div className="mt-5 space-y-4 text-sm text-slate-600">
              <div>
                <p className="font-medium text-slate-800">Account status</p>
                <p>{token ? "Signed in" : "Signed out"}</p>
              </div>
              <div>
                <p className="font-medium text-slate-800">Current plan</p>
                <p>Pay-as-you-go</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
