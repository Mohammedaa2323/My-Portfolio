import { useEffect, useState } from 'react';

export function useLoading(minDuration = 1200) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const start = performance.now();

    const finish = () => {
      const elapsed = performance.now() - start;
      const remaining = Math.max(minDuration - elapsed, 0);
      window.setTimeout(() => setIsLoading(false), remaining);
    };

    if (document.readyState === 'complete') {
      finish();
    } else {
      window.addEventListener('load', finish);
      return () => window.removeEventListener('load', finish);
    }
  }, [minDuration]);

  return isLoading;
}
