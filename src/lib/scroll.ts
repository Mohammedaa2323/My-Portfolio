/** Matches `scroll-padding-top` on html so sections land below the fixed navbar. */
const NAV_OFFSET = 80;

/**
 * Smooth-scrolls to a position. Long distances first jump to within one screen
 * of the target, so the browser doesn't animate through the whole page (and the
 * heavy toolkit section) frame by frame.
 */
export function scrollToY(top: number) {
  const distance = top - window.scrollY;
  const nearby = window.innerHeight;

  if (Math.abs(distance) > nearby * 1.5) {
    window.scrollTo({ top: top - Math.sign(distance) * nearby, behavior: 'instant' });
  }
  window.scrollTo({ top, behavior: 'smooth' });
}

export function scrollToElement(selector: string) {
  const el = document.querySelector(selector);
  if (!el) return;
  scrollToY(el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET);
}
