"use client";

import { motion } from "framer-motion";
import CallList from "@/src/components/CallList";

const Upcoming = () => {
  return (
    <div className="bg-background">
      <main className="md:px-3">
        <div className="md:container mx-auto md:max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="mb-10"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Upcoming
            </h1>
            <p className="mt-2 text-muted-foreground">
              Your scheduled meetings and upcoming sessions.
            </p>
          </motion.div>

          <CallList type="upcoming" />
        </div>
      </main>
    </div>
  );
};

export default Upcoming;
