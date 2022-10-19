import React, { useEffect, useState } from "react";
import Item from "../interfaces";
import { useParams } from "react-router-dom";

function SingleUser(): JSX.Element {
  const [user, setUser] = useState<Item[]>([]);

  console.log("USE PARAMS:", useParams());
  const { login } = useParams();

  useEffect(() => {
    fetchItem();
  }, []);

  const fetchItem: () => Promise<void> = async () => {
    const fetchItem = await fetch(
      `https://api.github.com/search/users?q=${login}`
    );
    const item = await fetchItem.json();
    setUser(item.items);
    console.log("ITEMS:", item.items);
  };

  const single = user.find((single) => single.login === login);
  console.log("Single", single);

  return (
    <div className="SingleUserWrapper">
      <div>
        <img
          className="SingleUserAvatar"
          src={single?.avatar_url}
          alt="avatar"
        />
      </div>

      <div className="BasicInfo">
        <h3>Username: {single?.login}</h3>
        <h3>UserID: {single?.id}</h3>
        <a href={single?.html_url}>
          <button>GitHub Account</button>
        </a>
      </div>
    </div>
  );
}

export default SingleUser;
