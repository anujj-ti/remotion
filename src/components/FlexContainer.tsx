import React from "react";

// Container component for layout management
export const FlexContainer: React.FC<{
  children: React.ReactNode;
  direction?: "row" | "column";
  ratios?: number[];
  className?: string;
}> = ({ children, direction = "column", ratios = [], className = "" }) => {
  const childrenArray = React.Children.toArray(children);
  
  return (
    <div
      className={`flex w-full h-full ${
        direction === "row" ? "flex-row" : "flex-col"
      } ${className}`}
    >
      {childrenArray.map((child, index) => {
        const flex = ratios[index] || 1;
        return (
          <div key={index} style={{ flex }} className="flex items-center justify-center">
            {child}
          </div>
        );
      })}
    </div>
  );
};
