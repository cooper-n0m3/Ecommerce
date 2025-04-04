import { useRef } from "react";
import { FaUser, FaCode, FaGlobe, FaEnvelope } from "react-icons/fa";

const Navbar = () => {
  const aboutRef = useRef(null);
  const experienceRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-gray-900/80 backdrop-blur-md shadow-lg">
        <div className="container mx-auto flex items-center justify-between p-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 text-white flex items-center justify-center rounded-full">
              YP
            </div>
            <span className="text-lg font-bold text-white">YEAN PONLEUR</span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex gap-6">
            <button onClick={() => scrollToSection(aboutRef)} className="nav-item">
              <FaUser /> About
            </button>
            <button onClick={() => scrollToSection(experienceRef)} className="nav-item">
              <FaCode /> Experience
            </button>
            <button onClick={() => scrollToSection(projectsRef)} className="nav-item">
              <FaGlobe /> Projects
            </button>
            <button onClick={() => scrollToSection(contactRef)} className="nav-item">
              <FaEnvelope /> Contact
            </button>
          </div>
        </div>
      </nav>

      {/* Sections */}
      <div className="mt-20 p-10 space-y-20">
        <section ref={aboutRef} className="h-screen flex justify-center items-center bg-gray-800 text-white">
          <h1 className="text-4xl">About Me</h1>
        </section>
        <section ref={experienceRef} className="h-screen flex justify-center items-center bg-gray-700 text-white">
          <h1 className="text-4xl">Experience</h1>
        </section>
        <section ref={projectsRef} className="h-screen flex justify-center items-center bg-gray-600 text-white">
          <h1 className="text-4xl">Projects</h1>
        </section>
        <section ref={contactRef} className="h-screen flex justify-center items-center bg-gray-500 text-white">
          <h1 className="text-4xl">Contact</h1>
        </section>
      </div>
    </div>
  );
};

export default Navbar;
