export const getLinkProps = (href: string, lang: string) => {
  const isInternal = href.startsWith("/");
  if (isInternal) {
    const langPrefix = lang ? `/${lang}` : "";
    return {
      href: `${langPrefix}${href}`,
    }
  }
  return {
    href,
    target: "_blank",
    rel: "noopener noreferrer",
  };
}