import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Boxes,
  Database,
  FlaskConical,
  Apple,
  Truck,
  LayoutGrid,
  Factory,
  ShoppingBag,
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  X,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Cpu,
  ShieldCheck,
  Layers,
  QrCode
} from "lucide-react";

// Componentes modulares importados
import Header from "./components/Header";
import CustomCursor from "./components/CustomCursor";
import SocialSidebar from "./components/SocialSidebar";
import ModalProducto from "./components/ModalProducto";
import BarcodeAnimator from "./components/BarcodeAnimator";
import ContadorAnimado from "./components/ContadorAnimado";

// Datos compartidos
import { PRODUCTOS, INDUSTRIAS, SPECS_TECNOLOGIA, GALERIA_IMAGENES } from "./data";
import { Producto, ContactoForm } from "./types";

// Ticker horizontal interactivo
function Ticker() {
  const palabras = [
    "ETIQUETAS TÉRMICAS",
    "FLEXOGRAFÍA",
    "TRAZABILIDAD",
    "LOGÍSTICA",
    "ALMACENES",
    "LABORATORIOS",
    "INVENTARIOS",
    "PRODUCCIÓN",
    "CODIFICACIÓN",
    "IDENTIFICACIÓN INDUSTRIAL"
  ];
  
  const originalItems = [...palabras, ...palabras, ...palabras, ...palabras]; // Loop continuo

  return (
    <div className="w-full overflow-hidden bg-tech-orange py-4 border-y border-dark-neutral/20 flex select-none relative z-10 font-mono text-[11px] font-extrabold text-dark-neutral uppercase tracking-widest leading-none">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 30
        }}
        className="flex whitespace-nowrap gap-12"
      >
        {originalItems.map((palabra, index) => (
          <span key={index} className="flex items-center gap-12">
            <span>{palabra}</span>
            <span className="text-dark-neutral opacity-50">·</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default function App() {
  // Estado para modal detallado de productos
  const [selectedProduct, setSelectedProduct] = useState<Producto | null>(null);

  // Estados de carga e interacción para formulario de contacto
  const [formData, setFormData] = useState<ContactoForm>({
    nombreCompleto: "",
    empresa: "",
    telefono: "",
    correo: "",
    tipoProyecto: "",
    mensaje: ""
  });
  
  const [formErrors, setFormErrors] = useState<Partial<ContactoForm>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Sección de productos: control visual sticky (imagen izquierda cambia en hover / scroll)
  const [activePromoIndex, setActivePromoIndex] = useState(0);

  // Estados de galería y lightbox premium fullscreen
  const [galleryFilter, setGalleryFilter] = useState("Todos");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Filtrado de imágenes de galería por categoría
  const categoriasGal = ["Todos", "Trazabilidad", "Laboratorios", "Almacenes", "Flexografía", "Producción", "Tecnología"];
  const filteredGallery = galleryFilter === "Todos" 
    ? GALERIA_IMAGENES 
    : GALERIA_IMAGENES.filter(img => img.categoria === galleryFilter);

  // Navegación secuencial porLightbox por teclado
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex !== null) {
        if (e.key === "ArrowRight") {
          setLightboxIndex((prev) => (prev! + 1) % filteredGallery.length);
        } else if (e.key === "ArrowLeft") {
          setLightboxIndex((prev) => (prev! - 1 + filteredGallery.length) % filteredGallery.length);
        } else if (e.key === "Escape") {
          setLightboxIndex(null);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, filteredGallery]);

  // Función de scroll suave a ID de sección
  const scrollToSection = (targetId: string, prefillProject?: string) => {
    // Si viene con un valor de prellenado de formulario
    if (prefillProject) {
      setFormData((prev) => ({ ...prev, tipoProyecto: prefillProject }));
    }

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

  // Acción rápida para cotización en el modal
  const handleCotizarDesdeModal = (proyName: string) => {
    setSelectedProduct(null);
    scrollToSection("contacto", proyName);
  };

  // Validación de formulario en tiempo real
  const validateField = (name: string, value: string) => {
    let error = "";
    if (name === "nombreCompleto" && !value.trim()) {
      error = "Su nombre completo es requerido para continuar.";
    } else if (name === "empresa" && !value.trim()) {
      error = "El nombre de su empresa u organización es requerido.";
    } else if (name === "telefono") {
      if (!value.trim()) {
        error = "El teléfono celular o de oficina es requerido.";
      } else if (!/^[0-9+()-\s]{7,15}$/.test(value)) {
        error = "Formato de número telefónico no es correcto (mínimo 7 dígitos).";
      }
    } else if (name === "correo") {
      if (!value.trim()) {
        error = "El correo electrónico institucional o personal es requerido.";
      } else if (!/\S+@\S+\.\S+/.test(value)) {
        error = "Formato de correo inválido (ejemplo@empresa.com).";
      }
    } else if (name === "tipoProyecto" && !value) {
      error = "Selección de tipo de proyecto requerida.";
    }
    setFormErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar todos los campos antes de enviar
    const errors: Partial<ContactoForm> = {};
    Object.keys(formData).forEach((key) => {
      const val = formData[key as keyof ContactoForm];
      if (key === "nombreCompleto" && !val.trim()) errors.nombreCompleto = "Su nombre completo es requerido.";
      if (key === "empresa" && !val.trim()) errors.empresa = "El nombre de su empresa es requerido.";
      if (key === "telefono" && !val.trim()) errors.telefono = "El número telefónico es requerido.";
      if (key === "correo" && !val.trim()) errors.correo = "El correo es requerido.";
      if (key === "tipoProyecto" && !val) errors.tipoProyecto = "Seleccione un tipo de proyecto.";
    });

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      // Hacer foco sutil en el primer input con error
      return;
    }

    setIsSubmitting(true);

    // Simular envío de datos en 1.8 segundos y abrir WhatsApp de forma directa con el mensaje estructurado
    setTimeout(() => {
      const whatsappNumber = "593987584344";
      const welcomeText = 
        `Hola IMSUB M&M,\n` +
        `Adjunto el detalle de los productos que requiero y solicito una cotización. Agradecería incluir información sobre precios, tiempos de entrega y opciones de personalización.\n` +
        `Quedo atent@ a su respuesta.\n` +
        `Saludos cordiales.\n\n` +
        `*DATOS DE LA SOLICITUD:*\n` +
        `• *Nombre Completo:* ${formData.nombreCompleto}\n` +
        `• *Empresa:* ${formData.empresa}\n` +
        `• *Teléfono:* ${formData.telefono}\n` +
        `• *Correo:* ${formData.correo}\n` +
        `• *Tipo de Servicio:* ${formData.tipoProyecto}\n\n` +
        `*Detalles Adicionales:* ${formData.mensaje ? formData.mensaje : 'Sin comentarios adicionales.'}`;
      
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(welcomeText)}`;
      
      // Abrir en una nueva pestaña WhatsApp con el mensaje estructurado
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");

      setIsSubmitting(false);
      setSubmitSuccess(true);
      // Reiniciar formulario
      setFormData({
        nombreCompleto: "",
        empresa: "",
        telefono: "",
        correo: "",
        tipoProyecto: "",
        mensaje: ""
      });
      setFormErrors({});
      
      // Auto ocultar mensaje tras 6 segundos
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 6000);
    }, 1800);
  };

  // Mapear string del ícono a un nodo de Lucide react para Industrias
  const renderIndustriaIcon = (iconName: string) => {
    switch (iconName) {
      case "Boxes": return <Boxes size={22} className="text-tech-orange" />;
      case "Database": return <Database size={22} className="text-tech-orange" />;
      case "FlaskConical": return <FlaskConical size={22} className="text-tech-orange" />;
      case "Apple": return <Apple size={22} className="text-tech-orange" />;
      case "Truck": return <Truck size={22} className="text-tech-orange" />;
      case "LayoutGrid": return <LayoutGrid size={22} className="text-tech-orange" />;
      case "Factory": return <Factory size={22} className="text-tech-orange" />;
      case "ShoppingBag": return <ShoppingBag size={22} className="text-tech-orange" />;
      default: return <Boxes size={22} className="text-tech-orange" />;
    }
  };

  return (
    <div id="top_app_container" className="min-h-screen flex flex-col font-sans select-none selection:bg-tech-orange selection:text-dark-neutral">
      
      {/* Sistema global de cursores y redes flotadas */}
      <CustomCursor />
      <SocialSidebar />

      {/* Nav de Cabecera */}
      <Header />

      {/* Relleno para espacio de Header fijo en Hero */}
      <div id="hero" className="absolute top-0 left-0 w-full h-[80px]" />

      {/* ======================================= */}
      {/* 01 · HERO                               */}
      {/* ======================================= */}
      <section className="relative min-h-[92vh] flex items-center pt-24 pb-16 bg-gradient-to-br from-[#0A2342] via-[#0a2342] to-[#141A22] overflow-hidden px-6 xl:px-0">
        
        {/* Technical Grid Overlay */}
        <div className="absolute inset-0 bg-radial-dots opacity-40 pointer-events-none" />

        {/* Decoraciones Lumínicas */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-tech-orange/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-0 w-[500px] h-[500px] rounded-full bg-industrial-blue/20 blur-3xl pointer-events-none animate-pulse" />

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Columna Izquierda: Mensaje y CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Tag tecnológico de inicio */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center gap-1.5 self-start mb-6 font-mono text-[10px] uppercase tracking-[0.3em] bg-tech-orange/10 text-tech-orange px-3.5 py-1.5 rounded-full border border-tech-orange/20"
            >
              <Cpu size={11} className="animate-spin" style={{ animationDuration: "6s" }} />
              <span>Sistemas de Identificación v2.00</span>
            </motion.div>

            {/* Titular Principal Animado */}
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.08] mb-6">
              Etiquetas para <br className="hidden sm:inline" />
              la{" "}
              <span className="text-tech-orange relative inline-block">
                gestión inteligente.
                <span className="absolute bottom-1 right-0 left-0 h-1 bg-tech-orange/25 rounded" />
              </span>
            </h1>

            {/* Texto Descriptivo riguroso del brief */}
            <p className="text-gray-300 font-sans text-sm md:text-base leading-relaxed max-w-xl mb-8">
              Fabricamos etiquetas térmicas y soluciones flexográficas diseñadas para optimizar procesos logísticos, control de inventarios, trazabilidad industrial y gestión documental en Ecuador.
            </p>

            {/* Botones de Acción Funcionales de Sophisticated Dark */}
            <div className="flex flex-col sm:flex-row items-stretch gap-4">
              <button
                id="hero_cta_orange"
                onClick={() => scrollToSection("contacto")}
                className="px-8 py-4 bg-brand-white hover:bg-tech-orange text-industrial-blue hover:text-white font-bold text-xs tracking-[0.2em] transition-all duration-300 shadow-xl cursor-pointer flex items-center justify-center gap-2 group uppercase rounded-sm"
              >
                <span>Solicitar Cotización</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                id="hero_cta_outline"
                onClick={() => scrollToSection("productos")}
                className="px-8 py-4 border border-[#7A869A]/40 text-white font-bold text-xs tracking-[0.2em] hover:border-tech-orange transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 rounded-sm"
              >
                <span>Ver Productos</span>
              </button>
            </div>

          </div>

          {/* Columna Derecha: Render o Foto + Lista de Datos técnica */}
          <div className="lg:col-span-5 relative mt-8 lg:mt-0 px-4 sm:px-0">
            
            {/* Visual Principal: Imagen premium de elaboración de etiquetas térmicas con códigos de barras */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="relative rounded-lg overflow-hidden border border-tech-gray/25 shadow-2xl h-[330px] md:h-[400px] w-full"
            >
              {/* Red técnica de puntos (Radial Grid overlay) para un look industrial de alta precisión */}
              <div className="absolute inset-0 bg-radial-dots opacity-30 z-10 pointer-events-none" />

              <img
                src="https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?auto=format&fit=crop&q=80&w=1200"
                alt="Elaboración e impresión de rollo de etiquetas térmicas con código de barras IMSUB M&M"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover opacity-90 hover:scale-103 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-neutral via-dark-neutral/30 to-transparent" />
              
              {/* Detalle técnico de trazabilidad en la parte inferior */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between bg-industrial-blue/95 border border-tech-gray/30 p-3.5 rounded backdrop-blur-md z-15">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-tech-orange/10 flex items-center justify-center text-tech-orange border border-tech-orange/15">
                    <QrCode size={16} />
                  </div>
                  <div>
                    <span className="font-mono text-[9px] block text-tech-orange uppercase tracking-wider font-bold">PROCESO CERTIFICADO</span>
                    <span className="font-display text-xs text-white font-semibold">Trazabilidad Industrial en Tiempo Real</span>
                  </div>
                </div>
                <span className="font-mono text-[9px] text-[#7A869A] font-bold tracking-tight hidden sm:inline">ISO 9001:2015</span>
              </div>
            </motion.div>

            {/* Representación de Etiqueta Física Simulada a la Medida (Posicionamiento armonioso abajo-izquierda) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, ease: "easeOut", delay: 0.4 }}
              className="absolute -bottom-8 -left-12 w-[270px] h-[210px] border border-tech-gray/30 flex flex-col p-4 bg-white text-industrial-blue rounded-md shadow-2xl pointer-events-none hidden xl:flex z-20 transition-all duration-300 hover:border-tech-orange"
            >
              {/* Encabezado del sticker térmico */}
              <div className="w-full pb-2 border-b border-dashed border-industrial-blue/20 flex justify-between items-center">
                <span className="text-[10px] font-mono font-bold tracking-wider text-industrial-blue flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-tech-orange animate-pulse" />
                  IMSUB M&M LABELS
                </span>
                <span className="text-[9px] font-mono text-tech-gray font-semibold">REF: 2026</span>
              </div>
              
              {/* Información técnica del sticker simulado */}
              <div className="mt-3 grid grid-cols-2 gap-x-2 gap-y-1.5 font-mono text-[9px] text-industrial-blue/80">
                <div>
                  <span className="block text-tech-gray text-[8px] font-bold">MODELO:</span>
                  <span className="font-bold">IM-THERMAL-300</span>
                </div>
                <div>
                  <span className="block text-tech-gray text-[8px] font-bold">ANCHO:</span>
                  <span className="font-bold">4.0" (101.6 mm)</span>
                </div>
                <div>
                  <span className="block text-tech-gray text-[8px] font-bold">TEMPERATURA:</span>
                  <span className="font-bold">-40°C A +80°C</span>
                </div>
                <div>
                  <span className="block text-tech-gray text-[8px] font-bold">CALIBRACIÓN:</span>
                  <span className="font-bold text-tech-orange font-bold uppercase">APROBADO</span>
                </div>
              </div>

              {/* Código de barras simulado en negro neto sobre blanco real */}
              <div className="mt-4 flex-1 bg-industrial-blue/5 border border-industrial-blue/10 flex flex-col items-center justify-center p-2 rounded">
                <div className="w-full h-9 flex items-stretch gap-[2.2px]">
                  <div className="w-1 bg-industrial-blue/90"></div>
                  <div className="w-0.5 bg-transparent"></div>
                  <div className="w-2 bg-industrial-blue/90"></div>
                  <div className="w-3 bg-industrial-blue/90"></div>
                  <div className="w-1 bg-transparent"></div>
                  <div className="w-1.5 bg-industrial-blue/90"></div>
                  <div className="w-0.5 bg-transparent"></div>
                  <div className="w-2.5 bg-industrial-blue/90"></div>
                  <div className="w-1 bg-industrial-blue/90"></div>
                  <div className="w-1 bg-transparent"></div>
                  <div className="w-3.5 bg-industrial-blue/90"></div>
                  <div className="w-0.5 bg-industrial-blue/90"></div>
                  <div className="w-1.5 bg-transparent"></div>
                  <div className="w-2 bg-industrial-blue/90"></div>
                  <div className="w-0.5 bg-industrial-blue/90"></div>
                  <div className="w-1.5 bg-transparent"></div>
                  <div className="w-1.5 bg-industrial-blue/90"></div>
                  <div className="w-1 bg-industrial-blue/90"></div>
                  <div className="w-1 bg-transparent"></div>
                  <div className="w-2.5 bg-industrial-blue/90"></div>
                </div>
                <span className="text-[8px] font-mono tracking-[0.25em] text-industrial-blue font-bold mt-1.5">*IMS-QA-9001-2026*</span>
              </div>
            </motion.div>

            {/* Lista técnica con animación lateral (Posicionamiento arriba-derecha ordenado) */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
              className="absolute -top-6 -right-6 hidden xl:block bg-dark-neutral/95 border-l-2 border-tech-orange border-y border-r border-tech-gray/30 p-5 rounded-md w-64 backdrop-blur shadow-2xl z-20"
            >
              <span className="font-mono text-[9px] text-[#7A869A] tracking-widest block uppercase mb-3 border-b border-tech-gray/15 pb-1.5 font-bold">Líneas de Producción</span>
              <ul className="space-y-2.5 font-display text-xs font-semibold text-white">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-tech-orange shadow-[0_0_6px_#F28C28]" />
                  <span>Etiquetas Térmicas Directas</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-tech-orange shadow-[0_0_6px_#F28C28]" />
                  <span>Transferencia Térmica</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-tech-orange shadow-[0_0_6px_#F28C28]" />
                  <span>Impresión Flexográfica</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-tech-orange shadow-[0_0_6px_#F28C28]" />
                  <span>Personalización Empresarial</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-tech-orange shadow-[0_0_6px_#F28C28]" />
                  <span>Producción bajo demanda</span>
                </li>
              </ul>
            </motion.div>

          </div>

        </div>

      </section>

      {/* Primer Ticker continuo */}
      <Ticker />

      {/* ======================================= */}
      {/* 02 · DECLARACIÓN                         */}
      {/* ======================================= */}
      <section className="bg-dark-neutral py-20 px-6 xl:px-0">
        
        <div className="max-w-5xl mx-auto text-center">
          
          <span className="font-mono text-[10px] text-tech-gray tracking-[0.3em] block uppercase mb-4">Declaración de Propósito</span>
          
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-8">
            "No fabricamos etiquetas. <span className="text-tech-orange block sm:inline">Creamos control."</span>
          </h2>

          {/* Estadísticas animadas (Contador al Viewport) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 my-12 py-10 border-y border-tech-gray/15">
            
            <div className="flex flex-col items-center">
              <span className="text-tech-orange text-3xl sm:text-4xl md:text-5xl font-mono tracking-tight font-black mb-2 select-none">
                <ContadorAnimado valorFin={100} prefijo="+" />
              </span>
              <span className="text-white font-display text-xs sm:text-sm font-semibold uppercase tracking-wider">Empresas libres de errores</span>
            </div>

            <div className="flex flex-col items-center">
              <span className="text-tech-orange text-3xl sm:text-4xl md:text-5xl font-mono tracking-tight font-black mb-2 select-none">
                <ContadorAnimado valorFin={500000} prefijo="+" />
              </span>
              <span className="text-white font-display text-xs sm:text-sm font-semibold uppercase tracking-wider">Etiquetas despachadas</span>
            </div>

            <div className="flex flex-col items-center">
              <span className="text-tech-orange text-3xl sm:text-4xl md:text-5xl font-mono tracking-tight font-black mb-2 select-none">
                <ContadorAnimado valorFin={100} sufijo="%" />
              </span>
              <span className="text-white font-display text-xs sm:text-sm font-semibold uppercase tracking-wider">Líneas Personalizables</span>
            </div>

            <div className="flex flex-col items-center">
              <span className="text-tech-orange text-3xl sm:text-4xl md:text-5xl font-mono tracking-tight font-black mb-2 select-none">
                <ContadorAnimado valorFin={2} />
              </span>
              <span className="text-white font-display text-xs sm:text-sm font-semibold uppercase tracking-wider">Líneas de Producción</span>
            </div>

          </div>

          <p className="text-gray-300 font-sans text-sm sm:text-base leading-relaxed max-w-3xl mx-auto">
            Desde etiquetas térmicas de alta precisión hasta impresión flexográfica a escala industrial, IMSUB M&M ofrece soluciones completas de identificación y etiquetado para empresas de cualquier sector.
          </p>

        </div>

      </section>

      {/* ======================================= */}
      {/* 03 · PRODUCTOS                           */}
      {/* ======================================= */}
      <section id="productos" className="bg-industrial-blue/15 py-24 border-t border-tech-gray/10 px-6 xl:px-0">
        
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="font-mono text-[10px] text-tech-orange tracking-[0.3em] block uppercase mb-3">Catálogo Premium</span>
              <h2 className="font-display text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                Una solución para cada operación.
              </h2>
            </div>
            <p className="text-tech-gray font-sans text-sm max-w-md">
              Sistemas diseñados con sustratos certificados que garantizan la trazabilidad permanente y el control efectivo en su cadena de distribución.
            </p>
          </div>

          {/* Layout de dos columnas: Sticky a la izquierda, lista a la derecha */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            
            {/* Columna Izquierda: Imagen Sticky */}
            <div className="lg:col-span-5 flex flex-col">
              <div className="sticky top-28 bg-dark-neutral rounded-lg overflow-hidden border border-tech-gray/15 shadow-2xl">
                
                <div className="relative h-[300px] sm:h-[400px]">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activePromoIndex}
                      src={PRODUCTOS[activePromoIndex].imagen}
                      alt={PRODUCTOS[activePromoIndex].nombre}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      referrerPolicy="no-referrer"
                      className="absolute inset-0 w-full h-full object-cover opacity-85"
                    />
                  </AnimatePresence>
                  
                  {/* Gradiente oscuro */}
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-neutral via-transparent to-transparent" />

                  {/* Detalle flotado */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <span className="font-mono text-[9px] text-tech-orange bg-tech-orange/10 px-2 py-1 rounded border border-tech-orange/15 uppercase tracking-widest">
                      Visualizor Técnico ({PRODUCTOS[activePromoIndex].numero})
                    </span>
                    <h4 className="font-display text-lg font-bold text-white mt-2">
                      {PRODUCTOS[activePromoIndex].nombre}
                    </h4>
                  </div>
                </div>

                {/* Resumen especificación técnica en panel inferior */}
                <div className="p-5 font-mono text-[11px] text-tech-gray bg-dark-neutral border-t border-tech-gray/10 flex items-center justify-between">
                  <span>DENSIDAD: STANDARD ALTÍSIMA</span>
                  <span className="text-tech-orange font-bold uppercase tracking-wider">RECOMENDADO INDUSTRIAL</span>
                </div>

              </div>
            </div>

            {/* Columna Derecha: Lista Interactiva */}
            <div className="lg:col-span-7 flex flex-col gap-5">
              {PRODUCTOS.map((prod, index) => (
                <div
                  key={prod.id}
                  onMouseEnter={() => setActivePromoIndex(index)}
                  className={`border p-6 rounded-lg transition-all duration-300 relative group overflow-hidden flex flex-col justify-between ${
                    activePromoIndex === index
                      ? "bg-industrial-blue/50 border-tech-orange/30 shadow-xl"
                      : "bg-dark-neutral/80 border-tech-gray/15 hover:border-tech-gray/30"
                  }`}
                >
                  {/* Línea de acento naranja izquierdo */}
                  <div
                    className={`absolute left-0 top-0 bottom-0 w-1 transition-all duration-300 ${
                      activePromoIndex === index ? "bg-tech-orange" : "bg-transparent"
                    }`}
                  />

                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <span className="font-mono text-xs text-tech-orange block mb-1">
                        LÍNEA {prod.numero}
                      </span>
                      <h3 className="font-display text-lg font-bold text-white group-hover:text-tech-orange transition-colors">
                        {prod.nombre}
                      </h3>
                    </div>
                    <span className="font-mono text-sm text-tech-gray group-hover:text-white transition-colors">
                      /{prod.numero}
                    </span>
                  </div>

                  {/* Lista de beneficios técnicos rápida */}
                  <div className="space-y-1.5 mb-6">
                    {prod.items.map((item, idy) => (
                      <p key={idy} className="text-gray-300 font-sans text-xs flex items-center gap-1.5">
                        <span className="inline-block w-1.5 h-1.5 bg-tech-orange rounded-full" />
                        <span>{item}</span>
                      </p>
                    ))}
                  </div>

                  {/* Botones del producto */}
                  <div className="flex items-center justify-between border-t border-tech-gray/10 pt-4 mt-2">
                    <span className="font-mono text-[10px] text-tech-gray uppercase">
                      Quito · Trazabilidad Garantizada
                    </span>
                    <button
                      id={`ver_specs_${prod.id}`}
                      onClick={() => setSelectedProduct(prod)}
                      className="bg-transparent hover:bg-white/5 text-white border border-tech-gray/25 hover:border-tech-orange active:scale-95 px-4.5 py-2 rounded font-display font-semibold text-[11px] uppercase tracking-wider transition-all duration-300 cursor-pointer"
                    >
                      Ver Especificaciones
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

      </section>

      {/* ======================================= */}
      {/* 04 · INDUSTRIAS                          */}
      {/* ======================================= */}
      <section id="industrias" className="bg-dark-neutral py-24 border-t border-tech-gray/10 px-6 xl:px-0">
        
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center mb-16">
            <span className="font-mono text-[10px] text-tech-gray tracking-[0.3em] block uppercase mb-3">Sectores Atendidos</span>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Presentes donde la precisión importa.
            </h2>
            <div className="w-16 h-1 bg-tech-orange mx-auto mt-4 rounded" />
          </div>

          {/* Grid interactiva de 8 industrias */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {INDUSTRIAS.map((ind) => (
              <div
                key={ind.id}
                className="relative h-[280px] rounded-lg overflow-hidden border border-tech-gray/15 group shadow-lg flex flex-col justify-between p-6 interactive-card hover:-translate-y-1 transition-all duration-300 bg-industrial-blue/10"
              >
                {/* Imagen de fondo con opacidad baja, sube al hover */}
                <img
                  src={ind.imagen}
                  alt={ind.nombre}
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover opacity-15 group-hover:opacity-30 group-hover:scale-105 transition-all duration-500"
                />
                
                {/* Gradiente */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark-neutral via-dark-neutral/70 to-transparent" />

                {/* Header card */}
                <div className="relative z-10 flex justify-between items-start">
                  <div className="p-2.5 bg-dark-neutral border border-tech-gray/20 rounded">
                    {renderIndustriaIcon(ind.icono)}
                  </div>
                  <span className="font-mono text-[10px] text-tech-gray">ACTIVE SEC</span>
                </div>

                {/* Footer card con hover interactivo */}
                <div className="relative z-10">
                  <h3 className="font-display text-base font-bold text-white mb-2 group-hover:text-tech-orange transition-colors">
                    {ind.nombre}
                  </h3>
                  
                  {/* Contenedor dinámico de descripción */}
                  <p className="text-xs text-gray-300 font-sans leading-relaxed transition-all duration-300 max-h-[1px] opacity-0 group-hover:max-h-[80px] group-hover:opacity-100 overflow-hidden pr-2">
                    {ind.descripcionHover}
                  </p>

                  <button
                    id={`ind_solution_${ind.id}`}
                    onClick={() => scrollToSection("contacto", `Industria: ${ind.nombre}`)}
                    className="mt-3 text-tech-orange group-hover:text-white flex items-center gap-1 font-mono text-[10px] uppercase font-bold tracking-wider cursor-pointer"
                  >
                    <span>Conocer Solución</span>
                    <ArrowUpRight size={12} />
                  </button>
                </div>

              </div>
            ))}
          </div>

        </div>

      </section>

      {/* Ticker entre Secciones para dinamismo */}
      <Ticker />

      {/* ======================================= */}
      {/* 05 · FLEXOGRAFÍA                         */}
      {/* ======================================= */}
      <section id="flexografia" className="bg-gradient-to-b from-dark-neutral via-industrial-blue/5 to-dark-neutral py-24 border-t border-tech-gray/10 px-6 xl:px-0">
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Lado Izquierdo: Información */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            <span className="font-mono text-[10px] text-tech-orange tracking-[0.3em] block uppercase mb-3">Impresión Rotativa Comercial</span>
            
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight mb-4">
              Impresión que habla de tu marca.
            </h2>

            <p className="font-display text-sm md:text-base font-semibold text-tech-orange mb-6">
              "La flexografía no es solo impresión. Es la forma en que tu producto se presenta al mundo."
            </p>

            <p className="text-gray-300 font-sans text-sm leading-relaxed mb-8">
              IMSUB M&M ofrece impresión flexográfica para empresas que necesitan volumen, color y durabilidad en sus materiales de identificación. Desde etiquetas de producto hasta empaques secundarios, cada tiraje cumple estándares de precisión y adherencia que superan las demandas del mercado.
            </p>

            {/* Grid de especificaciones de flexografía */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
              
              <div className="flex gap-3 bg-dark-neutral/50 border border-tech-gray/10 p-4 rounded-lg">
                <CheckCircle2 size={16} className="text-tech-orange shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-display text-xs font-bold text-white uppercase tracking-wider mb-1">Color Multicapa</h4>
                  <p className="text-gray-400 text-xs">Impresión rotativa de hasta 6 tintas directas o policromía de altísima fidelidad.</p>
                </div>
              </div>

              <div className="flex gap-3 bg-dark-neutral/50 border border-tech-gray/10 p-4 rounded-lg">
                <CheckCircle2 size={16} className="text-tech-orange shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-display text-xs font-bold text-white uppercase tracking-wider mb-1">Sustratos Flexibles</h4>
                  <p className="text-gray-400 text-xs">Compatibilidad absoluta con polietileno, polipropileno, BOPP y papeles glassine.</p>
                </div>
              </div>

              <div className="flex gap-3 bg-dark-neutral/50 border border-tech-gray/10 p-4 rounded-lg">
                <CheckCircle2 size={16} className="text-tech-orange shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-display text-xs font-bold text-white uppercase tracking-wider mb-1">Alimentación UV</h4>
                  <p className="text-gray-400 text-xs font-sans">Tintas estables bajo radiación UV para máxima resistencia al intemperismo, humedad y frío.</p>
                </div>
              </div>

              <div className="flex gap-3 bg-dark-neutral/50 border border-tech-gray/10 p-4 rounded-lg">
                <CheckCircle2 size={16} className="text-tech-orange shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-display text-xs font-bold text-white uppercase tracking-wider mb-1">Acabados Especiales</h4>
                  <p className="text-gray-400 text-xs">Barniz de sobreimpresión brillo/mate, laminaciones mate protectora y troquelado rotativo.</p>
                </div>
              </div>

            </div>

            <button
              id="cta_flexografia_quote"
              onClick={() => scrollToSection("contacto", "Impresión Flexográfica")}
              className="bg-tech-orange hover:bg-tech-orange/95 active:scale-95 text-dark-neutral font-display font-bold text-xs px-8 py-4.5 rounded uppercase tracking-widest transition-all shadow-lg self-start cursor-pointer"
            >
              COTIZAR FLEXOGRAFÍA
            </button>

          </div>

          {/* Lado Derecho: Imagen de producción de prensa industrial */}
          <div className="lg:col-span-5 relative mt-8 lg:mt-0">
            <div className="relative rounded-lg overflow-hidden border border-tech-gray/15 shadow-2xl h-[350px] md:h-[450px]">
              <img
                src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=1200"
                alt="Prensa de flexografía industrial IMSUB M&M"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover opacity-85"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-neutral to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 bg-dark-neutral/80 border border-tech-gray/15 p-4.5 rounded backdrop-blur">
                <span className="font-mono text-[9px] text-tech-orange block uppercase tracking-wider">Línea de alto volumen</span>
                <span className="font-display text-xs text-white font-semibold block mt-1">Rollos rotativos continuos para etiquetadoras automáticas</span>
              </div>
            </div>
          </div>

        </div>

      </section>

      {/* ======================================= */}
      {/* 06 · TECNOLOGÍA                          */}
      {/* ======================================= */}
      <section id="tecnologia" className="bg-dark-neutral py-24 border-t border-tech-gray/10 px-6 xl:px-0">
        
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center mb-16">
            <span className="font-mono text-[10px] text-tech-gray tracking-[0.3em] block uppercase mb-3">Trazabilidad Aplicada</span>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Trazabilidad hecha visible.
            </h2>
            <div className="w-16 h-1 bg-tech-orange mx-auto mt-4 rounded" />
          </div>

          {/* Animación central interactiva */}
          <div className="mb-16">
            <BarcodeAnimator />
          </div>

          {/* Grid secundario de especificaciones */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SPECS_TECNOLOGIA.map((spec, idx) => {
              // Asignar el ícono correspondiente para las especificaciones
              let IconNode = <Cpu size={20} className="text-tech-orange" />;
              if (spec.icono === "ShieldCheck") IconNode = <ShieldCheck size={20} className="text-tech-orange" />;
              if (spec.icono === "Layers") IconNode = <Layers size={20} className="text-tech-orange" />;
              if (spec.icono === "QrCode") IconNode = <QrCode size={20} className="text-tech-orange" />;

              return (
                <div key={idx} className="bg-industrial-blue/10 border border-tech-gray/10 p-6 rounded-lg">
                  <div className="w-10 h-10 rounded bg-dark-neutral border border-tech-gray/15 flex items-center justify-center mb-4 text-tech-orange">
                    {IconNode}
                  </div>
                  <h4 className="font-display text-sm font-bold text-white mb-2 uppercase tracking-wide">
                    {spec.titulo}
                  </h4>
                  <p className="text-gray-400 text-xs font-sans leading-relaxed">
                    {spec.descripcion}
                  </p>
                </div>
              );
            })}
          </div>

        </div>

      </section>

      {/* ======================================= */}
      {/* 07 · GALERÍA (fullscreen con lightbox)   */}
      {/* ======================================= */}
      <section id="galeria" className="bg-industrial-blue/15 py-24 border-t border-tech-gray/10 px-6 xl:px-0">
        
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="font-mono text-[10px] text-tech-orange tracking-[0.3em] block uppercase mb-3">Portafolio Operativo</span>
              <h2 className="font-display text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                Aplicaciones reales.
              </h2>
            </div>
            
            {/* Filtros rápidos correspondientes */}
            <div className="flex flex-wrap gap-2">
              {categoriasGal.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setGalleryFilter(cat)}
                  className={`px-3 py-1.5 rounded font-display text-xs font-medium border transition-colors cursor-pointer ${
                    galleryFilter === cat
                      ? "bg-tech-orange border-tech-orange text-dark-neutral font-semibold"
                      : "bg-dark-neutral border-tech-gray/10 text-tech-gray hover:text-white hover:border-tech-gray/30"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Grilla de imágenes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGallery.map((img, index) => (
              <div
                key={index}
                onClick={() => setLightboxIndex(index)}
                className="relative h-[250px] sm:h-[300px] rounded-lg overflow-hidden border border-tech-gray/15 group cursor-pointer shadow-lg bg-dark-neutral"
              >
                <img
                  src={img.url}
                  alt={img.descripcion}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-104 transition-all duration-500"
                />
                
                {/* Overlay hover */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-dark-neutral via-dark-neutral/90 to-transparent p-5 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="font-mono text-[9px] text-tech-orange bg-tech-orange/10 px-2 py-0.5 rounded border border-tech-orange/15 uppercase tracking-wide">
                    {img.categoria}
                  </span>
                  <p className="text-white text-xs font-display font-semibold mt-2.5 line-clamp-2">
                    {img.descripcion}
                  </p>
                  <span className="text-[10px] text-tech-gray font-mono block mt-2 text-right">Haga clic para ver pantalla completa</span>
                </div>

                <div className="absolute top-4 right-4 bg-dark-neutral/80 border border-tech-gray/25 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight size={14} className="text-white" />
                </div>
              </div>
            ))}
          </div>

        </div>

      </section>

      {/* Lightbox de la galería (Fullscreen modal con Keyboard navigation y swipe click y Close) */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <div className="fixed inset-0 bg-dark-neutral/98 backdrop-blur z-50 flex flex-col justify-between p-6">
            
            {/* Header del Lightbox */}
            <div className="flex items-center justify-between border-b border-tech-gray/10 pb-4">
              <span className="font-mono text-xs text-tech-gray">
                VISUALIZADOR PORTAFOLIO — {lightboxIndex + 1} / {filteredGallery.length}
              </span>
              <button
                id="close_lightbox"
                onClick={() => setLightboxIndex(null)}
                className="text-tech-gray hover:text-white bg-white/5 p-2 rounded-full cursor-pointer transition-colors"
                aria-label="Cerrar vista"
              >
                <X size={20} />
              </button>
            </div>

            {/* Cuerpo del Lightbox: Navegación izquierda, imagen, navegación derecha */}
            <div className="flex-1 flex items-center justify-between gap-4 max-h-[75vh]">
              
              <button
                id="prev_lightbox"
                onClick={() => setLightboxIndex((prev) => (prev! - 1 + filteredGallery.length) % filteredGallery.length)}
                className="text-tech-gray hover:text-tech-orange bg-white/5 p-3 rounded-full cursor-pointer transition-colors"
                aria-label="Imagen anterior"
              >
                <ChevronLeft size={24} />
              </button>

              <div className="max-w-4xl max-h-full flex items-center justify-center relative">
                <img
                  src={filteredGallery[lightboxIndex].url}
                  alt={filteredGallery[lightboxIndex].descripcion}
                  referrerPolicy="no-referrer"
                  className="max-h-[70vh] max-w-[85vw] object-contain rounded border border-tech-gray/10 shadow-2xl"
                />
              </div>

              <button
                id="next_lightbox"
                onClick={() => setLightboxIndex((prev) => (prev! + 1) % filteredGallery.length)}
                className="text-tech-gray hover:text-tech-orange bg-white/5 p-3 rounded-full cursor-pointer transition-colors"
                aria-label="Siguiente imagen"
              >
                <ChevronRight size={24} />
              </button>

            </div>

            {/* Footer con Descripción */}
            <div className="border-t border-tech-gray/10 pt-4 max-w-2xl mx-auto text-center">
              <span className="font-mono text-[10px] text-tech-orange uppercase bg-tech-orange/10 px-2 py-0.5 rounded">
                Categoría: {filteredGallery[lightboxIndex].categoria}
              </span>
              <p className="text-white font-sans text-sm mt-3 font-medium">
                {filteredGallery[lightboxIndex].descripcion}
              </p>
              <span className="text-[10px] text-tech-gray font-mono block mt-2">
                Use las teclas de flechas (← / →) o presione Esc para salir
              </span>
            </div>

          </div>
        )}
      </AnimatePresence>

      {/* ======================================= */}
      {/* 08 · CONTACTO Y COTIZACIÓN               */}
      {/* ======================================= */}
      <section id="contacto" className="bg-dark-neutral py-24 border-t border-tech-gray/10 px-6 xl:px-0">
        
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center mb-16">
            <span className="font-mono text-[10px] text-tech-orange tracking-[0.3em] block uppercase mb-3">Presupuesto sin cargo</span>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Solicita una cotización.
            </h2>
            <p className="text-gray-300 font-sans text-sm max-w-xl mx-auto mt-3">
              Nuestro equipo está listo para diseñar soluciones de identificación adaptadas exactamente a tu operación. Respuesta en menos de 24 horas.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch mb-16">
            
            {/* Lado Izquierdo: Información y Vías */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-8">
              
              <div className="bg-industrial-blue/35 border border-tech-gray/15 p-6 md:p-8 rounded-lg flex flex-col gap-6">
                
                <h3 className="font-display text-lg font-bold text-white border-b border-tech-gray/20 pb-2 mb-2 uppercase">
                  Canales Corporativos
                </h3>

                {/* Vías directas */}
                <div className="space-y-6">
                  
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 bg-dark-neutral border border-tech-orange/15 rounded text-tech-orange">
                      <Phone size={18} />
                    </div>
                    <div>
                      <span className="font-mono text-[10px] text-tech-gray block uppercase">Teléfono Comercial 1</span>
                      <span className="font-display text-sm font-semibold text-white block mt-0.5">0987584344</span>
                      <a
                        href="tel:0987584344"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-tech-orange text-xs font-mono font-medium hover:underline inline-flex items-center gap-1 mt-1.5"
                      >
                        LLAMAR AHORA <ArrowUpRight size={12} />
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-2.5 bg-dark-neutral border border-tech-orange/15 rounded text-tech-orange">
                      <Phone size={18} />
                    </div>
                    <div>
                      <span className="font-mono text-[10px] text-tech-gray block uppercase">Teléfono Comercial 2</span>
                      <span className="font-display text-sm font-semibold text-white block mt-0.5">0960767397</span>
                      <a
                        href="tel:0960767397"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-tech-orange text-xs font-mono font-medium hover:underline inline-flex items-center gap-1 mt-1.5"
                      >
                        LLAMAR AHORA <ArrowUpRight size={12} />
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-2.5 bg-dark-neutral border border-tech-orange/15 rounded text-tech-orange">
                      <Mail size={18} />
                    </div>
                    <div>
                      <span className="font-mono text-[10px] text-tech-gray block uppercase">Correo Institucional</span>
                      <span className="font-display text-sm font-semibold text-white block mt-0.5">imsub_mym1995@outlook.com</span>
                      <a
                        href="mailto:imsub_mym1995@outlook.com"
                        className="text-tech-orange text-xs font-mono font-medium hover:underline inline-flex items-center gap-1 mt-1.5"
                      >
                        ENVIAR CORREO <ArrowUpRight size={12} />
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-2.5 bg-dark-neutral border border-tech-orange/15 rounded text-tech-orange">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <span className="font-mono text-[10px] text-tech-gray block uppercase">Oficina y Planta</span>
                      <span className="font-display text-sm font-semibold text-white block mt-0.5">Sector La Carolina, Quito, Ecuador</span>
                      <button
                        onClick={() => scrollToSection("location_map")}
                        className="text-tech-orange text-xs font-mono font-medium hover:underline inline-flex items-center gap-1 mt-1.5 cursor-pointer"
                      >
                        VER EN PLANO <ArrowRight size={12} />
                      </button>
                    </div>
                  </div>

                </div>

              </div>
              
              {/* Información adicional */}
              <div className="bg-tech-orange/5 border border-tech-orange/15 p-5 rounded-lg flex gap-3.5 items-start">
                <Clock size={18} className="text-tech-orange shrink-0 mt-0.5" />
                <p className="text-xs text-gray-300 font-sans leading-relaxed">
                  Ofrecemos despachos directos y soporte técnico de codificación para bodegas y centros logísticos en todo el territorio nacional ecuatoriano.
                </p>
              </div>

            </div>

            {/* Lado Derecho: Formulario de Contacto Funcional */}
            <div id="contact_form_column" className="lg:col-span-7 bg-industrial-blue/20 border border-tech-gray/15 p-6 md:p-8 rounded-lg flex flex-col justify-between">
              
              <form onSubmit={handleSubmit} className="space-y-5">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  
                  {/* Nombre */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="nombreCompleto" className="font-mono text-[10px] text-tech-gray uppercase tracking-wider">
                      Nombre completo *
                    </label>
                    <input
                      id="nombreCompleto"
                      name="nombreCompleto"
                      type="text"
                      placeholder="Ej. Juan Pérez"
                      value={formData.nombreCompleto}
                      onChange={handleInputChange}
                      className={`font-sans text-xs bg-dark-neutral border p-3 rounded text-white outline-none focus:border-tech-orange transition-colors ${
                        formErrors.nombreCompleto ? "border-red-400" : "border-tech-gray/25"
                      }`}
                    />
                    {formErrors.nombreCompleto && (
                      <span className="text-[10px] text-red-400 font-mono italic">{formErrors.nombreCompleto}</span>
                    )}
                  </div>

                  {/* Empresa */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="empresa" className="font-mono text-[10px] text-tech-gray uppercase tracking-wider">
                      Empresa / Institución *
                    </label>
                    <input
                      id="empresa"
                      name="empresa"
                      type="text"
                      placeholder="Ej. Logística Ecuador S.A."
                      value={formData.empresa}
                      onChange={handleInputChange}
                      className={`font-sans text-xs bg-dark-neutral border p-3 rounded text-white outline-none focus:border-tech-orange transition-colors ${
                        formErrors.empresa ? "border-red-400" : "border-tech-gray/25"
                      }`}
                    />
                    {formErrors.empresa && (
                      <span className="text-[10px] text-red-400 font-mono italic">{formErrors.empresa}</span>
                    )}
                  </div>

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  
                  {/* Teléfono */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="telefono" className="font-mono text-[10px] text-tech-gray uppercase tracking-wider">
                      Teléfono de contacto *
                    </label>
                    <input
                      id="telefono"
                      name="telefono"
                      type="text"
                      placeholder="Ej. 0987584344"
                      value={formData.telefono}
                      onChange={handleInputChange}
                      className={`font-sans text-xs bg-dark-neutral border p-3 rounded text-white outline-none focus:border-tech-orange transition-colors ${
                        formErrors.telefono ? "border-red-400" : "border-tech-gray/25"
                      }`}
                    />
                    {formErrors.telefono && (
                      <span className="text-[10px] text-red-400 font-mono italic">{formErrors.telefono}</span>
                    )}
                  </div>

                  {/* Correo */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="correo" className="font-mono text-[10px] text-tech-gray uppercase tracking-wider">
                      Correo electrónico *
                    </label>
                    <input
                      id="correo"
                      name="correo"
                      type="email"
                      placeholder="Ej. compras@empresa.com"
                      value={formData.correo}
                      onChange={handleInputChange}
                      className={`font-sans text-xs bg-dark-neutral border p-3 rounded text-white outline-none focus:border-tech-orange transition-colors ${
                        formErrors.correo ? "border-red-400" : "border-tech-gray/25"
                      }`}
                    />
                    {formErrors.correo && (
                      <span className="text-[10px] text-red-400 font-mono italic">{formErrors.correo}</span>
                    )}
                  </div>

                </div>

                {/* Selector de Tipo de Proyecto */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="tipoProyecto" className="font-mono text-[10px] text-tech-gray uppercase tracking-wider">
                    Tipo de proyecto requerido *
                  </label>
                  <select
                    id="tipoProyecto"
                    name="tipoProyecto"
                    value={formData.tipoProyecto}
                    onChange={handleInputChange}
                    className={`font-sans text-xs bg-dark-neutral border p-3 rounded text-white outline-none focus:border-tech-orange transition-colors cursor-pointer ${
                      formErrors.tipoProyecto ? "border-red-400" : "border-tech-gray/25"
                    }`}
                  >
                    <option value="">-- Seleccione una solución --</option>
                    <option value="Etiquetas para Almacén">Etiquetas para Almacén</option>
                    <option value="Etiquetas para Bodegas">Etiquetas para Bodegas</option>
                    <option value="Etiquetas para Laboratorios">Etiquetas para Laboratorios</option>
                    <option value="Etiquetas para Fábricas">Etiquetas para Fábricas</option>
                    <option value="Impresión Flexográfica">Impresión Flexográfica</option>
                    <option value="Otro">Otro requerimiento de identificación</option>
                  </select>
                  {formErrors.tipoProyecto && (
                    <span className="text-[10px] text-red-400 font-mono italic">{formErrors.tipoProyecto}</span>
                  )}
                </div>

                {/* Mensaje */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="mensaje" className="font-mono text-[10px] text-tech-gray uppercase tracking-wider">
                    Mensaje / Descripción de necesidad (Opcional)
                  </label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    rows={4}
                    placeholder="Escriba las dimensiones, cantidades estimadas o características específicas necesarias para su operación."
                    value={formData.mensaje}
                    onChange={handleInputChange}
                    className="font-sans text-xs bg-dark-neutral border border-tech-gray/25 p-3 rounded text-white outline-none focus:border-tech-orange transition-colors resize-none"
                  />
                </div>

                {/* Envío */}
                <button
                  id="submit_lead_form"
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-tech-orange hover:bg-tech-orange/95 disabled:bg-tech-gray/30 disabled:cursor-not-allowed text-dark-neutral font-display font-bold text-xs py-4 rounded uppercase tracking-wider transition-all duration-300 shadow-lg cursor-pointer flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      <span>PROCESANDO REQUERIMIENTO...</span>
                    </>
                  ) : (
                    <span>SOLICITAR INFORMACIÓN</span>
                  )}
                </button>

              </form>

              {/* Mensaje de Éxito animado */}
              <AnimatePresence>
                {submitSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="mt-4 p-4.5 bg-green-500/10 border border-green-500/30 rounded text-green-400 text-xs font-sans flex items-start gap-3"
                  >
                    <CheckCircle2 size={16} className="shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-display font-bold uppercase tracking-wider">¡Envío Satisfactorio!</h4>
                      <p className="mt-1">Su cotización ha sido registrada. Un asesor técnico se contactará en menos de 24 horas laborables.</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>

          </div>

          {/* ======================================= */}
          {/* MAPA INTERACTIVO                        */}
          {/* ======================================= */}
          <div id="location_map" className="w-full mt-16">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-tech-gray/10 pb-4">
              <div className="flex items-center gap-2">
                <MapPin size={18} className="text-tech-orange" />
                <h3 className="font-display text-base font-bold text-white uppercase tracking-wider">
                  Ubicación Corporativa — La Carolina, Quito
                </h3>
              </div>
              <a
                id="link_google_maps_route"
                href="https://maps.google.com/?q=-0.1832,-78.4826"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-transparent hover:bg-white/5 border border-tech-gray/25 hover:border-white text-white text-xs font-mono px-4 py-2 rounded transition-colors inline-flex items-center gap-1.5 cursor-pointer"
              >
                CÓMO LLEGAR (ABRIR NAVEGACIÓN) <ArrowUpRight size={13} />
              </a>
            </div>

            {/* Iframe con mapa Google Maps perfectamente estilizado con filtro de tono de escala de grises dark */}
            <div className="relative rounded-lg overflow-hidden h-[300px] md:h-[450px] border border-tech-gray/15 shadow-xl bg-dark-neutral group">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15959.160100795415!2d-78.48911571217032!3d-0.18319983944621989!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91d59a8c6a0c0b3d%3A0xab7d97e8dc830c2c!2sLa%20Carolina%2C%20Quito!5e0!3m2!1ses-419!2sec!4v1652010191911!5m2!1ses-419!2sec"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "grayscale(1) invert(0.9) contrast(1.1)" }}
                allowFullScreen={true}
                loading="lazy"
                title="Google Maps con punto de localización de IMSUB M&M"
              />
              
              {/* Tooltip de mapa */}
              <div className="absolute top-4 left-4 bg-dark-neutral/90 border border-tech-gray/20 p-3 rounded shadow-lg pointer-events-none md:block hidden">
                <span className="font-display text-xs font-semibold text-white block">Avenida Amazonas y República</span>
                <span className="text-[10px] text-tech-orange font-mono block mt-0.5">Sector Parque La Carolina, Quito</span>
              </div>
            </div>

          </div>

        </div>

      </section>

      {/* ======================================= */}
      {/* 09 · FOOTER                              */}
      {/* ======================================= */}
      <footer className="bg-industrial-blue border-t border-tech-gray/10 py-16 px-6 xl:px-0 mt-auto relative z-10">
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Logo y descripción */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <span className="font-display text-2xl font-extrabold tracking-wider text-white">
              IMSUB <span className="text-tech-orange">M&M</span>
            </span>
            <p className="text-gray-300 font-sans text-xs leading-relaxed max-w-sm">
              Soluciones de identificación y etiquetado térmico para empresas que necesitan precisión, control y trazabilidad. Fabricantes de etiquetas térmicas e impresión flexográfica en Ecuador.
            </p>
            <span className="font-mono text-[9px] text-tech-gray tracking-wider uppercase mt-2">
              Quito, Ecuador · Desde 1995
            </span>
          </div>

          {/* Links de productos */}
          <div className="lg:col-span-2.5 flex flex-col gap-3">
            <h4 className="font-display text-xs font-bold text-white uppercase tracking-widest border-b border-tech-gray/15 pb-2 mb-1">
              PRODUCTOS
            </h4>
            <ul className="space-y-2 text-xs font-sans text-gray-300">
              <li>
                <button onClick={() => scrollToSection("productos")} className="hover:text-tech-orange transition-colors cursor-pointer text-left">
                  Etiquetas térmicas
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("productos")} className="hover:text-tech-orange transition-colors cursor-pointer text-left">
                  Etiquetas de transferencia
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("productos")} className="hover:text-tech-orange transition-colors cursor-pointer text-left">
                  Etiquetas para laboratorio
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("flexografia")} className="hover:text-tech-orange transition-colors cursor-pointer text-left">
                  Flexografía industrial
                </button>
              </li>
            </ul>
          </div>

          {/* Links de Soluciones / Industrias */}
          <div className="lg:col-span-2.5 flex flex-col gap-3">
            <h4 className="font-display text-xs font-bold text-white uppercase tracking-widest border-b border-tech-gray/15 pb-2 mb-1">
              SOLUCIONES
            </h4>
            <ul className="space-y-2 text-xs font-sans text-gray-300">
              <li>
                <button onClick={() => scrollToSection("industrias")} className="hover:text-tech-orange transition-colors cursor-pointer text-left text-xs">
                  Inventarios y Bodegas
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("industrias")} className="hover:text-tech-orange transition-colors cursor-pointer text-left text-xs">
                  Muestras de Laboratorio
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("industrias")} className="hover:text-tech-orange transition-colors cursor-pointer text-left text-xs">
                  Líneas de Producción
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("industrias")} className="hover:text-tech-orange transition-colors cursor-pointer text-left text-xs">
                  Comercio y Distribución
                </button>
              </li>
            </ul>
          </div>

          {/* Contacto rapido footer */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <h4 className="font-display text-xs font-bold text-white uppercase tracking-widest border-b border-tech-gray/15 pb-2 mb-1">
              CONTACTO
            </h4>
            <ul className="space-y-2 text-xs font-sans text-gray-300">
              <li className="font-mono text-[11px] text-white">0987584344</li>
              <li className="font-mono text-[11px] text-white">0960767397</li>
              <li className="truncate hover:text-tech-orange transition-colors">
                <a href="mailto:imsub_mym1995@outlook.com">imsub_mym1995@outlook.com</a>
              </li>
              <li className="text-tech-gray font-mono text-[9px] mt-1 uppercase">Quito, Ecuador</li>
            </ul>
          </div>

        </div>

        {/* Barra inferior de copy */}
        <div className="max-w-7xl mx-auto border-t border-tech-gray/10 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-tech-gray gap-4">
          <span>© 2026 IMSUB M&M · Todos los derechos reservados · Quito, Ecuador</span>
          <div className="flex gap-4">
            <a href="https://wa.me/593987584344?text=Hola%20IMSUB%20M%26M%2C%0A%0AEstoy%20buscando%20soluciones%20de%20etiquetado%20t%C3%A9rmico%20para%20mi%20empresa%20y%20me%20gustar%C3%ADa%20conocer%20m%C3%A1s%20sobre%20sus%20productos%20y%20servicios.%20%C2%BFPodr%C3%ADan%20brindarme%20informaci%C3%B3n%20sobre%20sus%20etiquetas%20t%C3%A9rmicas%2C%20opciones%20de%20personalizaci%C3%B3n%2C%20costos%20y%20asesor%C3%ADa%20para%20proyectos%3F" target="_blank" rel="noopener noreferrer" className="hover:text-tech-orange transition-colors">WhatsApp</a>
            <span className="opacity-35">/</span>
            <a href="https://www.facebook.com/profile.php?id=61590546159194" target="_blank" rel="noopener noreferrer" className="hover:text-tech-orange transition-colors">Facebook</a>
            <span className="opacity-35">/</span>
            <a href="https://www.instagram.com/imsub_mym1995/" target="_blank" rel="noopener noreferrer" className="hover:text-tech-orange transition-colors">Instagram</a>
            <span className="opacity-35">/</span>
            <a href="https://www.tiktok.com/@imsubmym" target="_blank" rel="noopener noreferrer" className="hover:text-tech-orange transition-colors">TikTok</a>
          </div>
        </div>

      </footer>

      {/* Modal Técnico Detallado Desplegable */}
      <ModalProducto
        producto={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onCotizar={handleCotizarDesdeModal}
      />

    </div>
  );
}
