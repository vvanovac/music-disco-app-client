import { getter } from '@/store/store.constants';

const DataSort = (dataset, criteria) => {
  const data = JSON.parse(JSON.stringify(dataset || []));
  return data.sort((data1, data2) => {
    if (typeof data1[criteria] === 'string') {
      return data1[criteria].localeCompare(data2[criteria]);
    }
    if (typeof data1[criteria] === 'number') {
      return data1[criteria] - data2[criteria];
    }
    return data1[criteria] > data2[criteria];
  })
};

export default {
  [getter.MESSAGE_PROMPT]: state => state.messagePrompt.slice(0, 4),
  [getter.UNPROTECTED_ROUTES]: () => ['register', 'login'],
  [getter.ADMIN_PROTECTED_ROUTES]: () =>
      ['administrator', 'createTasks', 'updateTasks', 'task', 'createLessons', 'updateLessons', 'createCourses',
      'updateCourses'],
  [getter.USER_DATA]: state => state.userData,
  [getter.TASK_DATA]: state => DataSort(state.taskData, state.sortCriteria),
  [getter.TASK_DATA_LENGTH]: state => state.taskDataLength,
  [getter.PAGINATION_PAGE]: state => state.paginationPage,
  [getter.DATA_PER_PAGE]: state => state.dataPerPage,
  [getter.NUMBER_OF_ROWS]: state => state.numberOfRows,
  [getter.SORT_CRITERIA]: state => state.sortCriteria,
  [getter.GET_OCTAVES]: state => state.octaves,
  [getter.GET_NOTES]: state => state.notes,
  [getter.GET_DIFFICULTIES]: state => state.difficulties,
  [getter.LESSON_DATA]: state => DataSort(state.lessonData, state.sortCriteria),
  [getter.LESSON_DATA_LENGTH]: state => state.lessonDataLength,
  [getter.GET_TASK_PROGRESS_DATA]: state => state.taskProgressData,
  [getter.COURSE_DATA]: state => DataSort(state.courseData, state.sortCriteria),
  [getter.COURSE_DATA_LENGTH]: state => state.courseDataLength,
};
