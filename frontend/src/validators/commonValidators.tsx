export const validateEmail = (email: string): string | null => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      return "Email is required";
    }
    if (!regex.test(email)) {
      return "Please enter a valid email";
    }
    return null;
  };