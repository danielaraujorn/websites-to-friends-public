import path from "path";
import fs from "fs";
import { copyDirSync } from "./copyDirSync";

// Entries in `app/` that should live inside `app/[lang]/` when multi-language is enabled.
// You can override via env MULTI_LANG_ENTRIES="page.tsx,[slug],post,server-sitemap.xml"
const entriesToLocalize: string[] = (
  process.env.MULTI_LANG_ENTRIES
    ? process.env.MULTI_LANG_ENTRIES.split(",").map(s => s.trim()).filter(Boolean)
    : ["page.tsx", "[slug]", "post", "server-sitemap.xml", "layout.tsx"]
);

const repoRoot = path.join(__dirname, "..");

// Ensure a directory exists
function ensureDirSync(dirPath: string) {
  fs.mkdirSync(dirPath, { recursive: true });
}

// Move (prefer rename) with safe fallback to copy+remove
function safeMoveSync(srcPath: string, destPath: string) {
  ensureDirSync(path.dirname(destPath));
  if (!fs.existsSync(srcPath)) return;
  if (fs.existsSync(destPath)) {
    console.log(`↷ Skipped move. Destination already exists: ${destPath}`);
    return;
  }
  try {
    fs.renameSync(srcPath, destPath);
    console.log(`✔ Moved ${srcPath} -> ${destPath}`);
  } catch {
    const stat = fs.statSync(srcPath);
    if (stat.isDirectory()) {
      copyDirSync(srcPath, destPath);
      fs.rmSync(srcPath, { recursive: true, force: true });
    } else {
      fs.copyFileSync(srcPath, destPath);
      fs.rmSync(srcPath, { force: true });
    }
    console.log(`✔ Copied+Removed ${srcPath} -> ${destPath}`);
  }
}

export function rewriteAppForMultiLanguage(enableMultiLang: boolean) {
  const appDir = path.join(repoRoot, "app");
  const langDir = path.join(appDir, "[lang]");
  if (enableMultiLang) {
    ensureDirSync(langDir);
    for (const entry of entriesToLocalize) {
      const from = path.join(appDir, entry);
      const to = path.join(langDir, entry);
      if (fs.existsSync(from)) {
        safeMoveSync(from, to);
      } else {
        // If already under [lang], nothing to do
        if (fs.existsSync(to)) {
          console.log(`↷ Already localized: ${to}`);
        } else {
          console.log(`↷ Not found to localize: ${from}`);
        }
      }
    }
  } else {
    // Move back from app/[lang]/ to app/
    for (const entry of entriesToLocalize) {
      const from = path.join(langDir, entry);
      const to = path.join(appDir, entry);
      if (fs.existsSync(from)) {
        safeMoveSync(from, to);
      } else {
        // If already at root, nothing to do
        if (fs.existsSync(to)) {
          console.log(`↷ Already at root: ${to}`);
        } else {
          console.log(`↷ Not found under [lang]: ${from}`);
        }
      }
    }
  }
}