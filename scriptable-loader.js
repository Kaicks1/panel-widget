// Widget: panel-widget (cargador remoto)
// Este es el ÚNICO script que hay que pegar en la app Scriptable.
// En cada refresco descarga el formato/diseño real del widget desde
// format-widget en GitHub y lo ejecuta, así el widget siempre usa el
// formato más reciente sin tener que volver a pegar código en el móvil.
const FORMAT_URL = "https://raw.githubusercontent.com/Kaicks1/panel-widget/main/format-widget";
const FORMAT_CACHE_FILE = "panel-widget-format-cache.js";

async function getFormatCode() {
  try {
    const req = new Request(FORMAT_URL + "?t=" + Date.now()); // evita caché
    req.timeoutInterval = 10;
    const code = await req.loadString();
    saveFormatCache(code);
    return code;
  } catch (e) {
    const cached = loadFormatCache();
    if (cached) return cached;
    throw e;
  }
}

function saveFormatCache(code) {
  const fm = FileManager.local();
  const path = fm.joinPath(fm.documentsDirectory(), FORMAT_CACHE_FILE);
  fm.writeString(path, code);
}

function loadFormatCache() {
  const fm = FileManager.local();
  const path = fm.joinPath(fm.documentsDirectory(), FORMAT_CACHE_FILE);
  if (!fm.fileExists(path)) return null;
  return fm.readString(path);
}

try {
  const code = await getFormatCode();
  // Se envuelve en una IIFE async para poder usar "await" de nivel superior
  // dentro del código descargado (eval() por sí solo no lo permite).
  await eval("(async () => {\n" + code + "\n})()");
  // el formato descargado construye, presenta el widget y llama a Script.complete()
} catch (e) {
  const widget = new ListWidget();
  const errTxt = widget.addText("No se pudo cargar el formato del widget");
  errTxt.font = Font.systemFont(12);
  errTxt.textColor = Color.red();
  if (config.runsInWidget) {
    Script.setWidget(widget);
  } else {
    await widget.presentMedium();
  }
  Script.complete();
}
