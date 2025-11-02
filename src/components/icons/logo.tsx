import { cn } from "@/lib/utils";

const Logo = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-primary"
      >
        <path
          d="M6 3H8C9.10457 3 10 3.89543 10 5V19C10 20.1046 9.10457 21 8 21H6C4.89543 21 4 20.1046 4 19V5C4 3.89543 4.89543 3 6 3Z"
          fill="currentColor"
          fillOpacity="0.5"
        />
        <path
          d="M14 3H16C17.1046 3 18 3.89543 18 5V19C18 20.1046 17.1046 21 16 21H14C12.8954 21 12 20.1046 12 19V5C12 3.89543 12.8954 3 14 3Z"
          fill="currentColor"
        />
      </svg>
      <span className="font-bold text-xl text-foreground">KanbanFlow</span>
    </div>
  );
};

export default Logo;
