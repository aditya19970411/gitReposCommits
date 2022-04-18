const fetch = require("node-fetch");

const getRepoAndCommit = async (username) => {
  try {
    let repo = await fetch(`https://api.github.com/users/${username}/repos`);
    repo = await repo.json();

    if (!Array.isArray(repo)) return repo;

    repo = repo.map(
      (r) =>
        new Promise(async (resolve, reject) => {
          let commits = await fetch(
            `https://api.github.com/repos/${username}/${r.name}/commits`
          );
          commits = await commits.json();
          console.log("COMMITS", commits);
          commits = commits.map((c) => {
            return {
              author: c.commit.author,
              committer: c.commit.committer,
              message: c.commit.message,
            };
          });
          const { id, node_id, name } = r;
          resolve({
            username,
            id,
            node_id,
            name,
            commits,
          });
        })
    );

    // repo = repo.reduce((prev, r) => {
    //   prev.push(
    //     new Promise(async (resolve, reject) => {
    //       let commits = await fetch(
    //         `https://api.github.com/repos/${username}/${r.name}/commits`
    //       );
    //       commits = await commits.json();
    //       commits = commits.reduce((p, c) => {
    //         p.push({
    //           author: c.commit.author,
    //           committer: c.commit.committer,
    //           message: c.commit.message,
    //         });
    //         return p;
    //       }, []);
    //       resolve({
    //         username,
    //         id: r.id,
    //         node_id: r.node_id,
    //         name: r.name,
    //         commits,
    //       });
    //     })
    //   );
    //   return prev;
    // }, []);

    repo = await Promise.all(repo);

    console.log("REPO", repo);
    return repo;
  } catch (err) {
    console.log("ERROR", err);
  }
};

module.exports = {
  getRepoAndCommit,
};
