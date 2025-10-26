export enum SectionTypeEnum {
  ABOUT = "about",
  SERVICES = "services",
  POSTS = "posts",
  TESTIMONIALS = "testimonials"
}

export type SectionOrder = SectionTypeEnum[]

export type HeaderLinks = {
  [lang: string]: {
    [key in SectionTypeEnum]: {
      label: string
      sectionId: string
    }
  }
}


export type GeoRedirect = {
  originPath: string
  destinationPath: string
  from: {
    country: string
    countryRegion: string
    city: string
  } | {
    country: string
    countryRegion: string
    city?: never
  } | {
    country: string
    countryRegion?: never
    city?: never
  }
}