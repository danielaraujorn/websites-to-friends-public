import path from "path";
import fs from "fs";
import { GeoRedirect } from "@/types/website-config";
import dotenv from "dotenv";
dotenv.config();

const repoRoot = path.join(__dirname, "..");
const SITE_ID = process.env.SITE_ID;
if (!SITE_ID) {
  console.error("SITE_ID not set. Aborting.");
  process.exit(1);
}

const siteRoot = path.join(
  repoRoot,
  "site-config",
  SITE_ID,
);
const siteConfigPath = path.join(siteRoot, 'website-config.ts');

function getMatcherArray(): string[] {
  if (!fs.existsSync(siteConfigPath)) {
    console.error(`website-config.ts not found at ${siteConfigPath}`);
    process.exit(1);
  }

  const geoRedirects = require(siteConfigPath).geoRedirects;
  return Array.from(new Set(geoRedirects?.map((r: GeoRedirect) => r.originPath as string) ?? [])) as string[];
}

function rewriteMatcher(source: string, matcherArray: string[]): string {
  const matcherJson = JSON.stringify(matcherArray);

  // Replace only the value of the matcher property, preserving indentation and any trailing comma.
  const propRegex = /(^\s*matcher\s*:\s*)(?:".*?"|'.*?'|\[[\s\S]*?\])/m;

  if (propRegex.test(source)) {
    return source.replace(propRegex, (_, p1: string) => `${p1}${matcherJson}`);
  }

  // If matcher prop not found, try to insert it inside export const config = { ... }
  const configBlockRegex = /(export\s+const\s+config\s*=\s*\{\s*)([\s\S]*?)(\s*\})/m;
  const m = source.match(configBlockRegex);
  if (!m) {
    console.error('Could not find `export const config = { ... }` block in proxy.ts');
    process.exit(1);
  }

  const before = m[1];
  const body = m[2];
  const after = m[3];

  // Determine indentation based on existing properties; default to two spaces if none.
  const existingIndentMatch = body.match(/^\s+/m);
  const indent = existingIndentMatch ? existingIndentMatch[0] : '';

  const insertion = `${indent}matcher: ${matcherJson}\n`;
  // Insert matcher at the start of the config object body.
  return source.replace(configBlockRegex, `${before}${insertion}${body}${after}`);
}

export function buildProxy() {
  const proxyPath = path.join(repoRoot, 'proxy.ts');
  if (!fs.existsSync(proxyPath)) {
    console.error(`proxy.ts not found at ${proxyPath}`);
    process.exit(1);
  }
  const source = fs.readFileSync(proxyPath, 'utf8');
  const matcherArray = process.env.ENABLE_MULTI_LANGUAGE === 'true' ? ['/((?!_next).*)'] : getMatcherArray();
  const updated = rewriteMatcher(source, matcherArray);
  if (updated !== source) {
    fs.writeFileSync(proxyPath, updated, 'utf8');
    console.log('✔ Updated proxy.ts matcher to:', matcherArray);
  } else {
    console.log('No changes to proxy.ts matcher needed.');
  }
}