import { useEffect, useState } from "react";
import TrackingMap from "../component/tracking/TrackingMap";
import { route } from "../data/route";

function TrackingPage() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev < route.length - 1) return prev + 1;
        return prev;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const currentLocation = route[currentIndex];

  const statuses = [
    "Order placed",
    "Picked up",
    "On the way",
    "Delivered"
  ];

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Live Tracking</h2>

      <TrackingMap
        currentLocation={currentLocation}
        route={route}
      />

      <p className="mt-4">{statuses[currentIndex]}</p>

      <div className="w-full bg-gray-200 h-2 mt-2">
        <div
          className="bg-green-500 h-2"
          style={{
            width: `${(currentIndex / (route.length - 1)) * 100}%`
          }}
        />
      </div>
    </div>
  );
}

export default TrackingPage;