import { useEffect, useState } from 'react';
import { scrollToElement } from '@/lib/scroll';

const NAVIGATE_EVENT = 'app:navigate';

export function usePathname() {
  const [pathname, setPathname] = useState(window.location.pathname);

  useEffect(() => {
    const update = () => setPathname(window.location.pathname);
    window.addEventListener('popstate', update);
    window.addEventListener(NAVIGATE_EVENT, update);
    return () => {
      window.removeEventListener('popstate', update);
      window.removeEventListener(NAVIGATE_EVENT, update);
    };
  }, []);

  return pathname;
}

/** Navigates to a page path ("/resume") or a home-page section ("#about"). */
export function goTo(href: string) {
  if (href.startsWith('#')) {
    if (window.location.pathname === '/') {
      scrollToElement(href);
      return;
    }
    window.history.pushState(null, '', `/${href}`);
    window.dispatchEvent(new Event(NAVIGATE_EVENT));
    // Wait for the home page to render before scrolling to the section.
    requestAnimationFrame(() => requestAnimationFrame(() => scrollToElement(href)));
    return;
  }

  if (window.location.pathname !== href) {
    window.history.pushState(null, '', href);
    window.dispatchEvent(new Event(NAVIGATE_EVENT));
  }
  window.scrollTo({ top: 0, behavior: 'instant' });
}
