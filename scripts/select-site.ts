// scripts/select-site.js
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { copyDirSync } from "./copyDirSync";
import { buildProxy } from "./buildProxy";
import { rewriteAppForMultiLanguage } from "./rewriteAppForMultiLanguage";
dotenv.config();

const SITE_ID = process.env.SITE_ID;
if (!SITE_ID) {
  console.error("SITE_ID not set. Aborting.");
  process.exit(1);
}


// Copy all the config files to the app folder.
const repoRoot = path.join(__dirname, "..");
const siteRoot = path.join(
  repoRoot,
  "site-config",
  SITE_ID,
);

if (!fs.existsSync(siteRoot)) {
  console.error(`Site folder not found: ${siteRoot}`);
  process.exit(1);
}

const filesToCopyToApp = [
  "website-config.ts",
  "colors.css",
];
function copyFilesToApp() {
  for (const file of filesToCopyToApp) {
    const siteFile = path.join(siteRoot, file);
    const appFile = path.join(repoRoot, "app", file);
    if (fs.existsSync(siteFile)) {
      fs.copyFileSync(siteFile, appFile);
      console.log(`✔ Copied ${siteFile} -> ${appFile}`);
    }
  }
}
copyFilesToApp()

const sitePublic = path.join(siteRoot, "public");
const repoPublic = path.join(repoRoot, "public");
copyDirSync(sitePublic, repoPublic);

//rewrite the app folder to support multiple languages
rewriteAppForMultiLanguage(process.env.ENABLE_MULTI_LANGUAGE === "true");

if (process.env.BUILD_PROXY === 'true' || process.env.ENABLE_MULTI_LANGUAGE === 'true') {
  buildProxy()
}