import { useEffect, useState } from "react";

import {
  FiMenu,
  FiX,
  FiUsers,
  FiMail,
  FiLogOut,
  FiActivity,
  FiSend,
  FiCheck,
  FiTrash2,
  FiBell,
  FiChevronDown,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const API_URL = "http://localhost:5000/api";

  const [users, setUsers] = useState([]);
  const [volunteers, setVolunteers] = useState([]);

  const [selectedUser, setSelectedUser] = useState(null);

  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [conversation, setConversation] = useState([]);

  const [showChatModal, setShowChatModal] = useState(false);

  // ✅ NEW STATES
  const [adminMessages, setAdminMessages] = useState([]);

  const [showMessageDropdown, setShowMessageDropdown] = useState(false);

  const [unreadCount, setUnreadCount] = useState(0);

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalMessages: 0,
    totalVolunteers: 0,
  });

  // ✅ safer admin id
  const ADMIN_ID = localStorage.getItem("adminId");

  // ✅ FETCH USERS
  const fetchUsers = async () => {
    try {
      const res = await fetch(`${API_URL}/users`);

      const data = await res.json();

      const fetchedUsers = data.users || [];

      setUsers(fetchedUsers);

      setStats((prev) => ({
        ...prev,
        totalUsers: fetchedUsers.length,
      }));
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ FETCH VOLUNTEERS
  const fetchVolunteers = async () => {
    try {
      const res = await fetch(`${API_URL}/volunteers`);

      const data = await res.json();

      const fetchedVolunteers = data.volunteers || [];

      setVolunteers(fetchedVolunteers);

      setStats((prev) => ({
        ...prev,
        totalVolunteers: fetchedVolunteers.length,
      }));
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ FETCH ALL ADMIN MESSAGES
  const fetchAdminMessages = async () => {
    try {
      const res = await fetch(`${API_URL}/messages/${ADMIN_ID}`);

      const data = await res.json();
      console.log(data);

      const messages = data.messages || [];

      setAdminMessages(messages);

      const unread = messages.filter(
        (msg) =>
          !msg.read &&
          String(msg.receiver?._id || msg.receiver) === String(ADMIN_ID),
      );

      setUnreadCount(unread.length);
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ FETCH CONVERSATION
  const fetchConversation = async (userId) => {
    try {
      const res = await fetch(
        `${API_URL}/messages/conversation/${ADMIN_ID}/${userId}`,
      );

      const data = await res.json();

      const messages = data.messages || [];

      setConversation(messages);

      setStats((prev) => ({
        ...prev,
        totalMessages: messages.length,
      }));

      // ✅ keep same subject
      if (messages.length > 0) {
        const latestMessage = messages[messages.length - 1];

        setSubject(latestMessage.subject || "No Subject");
      } else {
        setSubject("No Subject");
      }
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ SELECT USER
  const handleSelectUser = async (user) => {
    setSelectedUser(user);

    await fetchConversation(user._id);

    setShowChatModal(true);

    setShowMessageDropdown(false);
  };

  // ✅ OPEN MESSAGE FROM DROPDOWN
  const handleOpenMessage = async (msg) => {
    let otherUser = null;

    if (String(msg.sender?._id || msg.sender) === String(ADMIN_ID)) {
      otherUser = msg.receiver;
    } else {
      otherUser = msg.sender;
    }

    if (!otherUser) return;

    setSelectedUser(otherUser);

    await fetchConversation(otherUser._id || otherUser);

    setShowChatModal(true);

    setShowMessageDropdown(false);
  };

  // ✅ SEND MESSAGE
  const handleSend = async () => {
    if (!selectedUser || !message.trim()) return;

    try {
      setLoading(true);

      // ✅ keep same thread
      const existingThreadId =
        conversation.length > 0 ? conversation[0].threadId : null;

      const payload = {
        sender: ADMIN_ID,

        receiver: selectedUser._id,

        subject: subject || "No Subject",

        content: message,

        threadId: existingThreadId,
      };

      console.log("SENDING:", payload);

      // ✅ FIXED ENDPOINT
      const res = await fetch(`${API_URL}/messages/send`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(payload),
      });

      const data = await res.json();

      console.log("RESPONSE:", data);

      if (!data.success) {
        alert(data.message || "Failed to send");

        return;
      }

      // ✅ instant update
      setConversation((prev) => [...prev, data.message]);

      setMessage("");

      // ✅ refresh
      await fetchConversation(selectedUser._id);

      fetchAdminMessages();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ ACCEPT / DECLINE VOLUNTEER
  const handleVolunteerAction = async (id, status) => {
    try {
      await fetch(`${API_URL}/volunteers/${id}`, {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          status,
        }),
      });

      fetchVolunteers();
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ LOGOUT
  // const handleLogout = () => {
  //   localStorage.removeItem("token");

  //   localStorage.removeItem("adminId");
  //   useNavigate("/");
  // };
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("adminId");

    navigate("/");
  };

  // ✅ INITIAL FETCH
  useEffect(() => {
    fetchUsers();

    fetchVolunteers();

    fetchAdminMessages();
  }, []);

  // ✅ AUTO REFRESH CHAT
  useEffect(() => {
    if (!selectedUser) return;

    const interval = setInterval(() => {
      fetchConversation(selectedUser._id);
    }, 5000);

    return () => clearInterval(interval);
  }, [selectedUser]);

  // ✅ AUTO REFRESH ADMIN INBOX
  useEffect(() => {
    const interval = setInterval(() => {
      fetchAdminMessages();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-blue-50 via-white to-orange-50">
      {/* MOBILE OVERLAY */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <div
        className={`fixed md:static z-50 top-0 left-0 h-full w-72 bg-white shadow-2xl p-6 transform transition-all duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-2xl font-bold text-blue-600">Admin Panel</h2>

            <p className="text-sm text-gray-500">Save The Child</p>
          </div>

          <FiX
            className="text-xl cursor-pointer md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        </div>

        {/* NAVIGATION */}
        <div className="space-y-3">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-500 text-white">
            <FiMail />
            Messages
          </button>

          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-100">
            <FiUsers />
            Users
          </button>

          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-100">
            <FiActivity />
            Activities
          </button>
        </div>

        {/* STATS */}
        <div className="mt-10 space-y-4">
          <div className="bg-orange-50 rounded-2xl p-4">
            <p className="text-sm text-gray-500">Total Users</p>

            <h3 className="text-2xl font-bold">{stats.totalUsers}</h3>
          </div>

          <div className="bg-blue-50 rounded-2xl p-4">
            <p className="text-sm text-gray-500">Messages</p>

            <h3 className="text-2xl font-bold">{stats.totalMessages}</h3>
          </div>

          <div className="bg-green-50 rounded-2xl p-4">
            <p className="text-sm text-gray-500">Volunteers</p>

            <h3 className="text-2xl font-bold">{stats.totalVolunteers}</h3>
          </div>
        </div>

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          className="mt-10 w-full bg-gradient-to-r from-red-500 to-orange-500 text-white py-3 rounded-xl flex items-center justify-center gap-2"
        >
          <FiLogOut />
          Logout
        </button>
      </div>

      {/* MAIN */}
      <div className="flex-1 p-4 md:p-8 overflow-hidden">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <FiMenu
            className="text-2xl cursor-pointer md:hidden"
            onClick={() => setSidebarOpen(true)}
          />

          {/* ✅ MESSAGE DROPDOWN */}
          <div className="ml-auto flex items-center gap-4 relative">
            <div className="relative">
              <button
                onClick={() => setShowMessageDropdown(!showMessageDropdown)}
                className="bg-white shadow-xl rounded-2xl p-3 relative"
              >
                <FiMail className="text-xl text-blue-600" />

                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs h-5 w-5 rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* DROPDOWN */}
              {showMessageDropdown && (
                <div className="absolute right-0 mt-4 w-96 bg-white rounded-3xl shadow-2xl z-50 overflow-hidden max-h-[500px] overflow-y-auto">
                  <div className="p-4 border-b flex items-center justify-between">
                    <h3 className="font-bold text-blue-600">Admin Messages</h3>

                    <FiChevronDown />
                  </div>

                  {adminMessages.length === 0 ? (
                    <div className="p-4 text-sm text-gray-500">
                      No messages found
                    </div>
                  ) : (
                    adminMessages.map((msg) => {
                      const sender =
                        String(msg.sender?._id || msg.sender) ===
                        String(ADMIN_ID)
                          ? msg.receiver
                          : msg.sender;

                      return (
                        <div
                          key={msg._id}
                          onClick={() => handleOpenMessage(msg)}
                          className="p-4 border-b hover:bg-gray-50 cursor-pointer transition"
                        >
                          <div className="flex justify-between items-center">
                            <p className="font-semibold text-sm">
                              {sender?.name || "Unknown User"}
                            </p>

                            {!msg.read && (
                              <span className="h-2 w-2 bg-blue-500 rounded-full" />
                            )}
                          </div>

                          <p className="text-xs text-gray-500 mt-1">
                            {msg.subject}
                          </p>

                          <p className="text-sm mt-2 truncate">{msg.content}</p>

                          <p className="text-[10px] text-gray-400 mt-2">
                            {new Date(msg.createdAt).toLocaleString()}
                          </p>
                        </div>
                      );
                    })
                  )}
                </div>
              )}
            </div>

            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Admin Dashboard
              </h1>
            </div>
          </div>
        </div>

        {/* TOP STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-5 rounded-2xl shadow">
            <div className="flex items-center gap-4">
              <FiUsers className="text-2xl text-blue-500" />

              <div>
                <p className="text-sm text-gray-500">Registered Users</p>

                <h3 className="text-2xl font-bold">{stats.totalUsers}</h3>
              </div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow">
            <div className="flex items-center gap-4">
              <FiMail className="text-2xl text-orange-500" />

              <div>
                <p className="text-sm text-gray-500">Conversations</p>

                <h3 className="text-2xl font-bold">{stats.totalMessages}</h3>
              </div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow">
            <div className="flex items-center gap-4">
              <FiActivity className="text-2xl text-green-500" />

              <div>
                <p className="text-sm text-gray-500">Volunteers</p>

                <h3 className="text-2xl font-bold">{stats.totalVolunteers}</h3>
              </div>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* USERS */}
          <div className="bg-white rounded-2xl shadow p-4 h-[650px] overflow-y-auto">
            <h2 className="font-bold text-blue-600 mb-4">Registered Users</h2>

            <div className="space-y-3">
              {users.length === 0 ? (
                <p className="text-sm text-gray-500">No users found</p>
              ) : (
                users.map((user) => (
                  <div
                    key={user._id}
                    onClick={() => handleSelectUser(user)}
                    className={`p-4 rounded-2xl cursor-pointer transition ${
                      selectedUser?._id === user._id
                        ? "bg-blue-500 text-white"
                        : "bg-gray-50 hover:bg-gray-100"
                    }`}
                  >
                    <p className="font-semibold">{user.name}</p>

                    <p className="text-sm opacity-80">{user.email}</p>

                    <p className="text-xs mt-2 opacity-70">
                      Registered:{" "}
                      {new Date(user.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* VOLUNTEERS */}
          <div className="bg-white rounded-2xl shadow p-4 h-[650px] overflow-y-auto">
            <h2 className="font-bold text-orange-500 mb-4">
              Volunteer Applications
            </h2>

            <div className="space-y-3">
              {volunteers.length === 0 ? (
                <p className="text-sm text-gray-500">
                  No volunteer applications
                </p>
              ) : (
                volunteers.map((volunteer) => (
                  <div
                    key={volunteer._id}
                    className="bg-gray-50 rounded-2xl p-4"
                  >
                    <p className="font-semibold">{volunteer.name}</p>

                    <p className="text-sm text-gray-500">{volunteer.email}</p>

                    <p className="text-xs mt-2 text-gray-500">
                      Applied:{" "}
                      {new Date(volunteer.createdAt).toLocaleDateString()}
                    </p>

                    <p className="text-xs mt-1">
                      Status:{" "}
                      <span className="font-semibold">
                        {volunteer.status || "pending"}
                      </span>
                    </p>

                    <div className="flex gap-3 mt-4">
                      <button
                        onClick={() =>
                          handleVolunteerAction(volunteer._id, "accepted")
                        }
                        className="bg-green-500 text-white px-4 py-2 rounded-xl flex items-center gap-2"
                      >
                        <FiCheck />
                        Accept
                      </button>

                      <button
                        onClick={() =>
                          handleVolunteerAction(volunteer._id, "declined")
                        }
                        className="bg-red-500 text-white px-4 py-2 rounded-xl flex items-center gap-2"
                      >
                        <FiTrash2 />
                        Decline
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* CHAT MODAL */}
      {showChatModal && selectedUser && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl p-6 relative flex flex-col max-h-[90vh]">
            {/* CLOSE */}
            <button
              onClick={() => setShowChatModal(false)}
              className="absolute top-4 right-4 text-gray-500"
            >
              <FiX size={22} />
            </button>

            {/* HEADER */}
            <div className="pb-4 mb-4">
              <h2 className="text-2xl font-bold text-blue-600">
                Chat with {selectedUser.name}
              </h2>

              <p className="text-sm text-gray-500">{selectedUser.email}</p>
            </div>

            {/* THREAD */}
            <div className="flex-1 overflow-y-auto space-y-3 pr-2">
              {conversation.length === 0 ? (
                <p className="text-sm text-gray-500">No messages yet</p>
              ) : (
                conversation.map((msg) => {
                  const isAdmin =
                    String(msg.sender?._id || msg.sender) === String(ADMIN_ID);

                  return (
                    <div
                      key={msg._id}
                      className={`flex ${
                        isAdmin ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[80%] p-4 rounded-2xl ${
                          isAdmin ? "bg-blue-500 text-white" : "bg-gray-100"
                        }`}
                      >
                        <p className="text-xs font-bold mb-1 opacity-80">
                          {msg.subject}
                        </p>

                        <p className="text-sm">{msg.content}</p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* INPUT */}
            <div className="border-t pt-4 mt-4">
              <input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Subject"
                className="w-full border rounded-xl p-3 mb-3"
              />

              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                rows={4}
                className="w-full border rounded-xl p-3 mb-3"
              />

              <button
                onClick={handleSend}
                disabled={loading}
                className="bg-gradient-to-r from-blue-500 to-orange-500 text-white px-6 py-3 rounded-xl flex items-center gap-2"
              >
                <FiSend />

                {loading ? "Sending..." : "Send Message"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
