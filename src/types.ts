export interface Producto {
  id: string;
  numero: string;
  nombre: string;
  items: string[];
  descripcionCompleta: string;
  materiales: string[];
  aplicaciones: string[];
  imagen: string;
}

export interface Industria {
  id: string;
  nombre: string;
  descripcionHover: string;
  imagen: string;
  icono: string; // nombre de icon de lucide
}

export interface SpecTecnica {
  titulo: string;
  descripcion: string;
  icono: string;
}

export interface ContactoForm {
  nombreCompleto: string;
  empresa: string;
  telefono: string;
  correo: string;
  tipoProyecto: string;
  mensaje: string;
}
