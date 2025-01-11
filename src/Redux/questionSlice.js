import { createSlice } from '@reduxjs/toolkit';

const questionSlice = createSlice({
  name: 'question',
  initialState: {
    currentQuestion: '',
    codeSuggestion: '',
  },
  reducers: {
    setQuestion: (state, action) => {
      state.currentQuestion = action.payload;
    },
    setCodeSuggestion: (state, action) => {
      state.codeSuggestion = action.payload;
    },
  },
});

export const { setQuestion, setCodeSuggestion } = questionSlice.actions;
export default questionSlice.reducer;