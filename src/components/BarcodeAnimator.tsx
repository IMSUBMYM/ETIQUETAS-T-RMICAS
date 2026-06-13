import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Play, Pause, ChevronRight, Barcode, QrCode, Hash, Tag, Truck, Cpu } from "lucide-react";

interface Step {
  id: number;
  nombre: string;
  icon: React.ReactNode;
  representacion: string;
  detalles: {
    estándar: string;
    longitud: string;
    densidad: string;
    industria: string;
  };
  descripcion: string;
}

export default function BarcodeAnimator() {
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const steps: Step[] = [
    {
      id: 0,
      nombre: "Código de Barras",
      icon: <Barcode size={20} />,
      representacion: "BARCODE",
      detalles: {
        estándar: "EAN-13 / Code 128",
        longitud: "13 Caracteres numéricos",
        densidad: "Baja/Media (Lineal)",
        industria: "Comercio masivo y distribución"
      },
      descripcion: "Código lineal estándar para ruteo rápido de mercaderías e identificación básica de almacén. Permite lecturas de alta velocidad a distancias de hasta 3 metros."
    },
    {
      id: 1,
      nombre: "Código QR",
      icon: <QrCode size={20} />,
      representacion: "QRCODE",
      detalles: {
        estándar: "QR Code Modelo 2",
        longitud: "Hasta 4,296 alfanuméricos",
        densidad: "Alta (Bidimensional)",
        industria: "Laboratorios, ruteo digital y marketing"
      },
      descripcion: "Código bidimensional capaz de almacenar información completa de trazabilidad, enlaces de servidores, y datos sanitarios en un área reducida y con corrección de errores integrada."
    },
    {
      id: 2,
      nombre: "Número de Lote",
      icon: <Hash size={20} />,
      representacion: "BATCH",
      detalles: {
        estándar: "GS1-128 (IA 10)",
        longitud: "Alfanumérico variable",
        densidad: "Alta (Combinado)",
        industria: "Alimentos, medicinas y fábricas"
      },
      descripcion: "Identifica la tanda o corrida de producción exacta del material. Crítico para la retirada de productos inactivos o caducados y cumplimiento de normas sanitarias de la FDA."
    },
    {
      id: 3,
      nombre: "Identificación Logística",
      icon: <Truck size={20} />,
      representacion: "LOGISTIC",
      detalles: {
        estándar: "SSCC (Serial Shipping Container)",
        longitud: "18 Dígitos numéricos",
        densidad: "Media/Alta (Lineal / 2D)",
        industria: "Navieras, aduanas y bodegas globales"
      },
      descripcion: "Clave única mundial para identificar unidades de transporte como estibas o contenedores, enlazando directamente al manifiesto de carga digital del camión."
    },
    {
      id: 4,
      nombre: "Serie de Activos",
      icon: <Cpu size={20} />,
      representacion: "ASSET",
      detalles: {
        estándar: "GIAI (Global Individual Asset)",
        longitud: "Variable de alta seguridad",
        densidad: "Máxima (Grabado Láser)",
        industria: "Arrendamiento técnico, maquinaria pesada"
      },
      descripcion: "Identificación indestructible de activos de alto valor de la corporación. Garantiza que cada pieza de maquinaria, molde o cilindro de impresión sea inventariable."
    }
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setActiveStep((prev) => (prev + 1) % steps.length);
      }, 3500);
    }
    return () => clearInterval(interval);
  }, [isPlaying, steps.length]);

  return (
    <div className="bg-industrial-blue/50 border border-tech-gray/15 rounded-xl p-6 md:p-8 flex flex-col xl:flex-row gap-8 items-stretch relative overflow-hidden backdrop-blur">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-tech-orange/5 rounded-full blur-2xl pointer-events-none" />

      {/* Lado Izquierdo: Visualizador de código */}
      <div className="xl:w-1/2 flex flex-col justify-between bg-dark-neutral/90 rounded-lg p-6 border border-tech-gray/15 relative min-h-[300px]">
        
        {/* Láser escaneador (Línea naranja animada) */}
        <motion.div
          animate={{
            y: ["0%", "100%", "0%"]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute left-6 right-6 h-0.5 bg-gradient-to-r from-transparent via-tech-orange to-transparent opacity-85 shadow-[0_0_12px_#F28C28] z-10 pointer-events-none"
          style={{ top: "35px", height: "3px" }}
        />

        {/* Header Visualizador */}
        <div className="flex items-center justify-between border-b border-tech-gray/10 pb-4 mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-tech-orange animate-ping" />
            <span className="font-mono text-[10px] uppercase text-tech-gray tracking-wider">
              Sistema Activo de Trazabilidad IMSUB v2.0
            </span>
          </div>
          <span className="font-mono text-xs text-tech-orange bg-tech-orange/10 px-2 py-0.5 rounded">
            Paso 0{steps[activeStep].id + 1}
          </span>
        </div>

        {/* Zona del Render de la Estructura */}
        <div className="flex-1 flex items-center justify-center p-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              className="w-full flex justify-center"
            >
              {activeStep === 0 && (
                /* Dibujo vectorial de Código de Barras */
                <div className="flex items-end justify-center gap-1.5 h-32 w-11/12 max-w-sm">
                  {[1, 3, 1, 2, 4, 1, 2, 1, 3, 1, 4, 2, 1, 2, 3, 1, 2, 4, 1, 2, 1, 3, 4, 1, 2].map((width, idx) => (
                    <div
                      key={idx}
                      className="bg-white h-full"
                      style={{ width: `${width * 3}px`, opacity: idx % 2 === 0 ? 0.95 : 0 }}
                    />
                  ))}
                </div>
              )}

              {activeStep === 1 && (
                /* QR Code de fantasía */
                <div className="grid grid-cols-7 gap-1 h-32 w-32 border-4 border-white p-2 bg-white rounded">
                  {/* Posición top left */}
                  <div className="col-span-2 row-span-2 bg-dark-neutral border border-white" />
                  <div className="col-span-1 bg-white" />
                  <div className="col-span-2 row-span-2 bg-dark-neutral border border-white" />
                  <div className="col-span-2" />
                  
                  {/* Filas medias */}
                  <div className="col-span-1 bg-dark-neutral" />
                  <div className="col-span-1 bg-white" />
                  <div className="col-span-1 bg-dark-neutral" />
                  <div className="col-span-1 bg-white" />
                  <div className="col-span-1 bg-dark-neutral" />
                  <div className="col-span-2 bg-white" />
                  
                  <div className="col-span-2 bg-white" />
                  <div className="col-span-2 row-span-2 bg-dark-neutral border border-white" />
                  <div className="col-span-3 bg-white" />

                  <div className="col-span-2 bg-dark-neutral" />
                  <div className="col-span-2 bg-dark-neutral" />
                </div>
              )}

              {activeStep === 2 && (
                /* Representación de Número de Lote */
                <div className="flex flex-col items-center justify-center font-mono select-none">
                  <div className="text-[10px] text-tech-orange tracking-widest uppercase mb-1">BATCH IDENTIFICATION</div>
                  <div className="text-3xl font-bold tracking-widest text-white border border-tech-gray/25 px-5 py-3 rounded bg-industrial-blue/40">
                    LOTE: <span className="text-tech-orange">IM-2026-99A</span>
                  </div>
                  <div className="text-[9px] text-tech-gray mt-2 font-mono">FECHA DE PROD: 11-06-2026</div>
                </div>
              )}

              {activeStep === 3 && (
                /* Identificación Logística */
                <div className="flex flex-col items-center justify-center select-none w-full">
                  <div className="w-10/12 border border-dashed border-tech-gray/30 p-3 rounded bg-industrial-blue/20">
                    <div className="flex justify-between font-mono text-[9px] text-tech-gray border-b border-tech-gray/10 pb-1.5 mb-2">
                      <span>ORIGEN: QUITO, ECU</span>
                      <span>DEST: LOGÍSTICA S.A.</span>
                    </div>
                    <div className="flex justify-center items-center gap-1 my-1">
                      {[1, 2, 4, 1, 2, 1, 3, 1, 1, 4, 2, 1, 3, 1].map((width, idx) => (
                        <div
                          key={idx}
                          className="bg-white h-10"
                          style={{ width: `${width * 2.5}px`, opacity: idx % 2 === 0 ? 0.9 : 0 }}
                        />
                      ))}
                    </div>
                    <div className="text-center font-mono text-[10px] text-white tracking-[0.2em] mt-1.5 font-bold">
                      (00) 178945612300000015
                    </div>
                  </div>
                </div>
              )}

              {activeStep === 4 && (
                /* Serie de Activos */
                <div className="flex flex-col items-center justify-center select-none">
                  <div className="relative group p-4 border border-tech-orange/20 rounded bg-industrial-blue/30 flex items-center gap-3">
                    <div className="p-2 bg-tech-orange/10 rounded border border-tech-orange/10">
                      <Cpu size={24} className="text-tech-orange" />
                    </div>
                    <div className="font-mono text-left">
                      <div className="text-[10px] text-tech-gray uppercase tracking-widest">ACTIVO IMSUB FIJO</div>
                      <div className="text-sm font-bold text-white tracking-wider">SN: <span className="text-tech-orange">EQP-77491-MX</span></div>
                      <div className="text-[9px] text-green-400 mt-0.5">ESTADO: OPERANDO OK</div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Zona Inferior: Datos que decora */}
        <div className="border-t border-tech-gray/10 pt-4 mt-4 flex items-center justify-between font-mono text-[10px] text-tech-gray">
          <span>TIPO: {steps[activeStep].representacion}</span>
          <span className="text-tech-orange">VERIFICACIÓN STANDARD OK</span>
        </div>

      </div>

      {/* Lado Derecho: Controles e Info técnica */}
      <div className="xl:w-1/2 flex flex-col justify-between">
        <div>
          {/* Navegación por pasos */}
          <div className="flex flex-wrap gap-2 mb-6">
            {steps.map((step) => (
              <button
                key={step.id}
                onClick={() => {
                  setActiveStep(step.id);
                  setIsPlaying(false);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-display font-medium border transition-all duration-300 cursor-pointer ${
                  activeStep === step.id
                    ? "bg-tech-orange border-tech-orange text-dark-neutral font-semibold shadow-md shadow-tech-orange/10"
                    : "bg-industrial-blue/30 border-tech-gray/15 text-tech-gray hover:text-white hover:border-tech-gray/35"
                }`}
              >
                {step.icon}
                <span>{step.nombre}</span>
              </button>
            ))}
          </div>

          {/* Información del paso seleccionado */}
          <div className="min-h-[160px]">
            <h3 className="font-display text-xl font-bold text-white mb-2 flex items-center gap-2">
              <span className="text-tech-orange">#0{steps[activeStep].id + 1}</span>
              {steps[activeStep].nombre}
            </h3>
            <p className="text-sm text-gray-300 font-sans leading-relaxed mb-6">
              {steps[activeStep].descripcion}
            </p>

            {/* Ficha técnica estructurada */}
            <div className="grid grid-cols-2 gap-4 bg-dark-neutral/40 border border-tech-gray/10 p-4 rounded-lg font-mono text-xs">
              <div>
                <span className="text-[10px] text-tech-gray block uppercase tracking-wider mb-0.5">Estándar ISO</span>
                <span className="text-white text-[11px] font-medium">{steps[activeStep].detalles.estándar}</span>
              </div>
              <div>
                <span className="text-[10px] text-tech-gray block uppercase tracking-wider mb-0.5">Densidad de datos</span>
                <span className="text-white text-[11px] font-medium">{steps[activeStep].detalles.densidad}</span>
              </div>
              <div className="mt-2">
                <span className="text-[10px] text-tech-gray block uppercase tracking-wider mb-0.5">Capacidad / Longitud</span>
                <span className="text-white text-[11px] font-medium">{steps[activeStep].detalles.longitud}</span>
              </div>
              <div className="mt-2">
                <span className="text-[10px] text-tech-gray block uppercase tracking-wider mb-0.5">Utilidad Principal</span>
                <span className="text-tech-orange text-[11px] font-medium">{steps[activeStep].detalles.industria}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Play/Pause y Navegación automática */}
        <div className="border-t border-tech-gray/10 pt-5 mt-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              id="play_pause_tech_anim"
              onClick={() => setIsPlaying(!isPlaying)}
              className={`w-9 h-9 rounded-full flex items-center justify-center border cursor-pointer transition-all ${
                isPlaying
                  ? "bg-tech-orange/10 border-tech-orange text-tech-orange hover:bg-tech-orange/20"
                  : "bg-white/5 border-tech-gray/25 text-white hover:bg-white/10"
              }`}
            >
              {isPlaying ? <Pause size={14} /> : <Play size={14} className="ml-0.5" />}
            </button>
            <span className="text-xs text-tech-gray font-sans">
              {isPlaying ? "Transición automática activa" : "Recorrido en pausa"}
            </span>
          </div>

          <button
            id="next_step_tech_anim"
            onClick={() => {
              setActiveStep((prev) => (prev + 1) % steps.length);
              setIsPlaying(false);
            }}
            className="flex items-center gap-1 text-xs text-tech-orange font-mono hover:text-white transition-colors cursor-pointer group"
          >
            Siguiente Paso{" "}
            <ChevronRight
              size={14}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>
        </div>

      </div>

    </div>
  );
}
