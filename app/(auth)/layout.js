import React from "react";

const AuthLayout = ({ children }) => {
  return (
    <div className="flex justify-center items-center pt-[150px] pb-[100px] ">
      {children}
    </div>
  );
};

export default AuthLayout;
