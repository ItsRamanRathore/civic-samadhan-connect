import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { useEffect, useState } from 'react'
import supabase from '../contexts/AuthContext'

// Fix Leaflet default icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/marker-icon-2x.png',
  iconUrl: '/marker-icon.png',
  shadowUrl: '/marker-shadow.png',
})

interface Complaint {
  id: string
  title: string
  description: string
  latitude: number
  longitude: number
  status: string
}

const Map = () => {
  const [complaints, setComplaints] = useState<Complaint[]>([])
  const [center, setCenter] = useState<[number, number]>([20.5937, 78.9629]) // India's center coordinates
  const [zoom, setZoom] = useState(5)

  useEffect(() => {
    fetchComplaints()
  }, [])

  const fetchComplaints = async () => {
    try {
      const { data, error } = await supabase
        .from('complaints')
        .select('*')
        .not('latitude', 'is', null)
        .not('longitude', 'is', null)

      if (error) throw error

      if (data) {
        setComplaints(data as Complaint[])
      }
    } catch (error) {
      console.error('Error fetching complaints:', error)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'open':
        return 'bg-red-500'
      case 'in progress':
        return 'bg-yellow-500'
      case 'resolved':
        return 'bg-green-500'
      default:
        return 'bg-gray-500'
    }
  }

  return (
    <div className="h-[60vh] w-full rounded-lg border shadow-lg">
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {complaints.map((complaint) => (
          <Marker
            key={complaint.id}
            position={[complaint.latitude, complaint.longitude]}
          >
            <Popup>
              <div className="max-w-xs">
                <h3 className="mb-2 text-lg font-semibold">{complaint.title}</h3>
                <p className="mb-2 text-sm text-gray-600">
                  {complaint.description}
                </p>
                <div className="flex items-center gap-2">
                  <span>Status:</span>
                  <span
                    className={`${getStatusColor(
                      complaint.status
                    )} h-2 w-2 rounded-full`}
                  />
                  <span className="text-sm font-medium">
                    {complaint.status}
                  </span>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}

export default Map