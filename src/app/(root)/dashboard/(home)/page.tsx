"use client";

import { motion } from "framer-motion";
import MeetingTypeList from "@/src/components/MeetingTypeList";

const Dashboard = () => {
  return (
    <div className="bg-background">

      <main className="md:px-3">
        <div className="md:container mx-auto md:max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Welcome back
            </h1>
            <p className="mt-2 text-lg text-muted-foreground">
              What would you like to do today?
            </p>
          </motion.div>

          <MeetingTypeList />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
