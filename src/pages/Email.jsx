import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FiMail, FiSearch, FiArrowLeft } from "react-icons/fi";

export default function EmailUI() {
  const { id: userId } = useParams();

  const [emails, setEmails] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  /* FETCH EMAILS */
  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/messages/${userId}`
        );
        const data = await res.json();

        setEmails(data.messages || []);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchEmails();
  }, [userId]);

  /* AUTO SELECT FIRST EMAIL */
  useEffect(() => {
    if (emails.length > 0 && !selectedEmail) {
      setSelectedEmail(emails[0]);
    }
  }, [emails]);

  /* SEARCH FILTER */
  const filteredEmails = emails.filter(
    (mail) =>
      mail.subject?.toLowerCase().includes(search.toLowerCase()) ||
      mail.senderEmail?.toLowerCase().includes(search.toLowerCase()) ||
      mail.receiverEmail?.toLowerCase().includes(search.toLowerCase())
  );

  /* FORMAT DATE */
  const formatDate = (date) =>
    new Date(date).toLocaleString([], {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div className="h-screen flex bg-gray-100">
      {/* SIDEBAR (DESKTOP) */}
      <div className="hidden md:flex w-[320px] bg-white border-r flex-col">
        {/* HEADER */}
        <div className="p-5 border-b">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <FiMail /> Inbox
          </h2>

          <div className="mt-4 flex items-center bg-gray-100 rounded-lg px-3 py-2">
            <FiSearch className="text-gray-400" />
            <input
              type="text"
              placeholder="Search mail..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent outline-none ml-2 w-full text-sm"
            />
          </div>
        </div>

        {/* EMAIL LIST */}
        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <p className="text-center mt-10 text-gray-400">Loading...</p>
          ) : filteredEmails.length === 0 ? (
            <p className="text-center mt-10 text-gray-400">
              No emails found
            </p>
          ) : (
            filteredEmails.map((mail) => (
              <div
                key={mail._id}
                onClick={() => setSelectedEmail(mail)}
                className={`p-4 border-b cursor-pointer transition ${
                  selectedEmail?._id === mail._id
                    ? "bg-blue-50"
                    : "hover:bg-gray-50"
                }`}
              >
                <p className="text-sm font-semibold truncate">
                  {mail.senderEmail}
                </p>

                <p className="text-sm font-medium truncate">
                  {mail.subject || "(No Subject)"}
                </p>

                <p className="text-xs text-gray-500 truncate">
                  {mail.content}
                </p>

                <span className="text-xs text-gray-400">
                  {formatDate(mail.createdAt)}
                </span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* MAIN PANEL */}
      <div className="flex-1 flex flex-col">
        {/* MOBILE HEADER */}
        <div className="md:hidden bg-white p-4 shadow flex items-center gap-3">
          {selectedEmail && (
            <button onClick={() => setSelectedEmail(null)}>
              <FiArrowLeft size={20} />
            </button>
          )}
          <h2 className="font-semibold">Inbox</h2>
        </div>

        {/* MOBILE LIST */}
        {!selectedEmail && (
          <div className="md:hidden flex-1 overflow-y-auto">
            {filteredEmails.map((mail) => (
              <div
                key={mail._id}
                onClick={() => setSelectedEmail(mail)}
                className="p-4 border-b"
              >
                <p className="font-semibold">{mail.senderEmail}</p>
                <p className="text-sm">{mail.subject}</p>
              </div>
            ))}
          </div>
        )}

        {/* EMAIL VIEW */}
        {selectedEmail ? (
          <div className="flex-1 flex flex-col bg-white">
            {/* HEADER */}
            <div className="p-5 border-b">
              <h2 className="text-xl font-bold">
                {selectedEmail.subject}
              </h2>

              <div className="mt-3 text-sm text-gray-600">
                <p>
                  <strong>From:</strong> {selectedEmail.senderEmail}
                </p>
                <p>
                  <strong>To:</strong> {selectedEmail.receiverEmail}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {formatDate(selectedEmail.createdAt)}
                </p>
              </div>
            </div>

            {/* BODY */}
            <div className="flex-1 p-5 overflow-y-auto whitespace-pre-wrap text-gray-700">
              {selectedEmail.content}
            </div>
          </div>
        ) : (
          <div className="hidden md:flex flex-1 items-center justify-center text-gray-400">
            Select an email
          </div>
        )}
      </div>
    </div>
  );
}