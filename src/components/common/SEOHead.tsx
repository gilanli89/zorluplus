import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface SEOHeadProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  noindex?: boolean;
}

const SITE_NAME = "Zorlu Digital Plaza";
const SITE_URL = "https://zorluplus.com";
const DEFAULT_DESC = "Samsung, LG, Bosch yetkili bayisi. Televizyon, beyaz eşya, klima, ankastre ve daha fazlası. Ücretsiz kurulum, 2 yıl garanti.";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

function setMeta(selector: string, attr: string, value: string) {
  let el = document.querySelector(selector) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    const [attrName, attrVal] = selector.replace("meta[", "").replace("]", "").split("=");
    el.setAttribute(attrName, attrVal.replace(/"/g, ""));
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}

export default function SEOHead({ title, description, canonical, ogImage, noindex = false }: SEOHeadProps) {
  const location = useLocation();

  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — KKTC'nin 1 Numaralı Elektronik Mağazası`;
    const desc = description || DEFAULT_DESC;
    const canonicalUrl = canonical || `${SITE_URL}${location.pathname}`;
    const image = ogImage || DEFAULT_OG_IMAGE;

    // Title
    document.title = fullTitle;

    // Description
    setMeta('meta[name="description"]', "content", desc);

    // Robots
    setMeta('meta[name="robots"]', "content", noindex ? "noindex, nofollow" : "index, follow");

    // Canonical
    let canonEl = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonEl) {
      canonEl = document.createElement("link");
      canonEl.rel = "canonical";
      document.head.appendChild(canonEl);
    }
    canonEl.href = canonicalUrl;

    // OG tags
    setMeta('meta[property="og:title"]', "content", fullTitle);
    setMeta('meta[property="og:description"]', "content", desc);
    setMeta('meta[property="og:url"]', "content", canonicalUrl);
    setMeta('meta[property="og:image"]', "content", image);

    // Twitter tags
    setMeta('meta[name="twitter:title"]', "content", fullTitle);
    setMeta('meta[name="twitter:description"]', "content", desc);
    setMeta('meta[name="twitter:image"]', "content", image);
  }, [title, description, canonical, ogImage, noindex, location.pathname]);

  return null;
}
