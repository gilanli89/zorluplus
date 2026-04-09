import { Check, X } from "lucide-react";
import { validatePassword, PASSWORD_RULES } from "@/lib/passwordValidation";

interface Props {
  password: string;
}

export default function PasswordStrengthIndicator({ password }: Props) {
  const checks = validatePassword(password);
  if (!password) return null;

  return (
    <ul className="space-y-1 text-xs mt-1">
      {PASSWORD_RULES.map((rule) => {
        const passed = checks[rule.key];
        return (
          <li key={rule.key} className={`flex items-center gap-1.5 ${passed ? "text-green-600" : "text-muted-foreground"}`}>
            {passed ? <Check className="h-3 w-3" /> : <X className="h-3 w-3 text-destructive" />}
            {rule.label}
          </li>
        );
      })}
    </ul>
  );
}
