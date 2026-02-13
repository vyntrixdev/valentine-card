import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import styles from "../styles/PetalBackground.module.css";

interface PetalData {
  id: number;
  x: number;
  duration: number;
  delay: number;
  size: number;
  depth: "front" | "back";
}

export default function PetalBackground() {
  const [petals, setPetals] = useState<PetalData[]>([]);
  useEffect(() => {
    const generated: PetalData[] = Array.from({ length: 45 }).map((_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      duration: 12 + Math.random() * 10,
      delay: Math.random() * 15,
      size: 12 + Math.random() * 14,
      depth: Math.random() > 0.5 ? "front" : "back",
    }));
    setPetals(generated);
  }, []);

  return (
    <div className={styles.container}>
      {petals.map((p) => (
        <motion.div
          key={p.id}
          className={`${styles.petal} ${
            p.depth === "front" ? styles.front : styles.back
          }`}
          style={{
            width: p.size,
            height: p.size * 1.4,
            left: p.x,
          }}
          initial={{
            y: -100 - Math.random() * 300,
            rotate: Math.random() * 360,
            scale: p.depth === "front" ? 0.8 : 0.6,
          }}
          animate={{
            y: window.innerHeight + 200,
            rotate: 360,
            scale: p.depth === "front" ? 1.2 : 0.9,
            x: p.x + (Math.random() - 0.5) * 200,
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      <LightParticles />
      <div className={styles.vignette} />
    </div>
  );
}

/* Floating Light Particles */
function LightParticles() {
  return (
    <>
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={i}
          className={styles.light}
          initial={{
            opacity: 0,
            y: Math.random() * window.innerHeight,
            x: Math.random() * window.innerWidth,
          }}
          animate={{
            opacity: [0, 0.6, 0],
            y: "-=40",
          }}
          transition={{
            duration: 6 + Math.random() * 4,
            repeat: Infinity,
            delay: i * 0.5,
          }}
        />
      ))}
    </>
  );
}
