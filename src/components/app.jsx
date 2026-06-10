// ── APP ───────────────────────────────────────────────────────────
function App() {
  return (
    <React.Fragment>
      <window.Nav />
      <window.Hero />
      <window.Proyectos />
      <window.Services />
      <window.Merch />
      <window.Contacto />
    </React.Fragment>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
