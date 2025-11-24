import { useEffect, useState } from "react";

// Typen für die Antworten vom Server
type StatusResponse = {
  status: string;
  message: string;
  time: string;
};

type CounterResponse = {
  value: number;
};

function App() {
  // Text zum Serverstatus
  const [statusText, setStatusText] = useState<string>("(noch nichts geladen)");
  // Counter-Wert, kommt vom Server
  const [counter, setCounter] = useState<number | null>(null);
  // Fehleranzeige (optional, aber hilfreich zum Lernen)
  const [error, setError] = useState<string | null>(null);

  // Beim ersten Render: Status + Counter vom Server laden
  useEffect(() => {
    const loadFromServer = async () => {
      try {
        setError(null);

        // 1) Status abfragen
        const statusRes = await fetch("/api/status");
        if (!statusRes.ok) {
          throw new Error("Status-Request fehlgeschlagen");
        }
        const statusData: StatusResponse = await statusRes.json();
        setStatusText(`${statusData.status}: ${statusData.message}`);

        // 2) Counter abfragen
        const counterRes = await fetch("/api/counter");
        if (!counterRes.ok) {
          throw new Error("Counter-Request fehlgeschlagen");
        }
        const counterData: CounterResponse = await counterRes.json();
        setCounter(counterData.value);
      } catch (e) {
        console.error("Fehler beim Initial-Load:", e); // // Debug-Ausgabe in der Konsole
        setError("Konnte nicht mit dem Server kommunizieren.");
      }
    };

    loadFromServer();
  }, []);

  // Klick auf den Button: Counter auf dem Server erhöhen
  const handleIncrement = async () => {
    try {
      setError(null);

      const res = await fetch("/api/counter/increment", {
        method: "POST",
      });

      if (!res.ok) {
        throw new Error("Increment-Request fehlgeschlagen");
      }

      const data: CounterResponse = await res.json();
      setCounter(data.value); // // neuen Wert vom Server übernehmen
    } catch (e) {
      console.error("Fehler beim Increment:", e); // // Debug-Ausgabe
      setError("Fehler beim Hochzählen.");
    }
  };

  return (
    <div style={{ padding: "1rem", fontFamily: "sans-serif" }}>
      <h1>MERN Demo – minimale Serverkommunikation</h1>

      <section>
        <h2>Server-Status</h2>
        <p>{statusText}</p>
      </section>

      <section>
        <h2>Counter (Server-gesteuert)</h2>
        <p>
          Aktueller Wert:{" "}
          {counter !== null ? counter : "(wird geladen oder Fehler)"}
        </p>
        <button onClick={handleIncrement}>+1</button>
      </section>

      {error && (
        <section style={{ marginTop: "1rem", color: "red" }}>
          <strong>Fehler:</strong> {error}
        </section>
      )}
    </div>
  );
}

export default App;
