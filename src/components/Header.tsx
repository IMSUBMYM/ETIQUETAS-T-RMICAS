import React, { useState, useEffect } from "react";
import { Menu, X, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("");

  const navigationItems = [
    { label: "PRODUCTOS", targetId: "productos" },
    { label: "FLEXOGRAFÍA", targetId: "flexografia" },
    { label: "INDUSTRIAS", targetId: "industrias" },
    { label: "TECNOLOGÍA", targetId: "tecnologia" },
    { label: "CONTACTO", targetId: "contacto" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Detectar sección activa en base al offset del scroll
      for (const item of navigationItems) {
        const el = document.getElementById(item.targetId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveTab(item.targetId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (targetId: string, e: React.MouseEvent) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-350 ${
          isScrolled
            ? "bg-industrial-blue/95 backdrop-blur-md border-b border-tech-gray/25 py-3.5 shadow-lg shadow-black/20"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          
          {/* Logo */}
          <a
            id="header_logo"
            href="#hero"
            onClick={(e) => handleNavClick("hero", e)}
            className="flex flex-col select-none group"
          >
            <div className="flex items-baseline gap-1">
              <span className="font-display text-xl md:text-2xl font-bold tracking-tighter text-white">
                IMSUB M&M
              </span>
              <div className="w-1.5 h-1.5 bg-tech-orange rounded-full group-hover:scale-125 transition-transform" />
            </div>
            <span className="font-mono text-[8px] sm:text-[9px] tracking-[0.3em] text-tech-gray lowercase font-bold uppercase">
              IDENTIFICACIÓN INDUSTRIAL
            </span>
          </a>

          {/* Menú de Navegación Escritorio */}
          <nav className="hidden lg:flex items-center gap-8">
            {navigationItems.map((item) => (
              <a
                key={item.targetId}
                href={`#${item.targetId}`}
                onClick={(e) => handleNavClick(item.targetId, e)}
                className={`text-[11px] font-bold tracking-[0.2em] relative pb-1 hover:text-tech-orange transition-colors uppercase ${
                  activeTab === item.targetId
                    ? "text-tech-orange"
                    : "text-tech-gray"
                }`}
              >
                {item.label}
                {activeTab === item.targetId && (
                  <motion.div
                    layoutId="activeUnderline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-tech-orange"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </nav>

          {/* Acciones del Header Escritorio */}
          <div className="hidden lg:flex items-center gap-6">
            <div className="text-right">
              <p className="text-[10px] font-mono text-tech-gray uppercase tracking-wider">Base de Operaciones</p>
              <p className="text-xs font-semibold text-white">Quito, Ecuador</p>
            </div>
            <a
              id="header_cta_solicitar_cotizacion"
              href="#contacto"
              onClick={(e) => handleNavClick("contacto", e)}
              className="bg-tech-orange hover:bg-brand-white hover:text-industrial-blue active:scale-95 text-industrial-blue font-bold text-[11px] tracking-widest px-6 py-3 rounded-sm transition-all shadow-lg cursor-pointer uppercase"
            >
              SOLICITAR COTIZACIÓN
            </a>
          </div>

          {/* Hamburguesa en móviles */}
          <button
            id="mobile_hamburger_bttn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex lg:hidden text-white p-1 hover:text-tech-orange transition-colors cursor-pointer"
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

        </div>
      </header>

      {/* Menú Celular Deslizante */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 top-[60px] bg-dark-neutral/95 backdrop-blur-md z-40 lg:hidden flex flex-col justify-between p-8 border-t border-tech-gray/10"
          >
            <div className="flex flex-col gap-6 mt-4">
              {navigationItems.map((item) => (
                <a
                  key={item.targetId}
                  href={`#${item.targetId}`}
                  onClick={(e) => handleNavClick(item.targetId, e)}
                  className={`font-display text-lg font-bold tracking-widest relative self-start transition-colors ${
                    activeTab === item.targetId ? "text-tech-orange" : "text-white"
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </div>

            <div className="border-t border-tech-gray/10 pt-6 flex flex-col gap-4">
              <div className="flex items-center gap-2 text-tech-gray font-mono text-xs">
                <MapPin size={14} className="text-tech-orange" />
                <span>Quito, Ecuador — Sector La Carolina</span>
              </div>
              <a
                id="mobile_header_cta"
                href="#contacto"
                onClick={(e) => handleNavClick("contacto", e)}
                className="w-full text-center bg-tech-orange hover:bg-tech-orange/95 text-dark-neutral font-display font-medium text-xs py-3 rounded tracking-widest uppercase transition-all shadow-md"
              >
                SOLICITAR COTIZACIÓN
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
