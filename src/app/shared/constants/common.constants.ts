export const MESSAGE_CONSTANTS = {
    ERRORS: {
        INVALID_CREDENTIALS: "Invalid Email or password",
        EMAIL_EXISTS: "An account with this email already exists",
        SERVER_ERROR: "Something went wrong, please try again later",
        NETWORK_ISSUE: "Please check your network connection",
    },

    SUCCESS: {
        ACCOUNT_REGISTERED: "Your account has been registered",
        PROFILE_UPDATED: "Your profile has been updated",
        LOGGED_IN: "You have been logged in",
        LOGGED_OUT: "You have been logged out",
    },

    WARNING: {
        UNSAVED_CHANGES: "You have unsaved changes"
    }
};

export const TOAST_MESSAGE_CONSTANTS = {
  ERRORS: {
    INVALID_CREDENTIALS: { detail: "Error", summary: MESSAGE_CONSTANTS.ERRORS.INVALID_CREDENTIALS, duration: 5000 },
    EMAIL_EXISTS: { detail: "Error", summary: MESSAGE_CONSTANTS.ERRORS.EMAIL_EXISTS, duration: 5000 },
    SERVER_ERROR: { detail: "Error", summary: MESSAGE_CONSTANTS.ERRORS.SERVER_ERROR, duration: 5000 },
    NETWORK_ISSUE: { detail: "Error", summary: MESSAGE_CONSTANTS.ERRORS.NETWORK_ISSUE, duration: 5000 },
  },

  SUCCESS: {
    ACCOUNT_REGISTERED: { detail: "Success", summary: MESSAGE_CONSTANTS.SUCCESS.ACCOUNT_REGISTERED, duration: 5000 },
    PROFILE_UPDATED: { detail: "Success", summary: MESSAGE_CONSTANTS.SUCCESS.PROFILE_UPDATED, duration: 5000 },
    LOGGED_IN: { detail: "Success", summary: MESSAGE_CONSTANTS.SUCCESS.LOGGED_IN, duration: 5000 },
    LOGGED_OUT: { detail: "Success", summary: MESSAGE_CONSTANTS.SUCCESS.LOGGED_OUT, duration: 5000 },
    
  },

    WARNING: {
        UNSAVED_CHANGES: { detail: "Warning", summary: MESSAGE_CONSTANTS.WARNING.UNSAVED_CHANGES, duration: 5000 }
    }
};

