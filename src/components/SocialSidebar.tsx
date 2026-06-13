import React from "react";
import { motion } from "motion/react";

interface SocialLinkProps {
  key?: React.Key;
  name: string;
  href: string;
  icon: React.ReactNode;
  brandColor: string;
}

function SocialButton({ name, href, icon, brandColor }: SocialLinkProps) {
  // Generar clases específicas de hover para cada red social según el diseño
  let hoverClass = "hover:bg-[#25D366]";
  if (name.toLowerCase() === "instagram") {
    hoverClass = "hover:bg-gradient-to-tr hover:from-[#f9ce34] hover:via-[#ee2a7b] hover:to-[#6228d7]";
  } else if (name.toLowerCase() === "tiktok") {
    hoverClass = "hover:bg-black";
  } else if (name.toLowerCase() === "facebook") {
    hoverClass = "hover:bg-[#1877F2]";
  }

  return (
    <div className="relative group flex items-center justify-end">
      {/* Tooltip con fondo tech-orange y texto mono en mayúsculas estilo Sophisticated Dark */}
      <span className="absolute right-full mr-4 bg-tech-orange text-white text-[10px] py-1 px-2.5 rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-300 shadow-xl whitespace-nowrap font-mono tracking-widest leading-none">
        {name.toUpperCase()}
      </span>
      
      <a
        id={`social_link_${name.toLowerCase()}`}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`w-10 h-10 rounded-full bg-dark-neutral border border-tech-gray/30 flex items-center justify-center text-white transition-all duration-300 shadow-md ${hoverClass}`}
      >
        {icon}
      </a>
    </div>
  );
}

export default function SocialSidebar() {
  const socials = [
    {
      name: "WhatsApp",
      href: "https://wa.me/593987584344?text=Hola%20IMSUB%20M%26M%2C%0A%0AEstoy%20buscando%20soluciones%20de%20etiquetado%20t%C3%A9rmico%20para%20mi%20empresa%20y%20me%20gustar%C3%ADa%20conocer%20m%C3%A1s%20sobre%20sus%20productos%20y%20servicios.%20%C2%BFPodr%C3%ADan%20brindarme%20informaci%C3%B3n%20sobre%20sus%20etiquetas%20t%C3%A9rmicas%2C%20opciones%20de%20personalizaci%C3%B3n%2C%20costos%20y%20asesor%C3%ADa%20para%20proyectos%3F",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.454 5.709 1.455h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      ),
      brandColor: "#25D366"
    },
    {
      name: "Facebook",
      href: "https://www.facebook.com/profile.php?id=61590546159194",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
      brandColor: "#1877F2"
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/imsub_mym1995/",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.071 3.253.147 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
        </svg>
      ),
      brandColor: "#E1306C"
    },
    {
      name: "TikTok",
      href: "https://www.tiktok.com/@imsubmym",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .8.11v-3.5a6.44 6.44 0 0 0-4.75 6.22 6.34 6.34 0 0 0 10.86 4.43 6.66 6.66 0 0 0 1.83-4.51V8a8.27 8.27 0 0 0 5.54 1.9V6.4a4.83 4.83 0 0 1-3.92-1.71z"/>
        </svg>
      ),
      brandColor: "#010101"
    }
  ];

  return (
    <>
      {/* Vista de escritorio - Barra vertical a la derecha */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 1.5, type: "spring", stiffness: 100, damping: 20 }}
        className="hidden md:flex fixed right-6 top-1/2 -translate-y-1/2 flex-col gap-4 z-40"
      >
        {socials.map((social) => (
          <SocialButton
            key={social.name}
            name={social.name}
            href={social.href}
            icon={social.icon}
            brandColor={social.brandColor}
          />
        ))}
      </motion.div>

      {/* Vista móvil - Panel inferior horizontal de acceso rápido */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.5 }}
        className="flex md:hidden fixed bottom-6 right-6 gap-3 z-40 items-center bg-dark-neutral/90 backdrop-blur border border-tech-gray/20 p-2.5 rounded-full shadow-2xl"
      >
        {socials.map((social) => (
          <a
            key={social.name}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full flex items-center justify-center text-white transition-transform active:scale-90"
            style={{ backgroundColor: social.brandColor }}
          >
            {social.icon}
          </a>
        ))}
      </motion.div>
    </>
  );
}
