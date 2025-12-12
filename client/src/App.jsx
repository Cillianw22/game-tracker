import { Routes, Route, NavLink } from "react-router-dom";
import GameListPage from "./pages/GameListPage.jsx";
import AddGamePage from "./pages/AddGamePage.jsx";
import EditGamePage from "./pages/EditGamePage.jsx";
import Wishlist from "./pages/Wishlist.jsx";

function App() {
  const navClass = ({ isActive }) =>
    "nav-link px-3 rounded-pill " + (isActive ? "bg-light text-dark fw-semibold" : "text-light");

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <span className="navbar-brand fw-semibold">Game Tracker</span>

          <div className="navbar-nav ms-auto gap-2">
            <NavLink to="/" className={navClass} end>
              Games
            </NavLink>

            <NavLink to="/wishlist" className={navClass}>
              Wishlist
            </NavLink>

            <NavLink to="/add" className={navClass}>
              Add Game
            </NavLink>
          </div>
        </div>
      </nav>

      <main className="container py-4">
        <Routes>
          <Route path="/" element={<GameListPage />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/add" element={<AddGamePage />} />
          <Route path="/edit/:id" element={<EditGamePage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
