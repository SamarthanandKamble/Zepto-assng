import React from "react";

const Header = ({ header }) => {
  return (
    <header className="text-xl text-blue-400 text-center font-bold">
      {header}
    </header>
  );
};

export default Header;
