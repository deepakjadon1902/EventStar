import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Search, MapPin, Shapes } from "lucide-react";
import Container from "../layout/Container";
import { regionLabels, categoryLabels } from "../../data/labels";
export default function EventSearch() {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [region, setRegion] = useState("");
  const [category, setCategory] = useState("");
  return (
    <Container>
      <form
        className="discovery-search"
        onSubmit={(e) => {
          e.preventDefault();
          const params = new URLSearchParams();
          if (q.trim()) params.set("q", q.trim());
          if (region) params.set("region", region);
          if (category) params.set("category", category);
          navigate(`/events${params.size ? `?${params}` : ""}`);
        }}
      >
        <div className="discovery-field search-keyword">
          <Search size={19} aria-hidden="true" />
          <div>
            <label htmlFor="discover-search">Event or city</label>
            <input
              id="discover-search"
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search events or cities"
            />
          </div>
        </div>
        <div className="discovery-field">
          <MapPin size={19} aria-hidden="true" />
          <div>
            <label htmlFor="discover-region">Location</label>
            <select
              id="discover-region"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
            >
              <option value="">Anywhere</option>
              {Object.entries(regionLabels).map(([id, label]) => (
                <option key={id} value={id}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="discovery-field">
          <Shapes size={19} aria-hidden="true" />
          <div>
            <label htmlFor="discover-category">Interest</label>
            <select
              id="discover-category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">All interests</option>
              {Object.entries(categoryLabels).map(([id, label]) => (
                <option key={id} value={id}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button type="submit" className="button button-primary">
          Find events <ArrowRight size={17} aria-hidden="true" />
        </button>
      </form>
    </Container>
  );
}
