import { useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  FiBell,
  FiInbox,
  FiMenu,
  FiX,
  FiUsers,
  FiHeart,
  FiActivity,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  // ✅ safer user id
  const userId = user?._id || user?.id;

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showMessageDropdown, setShowMessageDropdown] = useState(false);

  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);

  const [showEmailModal, setShowEmailModal] = useState(false);

  const [replyText, setReplyText] = useState("");

  const [messageThread, setMessageThread] = useState([]);

  const unreadCount = messages.filter(
    (msg) => !msg.read && String(msg.receiver?._id) === String(userId),
  ).length;

  const dropdownRef = useRef(null);

  // ✅ Campaigns
  const [campaigns] = useState([
    { id: 1, title: "Feed 100 Children", progress: 70 },
    { id: 2, title: "Clean Water Project", progress: 40 },
    { id: 3, title: "School Supplies Drive", progress: 85 },
  ]);

  // ✅ Activities
  const [activities] = useState([
    { id: 1, text: "You donated to Feed 100 Children", time: "2h ago" },
    { id: 2, text: "New campaign launched", time: "5h ago" },
    { id: 3, text: "Volunteer event coming soon", time: "1 day ago" },
  ]);

  // ✅ FETCH ALL USER MESSAGES
  const fetchMessages = async () => {
    if (!userId) return;

    try {
      const res = await fetch(`http://localhost:5000/api/messages/${userId}`);

      if (!res.ok) {
        const text = await res.text();
        console.error("Fetch error:", text);
        return;
      }

      const data = await res.json();

      setMessages(data.messages || []);
    } catch (err) {
      console.log(err);
    }
  };
  // ✅ MARK AS READ
  const markAsRead = async () => {
    try {
      await fetch(`http://localhost:5000/api/messages/read/${userId}`, {
        method: "PUT",
      });
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ OPEN THREAD
  const handleOpenMessages = async (msg) => {
    setShowMessageDropdown(false);

    setSelectedMessage(msg);

    setShowEmailModal(true);

    try {
      // ✅ NEW: match admin logic
      const otherUserId =
        String(msg.sender?._id) === String(userId)
          ? msg.receiver?._id
          : msg.sender?._id;

      const res = await fetch(
        `http://localhost:5000/api/messages/conversation/${userId}/${otherUserId}`,
      );

      const data = await res.json();

      console.log("THREAD:", data);

      setMessageThread(data.messages || []);
    } catch (err) {
      console.log(err);

      setMessageThread([msg]);
    }
  };

  // ✅ SEND REPLY
  const handleSendReply = async () => {
    if (!replyText.trim()) return;

    try {
      // ✅ FIXED PAYLOAD
      const payload = {
        sender: userId,
        receiver:
          String(selectedMessage.sender?._id) === String(userId)
            ? selectedMessage.receiver?._id
            : selectedMessage.sender?._id,

        content: replyText,

        subject: selectedMessage.subject || "No Subject",

        threadId: selectedMessage.threadId,
      };

      console.log("SENDING:", payload);

      const res = await fetch(`http://localhost:5000/api/messages/send`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(payload),
      });

      const data = await res.json();

      console.log("REPLY RESPONSE:", data);

      if (!data.success) {
        return alert(data.message || "Failed to send");
      }

      // ✅ use backend saved message
      setMessageThread((prev) => [...prev, data.message]);

      setReplyText("");

      // ✅ refresh inbox
      fetchMessages();
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ INITIAL FETCH
  useEffect(() => {
    fetchMessages();
  }, [userId]);

  // ✅ OPTIONAL AUTO REFRESH
  useEffect(() => {
    const interval = setInterval(() => {
      fetchMessages();
    }, 30000);

    return () => clearInterval(interval);
  }, [userId]);

  // ✅ CLOSE DROPDOWN OUTSIDE CLICK
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowMessageDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ LOGOUT
  const handleLogout = () => {
    logout?.();

    navigate("/login");
  };

  // ✅ AVATAR INITIALS
  const getInitials = () => {
    if (!user?.name) return "U";

    return user.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-orange-50 via-white to-blue-50">
      {/* OVERLAY */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <div
        className={`fixed md:static z-50 top-0 left-0 h-full w-72 bg-white shadow-xl p-6 transform transition-all duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-xl font-bold text-blue-600">Save The Child</h2>

            <p className="text-sm text-gray-500">Dashboard</p>
          </div>

          <FiX
            className="cursor-pointer md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        </div>

        {/* NAVIGATION */}
        <div className="space-y-3">
          <button
            onClick={() => navigate("/donate")}
            className="w-full text-left px-4 py-3 rounded-xl hover:bg-orange-100 transition"
          >
            Donate
          </button>

          <button
            onClick={() => navigate("/volunteer")}
            className="w-full text-left px-4 py-3 rounded-xl hover:bg-blue-100 transition"
          >
            Volunteer
          </button>

          <button
            onClick={() => navigate("/activities")}
            className="w-full text-left px-4 py-3 rounded-xl hover:bg-green-100 transition"
          >
            Activities
          </button>
        </div>

        <button
          onClick={handleLogout}
          className="mt-10 w-full bg-gradient-to-r from-orange-500 to-blue-500 text-white py-3 rounded-xl font-semibold"
        >
          Logout
        </button>
      </div>

      {/* MAIN */}
      <div className="flex-1 p-4 md:p-8">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <FiMenu
            className="text-2xl md:hidden cursor-pointer"
            onClick={() => setSidebarOpen(true)}
          />

          <div
            className="flex items-center gap-4 ml-auto relative"
            ref={dropdownRef}
          >
            {/* INBOX */}
            <div className="relative">
              <button
                onClick={async () => {
                  const isOpening = !showMessageDropdown;

                  setShowMessageDropdown(isOpening);

                  if (isOpening) {
                    await markAsRead();

                    fetchMessages();
                  }
                }}
                className="bg-white p-3 rounded-xl shadow relative"
              >
                <FiInbox />

                {unreadCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs px-2 rounded-full">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* DROPDOWN */}
              {showMessageDropdown && (
                <div className="absolute right-0 mt-3 w-80 max-w-[90vw] bg-white shadow-2xl rounded-2xl p-4 z-50">
                  <h3 className="font-bold mb-3 text-blue-600">Inbox</h3>

                  {messages.length === 0 ? (
                    <p className="text-sm text-gray-500">No messages yet</p>
                  ) : (
                    messages.slice(0, 5).map((msg) => (
                      <div
                        key={msg._id}
                        onClick={() => handleOpenMessages(msg)}
                        className="p-3 rounded-xl cursor-pointer hover:bg-gray-100 transition"
                      >
                        <p className="font-semibold text-sm">
                          {msg.sender?.name || "Admin"}
                        </p>

                        <p className="text-xs text-gray-500 truncate">
                          {msg.content}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>

            {/* BELL */}
            <button className="bg-white p-3 rounded-xl shadow">
              <FiBell />
            </button>

            {/* AVATAR */}
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-blue-500 text-white flex items-center justify-center font-bold">
              {getInitials()}
            </div>
          </div>
        </div>

        {/* WELCOME */}
        <h1 className="text-xl md:text-2xl font-bold mb-6">
          Welcome, {user?.name || "User"}
        </h1>

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-5 rounded-2xl shadow flex items-center gap-4">
            <FiHeart className="text-orange-500 text-xl" />

            <div>
              <p className="text-sm text-gray-500">Donations</p>

              <h3 className="text-xl font-bold">$12,450</h3>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow flex items-center gap-4">
            <FiActivity className="text-green-500 text-xl" />

            <div>
              <p className="text-sm text-gray-500">Campaigns</p>

              <h3 className="text-xl font-bold">8</h3>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow flex items-center gap-4">
            <FiUsers className="text-blue-500 text-xl" />

            <div>
              <p className="text-sm text-gray-500">Volunteers</p>

              <h3 className="text-xl font-bold">120</h3>
            </div>
          </div>
        </div>

        {/* CAMPAIGNS */}
        <div className="bg-white rounded-2xl p-6 shadow mb-8">
          <h2 className="font-bold text-blue-600 mb-4">Active Campaigns</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {campaigns.map((c) => (
              <div key={c.id} className="p-4 bg-gray-50 rounded-xl">
                <h3 className="font-semibold mb-2">{c.title}</h3>

                <div className="w-full h-2 bg-gray-200 rounded">
                  <div
                    className="h-2 bg-blue-500 rounded"
                    style={{
                      width: `${c.progress}%`,
                    }}
                  />
                </div>

                <p className="text-xs mt-2 text-gray-500">
                  {c.progress}% funded
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ACTIVITIES */}
        <div className="bg-white rounded-2xl p-6 shadow">
          <h2 className="font-bold text-blue-600 mb-4">Recent Activity</h2>

          <div className="space-y-3">
            {activities.map((a) => (
              <div
                key={a.id}
                className="flex justify-between bg-gray-50 p-3 rounded-xl"
              >
                <span className="text-sm">{a.text}</span>

                <span className="text-xs text-gray-500">{a.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MESSAGE MODAL */}
      {showEmailModal && selectedMessage && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl p-6 relative">
            {/* CLOSE */}
            <button
              onClick={() => setShowEmailModal(false)}
              className="absolute top-4 right-4 text-gray-500"
            >
              <FiX />
            </button>

            {/* HEADER */}
            <div className="h-2 mb-2" />

            <p className="text-sm text-gray-500 mb-4">Conversation Thread</p>

            {/* THREAD */}
            <div className="bg-gray-50 p-4 rounded-xl mb-4 max-h-80 overflow-y-auto space-y-3">
              {messageThread.length === 0 ? (
                <p className="text-sm text-gray-500">No messages</p>
              ) : (
                messageThread.map((msg, index) => {
                  // ✅ FIXED COMPARISON
                  const isMe = String(msg.sender?._id) === String(userId);

                  return (
                    <div
                      key={msg._id || index}
                      className={`flex ${
                        isMe ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[75%] p-3 rounded-xl text-sm ${
                          isMe
                            ? "bg-blue-500 text-white"
                            : "bg-white border text-gray-800"
                        }`}
                      >
                        <p className="font-semibold text-xs mb-1">
                          {isMe ? "You" : msg.sender?.name || "Admin"}
                        </p>

                        <p>{msg.content}</p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* REPLY */}
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Type your reply..."
              className="w-full border rounded-xl p-3 mb-4 text-sm"
              rows={4}
            />

            {/* ACTIONS */}
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowEmailModal(false)}
                className="px-4 py-2 rounded-lg bg-gray-200"
              >
                Cancel
              </button>

              <button
                onClick={handleSendReply}
                className="px-4 py-2 rounded-lg bg-blue-500 text-white"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
