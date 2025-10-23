import { readFileSync, writeFileSync } from 'fs';

const filePath = "./dist/index.html";

try {
  let content = readFileSync(filePath, "utf8");
  content = content.replaceAll(/="\//g, "=\"./");
  writeFileSync(filePath, content, "utf8");
  console.log("Asset paths in index.html fixed successfully.");
} catch (error) {
  console.error("Error occurred while fixing asset paths:", error);
}

