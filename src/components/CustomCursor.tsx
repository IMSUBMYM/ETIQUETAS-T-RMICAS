import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 35, stiffness: 350, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Agregar eventos de hover a elementos interactivos
    const addHoverListeners = () => {
      const interactives = document.querySelectorAll(
        'a, button, select, input, textarea, [role="button"], .interactive-card'
      );
      interactives.forEach((el) => {
        el.addEventListener("mouseenter", () => setIsHovered(true));
        el.addEventListener("mouseleave", () => setIsHovered(false));
      });
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    
    // Configurar listeners de hover iniciales y con un intervalo para capturar cambios dinámicos en el DOM
    addHoverListeners();
    const interval = setInterval(addHoverListeners, 1000);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      clearInterval(interval);
    };
  }, [cursorX, cursorY, isVisible]);

  // En dispositivos móviles (que usan touch), no renderizamos el cursor personalizado para evitar parpadeos
  if (typeof window !== "undefined" && "ontouchstart" in window) {
    return null;
  }

  return (
    <motion.div
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        translateX: "-50%",
        translateY: "-50%",
      }}
      animate={{
        scale: isHovered ? 2.5 : 1,
        backgroundColor: isHovered ? "rgba(242, 140, 40, 0.15)" : "#F28C28",
        border: isHovered ? "1.5px solid #F28C28" : "none",
      }}
      transition={{ type: "smooth", duration: 0.15 }}
      className={`fixed top-0 left-0 w-3 h-3 rounded-full pointer-events-none z-50 transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    />
  );
}
