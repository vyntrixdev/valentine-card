import { useState } from "react";
import { motion } from "framer-motion";
import styles from "../styles/Password.module.css";

interface Props {
  onUnlock: () => void;
}

export default function PasswordGate({ onUnlock }: Props) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = () => {
    if (password.toLowerCase() === "bebe") {
      setError(false);
      onUnlock();
    } else {
      setError(true);
    }
  };

  return (
    <div className={styles.wrapper}>
      <FloatingHearts />

      <motion.div
        className={styles.card}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        <h2 className={styles.title}>Enter Our Secret 💖</h2>

        <div className={styles.formGroup}>
          <motion.input
            type="password"
            placeholder="Secret word..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            whileFocus={{ scale: 1.05 }}
          />

          <motion.button
            onClick={handleSubmit}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Unlock 💘
          </motion.button>
        </div>

        {error && (
          <motion.p
            className={styles.error}
            initial={{ x: -10 }}
            animate={{ x: 0 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Wrong secret 😢
          </motion.p>
        )}
      </motion.div>
    </div>
  );
}

/* Floating animated hearts */
function FloatingHearts() {
  return (
    <>
      {[...Array(15)].map((_, i) => (
        <motion.span
          key={i}
          className={styles.heart}
          initial={{
            opacity: 0,
            y: 50,
            x: Math.random() * window.innerWidth,
          }}
          animate={{
            opacity: [0, 0.5, 0],
            y: -100,
          }}
          transition={{
            duration: 6 + Math.random() * 4,
            repeat: Infinity,
            delay: i * 0.4,
          }}
        >
          💗
        </motion.span>
      ))}
    </>
  );
}
