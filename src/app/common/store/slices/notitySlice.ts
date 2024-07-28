import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Notify } from "../../types/notify.type";

type NotifyState = {
  notifys: Notify[];
  notifysIsRead: Notify[];
};

const initialState: NotifyState = {
  notifys: [],
  notifysIsRead: [],
};

const notifySlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setIsReadNotification(state: NotifyState, action: PayloadAction<Notify[]>) {
      state.notifysIsRead = action.payload.filter((notify) => !notify.isRead);
    },
    setAddNotify(state: NotifyState, action: PayloadAction<Notify>) {
      state.notifysIsRead.push(action.payload);
    },
  },
});

export const { setIsReadNotification, setAddNotify } = notifySlice.actions;
export const notifySelector = (store: RootState) => store.notifyReducer;
export default notifySlice.reducer;
