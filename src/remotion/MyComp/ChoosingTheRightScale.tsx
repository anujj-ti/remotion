import React from "react";
import {
  AbsoluteFill,
  Audio,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  spring,
  staticFile,
} from "remotion";
import { loadFont, fontFamily } from "@remotion/google-fonts/Inter";
import { FlexContainer } from "../../components/FlexContainer";

loadFont("normal", {
  subsets: ["latin"],
  weights: ["400", "700"],
});

// Star symbol component for examples
const StarSymbol: React.FC<{ size?: number; className?: string }> = ({
  size = 20,
  className = "",
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={`text-yellow-400 ${className}`}
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
};

// Picture graph example component
const PictureGraphExample: React.FC<{
  data: { value: number; stars: number }[];
  scale: number;
}> = ({ data, scale }) => {
  return (
    <div className="bg-gray-50 p-3 rounded-lg mb-3">
      {data.map((item, index) => (
        <div key={index} className="flex items-center justify-between mb-2 text-sm">
          <span className="font-medium w-6" style={{ fontFamily }}>{item.value}</span>
          <div className="flex">
            {Array.from({ length: item.stars }).map((_, starIndex) => (
              <StarSymbol key={starIndex} size={16} className="mr-1" />
            ))}
          </div>
        </div>
      ))}
      <div className="text-center mt-3 pt-2 border-t border-gray-300">
        <span className="text-xs font-medium text-blue-600" style={{ fontFamily }}>
          Scale: ⭐ = {scale} items
        </span>
      </div>
    </div>
  );
};

// Scale guideline component with picture graph examples
const ScaleGuideline: React.FC<{
  category: string;
  range: string;
  recommendation: string;
  bgColor: string;
  borderColor: string;
  textColor: string;
  opacity: number;
  examples: { value: number; stars: number }[];
  scale: number;
}> = ({ category, range, recommendation, bgColor, borderColor, textColor, opacity, examples, scale }) => {
  return (
    <div
      className={`w-full h-full ${bgColor} ${borderColor} border-2 rounded-xl p-4 mx-2 flex flex-col`}
      style={{ opacity }}
    >
      <div className="text-center mb-4">
        <h3 className={`text-xl font-bold ${textColor} mb-1`} style={{ fontFamily }}>
          {category}
        </h3>
        <p className={`text-sm ${textColor} mb-2`} style={{ fontFamily }}>
          {range}
        </p>
        <p className={`text-base font-semibold ${textColor}`} style={{ fontFamily }}>
          {recommendation}
        </p>
      </div>
      
      <div className="flex-1">
        <PictureGraphExample data={examples} scale={scale} />
      </div>
    </div>
  );
};

/**
 * ChoosingTheRightScale Component
 * 
 * An educational animation demonstrating how to choose appropriate scales for picture graphs:
 * 1. Title introduction (0s)
 * 2. Small numbers guideline (2s)
 * 3. Medium numbers guideline (4s)
 * 4. Large numbers guideline (6s)
 * 5. Example data presentation (8s)
 * 6. Participation prompt (12s)
 * 7. Solution reveal (16s)
 * 
 * Total duration: 18 seconds
 */
export const ChoosingTheRightScale: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Define timing for each visual instruction based on voiceover timestamps
  // Converting seconds to frames (fps = 30)
  const timings = {
    pickScale: Math.round(2.319 * fps), // "pick" at 2.319s
    smallNumbers: Math.round(7.139 * fps), // "small" at 7.139s  
    mediumNumbers: Math.round(13.42 * fps), // "medium" at 13.42s
    largeNumbers: Math.round(20.619 * fps), // "large" at 20.619s
    letsExample: Math.round(28.019 * fps), // "Let's" at 28.019s
    goodScale: Math.round(35.84 * fps), // "scale?" at 35.84s
    scaleOfFive: Math.round(39.52 * fps), // "scale" (of five) at 39.52s
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
      {/* Add voiceover audio */}
      <Audio src={staticFile('voiceover.mp3')} />
      {/* Stage 1: Initial layout with title */}
      <Sequence from={timings.pickScale}>
        <FlexContainer ratios={[0.15, 0.85]}>
          {/* Top container - Title */}
          <div className="flex items-center justify-center w-full h-full bg-indigo-50">
            <h1
              className="text-4xl font-bold text-center text-indigo-900"
              style={{ 
                fontFamily, 
                opacity: getSpringValue(timings.pickScale),
                transform: `translateY(${(1 - getSpringValue(timings.pickScale)) * 30}px)`
              }}
            >
              Choosing the Right Scale
            </h1>
          </div>

          {/* Bottom container - Guidelines */}
          <div className="w-full h-full relative bg-blue-50 p-6">
            {/* All Guidelines in Columns */}
            <Sequence from={timings.smallNumbers - timings.pickScale}>
              <FlexContainer direction="row" ratios={[1,1,1]} className="gap-4">
                {/* Small Numbers Column */}
                <div className="flex-1 flex">
                  <ScaleGuideline
                    category="Small Numbers"
                    range="Under 20"
                    recommendation="Scale: 1 or 2"
                    bgColor="bg-white"
                    borderColor="border-blue-300"
                    textColor="text-blue-800"
                    opacity={frame < timings.smallNumbers ? 0 : getSpringValue(timings.smallNumbers)}
                    examples={[
                      { value: 6, stars: 3 },
                      { value: 10, stars: 5 },
                      { value: 8, stars: 4 },
                    ]}
                    scale={2}
                  />
                </div>

                {/* Medium Numbers Column */}
                <div className="flex-1 flex">
                  <ScaleGuideline
                    category="Medium Numbers"
                    range="20 - 50"
                    recommendation="Scale: 5 or 10"
                    bgColor="bg-white"
                    borderColor="border-blue-300"
                    textColor="text-blue-800"
                    opacity={frame < timings.mediumNumbers ? 0 : getSpringValue(timings.mediumNumbers)}
                    examples={[
                      { value: 20, stars: 4 },
                      { value: 25, stars: 5 },
                      { value: 10, stars: 2 },
                    ]}
                    scale={5}
                  />
                </div>

                {/* Large Numbers Column */}
                <div className="flex-1 flex">
                  <ScaleGuideline
                    category="Large Numbers"
                    range="Over 50"
                    recommendation="Scale: 10, 20, or more"
                    bgColor="bg-white"
                    borderColor="border-orange-300"
                    textColor="text-blue-800"
                    opacity={frame < timings.largeNumbers ? 0 : getSpringValue(timings.largeNumbers)}
                    examples={[
                      { value: 80, stars: 4 },
                      { value: 100, stars: 5 },
                      { value: 40, stars: 2 },
                    ]}
                    scale={20}
                  />
                </div>
              </FlexContainer>
            </Sequence>

            {/* Stage 5: Example Section */}
            <Sequence from={timings.letsExample - timings.pickScale}>
              <AbsoluteFill className="bg-white">
                <FlexContainer ratios={[0.4, 0.6]}>
                  {/* Example Data */}
                  <div className="flex items-center justify-center w-full h-full bg-purple-50">
                    <div
                      className="text-center p-6 bg-white rounded-xl shadow-lg border-2 border-purple-300"
                      style={{
                        opacity: getSpringValue(timings.letsExample),
                        transform: `scale(${0.8 + 0.2 * getSpringValue(timings.letsExample)})`,
                      }}
                    >
                      <h2
                        className="text-2xl font-bold text-purple-800 mb-4"
                        style={{ fontFamily }}
                      >
                        Example Data
                      </h2>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-purple-100 p-3 rounded-lg">
                          <span className="text-lg font-semibold text-purple-900" style={{ fontFamily }}>
                            25
                          </span>
                        </div>
                        <div className="bg-purple-100 p-3 rounded-lg">
                          <span className="text-lg font-semibold text-purple-900" style={{ fontFamily }}>
                            30
                          </span>
                        </div>
                        <div className="bg-purple-100 p-3 rounded-lg">
                          <span className="text-lg font-semibold text-purple-900" style={{ fontFamily }}>
                            15
                          </span>
                        </div>
                        <div className="bg-purple-100 p-3 rounded-lg">
                          <span className="text-lg font-semibold text-purple-900" style={{ fontFamily }}>
                            20
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Participation Prompt */}
                  <div className="w-full h-full relative">
                    <Sequence from={timings.goodScale - timings.letsExample}>
                      <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-orange-100 to-yellow-100">
                        <div
                          className="text-center p-8 bg-white rounded-xl shadow-lg border-4 border-orange-300"
                          style={{
                            opacity: getSpringValue(timings.goodScale),
                            transform: `scale(${0.8 + 0.2 * getSpringValue(timings.goodScale)})`,
                          }}
                        >
                          <h2
                            className="text-3xl font-bold text-orange-800 mb-4"
                            style={{ fontFamily }}
                          >
                            What would be a good scale?
                          </h2>
                          <div className="flex justify-center items-center space-x-2 text-2xl">
                            <span className="animate-pulse">🤔</span>
                            <span className="animate-pulse" style={{ animationDelay: "0.5s" }}>💭</span>
                            <span className="animate-pulse" style={{ animationDelay: "1s" }}>❓</span>
                          </div>
                        </div>
                      </div>
                    </Sequence>

                    {/* Solution */}
                    <Sequence from={timings.scaleOfFive - timings.letsExample}>
                      <AbsoluteFill className="bg-gradient-to-br from-green-100 to-emerald-100">
                        <div className="flex items-center justify-center w-full h-full">
                          <div
                            className="text-center p-8 bg-white rounded-xl shadow-lg border-4 border-green-400"
                            style={{
                              opacity: getSpringValue(timings.scaleOfFive),
                              transform: `translateY(${(1 - getSpringValue(timings.scaleOfFive)) * 50}px)`,
                            }}
                          >
                            <h2
                              className="text-2xl font-bold text-green-800 mb-6"
                              style={{ fontFamily }}
                            >
                              Scale of 5 works perfectly!
                            </h2>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="bg-green-100 p-4 rounded-lg">
                                <div className="text-lg font-bold text-green-900" style={{ fontFamily }}>25 ÷ 5 = </div>
                                <div className="text-2xl font-bold text-green-700" style={{ fontFamily }}>5 symbols</div>
                              </div>
                              <div className="bg-green-100 p-4 rounded-lg">
                                <div className="text-lg font-bold text-green-900" style={{ fontFamily }}>30 ÷ 5 = </div>
                                <div className="text-2xl font-bold text-green-700" style={{ fontFamily }}>6 symbols</div>
                              </div>
                              <div className="bg-green-100 p-4 rounded-lg">
                                <div className="text-lg font-bold text-green-900" style={{ fontFamily }}>15 ÷ 5 = </div>
                                <div className="text-2xl font-bold text-green-700" style={{ fontFamily }}>3 symbols</div>
                              </div>
                              <div className="bg-green-100 p-4 rounded-lg">
                                <div className="text-lg font-bold text-green-900" style={{ fontFamily }}>20 ÷ 5 = </div>
                                <div className="text-2xl font-bold text-green-700" style={{ fontFamily }}>4 symbols</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </AbsoluteFill>
                    </Sequence>
                  </div>
                </FlexContainer>
              </AbsoluteFill>
            </Sequence>
          </div>
        </FlexContainer>
      </Sequence>
    </AbsoluteFill>
  );
};
