import React, { useEffect, useState } from "react";
import Item from "../interfaces";
import { useParams } from "react-router-dom";

function SingleUser(): JSX.Element {
  const [user, setUser] = useState<Item>();
  const { login } = useParams();

  useEffect(() => {
    const fetchItem: () => Promise<void> = async () => {
      const fetchItem = await fetch(`https://api.github.com/users/${login}`);
      const item = await fetchItem.json();
      setUser(item);
    };
    fetchItem();
  }, [login]);

  console.log(user)

  return (
    <div className="SingleUserWrapper">
      <div className="AvatarWrapper">
        <img className="SingleUserAvatar" src={user?.avatar_url} alt="avatar" />
      </div>
      <div className="BasicInfo">
        <h2>{user?.name}</h2>
        <h4>{user?.login}</h4>
        <h4>Bio: {user?.bio}</h4>
        <a href={user?.html_url}>
          <button>GitHub Account</button>
        </a>
        <p>Folowers: {user?.followers} | Folowing: {user?.following}</p>
        {user?.company && (<p>Company: {user?.company}</p>)}
      </div>
    </div>
  );
}

export default SingleUser;
