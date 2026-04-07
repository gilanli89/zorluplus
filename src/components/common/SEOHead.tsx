import { useEffect } from "react";

interface SEOHeadProps {
  title?: string;
  description?: string;
}

const SITE_NAME = "Zorlu Digital Plaza";
const DEFAULT_DESC = "Samsung, LG, Bosch yetkili bayisi. Televizyon, beyaz eşya, klima, ankastre ve daha fazlası. Ücretsiz kurulum, 2 yıl garanti.";

export default function SEOHead({ title, description }: SEOHeadProps) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — KKTC'nin 1 Numaralı Elektronik Mağazası`;
    document.title = fullTitle;

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", description || DEFAULT_DESC);
    }
  }, [title, description]);

  return null;
}
