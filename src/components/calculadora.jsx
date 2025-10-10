import { useState, useEffect } from "react";

export default function Calculadora() {
  const [bandas, setBandas] = useState({
    banda1: "2",
    banda2: "2",
    multiplicador: "100",
    tolerancia: "5",
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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
    if (valor >= 1000000) return `${(valor / 1000000).toFixed(2)} MΩ`;
    else if (valor >= 1000) return `${(valor / 1000).toFixed(2)} kΩ`;
    else return `${valor.toFixed(2)} Ω`;
  };

  const handleChange = (banda, valor) => {
    setBandas({ ...bandas, [banda]: valor });
  };

  const valorResistencia = calcularResistencia();

  const resistorSize = isMobile
    ? { width: 240, height: 60, band: 12, gap: 20, wire: 40 }
    : { width: 320, height: 80, band: 16, gap: 30, wire: 60 };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f9fafb",
        padding: isMobile ? "1.5rem 1rem" : "3rem 2rem",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        {/* Header */}
        <div
          style={{
            marginBottom: isMobile ? "2rem" : "3rem",
            textAlign: "center",
          }}
        >
          <h1
            style={{
              fontSize: isMobile ? "1.75rem" : "2.5rem",
              fontWeight: "bold",
              color: "#111827",
              marginBottom: "0.5rem",
            }}
          >
            Calculadora de Resistencias
          </h1>
          <p
            style={{
              color: "#6b7280",
              fontSize: isMobile ? "0.95rem" : "1.125rem",
            }}
          >
            Código de colores - 4 bandas
          </p>
        </div>

        {/* Layout principal */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(12, 1fr)",
            gap: isMobile ? "1.5rem" : "2rem",
            alignItems: "start",
          }}
        >
          {/* Panel izquierdo - Visualización */}
          <div style={{ gridColumn: isMobile ? "span 1" : "span 5" }}>
            <div
              style={{
                backgroundColor: "white",
                borderRadius: "0.75rem",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                padding: isMobile ? "1.5rem" : "2.5rem",
              }}
            >
              <h2
                style={{
                  fontSize: isMobile ? "1.125rem" : "1.25rem",
                  fontWeight: "600",
                  color: "#111827",
                  marginBottom: isMobile ? "1.5rem" : "2rem",
                  textAlign: "center",
                }}
              >
                Visualización
              </h2>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: isMobile ? "2rem" : "3rem",
                  overflowX: "auto",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
                  <div
                    style={{
                      width: resistorSize.wire + "px",
                      height: "3px",
                      background: "#888",
                    }}
                  ></div>

                  <div
                    style={{
                      width: resistorSize.width + "px",
                      height: resistorSize.height + "px",
                      background:
                        "linear-gradient(180deg, #f5e6d3 0%, #d4b896 50%, #f5e6d3 100%)",
                      borderRadius: resistorSize.height / 2 + "px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "2px solid #c4a875",
                      boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: isMobile ? "8px" : "12px",
                        height: "100%",
                        padding: isMobile ? "0 12px" : "0 20px",
                      }}
                    >
                      <div
                        style={{
                          width: resistorSize.band + "px",
                          height: "100%",
                          backgroundColor: colores[bandas.banda1].color,
                        }}
                      ></div>

                      <div
                        style={{
                          width: resistorSize.band + "px",
                          height: "100%",
                          backgroundColor: colores[bandas.banda2].color,
                        }}
                      ></div>

                      <div
                        style={{
                          width: resistorSize.band + "px",
                          height: "100%",
                          backgroundColor:
                            multiplicadores[bandas.multiplicador].color,
                        }}
                      ></div>

                      <div style={{ width: resistorSize.gap + "px" }}></div>

                      <div
                        style={{
                          width: resistorSize.band + "px",
                          height: "100%",
                          backgroundColor: tolerancias[bandas.tolerancia].color,
                        }}
                      ></div>
                    </div>
                  </div>

                  <div
                    style={{
                      width: resistorSize.wire + "px",
                      height: "3px",
                      background: "#888",
                    }}
                  ></div>
                </div>
              </div>

              {/* Resultado */}
              <div
                style={{
                  textAlign: "center",
                  borderTop: "2px solid #e5e7eb",
                  paddingTop: isMobile ? "1.5rem" : "2rem",
                }}
              >
                <div
                  style={{
                    fontSize: isMobile ? "2.5rem" : "3.5rem",
                    fontWeight: "bold",
                    color: "#111827",
                    marginBottom: "0.5rem",
                    lineHeight: "1",
                  }}
                >
                  {formatearValor(valorResistencia)}
                </div>
                <div
                  style={{
                    fontSize: isMobile ? "1.125rem" : "1.5rem",
                    color: "#6b7280",
                    marginTop: "1rem",
                  }}
                >
                  Tolerancia: {tolerancias[bandas.tolerancia].display}
                </div>
              </div>
            </div>

            {/* Guía */}
            {!isMobile && (
              <div
                style={{
                  backgroundColor: "white",
                  borderRadius: "0.75rem",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                  padding: "2rem",
                  marginTop: "2rem",
                }}
              >
                <h3
                  style={{
                    fontSize: "1.125rem",
                    fontWeight: "600",
                    color: "#111827",
                    marginBottom: "1.25rem",
                  }}
                >
                  Guía de uso
                </h3>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.75rem",
                    fontSize: "0.95rem",
                    color: "#374151",
                  }}
                >
                  <div
                    style={{
                      borderLeft: "4px solid #3b82f6",
                      paddingLeft: "1rem",
                      paddingTop: "0.5rem",
                      paddingBottom: "0.5rem",
                    }}
                  >
                    <strong>Banda 1:</strong> Primer dígito del valor
                  </div>
                  <div
                    style={{
                      borderLeft: "4px solid #3b82f6",
                      paddingLeft: "1rem",
                      paddingTop: "0.5rem",
                      paddingBottom: "0.5rem",
                    }}
                  >
                    <strong>Banda 2:</strong> Segundo dígito del valor
                  </div>
                  <div
                    style={{
                      borderLeft: "4px solid #3b82f6",
                      paddingLeft: "1rem",
                      paddingTop: "0.5rem",
                      paddingBottom: "0.5rem",
                    }}
                  >
                    <strong>Banda 3:</strong> Factor multiplicador
                  </div>
                  <div
                    style={{
                      borderLeft: "4px solid #3b82f6",
                      paddingLeft: "1rem",
                      paddingTop: "0.5rem",
                      paddingBottom: "0.5rem",
                    }}
                  >
                    <strong>Banda 4:</strong> Tolerancia o precisión
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Panel derecho - Controles */}
          <div style={{ gridColumn: isMobile ? "span 1" : "span 7" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
                gap: isMobile ? "1rem" : "1.5rem",
              }}
            >
              {/* Banda 1 */}
              <div
                style={{
                  backgroundColor: "white",
                  borderRadius: "0.75rem",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                  padding: isMobile ? "1.25rem" : "1.5rem",
                }}
              >
                <label
                  style={{
                    display: "block",
                    fontSize: "0.75rem",
                    fontWeight: "600",
                    color: "#6b7280",
                    marginBottom: "0.25rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  Banda 1
                </label>
                <h3
                  style={{
                    fontSize: isMobile ? "1.125rem" : "1.25rem",
                    fontWeight: "600",
                    color: "#111827",
                    marginBottom: "0.75rem",
                  }}
                >
                  Primer dígito
                </h3>
                <select
                  value={bandas.banda1}
                  onChange={(e) => handleChange("banda1", e.target.value)}
                  style={{
                    width: "100%",
                    padding: isMobile ? "0.625rem" : "0.75rem",
                    border: "2px solid #d1d5db",
                    borderRadius: "0.5rem",
                    fontSize: isMobile ? "0.95rem" : "1rem",
                    outline: "none",
                    cursor: "pointer",
                  }}
                >
                  {Object.entries(colores).map(([valor, { nombre }]) => (
                    <option key={valor} value={valor}>
                      {nombre} - {valor}
                    </option>
                  ))}
                </select>
                <div
                  style={{
                    marginTop: "0.75rem",
                    padding: isMobile ? "1rem" : "1.25rem",
                    borderRadius: "0.5rem",
                    textAlign: "center",
                    fontSize: isMobile ? "1rem" : "1.125rem",
                    fontWeight: "600",
                    backgroundColor: colores[bandas.banda1].color,
                    color: colores[bandas.banda1].texto,
                  }}
                >
                  {colores[bandas.banda1].nombre}
                </div>
              </div>

              {/* Banda 2 */}
              <div
                style={{
                  backgroundColor: "white",
                  borderRadius: "0.75rem",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                  padding: isMobile ? "1.25rem" : "1.5rem",
                }}
              >
                <label
                  style={{
                    display: "block",
                    fontSize: "0.75rem",
                    fontWeight: "600",
                    color: "#6b7280",
                    marginBottom: "0.25rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  Banda 2
                </label>
                <h3
                  style={{
                    fontSize: isMobile ? "1.125rem" : "1.25rem",
                    fontWeight: "600",
                    color: "#111827",
                    marginBottom: "0.75rem",
                  }}
                >
                  Segundo dígito
                </h3>
                <select
                  value={bandas.banda2}
                  onChange={(e) => handleChange("banda2", e.target.value)}
                  style={{
                    width: "100%",
                    padding: isMobile ? "0.625rem" : "0.75rem",
                    border: "2px solid #d1d5db",
                    borderRadius: "0.5rem",
                    fontSize: isMobile ? "0.95rem" : "1rem",
                    outline: "none",
                    cursor: "pointer",
                  }}
                >
                  {Object.entries(colores).map(([valor, { nombre }]) => (
                    <option key={valor} value={valor}>
                      {nombre} - {valor}
                    </option>
                  ))}
                </select>
                <div
                  style={{
                    marginTop: "0.75rem",
                    padding: isMobile ? "1rem" : "1.25rem",
                    borderRadius: "0.5rem",
                    textAlign: "center",
                    fontSize: isMobile ? "1rem" : "1.125rem",
                    fontWeight: "600",
                    backgroundColor: colores[bandas.banda2].color,
                    color: colores[bandas.banda2].texto,
                  }}
                >
                  {colores[bandas.banda2].nombre}
                </div>
              </div>

              {/* Multiplicador */}
              <div
                style={{
                  backgroundColor: "white",
                  borderRadius: "0.75rem",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                  padding: isMobile ? "1.25rem" : "1.5rem",
                }}
              >
                <label
                  style={{
                    display: "block",
                    fontSize: "0.75rem",
                    fontWeight: "600",
                    color: "#6b7280",
                    marginBottom: "0.25rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  Banda 3
                </label>
                <h3
                  style={{
                    fontSize: isMobile ? "1.125rem" : "1.25rem",
                    fontWeight: "600",
                    color: "#111827",
                    marginBottom: "0.75rem",
                  }}
                >
                  Multiplicador
                </h3>
                <select
                  value={bandas.multiplicador}
                  onChange={(e) =>
                    handleChange("multiplicador", e.target.value)
                  }
                  style={{
                    width: "100%",
                    padding: isMobile ? "0.625rem" : "0.75rem",
                    border: "2px solid #d1d5db",
                    borderRadius: "0.5rem",
                    fontSize: isMobile ? "0.95rem" : "1rem",
                    outline: "none",
                    cursor: "pointer",
                  }}
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
                  style={{
                    marginTop: "0.75rem",
                    padding: isMobile ? "1rem" : "1.25rem",
                    borderRadius: "0.5rem",
                    textAlign: "center",
                    fontSize: isMobile ? "1rem" : "1.125rem",
                    fontWeight: "600",
                    backgroundColor:
                      multiplicadores[bandas.multiplicador].color,
                    color: multiplicadores[bandas.multiplicador].texto,
                  }}
                >
                  {multiplicadores[bandas.multiplicador].display}
                </div>
              </div>

              {/* Tolerancia */}
              <div
                style={{
                  backgroundColor: "white",
                  borderRadius: "0.75rem",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                  padding: isMobile ? "1.25rem" : "1.5rem",
                }}
              >
                <label
                  style={{
                    display: "block",
                    fontSize: "0.75rem",
                    fontWeight: "600",
                    color: "#6b7280",
                    marginBottom: "0.25rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  Banda 4
                </label>
                <h3
                  style={{
                    fontSize: isMobile ? "1.125rem" : "1.25rem",
                    fontWeight: "600",
                    color: "#111827",
                    marginBottom: "0.75rem",
                  }}
                >
                  Tolerancia
                </h3>
                <select
                  value={bandas.tolerancia}
                  onChange={(e) => handleChange("tolerancia", e.target.value)}
                  style={{
                    width: "100%",
                    padding: isMobile ? "0.625rem" : "0.75rem",
                    border: "2px solid #d1d5db",
                    borderRadius: "0.5rem",
                    fontSize: isMobile ? "0.95rem" : "1rem",
                    outline: "none",
                    cursor: "pointer",
                  }}
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
                  style={{
                    marginTop: "0.75rem",
                    padding: isMobile ? "1rem" : "1.25rem",
                    borderRadius: "0.5rem",
                    textAlign: "center",
                    fontSize: isMobile ? "1rem" : "1.125rem",
                    fontWeight: "600",
                    backgroundColor: tolerancias[bandas.tolerancia].color,
                    color: "#000",
                  }}
                >
                  {tolerancias[bandas.tolerancia].display}
                </div>
              </div>
            </div>
          </div>
        </div>

        {isMobile && (
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "0.75rem",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              padding: "1.5rem",
              marginTop: "1.5rem",
            }}
          >
            <h3
              style={{
                fontSize: "1rem",
                fontWeight: "600",
                color: "#111827",
                marginBottom: "1rem",
              }}
            >
              Guía de uso
            </h3>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.625rem",
                fontSize: "0.875rem",
                color: "#374151",
              }}
            >
              <div
                style={{
                  borderLeft: "3px solid #3b82f6",
                  paddingLeft: "0.75rem",
                  paddingTop: "0.375rem",
                  paddingBottom: "0.375rem",
                }}
              >
                <strong>Banda 1:</strong> Primer dígito
              </div>
              <div
                style={{
                  borderLeft: "3px solid #3b82f6",
                  paddingLeft: "0.75rem",
                  paddingTop: "0.375rem",
                  paddingBottom: "0.375rem",
                }}
              >
                <strong>Banda 2:</strong> Segundo dígito
              </div>
              <div
                style={{
                  borderLeft: "3px solid #3b82f6",
                  paddingLeft: "0.75rem",
                  paddingTop: "0.375rem",
                  paddingBottom: "0.375rem",
                }}
              >
                <strong>Banda 3:</strong> Multiplicador
              </div>
              <div
                style={{
                  borderLeft: "3px solid #3b82f6",
                  paddingLeft: "0.75rem",
                  paddingTop: "0.375rem",
                  paddingBottom: "0.375rem",
                }}
              >
                <strong>Banda 4:</strong> Tolerancia
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
