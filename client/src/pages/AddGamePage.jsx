import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api.js";

function AddGamePage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [platform, setPlatform] = useState("PC");
  const [status, setStatus] = useState("Wishlist");
  const [link, setLink] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    await api.post("/games", { title, platform, status, link });
    navigate("/");
  };

  return (
    <div className="card">
      <div className="card-body">
        <h4 className="mb-3">Add Game</h4>

        <form onSubmit={submit} className="d-grid gap-3">
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
              Add
            </button>
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={() => navigate("/")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddGamePage;
