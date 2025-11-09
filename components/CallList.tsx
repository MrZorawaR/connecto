"use client";

import { Call, CallRecording } from "@stream-io/video-react-sdk";
import Loader from "./Loader";
import { useGetCalls } from "@/hooks/useGetCalls";
import MeetingCard from "./MeetingCard";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

const CallList = ({ type }: { type: "ended" | "upcoming" | "recordings" }) => {
  const router = useRouter();
  const { endedCalls, upcomingCalls, callRecordings, isLoading } = useGetCalls();
  const [recordings, setRecordings] = useState<CallRecording[]>([]);
  const { toast } = useToast();

  const getCalls = () => {
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
  };

  const noCallsMessage =
    type === "ended"
      ? "No Previous Calls"
      : type === "upcoming"
      ? "No Upcoming Calls"
      : "No Recordings";

  // type guard
  const isRecording = (m: Call | CallRecording): m is CallRecording =>
    (m as CallRecording).url !== undefined;

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

  if (isLoading) return <Loader />;

  const calls = getCalls();

  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
      {calls && calls.length > 0 ? (
        calls.map((meeting) => {
          const key =
            (meeting as Call).id ??
            (isRecording(meeting) ? meeting.url : crypto.randomUUID());

          const icon =
            type === "ended"
              ? "/icons/previous.svg"
              : type === "upcoming"
              ? "/icons/upcoming.svg"
              : "/icons/recordings.svg";

          const title =
            (!isRecording(meeting) &&
              meeting.state?.custom?.description &&
              String(meeting.state.custom.description)) ||
            (isRecording(meeting) &&
              meeting.filename &&
              meeting.filename.substring(0, 20)) ||
            "Personal Meeting";

          const dateStr = (() => {
            if (!isRecording(meeting)) {
              const d = meeting.state?.startsAt;
              // `startsAt` can be Date or undefined; format defensively
              return d instanceof Date
                ? d.toLocaleString()
                : d
                ? String(d)
                : "";
            }
            const d = meeting.start_time;
            // `start_time` may be ISO string; format if Date-parsable
            const parsed = d ? new Date(d) : undefined;
            return parsed && !isNaN(parsed.getTime())
              ? parsed.toLocaleString()
              : d ?? "";
          })();

          const link = isRecording(meeting)
            ? meeting.url
            : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meeting.id}`;

          const buttonIcon1 = type === "recordings" ? "/icons/play.svg" : undefined;
          const buttonText = type === "recordings" ? "Play" : "Start";

          const handleClick =
            type === "recordings"
              ? () => router.push(`${(meeting as CallRecording).url}`)
              : () => router.push(`/meeting/${(meeting as Call).id}`);
          return (
            <MeetingCard
              key={key}
              icon={icon}
              title={title}
              date={dateStr}
              isPreviousMeeting={type === "ended"}
              link={link}
              buttonIcon1={buttonIcon1}
              buttonText={buttonText}
              handleClick={handleClick}
            />
          );
        })
      ) : (
        <h1 className="text-2xl font-bold text-[var(--clr-text)]">{noCallsMessage}</h1>
      )}
    </div>
  );
};

export default CallList;
