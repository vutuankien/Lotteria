import React from "react";
import Sidebar from "./Sidebar";
import "./AccountPage.css";

const AccountPage = ({ children }) => {
  return (
    <div className="account-layout">
      <Sidebar />
      <div className="content">{children}</div>
    </div>
  );
};

export default AccountPage;
