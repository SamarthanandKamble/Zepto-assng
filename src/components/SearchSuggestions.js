import React from "react";

const SearchSuggestions = ({
  searchQuery,
  setSearchQuery,
  setClickedUsers,
}) => {
  const updateSearchValue = (user) => {
    setClickedUsers((prevClickedUser) => [...prevClickedUser, user]);
    setSearchQuery((prevSearchQuery) =>
      prevSearchQuery.filter((search) => search?.firstName !== user.firstName)
    );
  };
  return (
    <div className="m-1 shadow-xl">
      {searchQuery.length > 0 && (
        <div className="h-56 overflow-auto">
          {searchQuery.map((user) => (
            <div
              className="flex content-center items-center p-2 cursor-pointer hover:bg-slate-300"
              key={user.id}
              onClick={() => updateSearchValue(user)}
            >
              <img
                src={`${user?.image}`}
                alt={`${user?.firstName}`}
                className="mr-2 w-10 h-10 rounded-full"
              />
              <span className="mr-2">
                {user?.firstName} {user?.lastName}
              </span>
              <span>{user?.email}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchSuggestions;
