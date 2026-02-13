import { useState } from "react";
import PasswordGate from "./components/PasswordGate";
import InvitationCard from "./components/InvitationCard";
import GlowOrbs from "./components/GlowOrbs";
import styles from "./styles/App.module.css";
import TulipGarden from "./components/PetalBackground";

function App() {
  const [unlocked, setUnlocked] = useState(false);

  return (
    <div className={styles.container}>
      {!unlocked ? (
        <PasswordGate onUnlock={() => setUnlocked(true)} />
      ) : (
        <>
          <GlowOrbs />
          <TulipGarden />
          <InvitationCard />
        </>
      )}
    </div>
  );
}

export default App;
