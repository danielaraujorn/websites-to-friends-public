import fs from "fs";
import path from "path";
import contentfulImport from "contentful-import";
import dotenv from "dotenv";
dotenv.config();

const SITE_ID = process.env.SITE_ID;
if (!SITE_ID) {
  console.error("SITE_ID not set. Aborting.");
  process.exit(1);
}

if (!process.env.CONTENTFUL_SPACE_ID) {
  console.error("CONTENTFUL_SPACE_ID not set. Aborting.");
  process.exit(1);
}

if (!process.env.CONTENTFUL_MANAGEMENT_TOKEN) {
  console.error("CONTENTFUL_MANAGEMENT_TOKEN not set. Aborting.");
  process.exit(1);
}

const repoRoot = path.join(__dirname, "..");
const baseSchemaPath = path.join(
  repoRoot,
  "contentful-schema.json",
);
const defaultsPath = path.join(
  repoRoot,
  "site-config",
  SITE_ID,
  "defaultValues.json",
);
const outPath = path.join(
  repoRoot,
  `contentful-schema.${SITE_ID}.json`,
);

if (!fs.existsSync(baseSchemaPath)) {
  console.error(`Base schema not found: ${baseSchemaPath}`);
  process.exit(1);
}
if (!fs.existsSync(defaultsPath)) {
  console.error(
    `Defaults not found for SITE_ID=${SITE_ID}: ${defaultsPath}`,
  );
  process.exit(1);
}

const base = JSON.parse(
  fs.readFileSync(baseSchemaPath, "utf-8"),
);
const defaults = JSON.parse(
  fs.readFileSync(defaultsPath, "utf-8"),
);
const merged = JSON.parse(JSON.stringify(base));

/**
 * Merge defaultValue overrides into contentTypes/fields by sys.id + field id.
 */
function applyContentTypeDefaults(baseSchema: any, overrides: any) {
  if (!Array.isArray(overrides?.contentTypes)) return;

  for (const ctOverride of overrides.contentTypes) {
    const ctId = ctOverride?.sys?.id;
    if (!ctId) continue;

    const ct = baseSchema.contentTypes?.find(
      (c: any) => c?.sys?.id === ctId,
    );
    if (!ct || !Array.isArray(ctOverride.fields)) continue;

    for (const fieldOverride of ctOverride.fields) {
      const fieldId = fieldOverride?.id;
      if (
        !fieldId ||
        typeof fieldOverride.defaultValue === "undefined"
      )
        continue;

      const field = ct.fields?.find(
        (f: any) => f?.id === fieldId,
      );
      if (!field) {
        console.warn(
          `⚠ Field "${fieldId}" not found on contentType "${ctId}". Skipping.`,
        );
        continue;
      }
      field.defaultValue = fieldOverride.defaultValue;
    }
  }
}

/**
 * Update existing webhook URLs (do not create new ones, to avoid invalid "sys" blocks).
 * Strategy:
 * - If override has "name", match by name and update its url.
 * - Else, if override has "url" and base has a webhook whose url contains "/api/revalidate",
 *   update that webhook's url (typical case for your "Revalidate" webhook).
 */
function applyWebhookOverrides(baseSchema: any, overrides: any) {
  if (
    !Array.isArray(overrides?.webhooks) ||
    !Array.isArray(baseSchema.webhooks)
  )
    return;

  for (const whOverride of overrides.webhooks) {
    const byName =
      whOverride.name &&
      baseSchema.webhooks.find(
        (w: any) =>
          (w?.name || "").trim() === whOverride.name.trim(),
      );

    if (byName) {
      if (whOverride.url) byName.url = whOverride.url;
      continue;
    }

    if (whOverride.url) {
      const revalidate = baseSchema.webhooks.find((w: any) =>
        typeof w?.url === "string"
          ? w.url.includes("/api/revalidate")
          : false,
      );
      if (revalidate) {
        revalidate.url = whOverride.url;
      } else {
        console.warn(
          "⚠ No matching webhook to update. Skipping creation.",
        );
      }
    }
  }
}

applyContentTypeDefaults(merged, defaults);
applyWebhookOverrides(merged, defaults);

fs.writeFileSync(
  outPath,
  JSON.stringify(merged, null, 2) + "\n",
  "utf-8",
);

console.log(`✔ Wrote merged schema -> ${outPath}`);

const options: Parameters<typeof contentfulImport>[0] = {
  contentFile: outPath,
  spaceId: process.env.CONTENTFUL_SPACE_ID,
  managementToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN,
  contentModelOnly: true,
};

contentfulImport(options)
  .then(() => {
    console.log("Data imported successfully");
  })
  .catch((err: Error) => {
    console.log("Oh no! Some errors occurred!", err);
  })
  .finally(() => {
    fs.unlinkSync(outPath);
    console.log(`✔ Deleted temporary file -> ${outPath}`);
  });
