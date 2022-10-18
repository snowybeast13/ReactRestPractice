import React, { useEffect, useState } from "react";
import Item from "../interfaces";
// import axios from "axios";
import useDebounce from "../hooks/useDebounce";

function SearchUsers() {
  const [users, setAllUsers] = useState<Item[]>([]);
  const [search, setSearch] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      const data = await fetch(
        `https://api.github.com/search/users?q=${debouncedSearch}`
      ).then((res) => res.json());
      const allUsers = data?.items;
      console.log(allUsers);
      setAllUsers(allUsers);
      setLoading(false);
    }
    if (debouncedSearch) {
      fetchData();
    } else {
      setAllUsers([]);
    }
  }, [debouncedSearch]);

  return (
    <div className="Wrapper">
      <div className="SearchWrapper">
        <input
          type="text"
          placeholder="Search Users"
          className="SearchInput"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading && <p>Loading...</p>}
      <div className="ResultsWrapper">
        {users.map((user) => (
          <div className="ListItem" key={user.id}>
            <img className="UserAvatar" src={user.avatar_url} alt="avatar" />
            <p>{user.login}</p>
            <a href={user.html_url}>
              <button className="UserDetailsBtn">User Details</button>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchUsers;
