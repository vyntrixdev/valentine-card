import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import styles from "../styles/Gallery.module.css";

import img1 from "../assets/images/memories-1.jpg";
import img2 from "../assets/images/memories-2.jpg";
import img3 from "../assets/images/memories-3.jpg";

const images = [img1, img2, img3];

export default function MemoryGallery() {
  const [[index, direction], setIndex] = useState([0, 0]);
  const [isHovered, setIsHovered] = useState(false);

  const paginate = (newDirection: number) => {
    setIndex([
      (index + newDirection + images.length) % images.length,
      newDirection,
    ]);
  };

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => paginate(1), 5000);
    return () => clearInterval(interval);
  }, [index, isHovered]);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 350 : -350,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -500 : 500,
      opacity: 0,
    }),
  };

  return (
    <div
      className={styles.gallery}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={styles.slider}>
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={index}
            className={styles.imageWrapper}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 120, damping: 20 },
              opacity: { duration: 0.3 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.7}
            onDragEnd={(_, { offset }) => {
              if (offset.x > 120) paginate(-1);
              if (offset.x < -120) paginate(1);
            }}
          >
            <img
              src={images[index]}
              className={styles.image}
              draggable={false}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className={styles.dots}>
        {images.map((_, i) => (
          <motion.span
            key={i}
            className={`${styles.dot} ${
              i === index ? styles.active : ""
            }`}
            onClick={() =>
              setIndex([i, i > index ? 1 : -1])
            }
            whileHover={{ scale: 1.3 }}
          />
        ))}
      </div>
    </div>
  );
}
