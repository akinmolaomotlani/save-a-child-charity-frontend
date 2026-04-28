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

  const savedUser = user || JSON.parse(localStorage.getItem("user") || "{}");
  const userId = savedUser?.id || savedUser?._id;

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showMessageDropdown, setShowMessageDropdown] = useState(false);
  const [messages, setMessages] = useState([]);

  const dropdownRef = useRef(null);

  const [campaigns] = useState([
    { id: 1, title: "Feed 100 Children", progress: 70 },
    { id: 2, title: "Clean Water Project", progress: 40 },
    { id: 3, title: "School Supplies Drive", progress: 85 },
  ]);

  const [activities] = useState([
    { id: 1, text: "You donated to Feed 100 Children", time: "2h ago" },
    { id: 2, text: "New campaign launched", time: "5h ago" },
    { id: 3, text: "Volunteer event coming soon", time: "1 day ago" },
  ]);

  // ✅ Fetch messages safely
  const fetchMessages = async () => {
    if (!userId) return;

    try {
      const res = await fetch(
        `http://localhost:5000/api/messages/unread/${userId}`,
      );

      const data = await res.json();

      setMessages(Array.isArray(data) ? data : data.messages || []);
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ Mark messages as read
  const markAsRead = async () => {
    try {
      await fetch(`http://localhost:5000/api/messages/read/${userId}`, {
        method: "PUT",
      });

      setMessages([]);
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ Navigate to messages page (NO duplicate markAsRead here)
  const handleOpenMessages = () => {
    setShowMessageDropdown(false);
    navigate(`/messages/${userId}`);
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 5000);
    return () => clearInterval(interval);
  }, [userId]);

  // ✅ Better outside click handling
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowMessageDropdown(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout?.();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const getInitials = () => {
    if (!savedUser?.name) return "U";

    return savedUser.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50 flex">
      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed md:static top-0 left-0 h-full w-72 bg-white/90 backdrop-blur-xl shadow-2xl p-6 z-50 transform transition-all duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-blue-600 bg-clip-text text-transparent">
              Save The Child
            </h2>
            <p className="text-sm text-gray-500">User Dashboard</p>
          </div>

          <FiX
            className="text-xl cursor-pointer md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        </div>

        <div className="space-y-3">
          {["Dashboard", "Donations", "Campaigns", "Volunteers"].map((item) => (
            <button
              key={item}
              className="w-full text-left px-4 py-3 rounded-2xl font-medium text-gray-700 hover:bg-gradient-to-r hover:from-orange-500 hover:to-blue-500 hover:text-white transition"
            >
              {item}
            </button>
          ))}
        </div>

        <button
          onClick={handleLogout}
          className="mt-12 w-full bg-gradient-to-r from-orange-500 to-blue-500 text-white py-3 rounded-2xl font-semibold shadow-lg hover:opacity-90"
        >
          Logout
        </button>
      </div>

      {/* Main */}
      <div className="flex-1 p-4 md:p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <FiMenu
              className="text-2xl cursor-pointer md:hidden"
              onClick={() => setSidebarOpen(true)}
            />

            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-blue-600 bg-clip-text text-transparent">
                Dashboard
              </h1>
              <p className="text-sm text-gray-500">
                Welcome back, {savedUser?.name || "User"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 relative" ref={dropdownRef}>
            {/* Inbox */}
            <div className="relative">
              <button
                onClick={async () => {
                  const isOpening = !showMessageDropdown;
                  setShowMessageDropdown(isOpening);

                  if (isOpening) {
                    await markAsRead();
                  }
                }}
                className="bg-white p-3 rounded-2xl shadow"
              >
                <FiInbox className="text-xl" />
              </button>

              {messages.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-500 to-blue-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {messages.length}
                </span>
              )}

              {showMessageDropdown && (
                <div className="absolute right-0 mt-3 w-80 bg-white rounded-3xl shadow-2xl p-4 z-50">
                  <div className="flex justify-between mb-3">
                    <h3 className="font-bold text-blue-600">Inbox</h3>

                    <button
                      onClick={handleOpenMessages}
                      className="text-sm text-orange-500 font-medium"
                    >
                      View all
                    </button>
                  </div>

                  <div className="space-y-3 max-h-72 overflow-y-auto">
                    {messages.length === 0 ? (
                      <p className="text-sm text-gray-500">No messages yet</p>
                    ) : (
                      messages.slice(0, 5).map((msg) => (
                        <div
                          key={msg._id}
                          onClick={handleOpenMessages}
                          className="p-3 rounded-2xl bg-gradient-to-r from-orange-50 to-blue-50 cursor-pointer"
                        >
                          <p className="font-semibold text-sm">
                            {msg.senderName || "Admin"}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {msg.content}
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Bell */}
            <button className="bg-white p-3 rounded-2xl shadow">
              <FiBell className="text-xl" />
            </button>

            {/* Avatar */}
            <div className="w-11 h-11 rounded-full bg-gradient-to-r from-orange-500 to-blue-500 text-white flex items-center justify-center font-bold shadow-lg">
              {getInitials()}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-3xl p-6 shadow-xl flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-orange-100">
              <FiHeart className="text-orange-500 text-xl" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Total Donations</p>
              <h3 className="text-2xl font-bold">$12,450</h3>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-xl flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-green-100">
              <FiActivity className="text-green-500 text-xl" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Active Campaigns</p>
              <h3 className="text-2xl font-bold">8</h3>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-xl flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-blue-100">
              <FiUsers className="text-blue-500 text-xl" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Volunteers</p>
              <h3 className="text-2xl font-bold">120</h3>
            </div>
          </div>
        </div>

        {/* Campaigns */}
        <div className="bg-white rounded-3xl p-6 shadow-xl mb-8">
          <h2 className="text-xl font-bold text-blue-600 mb-5">
            Active Campaigns
          </h2>

          <div className="grid md:grid-cols-3 gap-5">
            {campaigns.map((c) => (
              <div
                key={c.id}
                className="p-5 rounded-3xl bg-gradient-to-r from-orange-50 to-blue-50 hover:shadow-md transition"
              >
                <h3 className="font-semibold mb-3">{c.title}</h3>

                <div className="w-full h-3 bg-white rounded-full overflow-hidden">
                  <div
                    className="h-3 bg-gradient-to-r from-orange-500 to-blue-500 rounded-full"
                    style={{ width: `${c.progress}%` }}
                  />
                </div>

                <p className="text-sm text-gray-500 mt-2">
                  {c.progress}% funded
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Activity */}
        <div className="bg-white rounded-3xl p-6 shadow-xl">
          <h2 className="text-xl font-bold text-blue-600 mb-5">
            Recent Activity
          </h2>

          <div className="space-y-3">
            {activities.map((a) => (
              <div
                key={a.id}
                className="flex justify-between items-center p-4 rounded-2xl bg-gradient-to-r from-orange-50 to-blue-50"
              >
                <span>{a.text}</span>
                <span className="text-sm text-gray-500">{a.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
