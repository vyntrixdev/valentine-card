import { useEffect, useState } from "react";

export default function Countdown() {
  const targetDate = new Date("February 14, 2026 00:00:00").getTime();
  const [timeLeft, setTimeLeft] = useState(targetDate - Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(targetDate - Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);

  return (
    <div style={{ marginTop: "1rem", fontSize: "0.9rem" }}>
      ⏳ {days}d {hours}h {minutes}m {seconds}s
    </div>
  );
}
