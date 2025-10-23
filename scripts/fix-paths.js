const replace = require("replace-in-file");

const options = {
  files: "./dist/index.html",
  from: /="\//g,
  to: "=\"./",
};

async function fixPaths() {
  try {
    const results = await replace(options);
    console.log("Replacement results:", results);
  } catch (error) {
    console.error("Error occurred:", error);
  }
}

fixPaths();

