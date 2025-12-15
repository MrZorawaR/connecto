"use client";

import { motion } from "framer-motion";
import CallList from "@/src/components/CallList";

const Recordings = () => {
  return (
    <div className="bg-background">
      <main className="md:px-3">
        <div className="md:container mx-auto md:max-w-5xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-2">
              
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                Recordings
              </h1>
            </div>

            <p className="text-lg text-muted-foreground">
              Review and manage your past meetings and recordings.
            </p>
          </motion.div>

          {/* List */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut", delay: 0.05 }}
            className=""
          >
            <CallList type="recordings" />
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Recordings;
