import { User, Stethoscope, Building2, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type UserType = "patient" | "doctor" | "hospital" | "admin";

interface UserTypeSelectorProps {
  selectedType: UserType;
  onTypeChange: (type: UserType) => void;
}

const userTypes = [
  { type: "patient" as UserType, label: "Patient", icon: User },
  { type: "doctor" as UserType, label: "Doctor", icon: Stethoscope },
  { type: "hospital" as UserType, label: "Hospital", icon: Building2 },
  { type: "admin" as UserType, label: "Super Admin", icon: Shield },
];

export const UserTypeSelector = ({ selectedType, onTypeChange }: UserTypeSelectorProps) => {
  return (
    <div className="flex flex-wrap gap-2 p-4 bg-card rounded-xl border border-border shadow-sm">
      {userTypes.map(({ type, label, icon: Icon }) => (
        <Button
          key={type}
          variant={selectedType === type ? "default" : "outline"}
          size="sm"
          onClick={() => onTypeChange(type)}
          className={cn(
            "transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer",
            selectedType === type && "shadow-lg ring-2 ring-primary/20"
          )}
        >
          <Icon className="h-4 w-4 mr-2" />
          {label}
        </Button>
      ))}
    </div>
  );
};
