const messageHeader = {
  REGISTRATION_FAILED: 'Registration failed.',
  REGISTERED: 'Successfully registered.',
  LOGIN_FAILED: 'Login failed.',
  LOGGED_IN: 'Successfully logged in.',
  FIELDS_CLEARED: 'All fields cleared.',
  SAVING_FAILED: 'Failed to save.',
  TASK_CREATING_FAILED: 'Task creating failed.',
  TASK_CREATED: 'Task successfully created.',
  TASK_UPDATING_FAILED: 'Task updating failed.',
  TASK_UPDATED: 'Task successfully updated.',
  TASK_DELETING_FAILED: 'Task successfully deleted.',
  TASK_DELETED: 'Deletion error.',
  FETCHING_ERROR: 'Error during fetching.',
  UNAUTHORIZED: 'Access not allowed.',
};

const messageText = {
  INVALID_FORM: 'Invalid form. Please try again.',
  UNAUTHORIZED: 'You cannot access this.'
};

const messageValidity = {
  ERROR: 'error',
  INFO: 'info',
  SUCCESS: 'success'
};

const userMessages = {
  SHORT_USERNAME: 'Username must be at least 3 characters long.',
  LONG_USERNAME: 'Username must be at most 16 characters long.',
  USERNAME_REQUIRED: 'Username is required.',
  SHORT_PASSWORD: 'Password must be at least 8 characters long.',
  PASSWORD_REQUIRED: 'Password is required.',
  INVALID_EMAIL: 'Email must be in a valid format.',
  EMAIL_REQUIRED: 'Email is required.',
};

const taskMessages = {
  SHORT_TITLE: 'Title must be at least 8 characters long.',
  TITLE_REQUIRED: 'Title is required.',
  SHORT_SUBTITLE: 'Subtitle must be at least 8 characters long.',
  SUBTITLE_REQUIRED: 'Subtitle is required.',
  SHORT_DESCRIPTION: 'Description must be at least 16 characters long.',
  DESCRIPTION_REQUIRED: 'Description is required.',
  MUSIC_NOTES_REQUIRED: 'Music notes are required.',
  OCTAVE_REQUIRED: 'Octave is required.'
};

export {
  messageHeader,
  messageText,
  messageValidity,
  userMessages,
  taskMessages
}
