import {create} from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';


export const useChatStore = create((set,get)=>({
    allContacts: [],
    chats: [],
    messages: [],
    activeTab: "chats",
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,
    isSoundEnabled: localStorage.getItem("isSoundEnabled")==="true",
    onlineUsers: [],


    toggleSound: () => {
        const newValue = !get().isSoundEnabled;
        localStorage.setItem("isSoundEnabled", newValue);
        set({ isSoundEnabled: newValue });
    },
    setActiveTab: (tab)=>set({activeTab: tab}),
    setSelectedUser: (selectedUser)=>set({selectedUser}),

    getAllContacts: async()=>{
        set({isUsersLoading:true});
        try {
            const res = await axiosInstance.get("/messages/contacts");
            console.log(res.data)
            set({allContacts:res.data});     
        } catch (error) {
            toast.error(error.response.data.messages)
        }finally{
            set({isUsersLoading:false})
        }
    },
    getMyChatPartners: async()=>{
            set({isUsersLoading:true});
        try {
            const res = await axiosInstance.get("/messages/chats");
            console.log(res.data)
            set({chats:res.data.chatPartners});     
        } catch (error) {
            toast.error(error.response.data.messages)
        }finally{
            set({isUsersLoading:false})
        }

    },

    getMessagesByUserId: async(userId)=>{
        set({isMessagesLoading:true})
        try {
            const res = await axiosInstance.get(`/messages/${userId}`);
            set({messages:res.data.messages})
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
            
        }finally{
            set({isMessagesLoading:false})
        }
    },
    sendMessage: async(messageData) =>{
        const {selectedUser, messages} = get()
        try {
            const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData)
            set({messages: messages.concat(res.data)})
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong")
        }
    }
}))