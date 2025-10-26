import contentfulExport, { Options } from "contentful-export";
import dotenv from "dotenv";
dotenv.config();

if (process.env.SITE_ID !== "livia-oliveira") {
  console.error("SITE_ID is not livia-nutricista");
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

const options: Options = {
  contentFile: "contentful-schema.json",
  spaceId: process.env.CONTENTFUL_SPACE_ID,
  managementToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN,
  skipContent: true,
};

contentfulExport(options)
  .then(() => {
    console.log("Data imported successfully");
  })
  .catch((err: Error) => {
    console.log("Oh no! Some errors occurred!", err);
  });
