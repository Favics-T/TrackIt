import { useEffect, useState, useCallback } from 'react'
import { X, MapPin, Navigation, Package } from 'lucide-react'
import { MapContainer, TileLayer, Marker, Polyline, Popup } from 'react-leaflet'
import RecenterMap from './RecenterMap'
import { route } from '../../data/route'

/**
 * Derives the current map position from the order's progressPercent.
 * 0%   → start of route (origin)
 * 100% → end of route  (destination)
 */
function getLocationFromProgress(progressPercent) {
  const clampedProgress = Math.min(Math.max(progressPercent, 0), 100)
  const maxIndex        = route.length - 1
  const rawIndex        = (clampedProgress / 100) * maxIndex

  const lowerIdx = Math.floor(rawIndex)
  const upperIdx = Math.min(lowerIdx + 1, maxIndex)
  const fraction = rawIndex - lowerIdx

  // Interpolate between the two nearest route points for smooth movement
  const lat = route[lowerIdx].lat + (route[upperIdx].lat - route[lowerIdx].lat) * fraction
  const lng = route[lowerIdx].lng + (route[upperIdx].lng - route[lowerIdx].lng) * fraction

  return [lat, lng]
}

const STATUS_COPY = {
  created:    { label: 'Order Created',   sub: 'Preparing your package',        color: 'text-gray-500'   },
  processing: { label: 'Processing',      sub: 'Package being prepared',         color: 'text-yellow-600' },
  shipped:    { label: 'Shipped',         sub: 'Package picked up by courier',   color: 'text-blue-600'   },
  in_transit: { label: 'In Transit',      sub: 'On the way to your address',     color: 'text-blue-600'   },
  delivered:  { label: 'Delivered',       sub: 'Package delivered successfully', color: 'text-green-600'  },
}

export default function LiveMapModal({ order, onClose }) {
  const { progressPercent, status, form, id } = order

  // Animate the marker from its current position when the modal opens
  const [displayProgress, setDisplayProgress] = useState(
    Math.max(progressPercent - 10, 0) // start slightly behind to animate in
  )

  useEffect(() => {
    // Smoothly animate to the real position over 1.2s on mount
    const timeout = setTimeout(() => {
      setDisplayProgress(progressPercent)
    }, 100)
    return () => clearTimeout(timeout)
  }, [progressPercent])

  // Keep in sync if ADVANCE_TRACKING fires while modal is open
  useEffect(() => {
    setDisplayProgress(progressPercent)
  }, [progressPercent])

  const currentLocation = getLocationFromProgress(displayProgress)
  const originLocation  = [route[0].lat, route[0].lng]
  const destLocation    = [route[route.length - 1].lat, route[route.length - 1].lng]
  const routePositions  = route.map(p => [p.lat, p.lng])

  const statusInfo = STATUS_COPY[status] || STATUS_COPY.processing

  // Close on backdrop click
  const handleBackdropClick = useCallback((e) => {
    if (e.target === e.currentTarget) onClose()
  }, [onClose])

  // Close on Escape key
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm
        flex items-end md:items-center justify-center p-0 md:p-6"
      onClick={handleBackdropClick}
    >
      <div
        className="bg-white w-full md:max-w-2xl md:rounded-2xl
          rounded-t-2xl overflow-hidden shadow-2xl
          flex flex-col max-h-[92vh] md:max-h-[85vh]"
      >

        {/* Modal header */}
        <div className="flex items-center justify-between px-5 py-4
          border-b border-gray-100 flex-shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <p className="text-[10px] font-semibold text-gray-400
                uppercase tracking-widest">
                Live Location · Order #{id}
              </p>
            </div>
            <p className={`text-sm font-bold ${statusInfo.color}`}>
              {statusInfo.label}
              <span className="text-gray-400 font-normal ml-1.5 text-xs">
                — {statusInfo.sub}
              </span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full
              flex items-center justify-center transition-colors"
            aria-label="Close map"
          >
            <X className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {/* Progress bar */}
        <div className="px-5 py-2.5 border-b border-gray-100 flex-shrink-0">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] text-gray-400 font-medium">Origin</span>
            <span className="text-[10px] font-semibold text-teal-600">
              {progressPercent}% complete
            </span>
            <span className="text-[10px] text-gray-400 font-medium">Destination</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-teal-500 h-1.5 rounded-full transition-all duration-1000"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Map — takes remaining height */}
        <div className="flex-1 relative min-h-0">
          <MapContainer
            center={currentLocation}
            zoom={15}
            style={{ height: '100%', width: '100%', minHeight: '320px' }}
            zoomControl={true}
            scrollWheelZoom={false}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            />

            {/* Full route (faint) */}
            <Polyline
              positions={routePositions}
              pathOptions={{ color: '#cbd5e1', weight: 3, dashArray: '6 4' }}
            />

            {/* Completed portion (teal) */}
            <Polyline
              positions={[
                [route[0].lat, route[0].lng],
                currentLocation,
              ]}
              pathOptions={{ color: '#0d9488', weight: 4 }}
            />

            {/* Origin marker */}
            <Marker position={originLocation}>
              <Popup>
                <div className="text-xs font-semibold text-gray-700">
                  📦 Origin — Order Picked Up
                </div>
              </Popup>
            </Marker>

            {/* Destination marker */}
            <Marker position={destLocation}>
              <Popup>
                <div className="text-xs font-semibold text-gray-700">
                  🏠 {form.fullName}<br />
                  <span className="font-normal text-gray-500">
                    {form.streetAddress}, {form.city}
                  </span>
                </div>
              </Popup>
            </Marker>

            {/* Current courier position */}
            <Marker position={currentLocation}>
              <Popup>
                <div className="text-xs font-semibold text-teal-700">
                  🚚 Courier is here
                </div>
              </Popup>
            </Marker>

            {/* Keeps map centred on courier */}
            <RecenterMap location={currentLocation} />
          </MapContainer>

          {/* Delivered overlay */}
          {status === 'delivered' && (
            <div className="absolute inset-0 bg-white/80 backdrop-blur-sm
              flex flex-col items-center justify-center z-[1000]">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center
                justify-center mb-3">
                <Package className="w-8 h-8 text-green-600" />
              </div>
              <p className="text-sm font-bold text-gray-900 mb-1">
                Package Delivered!
              </p>
              <p className="text-xs text-gray-400 text-center max-w-[180px]">
                Your order was delivered to {form.fullName}
              </p>
            </div>
          )}
        </div>

        {/* Footer info strip */}
        <div className="px-5 py-3 border-t border-gray-100 flex-shrink-0
          flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[10px] text-gray-500">
            <MapPin className="w-3 h-3 text-teal-500" />
            <span>Delivering to:</span>
            <span className="font-semibold text-gray-700">
              {form.streetAddress}, {form.city}
            </span>
          </div>
          <div className="flex items-center gap-1 text-[10px] text-gray-400">
            <Navigation className="w-3 h-3" />
            <span>Live</span>
          </div>
        </div>

      </div>
    </div>
  )
}