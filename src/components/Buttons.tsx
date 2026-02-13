import { useState } from "react";
import styles from "../styles/Buttons.module.css";
import confetti from "canvas-confetti";

interface Props {
  onYes: () => void;
}

export default function Buttons({ onYes }: Props) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const moveButton = () => {
    const randomX = Math.random() * 300 - 150;
    const randomY = Math.random() * 200 - 100;

    setPosition({ x: randomX, y: randomY });
  };

  const handleYes = () => {
    confetti({
      particleCount: 200,
      spread: 120,
      origin: { y: 0.6 }
    });

    onYes();
  };

  return (
    <div className={styles.container}>
      <button className={styles.yes} onClick={handleYes}>
        Yes 💘
      </button>

      <button
        className={styles.no}
        onMouseEnter={moveButton}
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`
        }}
      >
        No 😢
      </button>
    </div>
  );
}
