import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { api } from "../api.js";

function EditGamePage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const from = searchParams.get("from") || "/";

  const [title, setTitle] = useState("");
  const [platform, setPlatform] = useState("PC");
  const [status, setStatus] = useState("Wishlist");
  const [link, setLink] = useState("");

  const load = async () => {
    const res = await api.get("/games/" + id);
    const game = res.data;
    setTitle(game.title || "");
    setPlatform(game.platform || "PC");
    setStatus(game.status || "Wishlist");
    setLink(game.link || "");
  };

  useEffect(() => {
    load();
  }, []);

  const save = async (e) => {
    e.preventDefault();
    await api.put("/games/" + id, { title, platform, status, link });
    navigate(from);
  };

  return (
    <div className="card">
      <div className="card-body">
        <h4 className="mb-3">Edit Game</h4>

        <form onSubmit={save} className="d-grid gap-3">
          <div>
            <label className="form-label">Title</label>
            <input
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="form-label">Game Link (optional)</label>
            <input
              className="form-control"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="https://store.steampowered.com/..."
            />
          </div>

          <div className="row g-3">
            <div className="col-12 col-md-6">
              <label className="form-label">Platform</label>
              <select
                className="form-select"
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
              >
                <option>PC</option>
                <option>PlayStation</option>
                <option>Xbox</option>
                <option>Switch</option>
              </select>
            </div>

            <div className="col-12 col-md-6">
              <label className="form-label">Status</label>
              <select
                className="form-select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option>Wishlist</option>
                <option>Planned</option>
                <option>Playing</option>
                <option>Finished</option>
              </select>
            </div>
          </div>

          <div className="d-flex gap-2">
            <button className="btn btn-dark" type="submit">
              Save
            </button>
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={() => navigate(from)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditGamePage;
