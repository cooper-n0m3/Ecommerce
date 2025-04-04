import { useState, useEffect } from "react";
import { FaUser, FaCode, FaGlobe, FaEnvelope } from "react-icons/fa";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0  left-0 w-full z-50 transition-all  border-gray-500  duration-300 border-opacity-30 ${
        scrolled ? "bg-gray-600/40 backdrop-blur-[5px] border" : "bg-transparent"
      }`}
    >
      <div className="container !text-gray-600 mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 text-white flex items-center justify-center rounded-full">
            KS
          </div>
          <span className="text-lg font-bold text-white">KImsan</span>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex gap-6">
          <NavItem icon={<FaUser />} label="About" />
          <NavItem icon={<FaCode />} label="Experience" />
          <NavItem icon={<FaGlobe />} label="Projects" />
          <NavItem icon={<FaEnvelope />} label="Contact" />
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <button className="px-4 py-2 border border-gray-400 text-white rounded-md">
            Download CV
          </button>
          <button className="px-4 py-2 bg-blue-500 hover:bg-purple-500 text-white rounded-md">
            Contact Me
          </button>
        </div>
      </div>
    </nav>
  );
};

const NavItem = ({ icon, label }) => (
  <a href="#" className="flex items-center gap-2 text-gray-300 hover:text-white transition">
    {icon}
    {label}
  </a>
);

export default Navbar;
