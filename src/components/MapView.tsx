import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Activity } from "@/types/activity";
import { ActivityDetailDialog } from "@/components/ActivityDetailDialog";
import { getCategoryColor, getDisplayCategory } from "@/lib/categoryColors";
import { DollarSign, ExternalLink, Hourglass, MapPin, Maximize2, Minimize2 } from "lucide-react";

interface MapViewProps {
  activities: Activity[];
  cartItemIds: Set<string>;
  onAddToCart: (activity: Activity) => void;
  onRemoveFromCart: (id: string) => void;
}

const FitBounds = ({ activities }: { activities: Activity[] }) => {
  const map = useMap();

  useEffect(() => {
    const valid = activities.filter((a) => a.lat != null && a.lng != null);
    if (valid.length === 0) return;

    const bounds = L.latLngBounds(valid.map((a) => [a.lat!, a.lng!]));
    map.fitBounds(bounds, { padding: [30, 30], maxZoom: 13 });
  }, [activities, map]);

  return null;
};


export const MapView = ({ activities, cartItemIds, onAddToCart, onRemoveFromCart }: MapViewProps) => {
  const valid = useMemo(() => activities.filter((a) => a.lat != null && a.lng != null), [activities]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);

  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handler);
    return () => document.removeEventListener("fullscreenchange", handler);
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="rounded-lg overflow-hidden border border-border shadow-sm"
      style={{ height: isFullscreen ? "100vh" : 420, position: "relative" }}
    >
      <button
        onClick={toggleFullscreen}
        title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          zIndex: 1000,
          background: "#fff",
          border: "1px solid #e2e8f0",
          borderRadius: 6,
          padding: "5px 7px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          boxShadow: "0 1px 4px rgba(0,0,0,0.12)",
        }}
      >
        {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
      </button>

      <MapContainer
        center={[32.7767, -96.797]}
        zoom={10}
        style={{ height: "100%", width: "100%" }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FitBounds activities={valid} />
        {valid.map((activity) => (
          <CircleMarker
            key={activity.id}
            center={[activity.lat!, activity.lng!]}
            radius={9}
            pathOptions={{
              color: "#fff",
              weight: 1.5,
              fillColor: getCategoryColor(activity.category),
              fillOpacity: 0.9,
            }}
          >
            <Popup maxWidth={260} minWidth={240}>
              <div style={{ fontFamily: "inherit" }}>
                <img
                  src={activity.images?.[0] ?? activity.image}
                  alt={activity.title}
                  onClick={() => setSelectedActivity(activity)}
                  style={{ width: "100%", aspectRatio: "16/9", objectFit: "cover", borderRadius: 6, marginBottom: 8, cursor: "pointer" }}
                />
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 6, marginBottom: 4 }}>
                  <span style={{ fontWeight: 600, fontSize: 14, lineHeight: 1.3 }}>{activity.title}</span>
                  <span style={{ fontSize: 11, background: getCategoryColor(activity.category), borderRadius: 4, padding: "2px 6px", whiteSpace: "nowrap", color: "#fff", fontWeight: 500 }}>
                    {getDisplayCategory(activity.category)}
                  </span>
                </div>
                <p style={{ fontSize: 12, color: "#64748b", marginBottom: 8, lineHeight: 1.4 }}>
                  {activity.shortDescription}
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 4, fontSize: 12, color: "#64748b" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <DollarSign size={13} />
                    {activity.price === 0 ? "Free" : `$${activity.price} per person`}
                  </span>
                  <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <MapPin size={13} />
                    {activity.location}
                  </span>
                  <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <Hourglass size={13} />
                    {activity.duration}
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 10, gap: 8 }}>
                  <a
                    href={activity.website}
                    target="_blank"
                    rel="noreferrer"
                    style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 12, fontWeight: 500, color: "#2563eb", textDecoration: "none" }}
                  >
                    Visit website <ExternalLink size={12} />
                  </a>
                  <button
                    onClick={() => setSelectedActivity(activity)}
                    style={{
                      fontSize: 12, fontWeight: 500, padding: "4px 10px",
                      borderRadius: 6, border: "1px solid #e2e8f0",
                      background: "#fff", cursor: "pointer", color: "#0f172a",
                    }}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>

      {selectedActivity && (
        <ActivityDetailDialog
          activity={selectedActivity}
          open={true}
          onOpenChange={(open) => { if (!open) setSelectedActivity(null); }}
          isInCart={cartItemIds.has(selectedActivity.id)}
          onAddToCart={onAddToCart}
          onRemoveFromCart={onRemoveFromCart}
          container={containerRef.current}
        />
      )}
    </div>
  );
};
