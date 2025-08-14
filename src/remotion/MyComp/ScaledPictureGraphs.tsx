import React from "react";
import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  spring,
} from "remotion";
import { loadFont, fontFamily } from "@remotion/google-fonts/Inter";
import { FlexContainer } from "../../components/FlexContainer";

loadFont("normal", {
  subsets: ["latin"],
  weights: ["400", "700"],
});

// Star symbol component
const StarSymbol: React.FC<{ 
  size?: number; 
  className?: string; 
  style?: React.CSSProperties 
}> = ({
  size = 60,
  className = "",
  style,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={`text-yellow-400 ${className}`}
      style={style}
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
};

/**
 * ScaledPictureGraphs Component
 * 
 * An educational animation demonstrating scaled picture graphs with the following stages:
 * 1. Title introduction (0s)
 * 2. "More than one" explanation (2s) 
 * 3. Scale demonstration with single star (4s)
 * 4. "Equals five students" text (6s)
 * 5. Three stars demonstration (8s) 
 * 6. Mathematical equation display (10s)
 * 7. Participation prompt (13s)
 * 
 * Total duration: 16 seconds
 */
export const ScaledPictureGraphs: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Define timing for each visual instruction based on voiceover triggers
  const timings = {
    scaledPictureGraph: 0, // "A scaled picture graph uses symbols"
    moreThanOne: 2 * fps, // "where each symbol represents more than one item"
    scaleTellsYou: 4 * fps, // "The scale tells you how many real items"
    eachStarEquals: 6 * fps, // "if each star equals five students"
    threeStarsMeans: 8 * fps, // "then three stars means"
    fifteenStudentsTotal: 10 * fps, // "fifteen students total"
    fewerSymbols: 13 * fps, // "Can you see how the scale helps us show larger numbers with fewer symbols?"
  };

  // Spring animations for smooth transitions
  const getSpringValue = (startFrame: number, delay = 0) => {
    return spring({
      fps,
      frame: frame - startFrame - delay,
      config: {
        damping: 100,
        stiffness: 200,
      },
    });
  };

  return (
    <AbsoluteFill className="bg-white">
      {/* Stage 1: Initial layout with title */}
      <Sequence from={timings.scaledPictureGraph}>
        <FlexContainer ratios={[0.15, 0.85]}>
          {/* Top container - Title */}
          <div className="flex items-center justify-center w-full h-full bg-blue-50">
            <h1
              className="text-4xl font-bold text-center text-blue-900"
              style={{ fontFamily, opacity: getSpringValue(timings.scaledPictureGraph) }}
            >
              Understanding Scaled Picture Graphs
            </h1>
          </div>

          {/* Bottom container - Content zone */}
          <div className="w-full h-full relative">
            {/* Stage 2: More than one explanation */}
            <Sequence from={timings.moreThanOne - timings.scaledPictureGraph}>
              <FlexContainer ratios={[0.4, 0.6]}>
                <div className="flex items-center justify-center w-full h-full bg-green-50">
                  <h2
                    className="text-2xl font-semibold text-center text-green-800"
                    style={{
                      fontFamily,
                      opacity: getSpringValue(timings.moreThanOne),
                    }}
                  >
                    Each symbol represents MORE than one item
                  </h2>
                </div>

                {/* Stage 3: Scale demonstration */}
                <div className="w-full h-full relative">
                  <Sequence from={timings.scaleTellsYou - timings.moreThanOne}>
                    <FlexContainer direction="row" ratios={[0.5, 0.5]}>
                      {/* Left column - Star symbol */}
                      <div className="flex items-center justify-center w-full h-full">
                        <div
                          style={{
                            transform: `scale(${getSpringValue(timings.scaleTellsYou)})`,
                            opacity: getSpringValue(timings.scaleTellsYou),
                          }}
                        >
                          <StarSymbol size={120} />
                        </div>
                      </div>

                      {/* Right column - Equals text */}
                      <Sequence from={timings.eachStarEquals - timings.scaleTellsYou}>
                        <div className="flex items-center justify-center w-full h-full">
                          <p
                            className="text-2xl font-medium text-center text-gray-800"
                            style={{
                              fontFamily,
                              opacity: getSpringValue(timings.eachStarEquals),
                            }}
                          >
                            = 5 students
                          </p>
                        </div>
                      </Sequence>
                    </FlexContainer>
                  </Sequence>

                  {/* Stage 4: Three stars demonstration */}
                  <Sequence from={timings.threeStarsMeans - timings.moreThanOne}>
                    <AbsoluteFill className="bg-white">
                      <FlexContainer direction="row" ratios={[0.33, 0.33, 0.34]}>
                        {[1, 2, 3].map((starIndex) => (
                          <div key={starIndex} className="flex items-center justify-center w-full h-full">
                            <div
                              style={{
                                transform: `scale(${getSpringValue(
                                  timings.threeStarsMeans,
                                  starIndex * 200
                                )})`,
                                opacity: getSpringValue(
                                  timings.threeStarsMeans,
                                  starIndex * 200
                                ),
                              }}
                            >
                              <StarSymbol size={80} />
                            </div>
                          </div>
                        ))}
                      </FlexContainer>

                      {/* Stage 5: Equation */}
                      <Sequence from={timings.fifteenStudentsTotal - timings.threeStarsMeans}>
                        <div
                          className="absolute bottom-16 left-0 right-0 flex items-center justify-center"
                          style={{
                            opacity: getSpringValue(timings.fifteenStudentsTotal),
                            transform: `translateY(${
                              (1 - getSpringValue(timings.fifteenStudentsTotal)) * 50
                            }px)`,
                          }}
                        >
                          <div className="bg-blue-100 px-8 py-4 rounded-lg border-2 border-blue-300">
                            <p
                              className="text-xl font-semibold text-center text-blue-900"
                              style={{ fontFamily }}
                            >
                              3 × 5 = 15 students
                            </p>
                          </div>
                        </div>
                      </Sequence>
                    </AbsoluteFill>
                  </Sequence>
                </div>
              </FlexContainer>
            </Sequence>

            {/* Stage 6: Participation prompt */}
            <Sequence from={timings.fewerSymbols - timings.scaledPictureGraph}>
              <AbsoluteFill className="bg-gradient-to-br from-purple-100 to-pink-100">
                <div className="flex items-center justify-center w-full h-full">
                  <div
                    className="text-center p-8 bg-white rounded-xl shadow-lg border-4 border-purple-300"
                    style={{
                      opacity: getSpringValue(timings.fewerSymbols),
                      transform: `scale(${0.8 + 0.2 * getSpringValue(timings.fewerSymbols)})`,
                    }}
                  >
                    <h2
                      className="text-3xl font-bold text-purple-800 mb-4"
                      style={{ fontFamily }}
                    >
                      Think About It!
                    </h2>
                    <p
                      className="text-xl text-purple-700"
                      style={{ fontFamily }}
                    >
                      How does the scale help us show<br />
                      larger numbers with fewer symbols?
                    </p>
                    <div className="mt-6 flex justify-center space-x-4">
                      {[1, 2, 3].map((i) => (
                        <StarSymbol
                          key={i}
                          size={40}
                          className="animate-pulse"
                          style={{
                            animationDelay: `${i * 0.3}s`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </AbsoluteFill>
            </Sequence>
          </div>
        </FlexContainer>
      </Sequence>
    </AbsoluteFill>
  );
};
