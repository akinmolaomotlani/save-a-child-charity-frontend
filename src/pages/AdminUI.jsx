import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
  FiChevronDown,
} from "react-icons/fi";

export default function AdminDashboard() {
  // ✅ NAVIGATE
  const navigate = useNavigate();

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

  const [adminMessages, setAdminMessages] = useState([]);

  const [showMessageDropdown, setShowMessageDropdown] = useState(false);

  const [unreadCount, setUnreadCount] = useState(0);

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalMessages: 0,
    totalVolunteers: 0,
  });

  // ✅ ADMIN ID
  const ADMIN_ID = localStorage.getItem("adminId");

  // ✅ LOGOUT FUNCTION
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("adminId");

    navigate("/");
  };

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

  // ✅ FETCH ADMIN MESSAGES
  const fetchAdminMessages = async () => {
    try {
      const res = await fetch(`${API_URL}/messages/${ADMIN_ID}`);

      const data = await res.json();

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

  // ✅ OPEN MESSAGE
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

      const existingThreadId =
        conversation.length > 0 ? conversation[0].threadId : null;

      const payload = {
        sender: ADMIN_ID,
        receiver: selectedUser._id,
        subject: subject || "No Subject",
        content: message,
        threadId: existingThreadId,
      };

      const res = await fetch(`${API_URL}/messages/send`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!data.success) {
        alert(data.message || "Failed to send");
        return;
      }

      setConversation((prev) => [...prev, data.message]);

      setMessage("");

      await fetchConversation(selectedUser._id);

      fetchAdminMessages();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ VOLUNTEER ACTION
  const handleVolunteerAction = async (id, status) => {
    try {
      await fetch(`${API_URL}/volunteers/${id}`, {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ status }),
      });

      fetchVolunteers();
    } catch (err) {
      console.log(err);
    }
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

        {/* LOGOUT BUTTON */}
        <button
          onClick={handleLogout}
          className="mt-10 w-full bg-gradient-to-r from-red-500 to-orange-500 text-white py-3 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition"
        >
          <FiLogOut />
          Logout
        </button>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-4 md:p-8">
        <div className="flex justify-between items-center mb-8">
          <FiMenu
            className="text-2xl cursor-pointer md:hidden"
            onClick={() => setSidebarOpen(true)}
          />

          <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
        </div>
      </div>
    </div>
  );
}
