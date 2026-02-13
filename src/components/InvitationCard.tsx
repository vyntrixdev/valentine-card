import { useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform
} from "framer-motion";
import confetti from "canvas-confetti";
import { Typewriter } from "react-simple-typewriter";
import styles from "../styles/Invitation.module.css";
import Buttons from "./Buttons";
import DateDetails from "./DateDetails";
import Countdown from "./Countdown";

export default function InvitationCard() {
  const [accepted, setAccepted] = useState(false);

  /* =========================
     Mouse Interaction Setup
  ========================= */

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness: 60, damping: 18 });
  const smoothY = useSpring(mouseY, { stiffness: 60, damping: 18 });

  const glowOpacity = useTransform(smoothX, [-200, 0, 200], [0.7, 1, 0.7]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  /* =========================
     Name Click Effect
  ========================= */

  const handleNameClick = () => {
    confetti({
      particleCount: 70,
      spread: 80,
      gravity: 0.6,
      colors: ["#f8c8dc", "#ffd1e6", "#fff5f8"],
    });
  };

  return (
    <>
      <motion.div
        className={styles.card}
        initial={{ opacity: 0, scale: 0.92, y: 80 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.1, ease: "easeOut" }}
      >
        {/* =========================
            VISUAL LAYER (CLIPPED)
        ========================== */}
        <div className={styles.visualLayer}>
          <motion.p
            className={styles.valentineText}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5 }}
          >
            Happy Valentine’s Day 💌
          </motion.p>

          <div
            className={styles.nameWrapper}
            onMouseMove={handleMouseMove}
            onClick={handleNameClick}
          >
            <div className={styles.shimmer} />

            <motion.h1
              className={styles.nameText}
              style={{ opacity: glowOpacity }}
            >
              Mary Jean Bojos 💖
            </motion.h1>

            <p className={styles.fromText}>
              from John Vincent Vicena
            </p>

            {/* Floating Hearts */}
            {[...Array(6)].map((_, i) => (
              <motion.span
                key={i}
                className={styles.heart}
                style={{
                  x: smoothX,
                  y: smoothY,
                }}
                animate={{ rotate: 360 }}
                transition={{
                  duration: 14 + i * 2,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                💕
              </motion.span>
            ))}
          </div>

          <div className={styles.divider} />

          <p className={styles.subtitle}>
            <Typewriter
              words={[
                "Every moment with you feels magical...",
                "You are my favorite person in this world 💕",
                "Will you be my Valentine this February 14?"
              ]}
              loop={false}
              cursor
              typeSpeed={50}
              deleteSpeed={30}
            />
          </p>

          <Countdown />
        </div>

        {/* =========================
            BUTTON LAYER (NOT CLIPPED)
        ========================== */}
        {!accepted && (
          <div className={styles.buttonLayer}>
            <Buttons onYes={() => setAccepted(true)} />
          </div>
        )}
      </motion.div>

      <AnimatePresence>
        {accepted && (
          <DateDetails onClose={() => setAccepted(false)} />
        )}
      </AnimatePresence>
    </>
  );
}
