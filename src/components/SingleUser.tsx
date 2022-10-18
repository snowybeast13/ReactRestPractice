import React, { useEffect, useState } from "react";
import Item from "../interfaces";
import { useParams } from "react-router-dom";

function SingleUser(): JSX.Element {
  const [user, setUser] = useState<Item[]>([]);

  console.log(useParams());
  const { login } = useParams();

  useEffect(() => {
    fetchItem();
    console.log(login);
  }, []);

  const fetchItem: () => Promise<void> = async () => {
    const fetchItem = await fetch(
      `https://api.github.com/search/users?q=${login}`
    );
    const item = await fetchItem.json();
    setUser(item.items);
    console.log(item.items.login);
  };

  const single = user.find((single) => single.login === login);
  console.log(single);

  return (
    <div className="SingleUserWrapper">
      <div>
        <img
          className="SingleUserAvatar"
          src={single?.avatar_url}
          alt="avatar"
        />
      </div>
      <div>
        <h3>Username: {single?.login}</h3>
        <h3>UserID: {single?.id}</h3>
      </div>
    </div>
  );
}

export default SingleUser;
