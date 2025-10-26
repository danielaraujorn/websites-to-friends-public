import { SectionOrder, HeaderLinks, SectionTypeEnum } from "@/types/website-config"

export const sectionOrder: SectionOrder = [
  SectionTypeEnum.ABOUT,
  SectionTypeEnum.POSTS,
  SectionTypeEnum.SERVICES,
  SectionTypeEnum.TESTIMONIALS
]

export const headerLinks: HeaderLinks = {
  "pt-BR": {
    [SectionTypeEnum.ABOUT]: {
      label: "Sobre",
      sectionId: "sobre"
    },
    [SectionTypeEnum.SERVICES]: {
      label: "Experiência",
      sectionId: "experiencia"
    },
    [SectionTypeEnum.POSTS]: {
      label: "Projetos",
      sectionId: "projetos"
    },
    [SectionTypeEnum.TESTIMONIALS]: {
      label: "Depoimentos",
      sectionId: "depoimentos"
    }
  }, "en-US": {
    [SectionTypeEnum.ABOUT]: {
      label: "About",
      sectionId: "about"
    },
    [SectionTypeEnum.SERVICES]: {
      label: "Experience",
      sectionId: "experience"
    },
    [SectionTypeEnum.POSTS]: {
      label: "Projects",
      sectionId: "projects"
    },
    [SectionTypeEnum.TESTIMONIALS]: {
      label: "Testimonials",
      sectionId: "testimonials"
    }
  }
}

export const defaultLang = "en-US";
export const supportedLangs = ["pt-BR", "en-US"];