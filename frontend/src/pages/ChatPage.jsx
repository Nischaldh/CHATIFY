import BorderAnmiatedContainer from "../components/BorderAnimatedContainer"
import { useChatStore } from "../store/useChatStore"
import ProfileHeader from "../components/ProfileHeader";
import ActiveTabSwitch from "../components/ActiveTabSwitch";
import ChatList from "../components/ChatList";
import ContactList from "../components/ContactList";
import ChatContainer from "../components/ChatContainer";
import NoConversationPlaceHolder from "../components/NoConversationPlaceHolder";

const ChatPage = () => {
  const {activeTab, selectedUser} = useChatStore();
  return (
    <div className="relative w-full max-w-6xl h-[800px]">
      <BorderAnmiatedContainer>
        {/* Left Side Begins*/}
        <div className="w-80 bg-slate-800/50 backdrop-blur-sm flex flex-col">
          <ProfileHeader/>
          <ActiveTabSwitch/>
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {activeTab === "chats"?<ChatList />:<ContactList />}
          </div>
        </div>
        {/* Left Side Ends */}

        {/* Rigth Side Begins */}
        <div className="flex-1 flex flex-col bg-slate-900/50 blackdrop-blur-sm">
        {selectedUser? <ChatContainer />:<NoConversationPlaceHolder/>}
        </div>
        {/* Right Side Ends */}
      </BorderAnmiatedContainer>
    </div>
  )
}

export default ChatPage