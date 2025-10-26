import { revalidatePath } from "next/cache";

type Locale = "pt-BR"

type LanguageContent<T> = {
  [key in Locale]: T
}

type RequestBody = {
  // "metadata": {
  //   "tags": [],
  //   "concepts": []
  // },
  fields: {
    slug: LanguageContent<string>
  },
  sys: {
    type: string,
    id: string,
    // "space": {: string,
    //   "sys": {
    //     "type": "Link",
    //     "linkType": "Space",
    //     "id": "isfhjb9ne8d4"
    //   }
    // },
    // "environment": {
    //   "sys": {
    //     "id": "master",
    //     "type": "Link",
    //     "linkType": "Environment"
    //   }
    // },
    contentType: {
      sys: {
        id: string
      }
    },
    // "createdBy": {
    //   "sys": {
    //     "type": "Link",
    //     "linkType": "User",
    //     "id": "01kV6cQPEgrmeuGWkJN1LL"
    //   }
    // },
    // "updatedBy": {
    //   "sys": {
    //     "type": "Link",
    //     "linkType": "User",
    //     "id": "01kV6cQPEgrmeuGWkJN1LL"
    //   }
    // },
    // "revision": 2,
    // "createdAt": "2025-10-08T19:49:58.107Z",
    // "updatedAt": "2025-10-08T20:30:34.536Z",
    // "publishedVersion": 5
  }
}

const getLanguagePrefixes = () => {
  if (process.env.ENABLE_MULTI_LANGUAGE === "true") {
    return "/[lang]";
  }
  return "";
}

const LANGUAGE_PREFIX = getLanguagePrefixes();

const getHomePagePath = (slug: string) => {
  return `${LANGUAGE_PREFIX}/${slug.replace("/", "")}`;
}

const getBlogPostPath = (slug: string) => {
  return `${LANGUAGE_PREFIX}/post/${slug.replace("/", "")}`;
}


export const POST = async (request: Request) => {
  const secret = request.headers.get("Authorization");
  const body: RequestBody = await request.json();
  const { sys, fields } = body;

  if (process.env.REVALIDATE_SECRET && secret !== process.env.REVALIDATE_SECRET) {
    return new Response("Invalid secret", { status: 401 });
  }

  if (sys.contentType.sys.id === "homePage") {
    const availableLocales = Object.keys(fields.slug) as Locale[];
    for (const locale of availableLocales) {
      const homePagePath = fields.slug[locale] ?? "/";
      await revalidatePath(getHomePagePath(homePagePath), "page")
      console.log(`revalidated home pages of slug ${getHomePagePath(homePagePath)}`);
    }
    return new Response("Revalidated", { status: 200 });
  }

  if (sys.contentType.sys.id === "blogPost") {
    const availableLocales = Object.keys(fields.slug) as Locale[];
    for (const locale of availableLocales) {
      const blogPostPath = fields.slug[locale] ?? "/";
      await revalidatePath(getBlogPostPath(blogPostPath), "page")
      console.log(`revalidated blog posts of slug ${getBlogPostPath(blogPostPath)}`);
    }
    return new Response("Revalidated", { status: 200 });
  }
  
  return new Response("Not revalidated", { status: 200 });
};  