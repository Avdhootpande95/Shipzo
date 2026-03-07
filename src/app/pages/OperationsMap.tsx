import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '../components/ui/sheet';
import { 
  MapPin, 
  Plane, 
  Ship, 
  Truck, 
  Navigation,
  Thermometer,
  Clock,
  Package,
  AlertCircle
} from 'lucide-react';

const shipments = [
  {
    id: 'SH-2024-001',
    route: 'Singapore → Frankfurt',
    mode: 'Air',
    status: 'In Transit',
    currentLocation: 'Over Arabian Sea',
    temperature: '2-8°C',
    tempStatus: 'Normal',
    eta: '18 hrs',
    progress: 65,
    coordinates: { lat: 18.5, lng: 68.2 }
  },
  {
    id: 'SH-2024-002',
    route: 'Boston → Tokyo',
    mode: 'Sea',
    status: 'In Transit',
    currentLocation: 'Pacific Ocean',
    temperature: '-20°C',
    tempStatus: 'Normal',
    eta: '5 days',
    progress: 42,
    coordinates: { lat: 35.0, lng: -150.0 }
  },
  {
    id: 'SH-2024-004',
    route: 'Shanghai → Dubai',
    mode: 'Rail',
    status: 'Alert',
    currentLocation: 'Central Asia Hub',
    temperature: '-70°C',
    tempStatus: 'Warning',
    eta: '3 days',
    progress: 28,
    coordinates: { lat: 42.0, lng: 75.0 }
  },
  {
    id: 'SH-2024-005',
    route: 'Mumbai → London',
    mode: 'Air',
    status: 'In Transit',
    currentLocation: 'Middle East Airspace',
    temperature: '2-8°C',
    tempStatus: 'Normal',
    eta: '12 hrs',
    progress: 80,
    coordinates: { lat: 28.0, lng: 52.0 }
  },
];

