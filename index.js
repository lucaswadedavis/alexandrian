const GitHubApi = require('github');
const md = require('html-md');

const config = require('./config');

const github = GitHubApi({});

exports.alexandrian = function alexandrian(req, res) {
  if (req.body.content === undefined) res.status(400).send('No article content.');
  if (req.body.title === undefined) res.status(400).send('No article title.');
  if (req.body.url === undefined) res.status(400).send('No article url.');

  const {content, title, url} = req.body;
  const {fileType, path, repo, token, username} = config.github;

  const payload = `# [${title}](${url})

    ${md(content)}...
  `;

  const opts = {
    owner: username,
    repo: repo,
    path: `${path}/${title}.${fileType}`,
    message: title,
    content: new Buffer(payload).toString('base64')
  }

  github.authenticate({type: "oauth", token: token});

  github.repos.createFile(opts, function(err, GHRes) {
    if (err) res.status(400).send(JSON.stringify(err));
    res.status(200).send(JSON.stringify(GHRes, null, '  '));
  });
};
