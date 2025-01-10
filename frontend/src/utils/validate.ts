export const validateName = (name: string): string | null => {
    if (!name) {
      return "Name is required";
    }
    return null;
  };
  
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

  export const validateMobile = (phoneNumber: string): string | null => {
      const phoneNumberStr = phoneNumber.toString();
      if (!phoneNumber) {
          return "Phone number is required";
        }
        if (phoneNumberStr.length < 10) {
        return "Phone number must contain exactly 10 digits";
    }
    return null;
};
  
  export const validatePassword = (password: string): string | null => {
    if (!password) {
      return "Password is required";
    }
    if (password.length < 6) {
      return "Password must be at least 6 characters";
    }
    return null;
  };
  

  export const validateForm = (data: { name: string; email: string; password: string }) => {
    const errors: { [key: string]: string | null } = {};
  
    errors.name = validateName(data.name);
    errors.email = validateEmail(data.email);
    errors.password = validatePassword(data.password);
  
    return errors;
  };  