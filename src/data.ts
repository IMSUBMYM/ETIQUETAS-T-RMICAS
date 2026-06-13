import { Producto, Industria, SpecTecnica } from "./types";

export const PRODUCTOS: Producto[] = [
  {
    id: "almacenes",
    numero: "01",
    nombre: "Etiquetas para Almacenes",
    items: [
      "Control de inventarios en tiempo real",
      "Identificación de ubicaciones físicas y racks",
      "Sistemas de gestión logística simplificada"
    ],
    descripcionCompleta: "Nuestras etiquetas de alta transferencia térmica para almacenes están preparadas para resistir la fricción, cambios de luz y humedad ambiental. Son el pilar idóneo para implementar lecturas de código de barras continuas con cero errores en la localización de paletas y estantes.",
    materiales: [
      "Papel transferencia térmica de alto contraste",
      "Polipropileno mate y brillante para alta durabilidad",
      "Adhesivos acrílicos reforzados para superficies metálicas rugosas"
    ],
    aplicaciones: [
      "Codificación de racks de almacenamiento (vigas y montantes)",
      "Identificación de pallets y cajas de arrastre",
      "Señalización técnica de zonas de tránsito interno"
    ],
    imagen: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: "bodegas",
    numero: "02",
    nombre: "Etiquetas para Bodegas",
    items: [
      "Control estricto de rotación de stock",
      "Facilidad para recepción y despacho veloz",
      "Trazabilidad total de la cadena de suministro"
    ],
    descripcionCompleta: "Diseñadas para entornos dinámicos de movimiento de mercadería frecuente. Facilitan la lectura y el procesamiento manual y automatizado, reduciendo a cero las mermas de inventario y optimizando los tiempos de despacho y cross-docking.",
    materiales: [
      "Papel térmico directo de alta sensibilidad sin ribbon",
      "Poliéster duradero para ambientes semi-industriales",
      "Adhesivos removibles de alta adherencia sin residuos"
    ],
    aplicaciones: [
      "Etiquetas de envío y ruteo express",
      "Identificación interna de SKUs y lotes recibidos",
      "Etiquetado de inventario de rápida rotación"
    ],
    imagen: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: "laboratorios",
    numero: "03",
    nombre: "Etiquetas para Laboratorios",
    items: [
      "Identificación inconfundible de muestras médicas",
      "Estricto control y archivo documental clínico",
      "Máxima resistencia y legibilidad extrema a bajas temperaturas"
    ],
    descripcionCompleta: "Las muestras médicas y biológicas requieren una precisión absoluta. Fabricamos etiquetas que soportan el congelamiento extremo, procesos de autoclave, centrifugado, y el contacto con alcoholes y solventes químicos sin comprometer la legibilidad del código.",
    materiales: [
      "Polipropileno criogénico especializado",
      "Película sintética de alta resistencia química",
      "Adhesivos acrílicos de grado médico no tóxicos"
    ],
    aplicaciones: [
      "Etiquetado de tubos de ensayo y placas de Petri",
      "Identificación de muestras criogénicas en nitrógeno líquido",
      "Control de reactivos químicos y muestras clínicas"
    ],
    imagen: "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: "fabricas",
    numero: "04",
    nombre: "Etiquetas para Fábricas",
    items: [
      "Monitoreo del flujo de producción continuo",
      "Control interno de piezas y ensambles (WIP)",
      "Gestión de procesos bajo normas de calidad exigentes"
    ],
    descripcionCompleta: "En el corazón de la manufactura, la información debe ser indestructible. Estas etiquetas soportan temperaturas operacionales elevadas, vapores industriales, aceites y grasas de maquinaria, asegurando que cada componente mantenga su trazabilidad desde el ingreso de insumos hasta el embalaje final.",
    materiales: [
      "Poliéster plata industrial de ultra resistencia",
      "Vinilo de alta flexibilidad para formas complejas",
      "Adhesivos solventes permanentes de fusión en caliente"
    ],
    aplicaciones: [
      "Etiquetado de motores, maquinaria y herramientas activas",
      "Placas de datos de maquinaria y números de serie industriales",
      "Identificación de materias primas y Work In Progress (WIP)"
    ],
    imagen: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: "flexografia",
    numero: "05",
    nombre: "Flexografía Industrial",
    items: [
      "Impresión multicolor de alta resolución y nitidez",
      "Producción de grandes volúmenes a escala corporativa",
      "Acabados duraderos con tintas UV estables"
    ],
    descripcionCompleta: "La flexografía revolucionó la escala visual del empaque. IMSUB M&M ofrece impresión rotativa de alta velocidad para etiquetas de marca en rollos continuos, combinando la precisión milimétrica del color con acabados de alta resistencia comercial y estética impecable.",
    materiales: [
      "Papel e Ilustración Couché de alta opacidad",
      "BOPP (Polipropileno Biorientado) Transparente, Blanco y Metalizado",
      "Barnices protectores UV (Mate o Brillante) y Laminados transparentes"
    ],
    aplicaciones: [
      "Etiquetado frontal de productos masivos de consumo",
      "Sustratos flexibles para empaque primario alimenticio",
      "Etiquetas promocionales a todo color en rollos de alta tirada"
    ],
    imagen: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=1200"
  }
];

