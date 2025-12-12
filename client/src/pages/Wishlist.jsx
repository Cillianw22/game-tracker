import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api.js";

function badgeClass(status) {
  if (status === "Wishlist") return "bg-info text-dark";
  if (status === "Finished") return "bg-success";
  if (status === "Playing") return "bg-primary";
  if (status === "Planned") return "bg-warning text-dark";
  return "bg-secondary";
}

function Wishlist() {
  const [games, setGames] = useState([]);

  const loadWishlist = async () => {
    const res = await api.get("/games", { params: { status: "Wishlist" } });
    setGames(res.data);
  };

  useEffect(() => {
    loadWishlist();
  }, []);

  const removeGame = async (id) => {
    await api.delete("/games/" + id);
    loadWishlist();
  };

  return (
    <div className="d-grid gap-3">
      <div className="d-flex align-items-center justify-content-between">
        <h3 className="m-0">Wishlist</h3>
        <Link to="/add" className="btn btn-dark">
          + Add Game
        </Link>
      </div>

      {games.length === 0 ? (
        <div className="alert alert-secondary mb-0">
          Your wishlist is empty. Add a game and set its status to Wishlist.
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
                    <span className={"badge align-self-start " + badgeClass(g.status)}>{g.status}</span>
                  </div>

                  <div className="d-flex gap-2 mt-3">
                    <Link
                      to={"/edit/" + g._id + "?from=/wishlist"}
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

export default Wishlist;
