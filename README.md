
# MERN-Template (React + Express + MongoDB Atlas)

Dieses Projekt ist ein **Template**, das dir als Grundlage für zukünftige MERN-Projekte dient:

- **Client**: React + TypeScript (Vite)
- **Server**: Node.js + Express + TypeScript
- **Datenbank**: MongoDB Atlas (Mongoose)
- **Ziel**: Schnell einstarten, ohne jedes Mal alles neu aufzusetzen.

Die README ist als **Schritt-für-Schritt-Anleitung** und **Checkliste** geschrieben.  
Du sollst sie auch in einem Jahr noch aufschlagen können und sofort wissen:

> *„Was muss ich tun, um dieses Template für ein neues Projekt anzupassen?“*

---

## 1. Was dieses Template enthält

**Ordnerstruktur:**

```text
my-mern-app/
  ├─ client/        # Frontend: React + TypeScript (Vite)
  ├─ server/        # Backend: Express + TypeScript + Mongoose
  └─ README.md      # Diese Anleitung
```

**Features im Beispiel:**

- `/api/status` – liefert einfachen JSON-Status  
- `/api/counter` – liest einen Counter aus der Datenbank  
- `/api/counter/increment` – erhöht den Counter in MongoDB  

Diese Endpunkte dienen als **Beispiel**, damit du sofort prüfen kannst, ob Client ↔ Server ↔ Datenbank funktionieren.  
Du kannst sie später löschen oder erweitern.

---

## 2. Voraussetzungen

Bevor du beginnst:

- Node.js (LTS-Version)  
- npm  
- VSCode  
- Ein kostenloser MongoDB-Atlas-Account auf mongodb.com  

Falls PowerShell `npm` blockiert:

```
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```

---

## 3. Projekt installieren

### 3.1 Client installieren

```
cd client
npm install
```

### 3.2 Server installieren

```
cd server
npm install
```

---

## 4. MongoDB Atlas einrichten

### Schritt 1 – Cluster erstellen

1. Auf atlas.mongodb.com einloggen  
2. **Project → Build a Database**  
3. Free Tier (M0) wählen  
4. Region auswählen (z. B. Frankfurt)  

### Schritt 2 – Benutzer erstellen

Atlas verlangt:
- Benutzername  
- Passwort  

Du benötigst beides in deiner `.env` später.

### Schritt 3 – IP-Zugriff erlauben

Unter **Network Access**:

- „0.0.0.0/0“ (für Entwicklung)  
  oder
- „Add current IP“

### Schritt 4 – Connection String kopieren

Beispiel:

```
mongodb+srv://USER:PASS@cluster0.xxxxx.mongodb.net/
```

---

## 5. Server konfigurieren

### 5.1 `.env` anlegen (im Ordner `server/`)

```
MONGODB_URI=mongodb+srv://USER:PASS@cluster0.xxxxx.mongodb.net/mern-demo?retryWrites=true&w=majority&appName=Cluster0
PORT=4000
```

### 5.2 Server starten

```
cd server
npm run dev
```

Erwartete Ausgabe:

```
✨ Mit MongoDB verbunden.
🚀 Server läuft auf http://localhost:4000
```

---

## 6. Client starten

```
cd client
npm run dev
```

Der Client läuft dann unter:

```
http://localhost:5173
```

---

## 7. Testen

### 7.1 API direkt testen

- `http://localhost:4000/api/status`
- `http://localhost:4000/api/counter`

### 7.2 Client testen

- Status anzeigen  
- Counter hochzählen  
- Wert wird in MongoDB gespeichert  

---

## 8. Projektstruktur verstehen (Backend)

### Ordner `server/src/`

```
index.ts        # Einstiegspunkt, Express-Server + Mongo-Verbindung
models/         # Mongoose-Schemas
routes/         # Routen (Express)
controllers/    # Logik hinter den Routen
services/       # Geschäftslogik
```

Diese Struktur ist erweitbar.

---

## 9. Checkliste: Neues Projekt aus dem Template erstellen

Wenn du dieses Template kopierst:

### ✔ Schritt 1 – Ordner umbenennen

- `my-mern-app` → z. B. `space-miner`, `todo-app`, `shop-system`

### ✔ Schritt 2 – .env anpassen

- neuen DB-Namen setzen  
- optional neuen Cluster-Namen benutzen

### ✔ Schritt 3 – Backend-Routen löschen/anpassen

- `/api/status` behalten  
- Beispiel-Counter entfernen  
- eigene Models erstellen

### ✔ Schritt 4 – Client anpassen

- Beispiel-UI löschen  
- neues Layout / neue Komponenten

### ✔ Schritt 5 – Vite Proxy anpassen

In `client/vite.config.ts`:

```ts
proxy: {
  "/api": {
    target: "http://localhost:4000",
    changeOrigin: true,
  },
}
```

→ Bei Deployment URL ändern.

### ✔ Schritt 6 – Deployment vorbereiten

Client:
- auf Vercel / Netlify / GitHub Pages deployen

Server:
- auf Render / Railway / Fly.io / eigenem Linux-Server  
- `.env` hinterlegen  
- Domain / HTTPS konfigurieren  

---

## 10. Häufige Fehler & Lösungen

### ❌ „MONGODB_URI is not set“
→ `.env` liegt nicht im Ordner `server/`  
→ oder Variable falsch geschrieben

### ❌ „Cannot GET /“
→ Express hat keine Route `/`  
→ immer `/api/...` verwenden

### ❌ Client lädt nichts
→ Proxy falsch  
→ Server nicht gestartet

### ❌ Atlas-Verbindung bricht ab
→ IP nicht freigeschaltet  
→ Passwort falsch  
→ falscher Datenbankname nach `/`

---

## 11. Wie mache ich daraus eine Mobile App?

Drei Wege:

1. **PWA** → direkt installierbare Web-App  
2. **Capacitor App** → Web-App in Android-App verpacken  
3. **React Native** → komplett native App  

Backend & Mongo bleiben gleich.

---

## 12. Fazit

Dieses MERN-Template bietet dir:

- funktionierende Basis  
- saubere Struktur  
- fertige MongoDB-Anbindung  
- Test-Endpunkte  
- Checklisten für neue Projekte  

Viel Spaß beim Entwickeln 🚀  
