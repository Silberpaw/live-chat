# 💬 Live Chat

Ein moderner Echtzeit-Chat, entwickelt mit **Angular**, **Node.js**, **Express** und **Socket.IO**. Nutzer können sich mit einem Benutzernamen anmelden, Nachrichten in Echtzeit austauschen und sehen, wer gerade online ist.

## ✨ Features

* **Echtzeit-Nachrichten** – Nachrichten werden sofort an alle verbundenen Nutzer übertragen.
* **Online-Nutzer** – Zeigt an, welche Nutzer aktuell verbunden sind.
* **Schreibanzeige** – Zeigt an, wenn andere Nutzer gerade eine Nachricht schreiben.
* **Modernes Design** – Dunkles Design mit violetten und blauen Farbverläufen.
* **Verbindungsstatus** – Zeigt an, ob die Verbindung zum Chat-Server besteht.
* **Angular-Frontend** – Moderne Benutzeroberfläche mit Angular.
* **Socket.IO** – Echtzeit-Kommunikation zwischen Client und Server.

## 🛠️ Technologien

| Technologie | Verwendung                      |
| ----------- | ------------------------------- |
| Angular     | Frontend und Benutzeroberfläche |
| TypeScript  | Programmiersprache              |
| Node.js     | Server-Laufzeitumgebung         |
| Express     | HTTP-Server                     |
| Socket.IO   | Echtzeit-Kommunikation          |
| CSS         | Styling und Layout              |

## 📁 Projektstruktur

```text
live-chat/
├── client/                 # Angular-Frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── app.ts      # Chat-Logik
│   │   │   ├── app.html    # Chat-Oberfläche
│   │   │   └── app.css     # Chat-Design
│   │   ├── index.html
│   │   └── styles.css
│   ├── package.json
│   └── angular.json
├── server.ts               # Socket.IO-Chat-Server
├── package.json
└── README.md
```

## 🚀 Installation

### Voraussetzungen

* [Node.js](https://nodejs.org/) – inklusive npm
* [Git](https://git-scm.com/)
* Ein Terminal, beispielsweise das integrierte Terminal von Visual Studio Code

### 1. Repository klonen

```bash
git clone https://github.com/Silberpaw/live-chat.git
cd live-chat
```

### 2. Server-Abhängigkeiten installieren

Im Hauptverzeichnis:

```bash
npm install
```

### 3. Client-Abhängigkeiten installieren

```bash
cd client
npm install
```

## ▶️ Anwendung starten

Für die lokale Entwicklung müssen der Server und das Angular-Frontend in getrennten Terminals laufen.

### Terminal 1 – Chat-Server

Im Hauptverzeichnis `live-chat`:

```bash
npm run start
```

Falls für den Server kein passendes Start-Skript eingerichtet ist, verwende den in deiner `package.json` vorgesehenen Startbefehl.

Der Server verwendet standardmäßig:

```text
http://localhost:3000
```

### Terminal 2 – Angular-Frontend

Im Verzeichnis `client`:

```bash
npm start
```

Falls dort kein `start`-Skript vorhanden ist, kannst du Angular mit folgendem Befehl starten:

```bash
npx ng serve
```

Öffne anschließend im Browser:

**http://localhost:4200**

> Hinweis: Die Startbefehle hängen von den Skripten in den jeweiligen `package.json`-Dateien ab.

## Chat testen

1. Starte Server und Frontend.
2. Öffne `http://localhost:4200` im Browser.
3. Gib einen Benutzernamen ein.
4. Öffne ein zweites Browserfenster und verwende einen anderen Benutzernamen.
5. Sende Nachrichten und teste die Online-Anzeige sowie die Schreibanzeige.


