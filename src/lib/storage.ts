export interface Task {
  id: string;
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  status: "todo" | "in-progress" | "completed";
  assignee: string;
  dueDate: string;
  createdAt: string;
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
}

const TASKS_KEY = "taskflow_tasks";
const TEAM_KEY = "taskflow_team";

// Initialize with dummy data
const initialTasks: Task[] = [
  {
    id: "1",
    title: "Design new landing page",
    description: "Create modern and responsive landing page design",
    priority: "high",
    status: "in-progress",
    assignee: "Het Patel",
    dueDate: "2025-11-15",
    createdAt: "2025-11-01",
  },
  {
    id: "2",
    title: "Fix authentication bug",
    description: "Users cannot log in with social media accounts",
    priority: "high",
    status: "todo",
    assignee: "Hetvi Parmar",
    dueDate: "2025-11-10",
    createdAt: "2025-11-02",
  },
  {
    id: "3",
    title: "Update documentation",
    description: "Add API documentation for new endpoints",
    priority: "medium",
    status: "completed",
    assignee: "Dhruv Shah",
    dueDate: "2025-11-08",
    createdAt: "2025-10-28",
  },
  {
    id: "4",
    title: "Performance optimization",
    description: "Improve page load time by optimizing assets",
    priority: "medium",
    status: "in-progress",
    assignee: "Boby Deol",
    dueDate: "2025-11-20",
    createdAt: "2025-11-03",
  },
  {
    id: "5",
    title: "Set up CI/CD pipeline",
    description: "Configure automated testing and deployment",
    priority: "low",
    status: "todo",
    assignee: "Amit Kumar",
    dueDate: "2025-11-25",
    createdAt: "2025-11-04",
  },
];

const initialTeam: TeamMember[] = [
  {
    id: "1",
    name: "Het Patel",
    email: "het@taskflow.com",
    role: "Product Designer",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice",
  },
  {
    id: "2",
    name: "Hetvi Parmar",
    email: "hetvi@taskflow.com",
    role: "Senior Developer",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bob",
  },
  {
    id: "3",
    name: "Dhruv Shah",
    email: "dhruv@taskflow.com",
    role: "Technical Writer",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie",
  },
  {
    id: "4",
    name: "Boby Deol",
    email: "boby@taskflow.com",
    role: "Frontend Developer",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Diana",
  },
];

// Tasks
export const getTasks = (): Task[] => {
  const stored = localStorage.getItem(TASKS_KEY);
  if (!stored) {
    localStorage.setItem(TASKS_KEY, JSON.stringify(initialTasks));
    return initialTasks;
  }
  return JSON.parse(stored);
};

export const saveTasks = (tasks: Task[]): void => {
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
};

// Team
export const getTeam = (): TeamMember[] => {
  const stored = localStorage.getItem(TEAM_KEY);
  if (!stored) {
    localStorage.setItem(TEAM_KEY, JSON.stringify(initialTeam));
    return initialTeam;
  }
  return JSON.parse(stored);
};

export const saveTeam = (team: TeamMember[]): void => {
  localStorage.setItem(TEAM_KEY, JSON.stringify(team));
};
