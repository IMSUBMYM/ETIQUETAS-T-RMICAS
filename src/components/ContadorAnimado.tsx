import { useEffect, useState, useRef } from "react";

interface ContadorAnimadoProps {
  valorFin: number;
  sufijo?: string;
  prefijo?: string;
  duracionMs?: number;
}

export default function ContadorAnimado({
  valorFin,
  sufijo = "",
  prefijo = "",
  duracionMs = 2000
}: ContadorAnimadoProps) {
  const [contador, setContador] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    let inicio = 0;
    const incremento = valorFin / (duracionMs / 16); // ~60fps
    let timer: NodeJS.Timeout;

    const actualizarContador = () => {
      inicio += incremento;
      if (inicio >= valorFin) {
        setContador(valorFin);
      } else {
        setContador(Math.floor(inicio));
        timer = setTimeout(actualizarContador, 16);
      }
    };

    actualizarContador();
    return () => clearTimeout(timer);
  }, [hasStarted, valorFin, duracionMs]);

  // Formatear miles
  const formatearMilisNum = (val: number) => {
    return val.toLocaleString("es-EC"); // Quito, Ecuador format
  };

  return (
    <span ref={elementRef} className="font-mono font-bold">
      {prefijo}
      {formatearMilisNum(contador)}
      {sufijo}
    </span>
  );
}
