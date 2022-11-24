import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthProvider";

const Sidebar = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="h-full p-3 space-y-2 w-60 bg-gray-900 text-gray-100">
      <div className="flex items-center p-2 space-x-4">
        <img
          src={user?.photoURL}
          alt=""
          className="w-12 h-12 rounded-full bg-gray-500"
        />
        <div>
          <h2 className="text-lg font-semibold">Leroy Jenkins</h2>
          <span className="flex items-center space-x-1">
            <a
              rel="noopener noreferrer"
              href="/"
              className="text-xs hover:underline text-gray-400"
            >
              View profile
            </a>
          </span>
        </div>
      </div>
      <div className="divide-y divide-gray-700">
        <ul className="pt-2 pb-4 space-y-1 text-sm"></ul>
      </div>
    </div>
  );
};

export default Sidebar;
