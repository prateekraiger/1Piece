import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import onePieceLogo from "/img/profile/logo.png";

const LogoSpinner = ({ onLoadComplete }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time or check actual resources
    const timer = setTimeout(() => {
      setLoading(false);
      if (onLoadComplete) onLoadComplete();
    }, 2500); // 2.5 seconds loading time

    return () => clearTimeout(timer);
  }, [onLoadComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-blue-900"
      initial={{ opacity: 1 }}
      animate={{ opacity: loading ? 1 : 0 }}
      transition={{ duration: 0.5 }}
      onAnimationComplete={() => {
        if (!loading) {
          document.body.style.overflow = "auto";
        }
      }}
      style={{ pointerEvents: loading ? "auto" : "none" }}
    >
      <div className="relative">
        <motion.div
          className="absolute inset-0 bg-yellow-400 rounded-full opacity-50"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.img
          src={onePieceLogo}
          alt="One Piece Logo"
          className="w-32 h-32 object-contain relative z-10"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            rotate: { duration: 2, repeat: Infinity, ease: "linear" },
            scale: { duration: 1, repeat: Infinity, ease: "easeInOut" },
          }}
        />
      </div>

      <motion.div
        className="absolute bottom-20 text-white text-2xl font-bold"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        Setting Sail...
      </motion.div>
    </motion.div>
  );
};

export default LogoSpinner;
