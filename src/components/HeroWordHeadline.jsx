import React from "react";
import SplitText from "./SplitText";

function HeroWordHeadline({ text, activeWordIndex, direction }) {
  const fromY = direction >= 0 ? 110 : -110;

  return (
    <SplitText
      key={`hero-headline-${activeWordIndex}`}
      tag="h1"
      text={text}
      className="hero__head horizon reveal"
      splitType="words"
      delay={1020}
      initialDelay={0}
      duration={1.1}
      ease="power3.out"
      from={{ opacity: 0, y: fromY }}
      to={{ opacity: 1, y: 0 }}
      threshold={0.1}
      rootMargin="-60px"
      textAlign="left"
      style={{ color: "#ffffff", maxWidth: "1000px", minWidth: "300px" }}
    />
  );
}

export default HeroWordHeadline;
