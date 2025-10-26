import React from "react";
import Header from "../../components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Testimonials from "./components/Testimonials";
import RelatedPostsSection from "@/components/RelatedPostsSection";
import Footer from "./components/Footer";
import { HomePageType } from "@/types/homePage";
import {
  sectionOrder,
  headerLinks,
} from "@/app/website-config";
import { SectionTypeEnum } from "@/types/website-config";

const getHeaderLink = (
  section: SectionTypeEnum,
  lang: string,
): { label: string; href: string } | null => {
  const link = headerLinks?.[lang]?.[section];
  if (!link) {
    return null;
  }
  return {
    label: link.label,
    href: `#${link.sectionId.replace(" ", "-")}`,
  };
};

const getSectionId = (
  section: string,
  lang: string,
): string | undefined => {
  const link =
    headerLinks?.[lang]?.[
      section as keyof (typeof headerLinks)[typeof lang]
    ];
  if (!link) return undefined;

  return link.sectionId.replace(" ", "-");
};

const Home: React.FC<{
  homePage: HomePageType;
  lang: string;
}> = ({ homePage, lang }) => {
  const { testimonialsCards, relatedPosts, slug } =
    homePage;

  const jsonLd = homePage?.seo?.schema
    ? JSON.stringify({
        ...(homePage?.seo?.schema as JSON),
        image: homePage?.seo?.image?.file?.url,
        url: `${
          process.env.NEXT_PUBLIC_FRONTEND_URL
        }/${slug.replace("/", "")}`,
      }).replace(/</g, "\\u003c")
    : undefined;

  const sectionsToRender = sectionOrder.map((section) => {
    switch (section) {
      case "about":
        return (
          <About
            id={getSectionId("about", lang)}
            {...homePage}
            lang={lang}
          />
        );
      case "services":
        return (
          <Services
            id={getSectionId("services", lang)}
            {...homePage}
            lang={lang}
          />
        );
      case "posts":
        return (
          <RelatedPostsSection
            id={getSectionId("posts", lang)}
            {...homePage}
            lang={lang}
          />
        );
      case "testimonials":
        return (
          <Testimonials
            id={getSectionId("testimonials", lang)}
            {...homePage}
          />
        );
      default:
        return null;
    }
  });

  const headerLinksToRender = sectionOrder
    .map((section) => {
      switch (section) {
        case SectionTypeEnum.ABOUT:
          return getHeaderLink(section, lang);
        case SectionTypeEnum.SERVICES:
          return getHeaderLink(section, lang);
        case SectionTypeEnum.POSTS:
          if (relatedPosts && relatedPosts.length > 0) {
            return getHeaderLink(section, lang);
          }
          return null;
        case SectionTypeEnum.TESTIMONIALS:
          if (
            testimonialsCards &&
            testimonialsCards.length > 0
          ) {
            return getHeaderLink(section, lang);
          }
          return null;
        default:
          return null;
      }
    })
    .filter((link) => link !== null);

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: jsonLd,
          }}
        />
      )}
      <div>
        <Header links={headerLinksToRender} lang={lang} />
        <Hero {...homePage} lang={lang} />
        {sectionsToRender.map((section, index) => (
          <React.Fragment key={sectionOrder[index]}>
            {section}
          </React.Fragment>
        ))}
        <Footer {...homePage} />
      </div>
    </>
  );
};

export default Home;
