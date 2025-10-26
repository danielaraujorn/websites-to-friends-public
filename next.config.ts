import type { NextConfig } from "next";
import path from "path"

const nextConfig: NextConfig = {
  sassOptions: {
    loadPaths: [path.join(process.cwd(), "styles")],
    additionalData: '@use "mediaQueries" as *;',
  },
};

export default nextConfig;