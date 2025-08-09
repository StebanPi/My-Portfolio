import { Card } from "@/components/ui/card";
import { ThemeToggle } from "../utils/ThemeToggle";
import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMobileMenuOpen &&
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  const menuItems = [
    { href: "#inicio", label: "Inicio" },
    { href: "#acerca-de", label: "Acerca de" },
    { href: "#habilidades", label: "Habilidades" },
    { href: "#proyectos", label: "Proyectos" },
    { href: "#contacto", label: "Contacto" },
  ];

  return (
    <div className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50 w-[90%] flex justify-center max-w-6xl">
      <Card className="flex flex-row font-bold justify-between items-center bg-background/70 backdrop-blur-md w-full py-3.5 px-4 sm:px-6 lg:px-8 relative">
        {/* Logo */}
        <h1 className="text-base sm:text-lg lg:text-[19px] whitespace-nowrap flex-shrink-0">
          StebanPi <span className="text-primary">Portfolio</span>
        </h1>

        {/* Desktop Menu */}
        <div className="hidden lg:flex space-x-4 xl:space-x-6 2xl:space-x-8">
          {menuItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="hover:text-primary hover:cursor-pointer transition-colors text-sm xl:text-base whitespace-nowrap"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 flex-shrink-0 relative">
          <ThemeToggle />

          {/* Mobile Menu Button */}
          <button
            ref={buttonRef}
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 hover:bg-accent rounded-md transition-colors"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* Mobile Dropdown Menu */}
          {isMobileMenuOpen && (
            <Card
              ref={menuRef}
              className="absolute top-12 right-0 w-48 bg-background border shadow-lg z-50 text-center"
            >
              <div className="py-2">
                {menuItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="block px-4 py-3 text-sm hover:bg-accent hover:text-primary transition-colors border-b border-border/30 last:border-b-0"
                    onClick={closeMobileMenu}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </Card>
          )}
        </div>
      </Card>
    </div>
  );
};
