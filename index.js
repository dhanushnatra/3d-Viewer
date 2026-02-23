import { app, BrowserWindow } from "electron";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createWindow() {
	const win = new BrowserWindow({
		width: 1200,
		height: 800,
		autoHideMenuBar: true,
		webPreferences: {
			contextIsolation: true,
			nodeIntegration: false,
			sandbox: false,
		},
	});

	win.loadFile(path.join(__dirname, "/src/index.html"));
}

app.whenReady().then(createWindow);
