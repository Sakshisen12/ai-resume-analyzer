import { 
  LayoutDashboard, 
  FileUp, 
  History, 
  Target, 
  Settings,
  HelpCircle,
  LogOut
} from "lucide-react"

export const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Analyses", href: "/upload", icon: FileUp },
  { label: "Job Match", href: "/match", icon: Target },
  { label: "History", href: "/history", icon: History },
  { label: "Support", href: "/support", icon: HelpCircle },
  { label: "Logout", href: "/logout", icon: LogOut },
]
