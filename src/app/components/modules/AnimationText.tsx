// "use client";

// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { Stack, Typography } from "@mui/material";

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
//   const [isMounted, setIsMounted] = useState(false);

//   useEffect(() => {
//     const timeout = setTimeout(() => {
//       setIsMounted(true);
//     }, 100); // เพิ่มเวลาเพื่อรอโหลดฟอนต์

//     return () => clearTimeout(timeout);
//   }, []);

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
//           {isMounted ? (
//             <Typography
//               variant="h2"
//               fontWeight={800}
//               className="text-DarkPrimary"
//             >
//               {word}
//             </Typography>
//           ) : (
//             <div
//               style={{
//                 width: "200px",
//                 height: "72px",
//                 backgroundColor: "#ccc",
//               }}
//             ></div>
//           )}
//         </motion.div>
//       ))}
//     </Stack>
//   );
// }

"use client";

import React from "react";
import { motion } from "framer-motion";
import { Stack, Typography } from "@mui/material";

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
    },
  }),
};

export default function AnimationText() {
  return (
    <Stack spacing={2} direction={"column"}>
      {["Welcome", "To", "Zookeeper"].map((word, index) => (
        <motion.div
          key={index}
          custom={index}
          initial="hidden"
          animate="visible"
          variants={textVariants}
        >
          <Typography
            variant="h2"
            fontWeight={800}
            className="text-DarkPrimary"
            style={{ visibility: "visible" }}
          >
            {word}
          </Typography>
        </motion.div>
      ))}
    </Stack>
  );
}
