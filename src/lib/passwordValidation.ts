export interface PasswordCheck {
  minLength: boolean;
  hasUppercase: boolean;
  hasLowercase: boolean;
  hasNumber: boolean;
  hasSpecial: boolean;
  isValid: boolean;
}

export function validatePassword(password: string): PasswordCheck {
  const minLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecial = /[^a-zA-Z\d]/.test(password);
  return {
    minLength,
    hasUppercase,
    hasLowercase,
    hasNumber,
    hasSpecial,
    isValid: minLength && hasUppercase && hasLowercase && hasNumber && hasSpecial,
  };
}

export const PASSWORD_RULES = [
  { key: "minLength" as const, label: "En az 8 karakter" },
  { key: "hasUppercase" as const, label: "Büyük harf (A-Z)" },
  { key: "hasLowercase" as const, label: "Küçük harf (a-z)" },
  { key: "hasNumber" as const, label: "Rakam (0-9)" },
  { key: "hasSpecial" as const, label: "Özel karakter (!@#$...)" },
];
