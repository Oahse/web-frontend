import React, { useEffect, useRef } from 'react';

interface Coordinates {
  lat: number;
  lng: number;
}

interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  post_code: string;
}

interface TrackingMapProps {
  currentLocation?: Coordinates;
  deliveryAddress: Address;
  route?: Coordinates[];
  carrier?: string;
  className?: string;
}

const TrackingMap: React.FC<TrackingMapProps> = ({
  currentLocation,
  deliveryAddress,
  route,
  carrier,
  className = ''
}) => {
  const mapRef = useRef<HTMLDivElement>(null);

  // For now, we'll create a simple placeholder map
  // In a real implementation, you would integrate with Google Maps, Mapbox, or similar
  useEffect(() => {
    // This would initialize the actual map
    console.log('Map would be initialized here with:', {
      currentLocation,
      deliveryAddress,
      route,
      carrier
    });
  }, [currentLocation, deliveryAddress, route, carrier]);

  const formatAddress = (address: Address) => {
    return `${address.street}, ${address.city}, ${address.state} ${address.post_code}, ${address.country}`;
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 ${className}`}>
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Package Location</h3>
        {carrier && (
          <p className="text-sm text-gray-600 mt-1">Carrier: {carrier}</p>
        )}
      </div>

      <div className="p-4">
        {/* Placeholder map area */}
        <div 
          ref={mapRef}
          className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300"
        >
          <div className="text-center">
            <div className="text-4xl mb-2">🗺️</div>
            <p className="text-gray-600 font-medium">Interactive Map</p>
            <p className="text-sm text-gray-500 mt-1">
              Map integration would show package location here
            </p>
          </div>
        </div>

        {/* Location information */}
        <div className="mt-4 space-y-3">
          {currentLocation && (
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Current Location</p>
                <p className="text-sm text-gray-600">
                  Lat: {currentLocation.lat.toFixed(6)}, Lng: {currentLocation.lng.toFixed(6)}
                </p>
              </div>
            </div>
          )}

          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-green-600 rounded-full"></div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Delivery Address</p>
              <p className="text-sm text-gray-600">
                {formatAddress(deliveryAddress)}
              </p>
            </div>
          </div>

          {route && route.length > 0 && (
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Route</p>
                <p className="text-sm text-gray-600">
                  {route.length} waypoints tracked
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {!currentLocation && (
        <div className="p-4 bg-gray-50 rounded-b-lg">
          <p className="text-sm text-gray-600 text-center">
            📍 Location tracking will be available once the package is shipped
          </p>
        </div>
      )}
    </div>
  );
};

export default TrackingMap;