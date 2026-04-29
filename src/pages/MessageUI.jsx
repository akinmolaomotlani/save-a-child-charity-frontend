import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import {
  FiSearch,
  FiArrowLeft,
  FiMail,
  FiSend,
  FiTrash2,
  FiStar,
} from "react-icons/fi";

export default function MessageUI() {
  const { id } = useParams();
  const userId = id;

  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [search, setSearch] = useState("");

  const bottomRef = useRef(null);

  /* FETCH */
  const fetchMessages = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/messages/${userId}`);
      const data = await res.json();
      setMessages(data || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [userId]);

  /* KEEP THREAD ACTIVE */
  useEffect(() => {
    if (selectedMessage) {
      const updated = messages.find((m) => m._id === selectedMessage._id);
      if (updated) setSelectedMessage(updated);
    }
  }, [messages]);

  /* AUTO SCROLL */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, selectedMessage]);

  /* SEND REPLY */
  const sendReply = async () => {
    if (!reply.trim() || !selectedMessage) return;

    try {
      setLoading(true);

      const receiverId =
        String(selectedMessage.sender) === String(userId)
          ? selectedMessage.receiver
          : selectedMessage.sender;

      const res = await fetch("http://localhost:5000/api/messages/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sender: userId,
          receiver: receiverId,
          subject: selectedMessage.subject,
          content: reply,
        }),
      });

      const data = await res.json();

      setMessages((prev) => [...prev, data]);
      setReply("");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  /* DELETE */
  const deleteMessage = async (messageId) => {
    if (!window.confirm("Delete this message?")) return;

    try {
      setDeleting(true);

      await fetch(
        `http://save-a-child-charity-backend.onrender.com/api/messages/${messageId}`,
        {
          method: "DELETE",
        },
      );

      setMessages((prev) => prev.filter((msg) => msg._id !== messageId));
    } catch (err) {
      console.log(err);
    } finally {
      setDeleting(false);
    }
  };

  const formatTime = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleString([], {
      hour: "2-digit",
      minute: "2-digit",
      day: "numeric",
      month: "short",
    });
  };

  /* SEARCH */
  const filteredMessages = messages.filter(
    (msg) =>
      msg.subject?.toLowerCase().includes(search.toLowerCase()) ||
      msg.content?.toLowerCase().includes(search.toLowerCase()) ||
      msg.senderName?.toLowerCase().includes(search.toLowerCase()),
  );

  /* THREAD */
  const threadMessages = selectedMessage
    ? messages.filter((msg) => msg.subject === selectedMessage.subject)
    : [];

  return (
    <div className="h-screen flex bg-gradient-to-br from-orange-50 via-white to-blue-50 text-gray-800 overflow-hidden">
      {/* LEFT MENU */}
      <div className="hidden md:flex w-20 bg-white/90 shadow-2xl flex-col items-center py-6 gap-6">
        <div className="p-3 rounded-2xl bg-gradient-to-r from-orange-500 to-blue-500 text-white">
          <FiMail size={20} />
        </div>

        <div className="p-3 rounded-2xl bg-orange-50 text-orange-500">
          <FiSend size={20} />
        </div>

        <div className="p-3 rounded-2xl bg-yellow-50 text-yellow-500">
          <FiStar size={20} />
        </div>

        <div className="p-3 rounded-2xl bg-red-50 text-red-500">
          <FiTrash2 size={20} />
        </div>
      </div>

      {/* MESSAGE LIST */}
      <div
        className={`${
          selectedMessage ? "hidden md:flex" : "flex"
        } w-full md:w-[390px] bg-white/90 flex-col shadow-xl`}
      >
        <div className="p-5 border-b border-gray-100">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-blue-600 bg-clip-text text-transparent">
            Inbox
          </h2>

          <div className="mt-4 flex items-center bg-gradient-to-r from-orange-50 to-blue-50 rounded-2xl px-4 py-3">
            <FiSearch className="text-gray-400" />

            <input
              type="text"
              placeholder="Search messages..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent outline-none ml-3 w-full text-sm"
            />
          </div>
        </div>

        <div className="overflow-y-auto flex-1 p-3 space-y-3">
          {filteredMessages.map((msg) => (
            <div
              key={msg._id}
              onClick={() => setSelectedMessage(msg)}
              className={`cursor-pointer rounded-3xl p-4 transition shadow-sm ${
                selectedMessage?._id === msg._id
                  ? "bg-gradient-to-r from-orange-500 to-blue-500 text-white"
                  : "bg-gradient-to-r from-orange-50 to-blue-50"
              }`}
            >
              <div className="flex justify-between">
                <p className="font-semibold text-sm">
                  {msg.senderName || "Admin"}
                </p>

                <span className="text-xs opacity-80">
                  {formatTime(msg.createdAt)}
                </span>
              </div>

              <p className="font-medium mt-2 truncate">
                {msg.subject || "(No Subject)"}
              </p>

              <p className="text-xs opacity-80 truncate mt-1">{msg.content}</p>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div
        className={`flex-1 flex-col ${
          selectedMessage ? "flex" : "hidden md:flex"
        }`}
      >
        {selectedMessage ? (
          <>
            {/* TOP */}
            <div className="bg-white shadow px-4 md:px-6 py-5 flex items-center gap-4">
              <button
                onClick={() => setSelectedMessage(null)}
                className="md:hidden"
              >
                <FiArrowLeft size={20} />
              </button>

              <div className="flex-1 min-w-0">
                <h2 className="text-lg md:text-2xl font-bold truncate">
                  {selectedMessage.subject}
                </h2>
              </div>

              <button
                onClick={() => deleteMessage(selectedMessage._id)}
                disabled={deleting}
                className="p-3 rounded-2xl bg-red-50 text-red-500"
              >
                <FiTrash2 />
              </button>
            </div>

            {/* THREAD */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
              {threadMessages.map((msg) => {
                const isUser = String(msg.sender) === String(userId);

                return (
                  <div
                    key={msg._id}
                    className={`flex ${
                      isUser ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`rounded-3xl p-4 md:p-5 shadow max-w-[85%] md:max-w-[70%] ${
                        isUser ? "bg-blue-50" : "bg-orange-50"
                      }`}
                    >
                      <div className="flex justify-between gap-3 mb-2">
                        <p className="font-semibold text-sm">
                          {isUser
                            ? msg.senderName || "You"
                            : msg.senderName || "Admin"}
                        </p>

                        <span className="text-xs text-gray-400 whitespace-nowrap">
                          {formatTime(msg.createdAt)}
                        </span>
                      </div>

                      <p className="break-words">{msg.content}</p>
                    </div>
                  </div>
                );
              })}

              <div ref={bottomRef}></div>
            </div>

            {/* REPLY */}
            <div className="bg-white border-t p-4 md:p-5">
              <textarea
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                placeholder="Write your reply..."
                className="w-full h-28 md:h-32 rounded-2xl p-4 bg-blue-50 resize-none outline-none"
              />

              <div className="flex justify-end mt-4">
                <button
                  onClick={sendReply}
                  disabled={loading}
                  className="bg-gradient-to-r from-orange-500 to-blue-500 text-white px-6 md:px-8 py-3 rounded-2xl font-semibold"
                >
                  {loading ? "Sending..." : "Send Reply"}
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="hidden md:flex items-center justify-center h-full">
            <h2 className="text-3xl font-bold text-gray-400">
              Select a Message
            </h2>
          </div>
        )}
      </div>
    </div>
  );
}
