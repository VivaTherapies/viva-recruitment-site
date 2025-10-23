import { readFileSync, writeFileSync } from 'fs';

const filePath = "./dist/index.html";

try {
  let content = readFileSync(filePath, "utf8");
  // Replace absolute paths with relative paths, ensuring quotes are preserved and correctly escaped
  content = content.replaceAll(/src="\//g, "src=\"./");
  content = content.replaceAll(/href="\//g, "href=\"./");
  writeFileSync(filePath, content, "utf8");
  console.log("Asset paths in index.html fixed successfully.");
} catch (error) {
  console.error("Error occurred while fixing asset paths:", error);
}

