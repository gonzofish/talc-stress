const fs = require("fs");
const path = require("path");

const cleanDir = (dir) => {
  if (fs.existsSync(dir)) {
    removeDir(dir, false);
  } else {
    fs.mkdirSync(dir);
  }
};

const removeDir = (dir, removeRoot = true) => {
  if (fs.existsSync(dir)) {
    fs.readdirSync(dir).forEach((filename) => {
      const pathname = path.join(dir, filename);

      if (fs.statSync(pathname).isDirectory()) {
        removeDir(pathname);
      } else {
        fs.unlinkSync(pathname);
      }
    });

    if (removeRoot) {
      fs.rmdirSync(dir);
    }
  }
};

const writeFiles = (files, dir) => {
  const promises = files.map(
    ({ contents, filepath }) =>
      new Promise((resolve, reject) => {
        try {
          const dirpath = path.join(dir, filepath);

          fs.writeFileSync(dirpath, contents, { encoding: "utf8" });
          resolve(filepath);
        } catch (error) {
          reject(error);
        }
      })
  );

  return Promise.all(promises);
};

module.exports = {
  cleanDir,
  removeDir,
  writeFiles,
};
