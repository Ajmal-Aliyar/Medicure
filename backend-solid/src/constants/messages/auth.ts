export const AUTH_MESSAGES = {
  VALIDATION: {
    FULL_NAME_REQUIRED: "Full name is required",
    FULL_NAME_MIN: "Full name must be at least 3 characters",
    FULL_NAME_MAX: "Full name must not exceed 30 characters",

    PASSWORD_REQUIRED: "Password is required",
    PASSWORD_MIN: "Password must be at least 8 characters",

    MOBILE_REQUIRED: "Mobile number is required",
    MOBILE_INVALID_LENGTH: "Mobile number must be exactly 10 digits",
    MOBILE_INVALID: "Mobile must contain only digits",

    ROLE_REQUIRED: "Role is required",
    ROLE_INVALID: "Invalid role",

    OTP_REQUIRED: "OTP is required",
    OTP_MIN: "OTP must be at least 6 characters",

    EMAIL_REQUIRED: "Email is required",
    EMAIL_INVALID: "Please enter a valid email",
  },

  SUCCESS: {
    LOGIN_SUCCESSFUL: "Login successful.",
    TOKEN_REFRESHED: "Access token refreshed successfully.",
    LOGOUT_SUCCESSFUL: "Logged out successfully.",
    PROFILE_FETCHED: "User profile fetched successfully.",
    REGISTRATION_INITIATED: "OTP sent to email. Complete registration to continue.",
    USER_REGISTERED_AND_AUTHORIZED: "User registered and authorized successfully.",
  },

  ERROR: {
    EMAIL_AND_PASSWORD_REQUIRED: "Email and password are required.",
    EMAIL_ALREADY_EXISTS: "Email is already registered.",
    USER_ALREADY_EXISTS: "User already exists.",
    INVALID_CREDENTIALS: "Invalid email or password.",
    OTP_INVALID_OR_EXPIRED: "Invalid or expired OTP.",
    NO_REGISTRATION_DATA: "No registration data found or session expired.",
    CORRUPTED_CACHE_DATA: "Corrupted cached registration data.",
    USER_ID_MISSING: "User ID is missing from the request.",
    USER_NOT_FOUND: "User not found",
  },
};
