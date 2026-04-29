import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("messages");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [unreadMessages, setUnreadMessages] = useState([]);
  const [conversation, setConversation] = useState([]);

  const ADMIN_ID =
    localStorage.getItem("adminId") || "69e54378ce34879ef06661c9";

  // FETCH USERS
  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/users");
      const data = await res.json();
      setUsers(data.users || []);
    } catch (err) {
      console.log(err);
    }
  };

  // FETCH UNREAD
  const fetchUnreadMessages = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/messages/unread/${ADMIN_ID}`,
      );
      const data = await res.json();
      setUnreadMessages(data.messages || []);
    } catch (err) {
      console.log(err);
    }
  };

  // FETCH CONVERSATION
  const fetchConversation = async (userId) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/messages/${ADMIN_ID}/${userId}`,
      );
      const data = await res.json();
      setConversation(data.messages || []);
    } catch (err) {
      console.log(err);
    }
  };

  // SEND MESSAGE
  const handleSend = async () => {
    if (!selectedUser || !subject.trim() || !message.trim()) return;

    try {
      setLoading(true);

      let finalSubject = subject.trim();

      if (
        selectedUser.lastSubject &&
        !finalSubject.toLowerCase().startsWith("re:")
      ) {
        finalSubject = `Re: ${selectedUser.lastSubject}`;
      }

      const res = await fetch(
        "http://save-a-child-charity-backend.onrender.com/api/messages/send",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sender: ADMIN_ID,
            receiver: selectedUser._id,
            subject: finalSubject,
            content: message,
          }),
        },
      );

      if (!res.ok) throw new Error("Failed");

      setSubject(finalSubject);
      setMessage("");

      await fetchConversation(selectedUser._id);
      fetchUnreadMessages();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("adminId");
    window.location.href = "/login";
  };

  useEffect(() => {
    fetchUsers();
    fetchUnreadMessages();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* SIDEBAR */}
      <div className="w-64 bg-white shadow p-5">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>

        {[
          { key: "messages", label: "Messages" },
          { key: "users", label: "Users" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`block w-full text-left p-3 rounded mb-2 ${
              activeTab === tab.key ? "bg-blue-500 text-white" : "bg-gray-100"
            }`}
          >
            {tab.label}
          </button>
        ))}

        <button
          onClick={handleLogout}
          className="mt-10 w-full bg-red-500 text-white p-3 rounded"
        >
          Logout
        </button>
      </div>

      {/* MAIN */}
      <div className="flex-1 p-6">
        {activeTab === "messages" && (
          <div className="grid grid-cols-2 gap-6">
            {/* USERS */}
            <div className="bg-white p-4 rounded shadow h-[500px] overflow-y-auto">
              <h3 className="font-bold mb-4">Users</h3>

              {users.map((user) => (
                <div
                  key={user._id}
                  onClick={() => {
                    setSelectedUser(user);
                    setSubject(user.lastSubject || "");
                    fetchConversation(user._id);
                  }}
                  className={`p-3 mb-2 rounded cursor-pointer ${
                    selectedUser?._id === user._id
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100"
                  }`}
                >
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-sm">{user.email}</p>
                </div>
              ))}
            </div>

            {/* CHAT */}
            <div className="bg-white p-4 rounded shadow flex flex-col h-[500px]">
              {selectedUser ? (
                <>
                  <h3 className="font-bold mb-2">
                    Chat with {selectedUser.name}
                  </h3>

                  {/* MESSAGES */}
                  <div className="flex-1 overflow-y-auto mb-4 space-y-2">
                    {conversation.map((msg) => (
                      <div
                        key={msg._id}
                        className={`p-2 rounded max-w-[75%] ${
                          msg.sender === ADMIN_ID
                            ? "ml-auto bg-blue-500 text-white"
                            : "bg-gray-200"
                        }`}
                      >
                        <p className="text-xs font-bold">{msg.subject}</p>
                        <p>{msg.content}</p>
                      </div>
                    ))}
                  </div>

                  {/* INPUT */}
                  <input
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Subject"
                    className="mb-2 p-2 border rounded"
                  />

                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type message..."
                    className="mb-2 p-2 border rounded"
                  />

                  <button
                    onClick={handleSend}
                    disabled={loading}
                    className="bg-blue-500 text-white p-2 rounded"
                  >
                    {loading ? "Sending..." : "Send"}
                  </button>
                </>
              ) : (
                <p>Select a user to start chatting</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
