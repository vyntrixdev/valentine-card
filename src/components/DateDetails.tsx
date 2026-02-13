import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import styles from "../styles/DateDetails.module.css";
import MemoryGallery from "./MemoryGallery";
import romantic from "../assets/sounds/romantic.mp3";

interface Props {
  onClose: () => void;
}

export default function DateDetails({ onClose }: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  /* =============================
     AUDIO FADE IN + OUT
  ============================== */
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.4;

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  const details = [
    { icon: "📅", title: "Date", text: "February 14" },
    { icon: "📍", title: "Location", text: "SM Mall of Asia" },
    { icon: "⛸", title: "Activity", text: "Ice Skating ✨" },
    { icon: "🍽", title: "Dinner", text: "To Be Announced 💌" },
    { icon: "🎁", title: "Special Surprise", text: "To Be Announced 🌹" }
  ];
  

  return (
    <>
      <audio ref={audioRef} src={romantic} loop autoPlay />

      {/* Overlay */}
      <motion.div
        className={styles.overlay}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* Panel */}
      <motion.div
        className={styles.panel}
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        onAnimationComplete={() => {
          audioRef.current?.play().catch(() => {});
        }}
      >
        <div className={styles.softGlow} />
        <FloatingParticles />

        <motion.h2
          className={styles.title}
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Our Valentine’s Date 💖
        </motion.h2>
        

        <p className={styles.message}>
          A day filled with laughter, adventure,
          and unforgettable memories together.
          I can’t wait to spend it with you. ❤️
        </p>

        <div className={styles.contentLayout}>
          {/* LEFT SIDE */}
          <div className={styles.leftSide}>
            <div className={styles.detailsGrid}>
              {details.map((item, i) => (
                <motion.div
                  key={i}
                  className={styles.detailCard}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  whileHover={{ scale: 1.04 }}
                >
                  <div className={styles.iconCircle}>
                    {item.icon}
                  </div>
                  <div>
                    <h4>{item.title}</h4>
                    <p>{item.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className={styles.rightSide}>
            <MemoryGallery />
          </div>
        </div>

        <motion.button
          className={styles.closeBtn}
          onClick={onClose}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
        >
          Close 💖
        </motion.button>
      </motion.div>
    </>
  );
}

/* Floating light particles */
function FloatingParticles() {
  return (
    <>
      {[...Array(10)].map((_, i) => (
        <motion.span
          key={i}
          className={styles.particle}
          initial={{
            opacity: 0,
            y: 20,
            x: Math.random() * 400 - 200,
          }}
          animate={{
            opacity: [0, 0.5, 0],
            y: -120,
          }}
          transition={{
            duration: 6 + Math.random() * 3,
            repeat: Infinity,
            delay: i * 0.5,
          }}
        />
      ))}
    </>
  );
}
