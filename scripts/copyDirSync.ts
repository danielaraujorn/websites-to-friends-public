import fs from "fs";
import path from "path";

// Helper function to copy directory recursively
export function copyDirSync(src: string, dest: string) {
  if (!fs.existsSync(src)) {
    console.error(`Source directory not found: ${src}`);
    process.exit(1);
  }
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, {
    withFileTypes: true,
  });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}