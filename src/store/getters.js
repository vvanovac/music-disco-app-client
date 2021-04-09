import { getter } from '@/store/store.constants';

export default {
  [getter.MESSAGE_PROMPT]: state => state.messagePrompt.slice(0, 4),
  [getter.UNPROTECTED_ROUTES]: () => ['register', 'login'],
  [getter.ADMIN_PROTECTED_ROUTES]: () => ['administrator', 'createTasks', 'updateTasks', 'task'],
  [getter.USER_DATA]: state => state.userData,
  [getter.TASK_DATA]: state => state.taskData || [],
  [getter.TASK_DATA_LENGTH]: state => state.taskDataLength,
  [getter.PAGINATION_PAGE]: state => state.paginationPage,
  [getter.DATA_PER_PAGE]: state => state.dataPerPage,
};
