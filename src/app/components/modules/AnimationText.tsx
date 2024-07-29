"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Stack, Typography, useTheme } from "@mui/material";

export function AnimationText() {
  // Placeholder text data
  const placeholderText = [
    { text: "Welcome" },
    { text: "To" },
    { text: "Zookeeper" },
  ];

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.025,
      },
    },
  };

  return (
    <motion.div initial="hidden" animate={"visible"} variants={container}>
      <Stack spacing={2} alignItems="start">
        {placeholderText.map((item, index) => (
          <AnimatedText {...item} key={index} />
        ))}
      </Stack>
    </motion.div>
  );
}

// Word wrapper
const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return <span className="word-wrapper">{children}</span>;
};

type AnimatedTextProps = {
  text: string;
};

function AnimatedText({ text }: AnimatedTextProps) {
  const theme = useTheme();

  const item = {
    hidden: {
      y: "200%",
      transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 0.85 },
    },
    visible: {
      y: 0,
      transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 0.75 },
    },
  };

  const splitWords = text.split(" ");
  const words = splitWords.map((word) => word.split(""));

  words.map((word) => word.push("\u00A0"));

  return (
    <>
      {words.map((word, index) => (
        <Wrapper key={index}>
          {word.map((element, index) => (
            <span
              style={{
                overflow: "hidden",
                display: "inline-block",
              }}
              key={index}
            >
              <motion.span style={{ display: "inline-block" }} variants={item}>
                <Typography
                  variant="h2"
                  fontWeight={800}
                  color={"secondary"}
                  sx={{
                    WebkitBackgroundClip: "text",
                    display: "inline-block",
                  }}
                >
                  {element}
                </Typography>
              </motion.span>
            </span>
          ))}
        </Wrapper>
      ))}
    </>
  );
}

// const textVariants = {
//   hidden: { opacity: 0, y: 20 },
//   visible: (i: number) => ({
//     opacity: 1,
//     y: 0,
//     transition: {
//       delay: i * 0.2,
//     },
//   }),
// };

// export default function AnimationText() {
//   return (
//     <Stack spacing={2} direction={"column"}>
//       {["Welcome", "To", "Zookeeper"].map((word, index) => (
//         <motion.div
//           key={index}
//           custom={index}
//           initial="hidden"
//           animate="visible"
//           variants={textVariants}
//         >
//           <Typography
//             variant="h2"
//             fontWeight={800}
//             className="text-DarkPrimary"
//             style={{ visibility: "visible" }}
//           >
//             {word}
//           </Typography>
//         </motion.div>
//       ))}
//     </Stack>
//   );
// }
