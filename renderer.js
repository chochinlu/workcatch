// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const screenshot = require("screenshot-desktop");

const getScreenShot = () => {
  screenshot({ filename: 'shot.jpg' })
    .then(imgPath => {
      // img: Buffer filled with jpg goodness
      console.log(`catched! ${imgPath}`);
    })
    .catch(err => {
      console.log("catch error!");
    });
};
exports.getScreenShot = getScreenShot;
