const Lipsum = require("lorem-ipsum").LoremIpsum;
const path = require("path");

const files = require("./files");

const generatePosts = async (numPosts = 10000) => {
  const posts = makePosts(numPosts);
  const root = path.resolve(__dirname, "..");
  const outdir = path.join(root, "posts");

  files.cleanDir(outdir);
  await files.writeFiles(posts, outdir);
};

const makePosts = (numPosts) => {
  const lorem = new Lipsum(
    {
      sentencesPerParagraph: {
        min: 4,
        max: 8,
      },
      wordsPerSentence: {
        min: 4,
        max: 16,
      },
    },
    undefined,
    "\n\n"
  );
  const posts = [];

  for (let i = 0; i < numPosts; i += 1) {
    posts.push({
      contents: formatPost(
        `Post \\#${i}`,
        lorem.generateParagraphs(getRandom(3, 20))
      ),
      filepath: `post_${i}.md`,
    });
  }

  return posts;
};

const getRandom = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const formatPost = (title, contents) => {
  return `---
title: ${title}
publish_date: ${getTimestamp()}
---
${contents}`;
};

const getTimestamp = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hour = pad(date.getHours());
  const minute = pad(date.getMinutes());
  const second = pad(date.getSeconds());

  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
};

const pad = (value) => `0${value}`.slice(-2);

if (!module.parent) {
  generatePosts(10);
}

module.exports = generatePosts;
