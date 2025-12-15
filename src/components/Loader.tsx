"use client";

import { motion } from "framer-motion";

const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div className="relative">
        {/* outer glow */}
        <div className="absolute inset-0 rounded-full bg-gradient-primary opacity-20 blur-xl" />

        {/* spinning ring */}
        <motion.div
          className="relative h-14 w-14 rounded-full border-4 border-transparent"
          style={{
            borderTopColor: "hsl(var(--primary))",
            borderRightColor: "hsl(var(--accent))",
          }}
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: 1,
            ease: "linear",
          }}
        />

        {/* center dot */}
        <motion.div
          className="absolute inset-0 m-auto h-3 w-3 rounded-full bg-gradient-primary shadow-glow"
          animate={{ scale: [1, 1.4, 1] }}
          transition={{
            repeat: Infinity,
            duration: 1.2,
            ease: "easeInOut",
          }}
        />
      </div>
    </div>
  );
};

export default Loader;
