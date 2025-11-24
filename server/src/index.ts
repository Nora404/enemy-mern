// -----------------------------------------------------------------------------
// Einstiegspunkt des Backends: Initialisiert Express, verbindet die MongoDB,
// definiert Beispiel-Endpunkte und startet den Server.
// Dieses File dient als Vorlage für zukünftige MERN-Projekte.
// -----------------------------------------------------------------------------

import express, { Request, Response } from "express";
import cors from "cors";

// Mongoose stellt die Verbindung zu MongoDB her und ermöglicht das Arbeiten
// mit Schemas und Models (vergleichbar mit Tabellenstrukturen).
import mongoose, { Schema, Document } from "mongoose";

// dotenv lädt Variablen aus der .env-Datei (z. B. MONGODB_URI)
import dotenv from "dotenv";
dotenv.config();

// Port aus .env lesen – falls nicht gesetzt, Standardwert 4000
const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;

const app = express();

// Middleware: CORS erlaubt externe Zugriffe (z. B. vom React-Client)
app.use(cors());

// Middleware: Parsen von JSON-Request-Bodies
app.use(express.json());

// -----------------------------------------------------------------------------
// Mongoose: Beispielschema für einen Counter
// Dieses Beispiel zeigt, wie man ein Model erstellt.
// Für eigene Projekte einfach ein neues Schema anlegen (models/).
// -----------------------------------------------------------------------------

// TypeScript-Interface beschreibt die Form eines Counter-Dokuments
interface ICounter extends Document {
  value: number;
}

// Schema definiert Felder und deren Typen für die MongoDB-Collection
const counterSchema = new Schema<ICounter>({
  value: { type: Number, required: true },
});

// Model repräsentiert die Collection "counters" in MongoDB
const CounterModel = mongoose.model<ICounter>("Counter", counterSchema);

// Hilfsfunktion: Holt den Counter oder legt ihn an, wenn keiner existiert
async function getOrCreateCounter(): Promise<ICounter> {
  let counter = await CounterModel.findOne();
  if (!counter) {
    counter = new CounterModel({ value: 0 });
    await counter.save();
  }
  return counter;
}

// -----------------------------------------------------------------------------
// API-Routen
// Diese Beispiel-Routen dienen als Funktionsprüfung für Client & Server.
// -----------------------------------------------------------------------------

// Healthcheck – prüfbar via: GET http://localhost:4000/api/status
app.get("/api/status", (req: Request, res: Response) => {
  res.json({
    status: "ok",
    message: "Server läuft",
    time: new Date().toISOString(),
  });
});

// Counter aus der Datenbank lesen
app.get("/api/counter", async (req: Request, res: Response) => {
  try {
    const counter = await getOrCreateCounter();
    res.json({ value: counter.value });
  } catch (err) {
    res.status(500).json({ error: "Fehler beim Lesen des Counters" });
  }
});

// Counter erhöhen und das Ergebnis zurückgeben
app.post("/api/counter/increment", async (req: Request, res: Response) => {
  try {
    const counter = await getOrCreateCounter();
    counter.value += 1;
    await counter.save();
    res.json({ value: counter.value });
  } catch (err) {
    res.status(500).json({ error: "Fehler beim Erhöhen des Counters" });
  }
});

// -----------------------------------------------------------------------------
// Serverstart: Erst verbinden wir die Datenbank, dann starten wir Express.
// Dadurch verhindern wir, dass der Server ohne Datenbank läuft.
// -----------------------------------------------------------------------------

async function startServer() {
  try {
    const uri = process.env.MONGODB_URI;

    // Falls .env fehlt oder MONGODB_URI falsch ist → klarer Fehler
    if (!uri) {
      throw new Error("MONGODB_URI ist nicht gesetzt. Bitte .env prüfen.");
    }

    // Verbindung zu MongoDB herstellen
    await mongoose.connect(uri);
    console.log("Mit MongoDB verbunden.");

    // Express-Server starten
    app.listen(PORT, () => {
      console.log(`Server läuft auf http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Konnte nicht mit MongoDB verbinden:", error);
    process.exit(1); // harter Abbruch → verhindert halblaufenden Server
  }
}

startServer();
