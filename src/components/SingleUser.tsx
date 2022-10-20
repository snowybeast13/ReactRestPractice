import React, { useEffect, useState } from "react";
import { Item, Repositorium } from "../interfaces";
import { useParams } from "react-router-dom";

function SingleUser(): JSX.Element {
  const [user, setUser] = useState<Item>();
  const [repoList, setRepoList] = useState<Repositorium[]>([]);
  const { login } = useParams<string>();

  useEffect(() => {
    const fetchItem: () => Promise<void> = async () => {
      const fetchItem = await fetch(`https://api.github.com/users/${login}`);
      const repos = await fetch(`https://api.github.com/users/${login}/repos`);
      const item = await fetchItem.json();
      const repo: [] = await repos.json();
      setUser(item);
      setRepoList(repo);
    };
    fetchItem();
  }, [login]);

  return (
    <div className="SingleUserWrapper">
      <div className="AvatarWrapper">
        <img className="SingleUserAvatar" src={user?.avatar_url} alt="avatar" />
      </div>
      <div className="BasicInfo">
        <h2>{user?.name}</h2>
        <h4>{user?.login}</h4>
        {user?.bio && <h4>Bio: {user?.bio}</h4>}
        <a href={user?.html_url}>
          <button>GitHub Account</button>
        </a>
        <p>
          Folowers: {user?.followers} | Folowing: {user?.following}
        </p>
        {user?.company && <p>Company: {user?.company}</p>}
      </div>
      <h2>Repositories</h2>
      <div className="ReposWrapper">
        {repoList ? (
          repoList.map((repo) => (
            <div className="SingleRepo" key={repo.id}>
              <p>
                <a href={repo.url}>{repo.name}</a> | {repo.visibility}
              </p>
              <p>Language: {repo.language}</p>
            </div>
          ))
        ) : (
          <div>
            <h4>User didn't create any repositoriums</h4>
          </div>
        )}
      </div>
    </div>
  );
}

export default SingleUser;
