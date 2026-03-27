import { useEffect, useState } from "react";

export function useCountUp(end: number, duration = 1200) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (end === 0) { setValue(0); return; }
    let start = 0;
    const startTime = performance.now();
    
    function step(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    }
    
    requestAnimationFrame(step);
  }, [end, duration]);

  return value;
}
