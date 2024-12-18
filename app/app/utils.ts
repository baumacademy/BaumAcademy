export const apiURL = process.env.API_URL

// utils/passwordValidator.ts
export const validatePassword = (password: string): string[] => {
  const errors: string[] = [];

  // Define the validation regex patterns
  const uppercaseRegex = /[A-Z]/;
  const lowercaseRegex = /[a-z]/;
  const numberRegex = /[0-9]/;
  const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

  // Add specific errors to the list
  if (!uppercaseRegex.test(password)) {
    errors.push("Password must include at least one uppercase letter.");
  }
  if (!lowercaseRegex.test(password)) {
    errors.push("Password must include at least one lowercase letter.");
  }
  if (!numberRegex.test(password)) {
    errors.push("Password must include at least one number.");
  }
  if (!specialCharRegex.test(password)) {
    errors.push("Password must include at least one special character.");
  }
  if (password.length < 8) {
    errors.push("Password must be at least 8 characters long.");
  }

  return errors;
};

  