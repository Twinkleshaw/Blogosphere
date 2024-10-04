import { useState } from "react";
import { Container, Logo, LogoutBtn } from "../index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="py-3 shadow bg-indigo-900 text-white fixed z-50 w-full">
      <Container>
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <div className="mr-4">
            <Link>
              <Logo width="70px" />
            </Link>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex ml-auto">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name} className="mx-4">
                  <button
                    onClick={() => navigate(item.slug)}
                    className="inline-bock md:px-6 py-2 duration-200 hover:bg-blue-100 hover:text-black rounded-full lg:text-xl md:text-lg"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li className="hover:text-black lg:text-xl md:text-lg">
                <LogoutBtn />
              </li>
            )}
          </ul>

          {/* Mobile Menu Icon */}
          <div className="md:hidden">
            <button onClick={toggleMobileMenu} className="text-4xl">
              &#8801; {/* Menu Icon */}
            </button>
          </div>
        </nav>

        {/* Mobile Sidebar */}
        <div
          className={`fixed top-0 right-0 w-64 h-full bg-indigo-800 z-50 transition-transform transform ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex justify-between items-center px-4 py-4 bg-indigo-700">
            <span className="text-white text-xl font-semibold">Menu</span>
            <button className="text-2xl text-white" onClick={toggleMobileMenu}>
              &#10005; {/* Close Icon */}
            </button>
          </div>
          <ul className="flex flex-col p-4 space-y-4">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => {
                      navigate(item.slug);
                      toggleMobileMenu(); // Close the menu after navigation
                    }}
                    className="block px-4 py-2 duration-200 hover:bg-blue-100 hover:text-black rounded-full text-lg text-white"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li className="hover:text-black text-lg">
                <LogoutBtn onClick={toggleMobileMenu} />
              </li>
            )}
          </ul>
        </div>
      </Container>
    </header>
  );
}

export default Header;
