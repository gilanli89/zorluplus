import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MAIN_DOMAINS = ["zorluplus.com", "www.zorluplus.com", "zorluplus.lovable.app"];

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const hostname = window.location.hostname;
    const isMainDomain = MAIN_DOMAINS.includes(hostname) || hostname.includes("lovable.app");
    
    if (isMainDomain) {
      navigate("/", { replace: true });
    }
    // Subdomain'lerde (cms.zorluplus.com vb.) redirect yapma
  }, [navigate]);

  return null;
};

export default NotFound;
