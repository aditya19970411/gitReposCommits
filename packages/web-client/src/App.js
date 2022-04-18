import React, { useState } from "react";
import "./App.css";

function App() {
  const [username, setusername] = useState("");
  const [loading, setloading] = useState(false);
  const [showTable, setshowTable] = useState(false);
  const [repo, setrepo] = useState([]);

  const fetchRepos = async () => {
    const repos = await fetch(
      `/api/get-repo-and-commit/${username}`
    ).then((res) => res.json());
    if (!(repos && repos.length > 0)) {
      setshowTable(false);
      setrepo([]);
      setusername("");
      alert("No Repositories Found !!!");
    } else {
      setrepo(repos);
      setusername("");
      setshowTable(true);
    }
    console.log("REPOSITORIES", repos);
  };

  const handleButtonClick = () => {
    fetchRepos();
  };

  const goBack = () => {
    setrepo([]);
    setshowTable(false);
  };

  return showTable ? (
    <div className="flex flex-1 justify-center items-center flex-col p-8">
      <span className="my-8 text-2xl font-bold">Repositories</span>
      <div>
        <button
          onClick={goBack}
          className="py-1 px-4 border-2 border-solid border-black rounded-lg my-4"
        >
          Back
        </button>
        <table>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>ID</th>
            <th>Commits</th>
          </tr>
          {repo.map((r) => (
            <tr key={r.node_id}>
              <td>{r.name}</td>
              <td>{r.username}</td>
              <td>{r.id}</td>
              <td>
                <table>
                  <tr>
                    <th>Author</th>
                    <th>Committer</th>
                    <th>Message</th>
                    <th>Date</th>
                  </tr>
                  {r.commits.map((commit) => (
                    <tr>
                      <td>{commit.author.name}</td>
                      <td>{commit.committer.name}</td>
                      <td>{commit.message}</td>
                      <td>{commit.committer.date}</td>
                    </tr>
                  ))}
                </table>
              </td>
            </tr>
          ))}
        </table>
        <button
          onClick={goBack}
          className="py-1 px-4 border-2 border-solid border-black rounded-lg my-4"
        >
          Back
        </button>
      </div>
    </div>
  ) : (
    <div className="h-full w-full flex justify-center items-center flex-col">
      <span className="text-2xl my-4">Get Public Repositories And Commits</span>
      <div className="my-12 border-b-2 border-solid border-black pr-2 py-1">
        <input
          placeholder="Enter github username....."
          className="outline-none"
          onChange={(e) => setusername(e.target.value)}
          value={username}
        />
      </div>
      <button
        disabled={!!!username}
        className="py-1 px-4 border-2 border-solid border-black rounded-lg"
        onClick={handleButtonClick}
      >
        Submit
      </button>
    </div>
  );
}

export default App;
