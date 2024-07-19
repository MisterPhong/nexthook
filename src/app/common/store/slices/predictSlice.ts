import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

type PredictState = {
  load: boolean;
};

// type ProfileState = {
//   result: Profile | undefined;
//   loading: boolean;
//   error: ServerError | undefined;
// };

// export const profileAsync = createAsyncThunk<
//   Profile,
//   void,
//   { rejectValue: ServerError }
// >("profile Async", async (_, { rejectWithValue }) => {
//   try {
//     const token = await AsyncStorage.getItem("access_token");
//     const config = {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     };
//     const response = await httpClient.get<Profile>(server.profile, config);
//     return response.data;
//   } catch (error: unknown) {
//     if (axios.isAxiosError(error)) {
//       if (error.response?.data.statusCode === 401) {
//         return rejectWithValue({
//           message: "Unauthorized",
//           statusCode: 401,
//           isError: true,
//         });
//       }
//       return rejectWithValue(error.response?.data as ServerError);
//     } else {
//       return rejectWithValue({
//         statusCode: 500,
//         message: "Unknown error",
//         isError: true,
//       });
//     }
//   }
// });

const initialState: PredictState = {
  load: true,
};

const predictSlice = createSlice({
  name: "Predict",
  initialState,
  reducers: {
    setLoad(state: PredictState) {
      state.load = false;
    },
  },
  //   extraReducers: (builder) => {
  //     builder.addCase(
  //       profileAsync.fulfilled,
  //       (state: ProfileState, action: PayloadAction<Profile | undefined>) => {
  //         state.result = action.payload;
  //         state.error = undefined;
  //         state.loading = false;
  //       }
  //     );
  //     builder.addCase(profileAsync.pending, (state: ProfileState) => {
  //       state.result = undefined;
  //       state.error = undefined;
  //       state.loading = true;
  //     });
  //     builder.addCase(
  //       profileAsync.rejected,
  //       (state: ProfileState, action: PayloadAction<ServerError | undefined>) => {
  //         state.error = action.payload as ServerError;
  //         state.result = undefined;
  //         state.loading = false;
  //       }
  //     );
  //   },
});

export const { setLoad } = predictSlice.actions;
export const predictSelector = (store: RootState) => store.predictReducer;
export default predictSlice.reducer;
