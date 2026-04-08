import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";

interface Props {
  headline: string;
  points: string[];
}

export const NewsUpdate: React.FC<Props> = ({ headline, points }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headlineOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#111111",
        padding: 100,
        justifyContent: "center",
      }}
    >
      {/* Acento superior */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: 8,
          backgroundColor: "#c5ed36",
        }}
      />

      <h1
        style={{
          fontFamily: "Sharp Grotesk, sans-serif",
          fontSize: 64,
          color: "#F8F7F5",
          opacity: headlineOpacity,
          marginBottom: 60,
        }}
      >
        {headline}
      </h1>

      {points.map((point, i) => {
        const delay = 30 + i * 25;
        const opacity = interpolate(frame, [delay, delay + 15], [0, 1], {
          extrapolateRight: "clamp",
        });
        const translateX = interpolate(frame, [delay, delay + 15], [50, 0], {
          extrapolateRight: "clamp",
        });

        return (
          <div
            key={i}
            style={{
              opacity,
              transform: `translateX(${translateX}px)`,
              display: "flex",
              alignItems: "center",
              marginBottom: 30,
            }}
          >
            <div
              style={{
                width: 16,
                height: 16,
                backgroundColor: "#c5ed36",
                borderRadius: 4,
                marginRight: 24,
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontFamily: "Source Sans 3, sans-serif",
                fontSize: 40,
                color: "#F8F7F5",
              }}
            >
              {point}
            </span>
          </div>
        );
      })}

      {/* Logo inferior */}
      <div
        style={{
          position: "absolute",
          bottom: 50,
          right: 80,
          fontFamily: "sans-serif",
          fontSize: 24,
          color: "#c5ed36",
          letterSpacing: 4,
        }}
      >
        SISTECO
      </div>
    </AbsoluteFill>
  );
};
