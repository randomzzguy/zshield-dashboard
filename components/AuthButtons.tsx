import React from "react";

export default function AuthButtons() {
  const goSignIn = () => { window.location.href = "/api/auth/signin"; };
  return (
    <div className="flex gap-3">
      <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded" onClick={goSignIn}>Sign In</button>
    </div>
  );
}