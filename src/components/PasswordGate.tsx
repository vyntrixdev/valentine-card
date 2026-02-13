import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styles from "../styles/Password.module.css";

interface Props {
  onUnlock: () => void;
}

interface HeartData {
  id: number;
  left: number;
  duration: number;
  delay: number;
  size: number;
}

export default function PasswordGate({ onUnlock }: Props) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [hearts, setHearts] = useState<HeartData[]>([]);

  useEffect(() => {
    // Generate hearts safely (no window usage during render)
    const generatedHearts: HeartData[] = Array.from({ length: 15 }).map(
      (_, i) => ({
        id: i,
        left: Math.random() * 100,
        duration: 6 + Math.random() * 4,
        delay: i * 0.4,
        size: 16 + Math.random() * 20,
      })
    );

    setHearts(generatedHearts);
  }, []);

  const handleSubmit = () => {
    if (password.trim().toLowerCase() === "bebe") {
      setError(false);
      onUnlock();
    } else {
      setError(true);
    }
  };

  return (
    <div className={styles.wrapper}>
      {/* Floating Hearts */}
      <div className={styles.heartsContainer}>
        {hearts.map((heart) => (
          <motion.span
            key={heart.id}
            className={styles.heart}
            style={{
              left: `${heart.left}%`,
              fontSize: heart.size,
            }}
            initial={{ opacity: 0, y: 80 }}
            animate={{
              opacity: [0, 0.7, 0],
              y: -200,
            }}
            transition={{
              duration: heart.duration,
              repeat: Infinity,
              delay: heart.delay,
            }}
          >
            💗
          </motion.span>
        ))}
      </div>

      {/* Glass Card */}
      <motion.div
        className={styles.card}
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
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
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.95 }}
          >
            Unlock 💘
          </motion.button>
        </div>

        {error && (
          <motion.p
            className={styles.error}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            Wrong secret 😢 Try again, love.
          </motion.p>
        )}
      </motion.div>
    </div>
  );
}
