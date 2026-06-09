"use client";

type Logo = { src: string; h: number };

const logos: Logo[] = [
  { src: "/Logo_Cymbio.svg",      h: 36 },
  { src: "/Logo_DAZN.svg",        h: 36 },
  { src: "/Logo_Down.svg",        h: 36 },
  { src: "/Logo_Fiverr.svg",      h: 36 },
  { src: "/Logo_Post.svg",        h: 36 },
  { src: "/Logo_Similar.svg",     h: 43 },
  { src: "/Logo_SpeakingPal.png", h: 36 },
  { src: "/Logo_8fig.png",        h: 36 },
  { src: "/Logo_FIDO.png",        h: 26 },
  { src: "/Logo_JUSTT.png",       h: 36 },
  { src: "/Logo_LaborIQ.png",     h: 26 },
  { src: "/Logo_Pillar.png",      h: 26 },
  { src: "/Logo_SafebooksAI.png", h: 36 },
  { src: "/Logo_Spear.png",       h: 36 },
];

export default function LogoMarquee() {
  return (
    <section
      className="logo-marquee-section"
      style={{
        position: "relative",
        overflow: "hidden",
        height: 120,
        background: "#0a0a0a",
      }}
    >
      {/* Fade edges */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 1,
          background:
            "linear-gradient(to right, #0a0a0a 0%, transparent 8%, transparent 92%, #0a0a0a 100%)",
        }}
      />

      {/* Scrolling track */}
      <div
        style={{
          display: "flex",
          width: "max-content",
          height: "100%",
          animation: "marquee 65s linear infinite",
        }}
      >
        {[0, 1, 2, 3].map((copy) => (
          <div
            key={copy}
            style={{ display: "flex", alignItems: "center", height: "100%" }}
          >
            {logos.map((logo, j) => (
              <div
                key={`${copy}-${j}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "0 48px",
                  height: "100%",
                  flexShrink: 0,
                }}
              >
                <img
                  src={logo.src}
                  alt=""
                  className="logo-marquee-img"
                  style={{
                    height: logo.h,
                    width: "auto",
                    objectFit: "contain",
                    opacity: 0.85,
                    display: "block",
                  }}
                />
              </div>
            ))}
          </div>
        ))}
      </div>

      <style jsx global>{`
        @media (max-width: 768px) {
          .logo-marquee-section { height: 90px !important; }
        }
      `}</style>
    </section>
  );
}
