import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface Login {
    email: string;
    password: string;
    username: string;
}

interface LoginState {
    user: Login;
    status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: LoginState = {
    user: {
        email: "",
        password: "",
        username: ""
    },
    status: "idle"
};

export const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        setLogin: (state, action: PayloadAction<Login>) => {
            state.user = action.payload;
            state.status = "succeeded";
        },
        setLogout: (state) => {
            state.user = { email: "", password: "", username: "" };
            state.status = "idle";
        }
    }
});

export const { setLogin, setLogout } = loginSlice.actions;
export default loginSlice.reducer;