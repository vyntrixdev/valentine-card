import { useState } from "react";
import styles from "../styles/Password.module.css";

interface Props {
  onUnlock: () => void;
}

export default function PasswordGate({ onUnlock }: Props) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = () => {
    if (password.toLowerCase() === "ourlove") {
      onUnlock();
    } else {
      setError(true);
    }
  };

  return (
    <div className={styles.wrapper}>
      <h2>Enter Our Secret 💖</h2>
      <input
        type="password"
        placeholder="Secret word..."
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSubmit}>Unlock 💘</button>
      {error && <p className={styles.error}>Wrong secret 😢</p>}
    </div>
  );
}
