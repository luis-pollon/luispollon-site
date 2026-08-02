"use client";

/**
 * The only client component in the site.
 *
 * It renders no text of its own: the visible label ("☾ dark" / "☀ light") is
 * drawn by CSS from `[data-theme]` on <html>, which means there is nothing to
 * hydrate, nothing to mismatch, and no flash of the wrong label. All this
 * component does is flip the attribute and remember the choice.
 *
 * Light is the default. Only an explicit "dark" is ever written to the DOM;
 * the anti-flash script in <head> reads it back before the first paint.
 */
export default function ThemeToggle() {
  return (
    <button
      type="button"
      className="themebtn"
      aria-label="Toggle dark mode"
      onClick={() => {
        const root = document.documentElement;
        const next = root.dataset.theme === "dark" ? "light" : "dark";
        if (next === "dark") {
          root.dataset.theme = "dark";
        } else {
          delete root.dataset.theme;
        }
        try {
          localStorage.setItem("theme", next);
        } catch {
          /* private mode / storage disabled — the toggle still works, it just
             does not survive a reload. */
        }
      }}
    />
  );
}
