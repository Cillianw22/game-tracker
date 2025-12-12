import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api.js";

function badgeClass(status) {
  if (status === "Finished") return "bg-success";
  if (status === "Playing") return "bg-primary";
  if (status === "Planned") return "bg-warning text-dark";
  return "bg-secondary";
}

function GameListPage() {
  const [games, setGames] = useState([]);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const loadGames = async (nextFilter, nextSearch) => {
    setLoading(true);

    const params = {};
    if (nextSearch && nextSearch.trim().length > 0) {
      params.search = nextSearch.trim();
    }

    // Never show wishlist on this page
    if (nextFilter === "All") {
      params.status = "Planned,Playing,Finished";
    } else {
      params.status = nextFilter;
    }

    const res = await api.get("/games", { params });
    setGames(res.data);

    setLoading(false);
  };

  useEffect(() => {
    loadGames(filter, search);
  }, [filter, search]);

  const removeGame = async (id) => {
    await api.delete("/games/" + id);
    loadGames(filter, search);
  };

  const counts = useMemo(() => {
    const base = { Planned: 0, Playing: 0, Finished: 0 };
    for (const g of games) {
      if (base[g.status] !== undefined) {
        base[g.status] += 1;
      }
    }
    return base;
  }, [games]);

  return (
    <div className="d-grid gap-3">
      <div className="card">
        <div className="card-body d-flex flex-wrap gap-3 align-items-end justify-content-between">
          <div className="d-flex flex-column gap-2">
            <div className="d-flex flex-wrap gap-2">
              <span className="badge rounded-pill bg-warning text-dark">
                Planned: {counts.Planned}
              </span>
              <span className="badge rounded-pill bg-primary">
                Playing: {counts.Playing}
              </span>
              <span className="badge rounded-pill bg-success">
                Finished: {counts.Finished}
              </span>
            </div>

            <small className="text-secondary">
              Showing {games.length} games {loading ? "(loading...)" : ""}
            </small>
          </div>

          <div className="d-flex flex-wrap gap-2 align-items-end">
            <div>
              <label className="form-label mb-1">Status</label>
              <select
                className="form-select"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option>All</option>
                <option>Planned</option>
                <option>Playing</option>
                <option>Finished</option>
              </select>
            </div>

            <div style={{ minWidth: 260 }}>
              <label className="form-label mb-1">Search</label>
              <div className="input-group">
                <input
                  className="form-control"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by title..."
                />
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={() => setSearch("")}
                  disabled={search.trim().length === 0}
                >
                  Clear
                </button>
              </div>
            </div>

            <Link to="/add" className="btn btn-dark">
              + Add Game
            </Link>
          </div>
        </div>
      </div>

      {games.length === 0 ? (
        <div className="alert alert-secondary mb-0">
          No games match your filter/search.
        </div>
      ) : (
        <div className="row g-3">
          {games.map((g) => (
            <div className="col-12 col-md-6" key={g._id}>
              <div className="card h-100">
                <div className="card-body">
                  <div className="d-flex justify-content-between gap-2">
                    <div>
                      <h5 className="card-title mb-1">{g.title}</h5>
                      <div className="text-secondary small">{g.platform}</div>
                    </div>

                    <span className={"badge align-self-start " + badgeClass(g.status)}>
                      {g.status}
                    </span>
                  </div>

                  <div className="d-flex gap-2 mt-3">
                    <Link
                      to={"/edit/" + g._id + "?from=/"}
                      className="btn btn-outline-primary btn-sm"
                    >
                      Edit
                    </Link>

                    {g.link && (
                      <a
                        href={g.link}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-outline-secondary btn-sm"
                      >
                        Link
                      </a>
                    )}

                    <button
                      onClick={() => removeGame(g._id)}
                      className="btn btn-outline-danger btn-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default GameListPage;
