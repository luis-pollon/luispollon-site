/**
 * The masthead: name, role, thesis, and the three facts that have to survive
 * being read by a machine. Server component — nothing here is interactive.
 *
 * The numbers are canonical and are not to be paraphrased, rounded or
 * re-derived. They appear in this exact form wherever they appear.
 *
 * `role` and the facts strip stay <div>s on purpose: `p + p` in globals.css
 * adds a paragraph gap, and the mockup sets this spacing with margins.
 */
export default function Hero() {
  return (
    <header>
      <h1>Luis Pollon</h1>
      <div className="role">Creative Strategist</div>
      <p className="promise">
        I make the creative and the machine that serves it — content, paid
        media, and the tooling in between.
      </p>

      <div className="facts mono">
        <span>0 → 40 clients · 6 months · 2024</span>
        <span>8.28× blended ROAS · documented floor</span>
        <span>11 sites shipped</span>
      </div>
    </header>
  );
}
