/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import MeetingModal from "./MeetingModal";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useToast } from "@/src/hooks/use-toast";
import { Textarea } from "./ui/textarea";
import ReactDatePicker from "react-datepicker";
import { Input } from "./ui/input";
import { Calendar, CheckCircle, Copy, Film, Users, Video } from "lucide-react";
import ActionCard from "./new/ActionCard";

const MeetingTypeList = () => {
  const router = useRouter();

  const [meetingState, setMeetingState] = useState<
    "isScheduleMeeting" | "isJoiningMeeting" | "isInstantMeeting" | undefined
  >();

  const { user } = useUser();
  const client = useStreamVideoClient();

  const [values, setValues] = useState({
    dateTime: new Date(),
    description: "",
    link: "",
  });

  const [callDetails, setCallDetails] = useState<Call>();
  const { toast } = useToast();

  const createMeeting = async () => {
    if (!client || !user) return;

    try {
      if (!values.dateTime) {
        toast({ title: "Please select a date and time" });
        return;
      }

      const id = crypto.randomUUID();
      const call = client.call("default", id);
      if (!call) throw new Error("Failed to create call");

      const startsAt =
        values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || "Instant Meeting";

      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: { description },
        },
      });

      setCallDetails(call);

      if (!values.description) {
        router.push(`/meeting/${call.id}`);
      }

      toast({ title: "Meeting Created" });
    } catch (error) {
      console.log(error);
      toast({ title: "Failed to create meeting" });
    }
  };

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`;

  const actions = [
    {
      icon: Video,
      title: "Start New Meeting",
      description: "Launch an instant video meeting and invite others to join.",
      onClick: () => {
        setValues((v) => ({ ...v, description: "" }));
        setMeetingState("isInstantMeeting");
      },
      gradient: true,
    },
    {
      icon: Calendar,
      title: "Schedule a Meeting",
      description: "Plan ahead and set up meetings for any time.",
      onClick: () => setMeetingState("isScheduleMeeting"),
    },
    {
      icon: Users,
      title: "Join a Meeting",
      description: "Enter a meeting link to join an existing session.",
      onClick: () => setMeetingState("isJoiningMeeting"),
    },
    {
      icon: Film,
      title: "View Recordings",
      description: "Access your past meeting recordings anytime.",
      onClick: () => router.push("/dashboard/recordings"),
    },
  ];

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {actions.map((action, index) => (
          <ActionCard key={action.title} {...action} index={index} />
        ))}
      </div>


      {/* Schedule modal */}
      {!callDetails ? (
        <MeetingModal
          isOpen={meetingState === "isScheduleMeeting"}
          onClose={() => setMeetingState(undefined)}
          title="Schedule a Meeting"
          handleClick={createMeeting}
        >
          <div className="flex flex-col gap-2.5">
            <label className="text-base leading-[22px] text-muted-foreground">
              Add a description
            </label>
            <Textarea
              className="border border-border bg-background text-foreground focus-visible:ring-0 focus-visible:ring-offset-0 rounded-sm"
              onChange={(e) =>
                setValues((v) => ({ ...v, description: e.target.value }))
              }
            />
          </div>

          <div className="flex w-full flex-col gap-2.5">
            <label className="text-base leading-[22px] text-muted-foreground">
              Select Date and Time
            </label>
            <ReactDatePicker
              selected={values.dateTime}
              onChange={(date) => setValues((v) => ({ ...v, dateTime: date! }))}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
              className="w-full rounded-lg border border-border bg-background p-2 text-foreground focus:outline-none"
            />
          </div>
        </MeetingModal>
      ) : (
        <MeetingModal
          isOpen={meetingState === "isScheduleMeeting"}
          onClose={() => setMeetingState(undefined)}
          title="Meeting Created"
          className="text-center"
          handleClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast({ title: "Link Copied" });
          }}
          image={CheckCircle}
          buttonIcon={Copy}
          buttonText="Copy Meeting Link"
        />
      )}

      {/* Instant meeting modal */}
      <MeetingModal
        isOpen={meetingState === "isInstantMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Start an Instant Meeting"
        className="text-center"
        buttonText="Start Meeting"
        handleClick={createMeeting}
      />

      {/* Join meeting modal */}
      <MeetingModal
        isOpen={meetingState === "isJoiningMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Paste meeting link here"
        className="text-center"
        buttonText="Join Meeting"
        handleClick={() => router.push(values.link)}
      >
        <Input
          placeholder="Meeting Link"
          className="border border-border bg-background text-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
          onChange={(e) => setValues((v) => ({ ...v, link: e.target.value }))}
        />
      </MeetingModal>
    </>
  );
};

export default MeetingTypeList;
