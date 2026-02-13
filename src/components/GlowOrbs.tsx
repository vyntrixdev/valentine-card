import { motion } from "framer-motion";

export default function GlowOrbs() {
  return (
    <>
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse",
            delay: i * 1
          }}
          style={{
            position: "absolute",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background: "radial-gradient(circle, #ff80ab, transparent)",
            filter: "blur(120px)",
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`
          }}
        />
      ))}
    </>
  );
}
