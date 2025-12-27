import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js"
import toast from "react-hot-toast";
import { io } from "socket.io-client";
import { ENV } from "../lib/env.js";

const BASE_URL = ENV.SERVER_URL;

export const useAuthStore = create((set, get) => ({
    authUser: null,
    isCheckingAuth: true,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    socket: null,
    onlineUsers: [],

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check");
            set({ authUser: res.data });
            get().connectSocket();
        } catch (error) {
            console.log("Error in authCheck: ", error);
            set({ authUser: null });
        } finally {
            set({ isCheckingAuth: false });
        }
    },
    signup: async (data) => {
        set({ isSigningUp: true })
        try {
            const res = await axiosInstance.post("/auth/signup", data)
            set({ authUser: res.data })
            console.log(res.data)
            toast.success("Account Created Successfully.")
            get().connectSocket();
        } catch (error) {
            console.log("Error in authCheck: ", error);
            const message =
                error?.response?.data?.message ||
                error?.message ||
                "Something went wrong";
            toast.error(message)
            set({ authUser: null });
        } finally {
            set({ isSigningUp: false })
        }
    },
    login: async (data) => {
        set({ isLoggingIn: true });
        try {
            const res = await axiosInstance.post("/auth/login", data);
            set({ authUser: res.data });
            console.log(res.data)
            toast.success("Logged in successfully");
            get().connectSocket();
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isLoggingIn: false });
        }
    },
    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout");
            set({ authUser: null });
            toast.success("Logged out successfully");
            get().disconnectSocket();
        } catch (error) {
            toast.error("Error logging out");
            console.log("Logout error:", error);
        }
    },
    updateProfile: async (data) => {
        set({ isUpdatingProfile: true })
        try {
            const res = await axiosInstance.put("/auth/update-profile", data);
            set({ authUser: res.data });
            toast.success("Profile Updated Successfully");
        } catch (error) {
            console.log("Error in update Profile: ", error);
            toast.error(error.response.data.message);

        } finally {
            set({ isUpdatingProfile: false })
        }

    },
    connectSocket: () => {
        const { authUser } = get()
        if (!authUser || get().socket?.connected) return
        const socket = io(BASE_URL, {
            withCredentials: true //send cookies with connection
        })
        socket.connect();
        set({socket});
        // listen for online users event
        socket.on("getOnlineUsers",(userIds)=>{
            set({onlineUsers:userIds})
        })
    },
    disconnectSocket:()=>{
        if(get().socket?.connected) get().socket.disconnect()
    }
}))