export const INDUSTRIAS: Industria[] = [
  {
    id: "almacenes-ind",
    nombre: "Almacenes",
    descripcionHover: "Identificación de posiciones, ubicaciones estratégicas y asignación de productos en tiempo real con escaneo fluido.",
    imagen: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=1200",
    icono: "Boxes"
  },
  {
    id: "bodegas-ind",
    nombre: "Bodegas",
    descripcionHover: "Control blindado de ingreso, egreso veloz y stock crítico con trazabilidad total sin fricción en el punto de control.",
    imagen: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=1200",
    icono: "Database"
  },
  {
    id: "laboratorios-ind",
    nombre: "Laboratorios",
    descripcionHover: "Etiquetas certificadas de máxima resistencia a la humedad, derrames químicos y temperaturas extremas bajo cero.",
    imagen: "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&q=80&w=1200",
    icono: "FlaskConical"
  },
  {
    id: "alimenticia-ind",
    nombre: "Industria Alimenticia",
    descripcionHover: "Cumplimiento normativo estricto, impresión nítida de fechas de vencimiento, lote de producción y tablas nutricionales.",
    imagen: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1200",
    icono: "Apple"
  },
  {
    id: "logistica-ind",
    nombre: "Empresas Logísticas",
    descripcionHover: "Direccionamiento logístico ágil, enrutamiento, despacho de paquetes y seguimiento satelital de contenedores.",
    imagen: "https://images.unsplash.com/photo-1519003722824-192514de74b7?auto=format&fit=crop&q=80&w=1200",
    icono: "Truck"
  },
  {
    id: "distribucion-ind",
    nombre: "Centros de Distribución",
    descripcionHover: "Clasificación automatizada masiva de SKUs y unidades paletizadas bajo flujos tensos de demanda masiva.",
    imagen: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1200",
    icono: "LayoutGrid"
  },
  {
    id: "fabricas-ind",
    nombre: "Fábricas",
    descripcionHover: "Control en línea de ensamble, etiquetado de componentes intermedios (WIP) y acreditación de producto terminado certificado.",
    imagen: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200",
    icono: "Factory"
  },
  {
    id: "comercio-ind",
    nombre: "Comercio Especializado",
    descripcionHover: "Etiquetado estético de precios al público, códigos de barra EAN/UPC y control preventivo de pérdidas en góndolas.",
    imagen: "https://images.unsplash.com/photo-1566576912321-d58def7a6088?auto=format&fit=crop&q=80&w=1200",
    icono: "ShoppingBag"
  }
];

export const SPECS_TECNOLOGIA: SpecTecnica[] = [
  {
    titulo: "Alta Resolución Operativa",
    descripcion: "Impresión de alta densidad que supera los 300 DPI, ideal para códigos de barras ultra-densos y códigos datamatrix pequeños.",
    icono: "Cpu"
  },
  {
    titulo: "Adhesivos Especializados",
    descripcion: "Adhesivos específicos aprobados para congelamiento extremo, superficies oleosas, plásticos corrugados y remoción libre de manchas.",
    icono: "ShieldCheck"
  },
  {
    titulo: "Materiales Sintéticos y Fibras",
    descripcion: "Amplia gama en polipropileno, poliéster de seguridad termo-resistente, papel térmico directo de alta sensibilidad y películas mate.",
    icono: "Layers"
  },
  {
    titulo: "Compatibilidad Standard Escáner",
    descripcion: "Nuestros códigos y etiquetas son validados bajo estándares GS1 para garantizar lecturas instantáneas en cualquier dispositivo.",
    icono: "QrCode"
  }
];

export const GALERIA_IMAGENES = [
  {
    url: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=1200",
    categoria: "Trazabilidad",
    descripcion: "Etiquetado de componentes logísticos críticos con códigos de barras y códigos QR en ambientes industriales oscuros."
  },
  {
    url: "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&q=80&w=1200",
    categoria: "Laboratorios",
    descripcion: "Etiqueta criogénica de alta visibilidad resistente a nitrógeno líquido sobre tubos de ensayo clínicos."
  },
  {
    url: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1200",
    categoria: "Almacenes",
    descripcion: "Operación logística optimizada con códigos de ubicación de alta transferencia y máxima resolución."
  },
  {
    url: "https://images.unsplash.com/photo-1601972599720-36938d4ecd31?auto=format&fit=crop&q=80&w=1200",
    categoria: "Flexografía",
    descripcion: "Rollos de etiquetas impresas comercialmente con tintas UV en maquinaria rotativa de seis colores."
  },
  {
    url: "https://images.unsplash.com/photo-1589793907316-f9401554611a?auto=format&fit=crop&q=80&w=1200",
    categoria: "Producción",
    descripcion: "Insumos gráficos y rollos listos para etiquetado térmico directo en embalaje secundario."
  },
  {
    url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1200",
    categoria: "Tecnología",
    descripcion: "Inspección digital y trazabilidad sistémica combinando hardware de escaneo robusto."
  }
];
