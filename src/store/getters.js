import { getter } from '@/store/store.constants';

export default {
  [getter.MESSAGE_PROMPT]: state => state.messagePrompt.slice(0, 4),
  [getter.UNPROTECTED_ROUTES]: () => ['register', 'login'],
  [getter.ADMIN_PROTECTED_ROUTES]: () =>
      ['administrator', 'createTasks', 'updateTasks', 'task', 'createLessons', 'updateLessons'],
  [getter.USER_DATA]: state => state.userData,
  [getter.TASK_DATA]: state => {
    const data = JSON.parse(JSON.stringify(state.taskData || []));
    const criteria = state.sortCriteria;
    return data.sort((data1, data2) => {
      if (typeof data1[criteria] === 'string') {
        return data1[criteria].localeCompare(data2[criteria]);
      }
      if (typeof data1[criteria] === 'number') {
        return data1[criteria] - data2[criteria];
      }
      return data1[criteria] > data2[criteria];
    })
  },
  [getter.TASK_DATA_LENGTH]: state => state.taskDataLength,
  [getter.PAGINATION_PAGE]: state => state.paginationPage,
  [getter.DATA_PER_PAGE]: state => state.dataPerPage,
  [getter.NUMBER_OF_ROWS]: state => state.numberOfRows,
  [getter.SORT_CRITERIA]: state => state.sortCriteria,
  [getter.GET_OCTAVES]: state => state.octaves,
  [getter.GET_NOTES]: state => state.notes,
  [getter.GET_DIFFICULTIES]: state => state.difficulties,
  [getter.LESSON_DATA]: state => state.lessonData
};
