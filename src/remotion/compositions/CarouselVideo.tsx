import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";

interface Slide {
  title: string;
  body: string;
}

interface Props {
  slides: Slide[];
}

export const CarouselVideo: React.FC<Props> = ({ slides }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const framesPerSlide = Math.floor(durationInFrames / slides.length);

  const currentSlideIndex = Math.min(
    Math.floor(frame / framesPerSlide),
    slides.length - 1
  );
  const slide = slides[currentSlideIndex];
  const slideFrame = frame - currentSlideIndex * framesPerSlide;

  const titleOpacity = interpolate(slideFrame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  const bodyOpacity = interpolate(slideFrame, [10, 25], [0, 1], {
    extrapolateRight: "clamp",
  });

  const scale = spring({ frame: slideFrame, fps, config: { damping: 12 } });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#F8F7F5",
        justifyContent: "center",
        alignItems: "center",
        padding: 80,
      }}
    >
      {/* Acento lateral */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 12,
          height: "100%",
          backgroundColor: "#c5ed36",
        }}
      />

      <div style={{ transform: `scale(${scale})`, textAlign: "center" }}>
        <h1
          style={{
            fontFamily: "Sharp Grotesk, sans-serif",
            fontSize: 72,
            color: "#111111",
            opacity: titleOpacity,
            marginBottom: 40,
          }}
        >
          {slide.title}
        </h1>
        <p
          style={{
            fontFamily: "Source Sans 3, sans-serif",
            fontSize: 42,
            color: "#333333",
            opacity: bodyOpacity,
            lineHeight: 1.5,
          }}
        >
          {slide.body}
        </p>
      </div>

      {/* Logo/branding inferior */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          fontFamily: "sans-serif",
          fontSize: 28,
          color: "#999",
          letterSpacing: 4,
        }}
      >
        SISTECO
      </div>
    </AbsoluteFill>
  );
};
