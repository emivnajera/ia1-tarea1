// Estados iniciales
let visitedStates = new Set();
const states = [
  { position: "A", left: "sucio", right: "sucio" },
  { position: "A", left: "limpio", right: "sucio" },
  { position: "A", left: "sucio", right: "limpio" },
  { position: "A", left: "limpio", right: "limpio" },
  { position: "B", left: "sucio", right: "sucio" },
  { position: "B", left: "limpio", right: "sucio" },
  { position: "B", left: "sucio", right: "limpio" },
  { position: "B", left: "limpio", right: "limpio" }
];

const logDiv = document.getElementById("log");

// Función para limpiar
function clean(state) {
  if (state.position === "A" && state.left === "sucio") state.left = "limpio";
  if (state.position === "B" && state.right === "sucio") state.right = "limpio";
}

// Función para moverse
function move(state) {
  state.position = state.position === "A" ? "B" : "A";
}

// Registrar log
function logState(state) {
  const stateString = JSON.stringify(state);
  if (!visitedStates.has(stateString)) {
    visitedStates.add(stateString);
    logDiv.innerHTML += `<div>Visitando: ${stateString}</div>`;
  }
}

// Ejecutar aspiradora
function runVacuum() {
  visitedStates.clear();
  logDiv.innerHTML = "";
  let currentState = { position: "A", left: "sucio", right: "sucio" };

  logState(currentState);

  const interval = setInterval(() => {
    if (visitedStates.size === states.length) {
      clearInterval(interval);
      logDiv.innerHTML += "<div><strong>Tarea completada: Todos los estados visitados.</strong></div>";
      return;
    }
    clean(currentState);
    move(currentState);
    logState(currentState);
  }, 1000);
}
