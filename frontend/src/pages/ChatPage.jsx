import { useAuthStore } from "../store/useAuthStore";

const ChatPage = () => {
  const { logout } = useAuthStore();
  return (
    <div className="z-10">
      <button onClick={logout} className="z-10">Logout</button>
    </div>
  )
}

export default ChatPage