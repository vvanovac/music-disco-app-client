import TokenService from '../services/token.service';
import { difficulties, musicNote, octaves } from '@/constants/music.constants';

export default {
  token: TokenService.get(),
  messagePrompt: [],
  messagePromptCounter: 0,
  userData: null,
  taskData: null,
  taskDataLength: 0,
  paginationPage: 0,
  dataPerPage: 10,
  numberOfRows: [5, 10, 25, 100],
  sortCriteria: null,
  octaves: [octaves.TWO, octaves.THREE, octaves.FOUR, octaves.FIVE, octaves.SIX],
  notes: [ musicNote.C, musicNote.D, musicNote.E, musicNote.F, musicNote.G, musicNote.A, musicNote.B,
    musicNote.C2, musicNote.Csharp, musicNote.Dsharp, musicNote.Fsharp, musicNote.Gsharp, musicNote.Asharp ],
  difficulties: [difficulties.BEGINNER, difficulties.AMATEUR, difficulties.MEDIUM],
  lessonData: null,
  lessonDataLength: 0,
  taskProgressData: [],
};
