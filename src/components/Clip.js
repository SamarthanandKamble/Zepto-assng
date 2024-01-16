import React from "react";

const Clip = ({ clickedUser, setClickedUsers,setSearchQuery }) => {
  const removeClickedUser = (clickedUser) => {
    setClickedUsers((prevClickedUsers) =>
      prevClickedUsers.filter(
        (user) => user.firstName !== clickedUser.firstName
      )
    );
    setSearchQuery((prev) => [clickedUser, ...prev]);
  };

  return (
    <div className="flex items-center bg-slate-300 mx-1 my-1 px-1 border rounded-lg">
      <img
        src={`${clickedUser?.image}`}
        alt={`${clickedUser?.firstName}`}
        className="w-4 h-4 mr-1"
      />
      <span className="text-sm mr-1">
        {`${clickedUser?.firstName} ${clickedUser?.lastName}`}
      </span>
      <span
        className="chip-close cursor-pointer"
        onClick={() => removeClickedUser(clickedUser)}
      >
        &#10005;
      </span>
    </div>
  );
};

export default Clip;
