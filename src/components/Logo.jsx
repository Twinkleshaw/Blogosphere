import logo from "../assets/logo.png";

function Logo() {
  // Default values
  return (
    <div>
      <img src={logo} alt="Blogosphere Logo" className="w-[200px]" />
    </div>
  );
}

export default Logo;
