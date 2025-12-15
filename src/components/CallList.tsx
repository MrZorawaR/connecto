"use client";

import { Call, CallRecording } from "@stream-io/video-react-sdk";
import Loader from "./Loader";
import { useGetCalls } from "@/src/hooks/useGetCalls";
import MeetingCard from "./MeetingCard";
import RecordingCard from "@/src/components/new/RecordingCard"; // <- adjust path if needed
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/src/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";

import { History, CalendarClock } from "lucide-react";

const CallList = ({ type }: { type: "ended" | "upcoming" | "recordings" }) => {
  const router = useRouter();
  const { endedCalls, upcomingCalls, callRecordings, isLoading } = useGetCalls();
  const [recordings, setRecordings] = useState<CallRecording[]>([]);
  const { toast } = useToast();

  const isRecording = (m: Call | CallRecording): m is CallRecording =>
    (m as CallRecording).url !== undefined;

  const noCallsMessage =
    type === "ended"
      ? "No previous calls yet"
      : type === "upcoming"
      ? "No upcoming meetings"
      : "No recordings found";

  const calls = useMemo(() => {
    switch (type) {
      case "ended":
        return endedCalls ?? [];
      case "recordings":
        return recordings ?? [];
      case "upcoming":
        return upcomingCalls ?? [];
      default:
        return [];
    }
  }, [type, endedCalls, upcomingCalls, recordings]);

  useEffect(() => {
    const fetchRecordings = async () => {
      try {
        const callData =
          (await Promise.all(
            callRecordings?.map((meeting) => meeting.queryRecordings()) ?? []
          )) || [];
        const recs = callData
          .filter((c) => c.recordings.length > 0)
          .flatMap((c) => c.recordings);

        setRecordings(recs);
      } catch {
        toast({ title: "Try again later" });
      }
    };

    if (type === "recordings") fetchRecordings();
  }, [type, callRecordings, toast]);

  if (isLoading) {
    return (
      <div className="p-10 flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      {calls && calls.length > 0 ? (
        <motion.div
          key={`${type}-grid`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.35 }}
          className={
            type === "recordings"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              : "grid grid-cols-1 gap-5 md:grid-cols-2"
          }
        >
          {calls.map((meeting, index) => {
            const key =
              (meeting as Call).id ??
              (isRecording(meeting) ? meeting.url : crypto.randomUUID());

            // ✅ RECORDINGS: use RecordingCard UI
            if (type === "recordings" && isRecording(meeting)) {
              return (
                <RecordingCard
                  key={key}
                  recording={meeting as any}
                  index={index}
                />
              );
            }

            // ✅ UPCOMING / ENDED: keep MeetingCard
            const icon = type === "ended" ? History : CalendarClock;

            const title =
              (meeting as Call).state?.custom?.description
                ? String((meeting as Call).state.custom.description)
                : "Personal Meeting";

            const startsAt = (meeting as Call).state?.startsAt;
            const dateStr =
              startsAt instanceof Date
                ? startsAt.toLocaleString()
                : startsAt
                ? String(startsAt)
                : "";

            const link = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${(meeting as Call).id}`;

            const handleClick = () => router.push(`/meeting/${(meeting as Call).id}`);

            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.04 }}
              >
                <MeetingCard
                  icon={icon}
                  title={title}
                  date={dateStr}
                  isPreviousMeeting={type === "ended"}
                  link={link}
                  buttonText="Start"
                  handleClick={handleClick}
                />
              </motion.div>
            );
          })}
        </motion.div>
      ) : (
        <motion.div
          key={`${type}-empty`}
          initial={{ opacity: 0, y: 10, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.98 }}
          transition={{ duration: 0.35 }}
          className="glass rounded-3xl shadow-card p-10 text-center"
        >
          <div className="mx-auto mb-4 h-12 w-12 rounded-2xl bg-gradient-primary shadow-soft" />
          <h2 className="text-xl font-semibold text-foreground">
            {noCallsMessage}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {type === "recordings"
              ? "Record your meetings to access them here."
              : "When you schedule a meeting, it will show up here."}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CallList;
