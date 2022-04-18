const express = require("express");
const port = process.env.PORT || 6000;
const bodyParser = require("body-parser");
const { getRepoAndCommit } = require("./service/repoAndCommitService");
const { findIfExists, insertIfNotExists } = require("./service/database");
const app = express();

app.use(bodyParser.json());

app.get("/api/get-repo-and-commit/:username", async (req, res) => {
  const { username } = req.params;
  const existingRepos = await findIfExists(username);
  let repos;
  console.log("EXISTING REPOS !!!", existingRepos);
  if (existingRepos && existingRepos.length > 0)
    res.json(
      existingRepos
      // .map((exrp) => {
      //   const { username, id, node_id, name, commits } = exrp;
      //   return {
      //     username,
      //     id,
      //     node_id,
      //     name,
      //     commits,
      //   };
      // })
    );
  else {
    repos = await getRepoAndCommit(username);
    const inserted = await insertIfNotExists(repos);
    res.json(repos);
  }
});

app.get("/", (req, res) => {
  res.send("This is the backend!!!");
});

app.listen(port, (err) => {
  console.log(`Listening on Port: ${port}`);
});
