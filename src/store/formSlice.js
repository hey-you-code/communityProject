import { createSlice } from "@reduxjs/toolkit";

const formSilce = createSlice({
  name: "form",
  initialState: {
    formData: [],
    formInfo: {},
  },
  reducers: {
    setFormData: (state, action) => {
      state.formData = action.payload;
    },
    setFormInfo: (state, action) => {
        state.formInfo = action.payload;
    }
  },
});

export const { setFormData, setFormInfo } = formSilce.actions;

export const formData = (state) => state.form.formData;

export const formInfo = (state) => state.form.formInfo;

export default formSilce.reducer;
