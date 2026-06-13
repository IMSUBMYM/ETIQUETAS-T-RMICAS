import { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Check } from "lucide-react";
import { Producto } from "../types";

interface ModalProductoProps {
  producto: Producto | null;
  onClose: () => void;
  onCotizar: (proyName: string) => void;
}

export default function ModalProducto({ producto, onClose, onCotizar }: ModalProductoProps) {
  
  // Cerrar el modal al presionar Esc
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (producto) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden"; // Desactivar scroll global
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset"; // Reactivar scroll global
    };
  }, [producto, onClose]);

  return (
    <AnimatePresence>
      {producto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Fondo desenfocado */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.85 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-dark-neutral/95 backdrop-blur-md"
          />

          {/* Caja del Modal */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 30 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className="relative w-full max-w-4xl bg-industrial-blue/95 border border-tech-orange/20 rounded-xl overflow-hidden shadow-2xl z-10 flex flex-col md:flex-row"
          >
            {/* Foto Lateral */}
            <div className="md:w-5/12 relative h-48 md:h-auto min-h-[250px] bg-dark-neutral">
              <img
                src={producto.imagen}
                alt={producto.nombre}
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover opacity-85 hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-industrial-blue/90 via-transparent to-transparent md:to-industrial-blue/20" />
              <div className="absolute bottom-6 left-6 z-10">
                <span className="font-mono text-xs text-tech-orange uppercase tracking-widest bg-dark-neutral/80 px-2 py-1 rounded">
                  Línea {producto.numero}
                </span>
                <h3 className="font-display text-2xl font-bold text-white mt-2 leading-tight">
                  {producto.nombre}
                </h3>
              </div>
            </div>

            {/* Contenido Técnico */}
            <div className="md:w-7/12 p-6 md:p-8 flex flex-col justify-between max-h-[85vh] overflow-y-auto">
              
              {/* Botón de Cerrar */}
              <button
                id="close_product_modal"
                onClick={onClose}
                className="absolute top-4 right-4 text-tech-gray hover:text-tech-orange bg-dark-neutral/55 p-2 rounded-full transition-colors border border-tech-gray/15 cursor-pointer"
                aria-label="Cerrar modal"
              >
                <X size={18} />
              </button>

              <div className="pr-4">
                <h4 className="font-mono text-xs tracking-widest text-tech-orange uppercase mb-2">
                  Especificación Técnica
                </h4>
                <p className="text-sm text-gray-200 font-sans leading-relaxed mb-6">
                  {producto.descripcionCompleta}
                </p>

                {/* Grid de Materiales y Aplicaciones */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h5 className="font-display text-sm font-semibold text-white border-b border-tech-gray/25 pb-2 mb-3">
                      Sustratos y Materiales
                    </h5>
                    <ul className="space-y-2">
                      {producto.materiales.map((mat, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-gray-300 font-sans">
                          <Check size={14} className="text-tech-orange shrink-0 mt-0.5" />
                          <span>{mat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h5 className="font-display text-sm font-semibold text-white border-b border-tech-gray/25 pb-2 mb-3">
                      Aplicaciones Clave
                    </h5>
                    <ul className="space-y-2">
                      {producto.aplicaciones.map((app, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-gray-300 font-sans">
                          <Check size={14} className="text-tech-orange shrink-0 mt-0.5" />
                          <span>{app}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Botón de Cotización */}
              <div className="border-t border-tech-gray/15 pt-5 mt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs text-tech-gray font-mono">
                  Quito, Ecuador · Control y Trazabilidad
                </p>
                <button
                  id="modal_quote_bttn"
                  onClick={() => onCotizar(producto.nombre)}
                  className="w-full sm:w-auto bg-tech-orange hover:bg-tech-orange/95 active:scale-95 text-dark-neutral font-display font-semibold text-xs px-6 py-3 rounded uppercase tracking-wider transition-all duration-300 shadow-lg cursor-pointer"
                >
                  Cotizar este Producto
                </button>
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