export function OperationsMap() {
  const [selectedShipment, setSelectedShipment] = useState<typeof shipments[0] | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const getModeIcon = (mode: string) => {
    switch (mode) {
      case 'Air': return <Plane className="h-4 w-4" />;
      case 'Sea': return <Ship className="h-4 w-4" />;
      case 'Rail': return <Truck className="h-4 w-4 rotate-180" />;
      default: return <Truck className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Transit': return 'bg-secondary';
      case 'Alert': return 'bg-destructive';
      case 'Delivered': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getTempStatusColor = (status: string) => {
    switch (status) {
      case 'Normal': return 'text-green-600 bg-green-50 border-green-200';
      case 'Warning': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'Critical': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const handleShipmentClick = (shipment: typeof shipments[0]) => {
    setSelectedShipment(shipment);
    setIsSheetOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Operations Control Map</h1>
          <p className="text-muted-foreground">Real-time global shipment tracking and monitoring</p>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline" className="rounded-lg px-3 py-1">
            <MapPin className="h-3 w-3 mr-1" />
            24 Active Shipments
          </Badge>
        </div>
      </div>

      {/* Map Visualization */}
      <Card className="rounded-2xl border-2">
        <CardContent className="p-6">
          <div className="bg-gradient-to-br from-blue-100 via-blue-50 to-orange-50 rounded-xl h-[500px] relative border-2 border-dashed border-gray-300 overflow-hidden">
            {/* Map Background */}
            <div className="absolute inset-0 opacity-20">
              <svg className="w-full h-full" viewBox="0 0 1000 500">
                {/* Simplified world map paths */}
                <path d="M 100 200 Q 200 180 300 200 T 500 200" stroke="#3b82f6" fill="none" strokeWidth="2" strokeDasharray="5,5" />
                <path d="M 200 250 Q 400 230 600 240" stroke="#f97316" fill="none" strokeWidth="2" strokeDasharray="5,5" />
                <path d="M 300 180 Q 500 160 700 180" stroke="#10b981" fill="none" strokeWidth="2" strokeDasharray="5,5" />
              </svg>
            </div>

            {/* Shipment Markers */}
            {shipments.map((shipment, idx) => (
              <div
                key={shipment.id}
                className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition-transform"
                style={{
                  left: `${20 + idx * 20}%`,
                  top: `${30 + (idx % 3) * 20}%`
                }}
                onClick={() => handleShipmentClick(shipment)}
              >
                <div className="relative group">
                  <div className={`${getStatusColor(shipment.status)} rounded-full p-3 shadow-lg animate-pulse`}>
                    {getModeIcon(shipment.mode)}
                    <span className="text-white">{getModeIcon(shipment.mode)}</span>
                  </div>
                  
                  {/* Tooltip on hover */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-10">
                    <div className="bg-white rounded-lg shadow-xl border-2 p-3 whitespace-nowrap">
                      <p className="font-semibold text-sm">{shipment.id}</p>
                      <p className="text-xs text-muted-foreground">{shipment.currentLocation}</p>
                    </div>
                  </div>

                  {/* Ping animation for alerts */}
                  {shipment.status === 'Alert' && (
                    <div className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-75"></div>
                  )}
                </div>
              </div>
            ))}

            {/* Legend */}
            <div className="absolute bottom-4 left-4 bg-white rounded-xl p-4 shadow-lg border-2">
              <p className="font-semibold text-sm mb-2">Transport Modes</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <div className="bg-secondary rounded-full p-1.5">
                    <Plane className="h-3 w-3 text-white" />
                  </div>
                  <span>Air Freight</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="bg-secondary rounded-full p-1.5">
                    <Ship className="h-3 w-3 text-white" />
                  </div>
                  <span>Sea Freight</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="bg-secondary rounded-full p-1.5">
                    <Truck className="h-3 w-3 text-white rotate-180" />
                  </div>
                  <span>Rail Transport</span>
                </div>
              </div>
            </div>

            {/* Status Legend */}
            <div className="absolute bottom-4 right-4 bg-white rounded-xl p-4 shadow-lg border-2">
              <p className="font-semibold text-sm mb-2">Status</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <div className="h-3 w-3 rounded-full bg-secondary"></div>
                  <span>In Transit</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="h-3 w-3 rounded-full bg-destructive"></div>
                  <span>Alert</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  <span>Delivered</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Shipment List */}
      <Card className="rounded-2xl border-2">
        <CardHeader>
          <CardTitle>Active Shipments</CardTitle>
          <CardDescription>Click on a shipment to view detailed information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {shipments.map((shipment) => (
              <Card 
                key={shipment.id} 
                className="rounded-xl border-2 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleShipmentClick(shipment)}
              >
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold">{shipment.id}</h4>
                        <p className="text-sm text-muted-foreground">{shipment.route}</p>
                      </div>
                      <Badge className={`${getStatusColor(shipment.status)} text-white rounded-lg`}>
                        {shipment.status}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <Navigation className="h-4 w-4 text-primary" />
                      <span className="text-muted-foreground">{shipment.currentLocation}</span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">{shipment.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-primary rounded-full h-2 transition-all"
                          style={{ width: `${shipment.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <div className={`flex-1 p-2 rounded-lg border ${getTempStatusColor(shipment.tempStatus)}`}>
                        <div className="flex items-center gap-1 text-xs">
                          <Thermometer className="h-3 w-3" />
                          <span>{shipment.temperature}</span>
                        </div>
                      </div>
                      <div className="flex-1 p-2 rounded-lg border bg-blue-50 border-blue-200">
                        <div className="flex items-center gap-1 text-xs text-blue-600">
                          <Clock className="h-3 w-3" />
                          <span>ETA {shipment.eta}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Shipment Detail Sheet */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
          {selectedShipment && (
            <>
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-primary" />
                  {selectedShipment.id}
                </SheetTitle>
                <SheetDescription>{selectedShipment.route}</SheetDescription>
              </SheetHeader>
              
              <div className="space-y-6 mt-6">
                <div className="flex items-center justify-center">
                  <div className={`${getStatusColor(selectedShipment.status)} rounded-full p-6`}>
                    {getModeIcon(selectedShipment.mode)}
                  </div>
                </div>

                <Card className="rounded-xl">
                  <CardContent className="p-4 space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Status</span>
                      <Badge className={`${getStatusColor(selectedShipment.status)} text-white rounded-lg`}>
                        {selectedShipment.status}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Current Location</span>
                      <span className="font-medium">{selectedShipment.currentLocation}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Temperature</span>
                      <span className="font-medium">{selectedShipment.temperature}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">ETA</span>
                      <span className="font-medium">{selectedShipment.eta}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">{selectedShipment.progress}%</span>
                    </div>
                  </CardContent>
                </Card>

                {selectedShipment.tempStatus === 'Warning' && (
                  <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
                    <div className="flex gap-3">
                      <AlertCircle className="h-5 w-5 text-orange-600 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-orange-900">Temperature Alert</p>
                        <p className="text-sm text-orange-700 mt-1">
                          Temperature deviation detected. Monitoring team has been notified.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex gap-2">
                  <Button className="flex-1 rounded-xl bg-secondary hover:bg-secondary/90">
                    Contact Carrier
                  </Button>
                  <Button variant="outline" className="flex-1 rounded-xl">
                    View Details
                  </Button>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
