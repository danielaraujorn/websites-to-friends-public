import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { Geo, geolocation } from '@vercel/functions'
import * as webConfig from './app/website-config'
import type { GeoRedirect } from './custom-types/website-config'
import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'

const geoRedirects = (webConfig as (typeof webConfig & { geoRedirects?: GeoRedirect[] })).geoRedirects
const defaultLang = (webConfig as (typeof webConfig & { defaultLang?: string })).defaultLang ?? 'pt-BR'
const supportedLangs = (webConfig as (typeof webConfig & { supportedLangs?: string[] })).supportedLangs ?? ['pt-BR']

const getGeoRedirect = (geo: Geo) => {
  return geoRedirects?.find((r) => (
    r.from.country === geo.country &&
    r.from.countryRegion === geo.countryRegion &&
    r.from.city === geo.city
  )) ?? geoRedirects?.find((r) => (
    r.from.country === geo.country &&
    r.from.countryRegion === geo.countryRegion
  )) ?? geoRedirects?.find((r) => (
    r.from.country === geo.country
  ))
}

const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

const getLangFromRequest = (request: NextRequest) => {
  if (process.env.ENABLE_MULTI_LANGUAGE !== 'true') return null
  const negotiatorHeaders: Record<string, string> = {}
  request.headers.forEach((value, key) => { negotiatorHeaders[key] = value })
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages()
  const defaultLocale = defaultLang
  const locales = supportedLangs
  return match(languages, locales, defaultLocale)
}

const extractLocaleFromPathname = (pathname: string): string | undefined => {
  const localesAlternation = supportedLangs.map(escapeRegExp).join('|')
  const m = pathname.match(new RegExp(`^/(${localesAlternation})(?=/|$)`))
  return m?.[1]
}

const resolveLang = (request: NextRequest, currentLocale?: string | undefined) => {
  if (process.env.ENABLE_MULTI_LANGUAGE !== 'true') return null
  // 1) If there is a language in the current pathname, use it
  if (currentLocale && supportedLangs.includes(currentLocale)) return currentLocale
  // 2) Else, try to extract language from referrer
  const referer = request.headers.get('referer')
  if (referer) {
    try {
      const refUrl = new URL(referer)
      const fromRef = extractLocaleFromPathname(refUrl.pathname)
      if (fromRef && supportedLangs.includes(fromRef)) return fromRef
    } catch {
      // ignore malformed referrer
    }
  }
  // 3) Else, negotiate from Accept-Language
  return getLangFromRequest(request) ?? defaultLang
}

export function proxy(request: NextRequest) {
  const url = request.nextUrl
  const { pathname } = url

  // Skip assets and internal routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    /\.[a-z0-9]+$/i.test(pathname) // files with extensions
  ) {
    return NextResponse.next()
  }

  const geo = geolocation(request)
  const locales = supportedLangs
  const localesAlternation = locales.map(escapeRegExp).join('|')
  const localePrefixRe = new RegExp(`^/(?:${localesAlternation})(?=/|$)`)
  const hasLocalePrefix = localePrefixRe.test(pathname)
  // Extract current locale (if present) and a path without locale
  let currentLocale: string | undefined
  let pathWithoutLocale = pathname
  if (hasLocalePrefix) {
    const m = pathname.match(new RegExp(`^/(${localesAlternation})(?=/|$)`))
    currentLocale = m?.[1]
    pathWithoutLocale = pathname.slice(1 + (currentLocale?.length ?? 0)) || '/'
    if (!pathWithoutLocale.startsWith('/')) pathWithoutLocale = '/' + pathWithoutLocale
  }

  // Geo redirect: only when the current (de-localized) path equals the originPath
  const geoRedirect = getGeoRedirect(geo)
  if (geoRedirect) {
    const atOrigin = pathWithoutLocale === geoRedirect.originPath
    const atDestination = pathWithoutLocale === geoRedirect.destinationPath
    if (atOrigin && !atDestination) {
      const selectedLang = resolveLang(request, currentLocale || undefined)
      const langPart = process.env.ENABLE_MULTI_LANGUAGE === 'true' && selectedLang ? `/${selectedLang}` : ''
      const nextPath = `${langPart}${geoRedirect.destinationPath}`
      if (nextPath !== pathname) {
        const dest = new URL(nextPath, request.url)
        dest.search = url.search
        return NextResponse.redirect(dest)
      }
    }
  }

  // Language prefix: only add when multi-language is enabled and no prefix is present
  if (process.env.ENABLE_MULTI_LANGUAGE === 'true' && !hasLocalePrefix) {
    const best = resolveLang(request, undefined) ?? defaultLang
    const nextPath = `/${best}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`
    if (nextPath !== pathname) {
      const dest = new URL(nextPath, request.url)
      dest.search = url.search
      return NextResponse.redirect(dest)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next).*)"],
}