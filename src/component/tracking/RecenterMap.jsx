import { useMap } from 'react-leaflet'
import { useEffect } from 'react'

function RecenterMap({ location }) {
  const map = useMap()

  useEffect(() => {
    // flyTo gives a smooth pan/zoom animation instead of a hard jump
    map.flyTo(location, map.getZoom(), { animate: true, duration: 1.2 })
  }, [location, map])

  return null;
}

export default RecenterMap