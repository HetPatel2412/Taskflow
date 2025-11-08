import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Briefcase } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { getTeam, getTasks, TeamMember } from "@/lib/storage";

export default function Team() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [taskCounts, setTaskCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    const loadedTeam = getTeam();
    const tasks = getTasks();
    
    const counts: Record<string, number> = {};
    loadedTeam.forEach((member) => {
      counts[member.name] = tasks.filter((task) => task.assignee === member.name).length;
    });
    
    setTeam(loadedTeam);
    setTaskCounts(counts);
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Team</h1>
        <p className="text-muted-foreground">
          Meet your team members and their assigned tasks.
        </p>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        {team.map((member) => (
          <motion.div key={member.id} variants={item}>
            <Card className="overflow-hidden transition-all hover:shadow-lg">
              <CardContent className="p-6">
                <div className="flex flex-col items-center space-y-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback>
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>

                  <div className="text-center">
                    <h3 className="font-semibold text-lg">{member.name}</h3>
                    <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground mt-1">
                      <Briefcase className="h-3 w-3" />
                      <span>{member.role}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Mail className="h-3 w-3" />
                    <span className="truncate">{member.email}</span>
                  </div>

                  <Badge variant="secondary" className="mt-2">
                    {taskCounts[member.name] || 0} tasks assigned
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
