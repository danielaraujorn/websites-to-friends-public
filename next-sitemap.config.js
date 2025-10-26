/** @type {import('next-sitemap').IConfig} */

const isProd = process.env.VERCEL_ENV === "production";

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_FRONTEND_URL,
  generateRobotsTxt: true,
  exclude: ["/api/*"],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: isProd ? ["/"] : [],
        disallow: isProd
          ? [
              "/api/",
              "/_next/static/chunks/",
              "/_next/static/css/",
            ]
          : ["/"],
      },
    ],
    additionalSitemaps: [
      `${process.env.NEXT_PUBLIC_FRONTEND_URL}/server-sitemap.xml`,
    ],
  },
};
