import { motion } from "framer-motion";
import { Calendar, Clock, Users, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
// import { Meeting } from "@/lib/mockdata";
type Meeting = any;

interface MeetingCardProps {
  meeting: Meeting;
  index: number;
}

const MeetingCard = ({ meeting, index }: MeetingCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Card className="p-5 bg-card hover:shadow-hover transition-all duration-300 border-border/50 group">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground truncate group-hover:text-primary transition-colors">
              {meeting.title}
            </h3>
            <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                <span>{meeting.date}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <span>{meeting.time}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4" />
                <span>{meeting.participants} participants</span>
              </div>
            </div>
            <div className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
              <User className="w-4 h-4" />
              <span>Hosted by {meeting.host}</span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded-md">
              {meeting.duration}
            </span>
            <Button
              size="sm"
              className="bg-gradient-primary hover:opacity-90 transition-opacity"
            >
              Join
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default MeetingCard;
