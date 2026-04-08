import { Composition } from "remotion";
import { CarouselVideo } from "./compositions/CarouselVideo";
import { NewsUpdate } from "./compositions/NewsUpdate";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Carrusel animado — vertical para Reels/Shorts/TikTok */}
      <Composition
        id="CarouselVideo"
        component={CarouselVideo}
        durationInFrames={900} // 30 seg @ 30fps
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          slides: [
            { title: "Hook aquí", body: "Dato llamativo que atrapa" },
            { title: "Punto 1", body: "Contenido de valor" },
            { title: "Punto 2", body: "Más contenido" },
            { title: "CTA", body: "Sigue para más — [TU_DOMINIO]" },
          ],
        }}
      />

      {/* News Update — horizontal para YouTube/LinkedIn */}
      <Composition
        id="NewsUpdate"
        component={NewsUpdate}
        durationInFrames={1800} // 60 seg @ 30fps
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          headline: "Actualización AI de la semana",
          points: [
            "Claude Code lanza nuevos MCP plugins",
            "Google Stitch disponible en Labs",
            "n8n 1.x mejora nodos de AI",
          ],
        }}
      />
    </>
  );
};
