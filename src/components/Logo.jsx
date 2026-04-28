import logo from "../images/logo.png";

export default function Logo() {
  return (
    <img
      src={logo}
      alt="Logo"
      className="
    h-16 w-auto object-contain   
    sm:h-20                     
    md:h-24                     
    lg:h-28                     
    xl:h-32                 
  "
    />
  );
}
