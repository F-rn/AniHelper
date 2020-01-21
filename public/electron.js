const { app, BrowserWindow } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");
// Mantiene un riferimento globale all'oggetto window, se non lo fai, la finestra sarà
// chiusa automaticamente quando l'oggetto JavaScript sarà garbage collected.

let win;

function createWindow() {
  // Creazione della finestra del browser.
  win = new BrowserWindow({
    width: 1600,
    height: 900,
    minHeight: 900,
    minWidth: 1440,
    webPreferences: {
      nodeIntegration: true
    }
  });

  //Token ? Ma non funziona
  /*win.addListener("page-title-updated", e => {
    if (e.sender.history.length < 2) return;
    if (
      e.sender.history[2].startsWith("http://francesco.galletta.ovh/anihelper/")
    ) {
      console.log(e.sender.history[2]);
      let token = e.sender.history[2].slice(54, 1123); //JWT Token

      win.loadURL(
        isDev
          ? "http://localhost:3000"
          : `file://${path.join(__dirname, "../build/index.html")}`
      );
      
    } else {
      console.log("nada");
    }
  });*/

  /*win.webContents.on("did-finish-load", e => {
    if (e.sender.history.length < 3) return null;
    if (gotToken === true) return null;

    if (
      e.sender.history[2].startsWith(
        "http://francesco.galletta.ovh/anihelper/"
      ) &&
      gotToken === false
    ) {
      console.log(e.sender.history[2]);
      let token = e.sender.history[2].slice(54, 1136); //JWT Token
      console.log(token);
      gotToken = true;
      win.loadURL(
        isDev
          ? "http://localhost:3000"
          : `file://${path.join(__dirname, "../build/index.html")}`
      );
      win.webContents
        .executeJavaScript(`localStorage.setItem("token", "${token}")`)
        .then(res => {
          win.loadURL(
            isDev
              ? "http://localhost:3000"
              : `file://${path.join(__dirname, "../build/index.html/")}`
          );
        });
    }
  });*/

  // e carica l'index.html dell'app.
  

  win.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html/")}`
  );

  win.on("resize", function() {
    setTimeout(function() {
      var size = win.getSize();
      win.setSize(size[0], parseInt((size[0] * 9) / 16));
    }, 0);
  });

  // Apre il Pannello degli Strumenti di Sviluppo.
  win.webContents.openDevTools();

  //Rimuovo il menu
  win.setMenu(null);

  // Emesso quando la finestra viene chiusa.
  win.on("closed", () => {
    // Eliminiamo il riferimento dell'oggetto window;  solitamente si tiene traccia delle finestre
    // in array se l'applicazione supporta più finestre, questo è il momento in cui
    // si dovrebbe eliminare l'elemento corrispondente.
    win = null;
  });
}

// Questo metodo viene chiamato quando Electron ha finito
// l'inizializzazione ed è pronto a creare le finestre browser.
// Alcune API possono essere utilizzate solo dopo che si verifica questo evento.
app.on("ready", createWindow);

// Terminiamo l'App quando tutte le finestre vengono chiuse.
app.on("window-all-closed", () => {
  // Su macOS è comune che l'applicazione e la barra menù
  // restano attive finché l'utente non esce espressamente tramite i tasti Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // Su macOS è comune ri-creare la finestra dell'app quando
  // viene cliccata l'icona sul dock e non ci sono altre finestre aperte.
  if (win === null) {
    createWindow();
  }
});

// in questo file possiamo includere il codice specifico necessario
// alla nostra app. Si può anche mettere il codice in file separati e richiederlo qui.
