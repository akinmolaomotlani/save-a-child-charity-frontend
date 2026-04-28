import { useNavigate } from "react-router-dom";

export default function ContactBtn() {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate("/donate")}
      className="bg-[#F37021] text-white px-5 py-3 rounded-lg hover:bg-[#fbd4bc] transition cursor-pointer "
    >
      DONATE
    </button>
  );
}
