import { motion } from "framer-motion";
import { useMemo } from "react";

interface Heart {
  id: number;
  left: number;
  delay: number;
  size: number;
}

export default function FloatingHearts() {
  const hearts: Heart[] = useMemo(() => {
    return Array.from({ length: 10 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: i * 0.8,
      size: 16 + Math.random() * 20,
    }));
  }, []);

  return (
    <>
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{ y: "100vh", opacity: 0 }}
          animate={{ y: "-10vh", opacity: 1 }}
          transition={{
            duration: 8,
            repeat: Infinity,
            delay: heart.delay,
          }}
          style={{
            position: "absolute",
            left: `${heart.left}%`,
            fontSize: `${heart.size}px`,
          }}
        >
          ❤️
        </motion.div>
      ))}
    </>
  );
}
