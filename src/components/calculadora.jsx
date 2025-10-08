import { useState } from "react";
import "../components/calculadora.css";

export default function Calculadora() {
  const [bandas, setBandas] = useState({
    banda1: "2",
    banda2: "2",
    multiplicador: "100",
    tolerancia: "5",
  });

  const colores = {
    0: { nombre: "Negro", color: "#1a1a1a", texto: "white" },
    1: { nombre: "Café", color: "#8B4513", texto: "white" },
    2: { nombre: "Rojo", color: "#FF0000", texto: "white" },
    3: { nombre: "Naranja", color: "#FF8C00", texto: "white" },
    4: { nombre: "Amarillo", color: "#FFD700", texto: "black" },
    5: { nombre: "Verde", color: "#228B22", texto: "white" },
    6: { nombre: "Azul", color: "#0047AB", texto: "white" },
    7: { nombre: "Violeta", color: "#8B00FF", texto: "white" },
    8: { nombre: "Gris", color: "#808080", texto: "white" },
    9: { nombre: "Blanco", color: "#F5F5F5", texto: "black" },
  };

  const multiplicadores = {
    0.01: {
      nombre: "Plata",
      color: "#C0C0C0",
      texto: "black",
      display: "×0.01",
    },
    0.1: { nombre: "Oro", color: "#FFD700", texto: "black", display: "×0.1" },
    1: { nombre: "Negro", color: "#1a1a1a", texto: "white", display: "×1" },
    10: { nombre: "Café", color: "#8B4513", texto: "white", display: "×10" },
    100: { nombre: "Rojo", color: "#FF0000", texto: "white", display: "×100" },
    1000: {
      nombre: "Naranja",
      color: "#FF8C00",
      texto: "white",
      display: "×1K",
    },
    10000: {
      nombre: "Amarillo",
      color: "#FFD700",
      texto: "black",
      display: "×10K",
    },
    100000: {
      nombre: "Verde",
      color: "#228B22",
      texto: "white",
      display: "×100K",
    },
    1000000: {
      nombre: "Azul",
      color: "#0047AB",
      texto: "white",
      display: "×1M",
    },
    10000000: {
      nombre: "Violeta",
      color: "#8B00FF",
      texto: "white",
      display: "×10M",
    },
  };

  const tolerancias = {
    1: { nombre: "Café", color: "#8B4513", display: "±1%" },
    2: { nombre: "Rojo", color: "#FF0000", display: "±2%" },
    5: { nombre: "Oro", color: "#FFD700", display: "±5%" },
    10: { nombre: "Plata", color: "#C0C0C0", display: "±10%" },
  };

  const calcularResistencia = () => {
    const valor =
      (parseInt(bandas.banda1) * 10 + parseInt(bandas.banda2)) *
      parseFloat(bandas.multiplicador);
    return valor;
  };

  const formatearValor = (valor) => {
    if (valor >= 1000000) {
      return `${(valor / 1000000).toFixed(2)} MΩ`;
    } else if (valor >= 1000) {
      return `${(valor / 1000).toFixed(2)} kΩ`;
    } else {
      return `${valor.toFixed(2)} Ω`;
    }
  };

  const handleChange = (banda, valor) => {
    setBandas({ ...bandas, [banda]: valor });
  };

  const valorResistencia = calcularResistencia();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-950 to-gray-900 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-extrabold text-white mb-3 drop-shadow-lg">
            ⚡ Calculadora de Resistencias
          </h1>
          <p className="text-blue-300 text-lg">Código de colores • 4 bandas</p>
        </div>

        {/* Visualización Principal */}
        <div className="bg-gradient-to-br from-white to-gray-100 rounded-3xl p-10 shadow-2xl mb-8 border-4 border-gray-300">
          {/* Resistencia Visual */}
          <div className="flex justify-center items-center mb-10">
            <div className="resistor-container">
              <div className="resistor-wire resistor-wire-left"></div>
              <div className="resistor-body">
                <div className="resistor-bands">
                  <div
                    className="resistor-band"
                    style={{ backgroundColor: colores[bandas.banda1].color }}
                  ></div>
                  <div
                    className="resistor-band"
                    style={{ backgroundColor: colores[bandas.banda2].color }}
                  ></div>
                  <div
                    className="resistor-band"
                    style={{
                      backgroundColor:
                        multiplicadores[bandas.multiplicador].color,
                    }}
                  ></div>
                  <div className="resistor-gap"></div>
                  <div
                    className="resistor-band"
                    style={{
                      backgroundColor: tolerancias[bandas.tolerancia].color,
                    }}
                  ></div>
                </div>
              </div>
              <div className="resistor-wire resistor-wire-right"></div>
            </div>
          </div>

          {/* Resultado */}
          <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 shadow-lg">
            <div className="text-6xl font-black text-white mb-3 tracking-tight">
              {formatearValor(valorResistencia)}
            </div>
            <div className="text-3xl text-blue-100 font-semibold">
              {tolerancias[bandas.tolerancia].display}
            </div>
          </div>
        </div>

        {/* Panel de Controles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Banda 1 */}
          <div className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <label className="block text-sm font-bold text-gray-500 uppercase tracking-wide mb-2">
              Banda 1
            </label>
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Primer Dígito
            </h3>
            <select
              value={bandas.banda1}
              onChange={(e) => handleChange("banda1", e.target.value)}
              className="w-full p-3 border-3 border-gray-300 rounded-xl text-base font-semibold focus:border-blue-500 focus:ring-4 focus:ring-blue-200 focus:outline-none transition-all"
            >
              {Object.entries(colores).map(([valor, { nombre }]) => (
                <option key={valor} value={valor}>
                  {nombre} - {valor}
                </option>
              ))}
            </select>
            <div
              className="mt-4 p-5 rounded-xl text-center font-bold text-xl shadow-inner"
              style={{
                backgroundColor: colores[bandas.banda1].color,
                color: colores[bandas.banda1].texto,
              }}
            >
              {colores[bandas.banda1].nombre}
            </div>
          </div>

          {/* Banda 2 */}
          <div className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <label className="block text-sm font-bold text-gray-500 uppercase tracking-wide mb-2">
              Banda 2
            </label>
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Segundo Dígito
            </h3>
            <select
              value={bandas.banda2}
              onChange={(e) => handleChange("banda2", e.target.value)}
              className="w-full p-3 border-3 border-gray-300 rounded-xl text-base font-semibold focus:border-blue-500 focus:ring-4 focus:ring-blue-200 focus:outline-none transition-all"
            >
              {Object.entries(colores).map(([valor, { nombre }]) => (
                <option key={valor} value={valor}>
                  {nombre} - {valor}
                </option>
              ))}
            </select>
            <div
              className="mt-4 p-5 rounded-xl text-center font-bold text-xl shadow-inner"
              style={{
                backgroundColor: colores[bandas.banda2].color,
                color: colores[bandas.banda2].texto,
              }}
            >
              {colores[bandas.banda2].nombre}
            </div>
          </div>

          {/* Multiplicador */}
          <div className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <label className="block text-sm font-bold text-gray-500 uppercase tracking-wide mb-2">
              Banda 3
            </label>
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Multiplicador
            </h3>
            <select
              value={bandas.multiplicador}
              onChange={(e) => handleChange("multiplicador", e.target.value)}
              className="w-full p-3 border-3 border-gray-300 rounded-xl text-base font-semibold focus:border-blue-500 focus:ring-4 focus:ring-blue-200 focus:outline-none transition-all"
            >
              {Object.entries(multiplicadores).map(
                ([valor, { nombre, display }]) => (
                  <option key={valor} value={valor}>
                    {nombre} {display}
                  </option>
                )
              )}
            </select>
            <div
              className="mt-4 p-5 rounded-xl text-center font-bold text-xl shadow-inner"
              style={{
                backgroundColor: multiplicadores[bandas.multiplicador].color,
                color: multiplicadores[bandas.multiplicador].texto,
              }}
            >
              {multiplicadores[bandas.multiplicador].display}
            </div>
          </div>

          {/* Tolerancia */}
          <div className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <label className="block text-sm font-bold text-gray-500 uppercase tracking-wide mb-2">
              Banda 4
            </label>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Tolerancia</h3>
            <select
              value={bandas.tolerancia}
              onChange={(e) => handleChange("tolerancia", e.target.value)}
              className="w-full p-3 border-3 border-gray-300 rounded-xl text-base font-semibold focus:border-blue-500 focus:ring-4 focus:ring-blue-200 focus:outline-none transition-all"
            >
              {Object.entries(tolerancias).map(
                ([valor, { nombre, display }]) => (
                  <option key={valor} value={valor}>
                    {nombre} {display}
                  </option>
                )
              )}
            </select>
            <div
              className="mt-4 p-5 rounded-xl text-center font-bold text-xl shadow-inner text-black"
              style={{ backgroundColor: tolerancias[bandas.tolerancia].color }}
            >
              {tolerancias[bandas.tolerancia].display}
            </div>
          </div>
        </div>

        {/* Guía de uso */}
        <div className="bg-gradient-to-r from-blue-900 to-purple-900 rounded-2xl p-8 shadow-xl">
          <h3 className="text-2xl font-bold mb-4 text-white flex items-center gap-2">
            📚 Guía Rápida
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-blue-100">
            <div className="bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur-sm">
              <strong className="text-yellow-300">Banda 1:</strong> Primer
              dígito del valor
            </div>
            <div className="bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur-sm">
              <strong className="text-yellow-300">Banda 2:</strong> Segundo
              dígito del valor
            </div>
            <div className="bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur-sm">
              <strong className="text-yellow-300">Banda 3:</strong> Factor
              multiplicador
            </div>
            <div className="bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur-sm">
              <strong className="text-yellow-300">Banda 4:</strong> Tolerancia o
              precisión
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
