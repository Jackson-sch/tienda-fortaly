import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount) {
  const formatter = new Intl.NumberFormat("es-ES", {
    style: "decimal", // Usamos "decimal" para evitar el código de moneda por defecto
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const formattedNumber = formatter.format(amount).replace(",", ".");
  return `S/ ${formattedNumber}`;
}