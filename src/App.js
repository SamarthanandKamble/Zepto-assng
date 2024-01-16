import { useEffect, useState, useRef } from "react";
import Header from "./components/Header";
import SearchSuggestions from "./components/SearchSuggestions";
import Clip from "./components/Clip";
function App() {
  const [user, setUser] = useState("");
  const [userSuggestions, setUserSuggestions] = useState([]);
  const [searchQuery, setSearchQuery] = useState([]);
  const [userListFlag, setUserListFlag] = useState(false);
  const [clickedUsers, setClickedUsers] = useState([]);
  const inputValue = useRef(null);
  const [error, setError] = useState(false);
  useEffect(() => {
    fetchTheData();
  }, []);

  const fetchTheData = async () => {
    try {
      if (searchQuery.length <= 0 && userSuggestions.length <= 0) {
        const data = await fetch("https://dummyjson.com/users?limit=7");
        const { users } = await data.json();
        setUserSuggestions(users);
        setSearchQuery(users);
      }
    } catch (error) {
      setError(error?.message);
    }
  };

  const handleSearchQuery = (e) => {
    setUser(e.target.value);
    setSearchQuery(
      userSuggestions.filter(
        (user) =>
          user?.firstName.toLowerCase().includes(e.target.value) ||
          user?.lastName.toLowerCase().includes(e.target.value)
      )
    );
  };

  if (error) {
    return <h1>{error}</h1>;
  }
  return (
    <div className="w-full md:w-1/2 lg:w-1/2 xl:w-1/3 mx-auto mt-6 ">
      <Header header={"Pick Users"} />
      <div className="flex flex-wrap border-b-4 border-blue-400 sm:flex-col sm:items-start md:flex-row md:items-center">
        {clickedUsers.map((clickedUser) => (
          <Clip
            key={clickedUser.id}
            clickedUser={clickedUser}
            setClickedUsers={setClickedUsers}
            setSearchQuery={setSearchQuery}
          />
        ))}

        <input
          type="text"
          placeholder="Add new users..."
          value={user}
          onChange={(e) => handleSearchQuery(e)}
          onFocus={() => setUserListFlag(true)}
          className="outline-none w-full sm:w-auto mt-2 sm:mt-0"
          ref={inputValue}
        />
      </div>

      {userListFlag && (
        <SearchSuggestions
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setClickedUsers={setClickedUsers}
        />
      )}
    </div>
  );
}

export default App;
