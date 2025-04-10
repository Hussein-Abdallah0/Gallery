import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  images: [],
  selectedImage: null,
  isEditing: false,
};

const imagesSlice = createSlice({
  name: "images",
  initialState,
  reducers: {
    setImages: (state, action) => {
      state.images = action.payload;
    },
    setSelectedImage: (state, action) => {
      state.selectedImage = action.payload;
    },
    setIsEditing: (state, action) => {
      state.isEditing = action.payload;
    },
    resetImagesState: () => initialState,
  },
});

export const { setImages, setSelectedImage, setIsEditing, resetImagesState } = imagesSlice.actions;

export default imagesSlice.reducer;
