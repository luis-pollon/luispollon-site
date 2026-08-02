import type { NextConfig } from "next";

/**
 * A static, text-first site. The config does four things and nothing else:
 * stops leaking a header nobody asked for, sets the response headers that a
 * static host will not set on its own, fixes the URL canonicalization, and
 * refuses to ship a build that does not typecheck or lint.
 */

/** Applied to every route. Cheap, static, and none of them cost a byte of JS. */
const SECURITY_HEADERS = [
  // Send the bare origin cross-site, and nothing at all on a downgrade.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // No MIME sniffing. Relevant here specifically because /llms.txt and
  // /sitemap.xml are content a sniffing browser might try to reinterpret.
  { key: "X-Content-Type-Options", value: "nosniff" },
  // No framing. There is nothing to click on this site, so there is nothing to
  // clickjack — but the header costs nothing and the answer is unambiguous.
  { key: "X-Frame-Options", value: "DENY" },
  // No browser feature on this site needs a permission. Deny the ones that get
  // abused by injected third-party script, which is the only way they would
  // ever be requested here.
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
];

/**
 * One year, immutable — for fonts served out of /public only.
 *
 * The fonts that actually ship today go through next/font/local, which
 * fingerprints them into /_next/static/media and already serves them
 * immutable. Do NOT add a rule for that path: Next warns that a custom
 * Cache-Control on /_next/static breaks dev behaviour, and it would be
 * overriding a correct default with a copy of itself.
 */
const IMMUTABLE = {
  key: "Cache-Control",
  value: "public, max-age=31536000, immutable",
};

const nextConfig: NextConfig = {
  // Nothing gains from announcing the framework in every response.
  poweredByHeader: false,

  // The film frames in /films are hot-linked from Unsunk's public asset
  // bucket rather than copied into /public: the case page is the single
  // source of truth for a film, and a second copy would drift the first time
  // a cut is re-graded. The originals are 1600px wide and up to 400 KB each;
  // the optimizer serves them at the ~260px the archive grid actually paints.
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-45682d0ed62e4dc5818bed8ac4d0e33c.r2.dev",
        pathname: "/cases/**",
      },
    ],
  },

  // Trailing slashes are a canonicalization decision, not a style one: every
  // URL in the sitemap, the schema graph and llms.txt is written without one,
  // so the server has to agree.
  trailingSlash: false,

  // A type error is a build failure. (`next build` no longer runs ESLint —
  // that moved out of the config in Next 16; lint runs via `npm run lint`.)
  typescript: {
    ignoreBuildErrors: false,
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: SECURITY_HEADERS,
      },
      {
        // Any font served straight out of /public, should one ever be added.
        source: "/:path*.(woff2|woff|ttf|otf)",
        headers: [IMMUTABLE],
      },
      {
        // The machine-readable surface. Short shared cache, always
        // revalidatable — these files change whenever a route or a canonical
        // fact changes, and a crawler holding a stale sitemap is the one cache
        // miss worth paying to avoid.
        source: "/:path(llms.txt|robots.txt|sitemap.xml)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, s-maxage=3600, must-revalidate",
          },
        ],
      },
      {
        // llms.txt is markdown by content and .txt by extension. Declare the
        // charset so an agent fetching it does not have to guess.
        source: "/llms.txt",
        headers: [{ key: "Content-Type", value: "text/plain; charset=utf-8" }],
      },
    ];
  },
};

export default nextConfig;
