"use client";

import { openConsent } from "@/lib/consent";

/**
 * The way back to the question, set in the colophon — where a book records how
 * it was made. An answer you cannot change is not consent, so this is not
 * optional furniture.
 *
 * A button, not a link: it navigates nowhere. It is styled to sit inside the
 * running mono line of the colophon note rather than announce itself.
 */
export default function ConsentLink() {
  return (
    <button type="button" className="consentlink" onClick={openConsent}>
      analytics
    </button>
  );
}
