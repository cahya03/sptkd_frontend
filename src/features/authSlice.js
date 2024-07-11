import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const base_url = process.env.REACT_APP_BACKEND_URL;

const initialState = {
  akun: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const LoginAkun = createAsyncThunk(
  "akun/loginAkun",
  async (akun, thunkAPI) => {
    try {
      const response = await axios.post(`${base_url}/login`, {
        akun_email: akun.akun_email,
        akun_password: akun.akun_password,
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        const message = error.response.data.message;
        return thunkAPI.rejectWithValue(message);
      }
    }
  }
);

export const getMe = createAsyncThunk("akun/getMe", async (_, thunkAPI) => {
  try {
    const response = await axios.get(`${base_url}/me`);
    return response.data;
  } catch (error) {
    if (error.response) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
});

export const LogOut = createAsyncThunk("akun/LogOut", async () => {
  await axios.delete(`${base_url}/logout`);
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(LoginAkun.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(LoginAkun.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.akun = action.payload;
    });
    builder.addCase(LoginAkun.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    //Get Akun Login
    builder.addCase(getMe.pending, (state) => {
        state.isLoading = true;
      });
      builder.addCase(getMe.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.akun = action.payload;
      });
      builder.addCase(getMe.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
