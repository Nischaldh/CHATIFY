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
    isSoundEndabled: localStorage.getItem("isSoundEnabled")===true,



    toggleSound: ()=>{
        localStorage.setItem("isSoundEnabled",!get().isSoundEndabled)
        set({isSoundEndabled:!get().isSoundEndabled})
    },
    setActiveTab: (tab)=>set({activeTab: tab}),
    setSelectedUser: (selectedUser)=>set({selectedUser}),

    getAllContacts: async()=>{
        set({isUsersLoading:true});
        try {
            const res = await axiosInstance.get("/messages/contacts");
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
            set({chats:res.data});     
        } catch (error) {
            toast.error(error.response.data.messages)
        }finally{
            set({isUsersLoading:false})
        }

    },


}))