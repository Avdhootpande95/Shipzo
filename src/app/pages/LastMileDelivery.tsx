import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { 
  Navigation, 
  Truck, 
  MapPin, 
  Clock, 
  Thermometer, 
  AlertTriangle,
  Phone,
  CheckCircle,
  TrendingDown,
  Package,
  Timer
} from 'lucide-react';

// Last-Mile Delivery Data
const lastMileDeliveries = [
  {
    id: 'LM-2024-001',
    shipmentId: 'SH-2024-001',
    product: 'Vaccine Batch A',
    driver: 'John Mitchell',
    currentTemp: 4,
    safeTemp: '2-8°C',
    timeRemaining: '3h 20m',
    currentLocation: 'Highway 101, 12km from destination',
    pickup: 'Frankfurt Distribution Hub',
    destination: 'Munich Central Hospital',
    progress: 75,
    eta: '22 min',
    status: 'Safe',
    coordinates: { start: { left: '15%', top: '80%' }, current: { left: '60%', top: '40%' }, end: { left: '85%', top: '20%' } }
  },
  {
    id: 'LM-2024-002',
    shipmentId: 'SH-2024-004',
    product: 'Biologic Sample B',
    driver: 'Sarah Chen',
    currentTemp: 7,
    safeTemp: '2-8°C',
    timeRemaining: '45 min',
    currentLocation: 'City Center, 5km from destination',
    pickup: 'Dubai Cold Storage',
    destination: 'Research Facility Dubai',
    progress: 60,
    eta: '15 min',
    status: 'Warning',
    coordinates: { start: { left: '20%', top: '75%' }, current: { left: '50%', top: '50%' }, end: { left: '80%', top: '25%' } }
  },
  {
    id: 'LM-2024-003',
    shipmentId: 'SH-2024-007',
    product: 'Cancer Treatment Drug',
    driver: 'Michael Rodriguez',
    currentTemp: 3,
    safeTemp: '2-8°C',
    timeRemaining: '5h 10m',
    currentLocation: 'Highway A1, approaching city limits',
    pickup: 'Paris Distribution Center',
    destination: 'Lyon Medical Center',
    progress: 85,
    eta: '18 min',
    status: 'Safe',
    coordinates: { start: { left: '10%', top: '70%' }, current: { left: '70%', top: '35%' }, end: { left: '90%', top: '15%' } }
  }
];

// Alternative routes for rerouting
const alternativeRoutes = [
  { id: 'A', name: 'Route A', eta: '22 minutes', risk: 'Low', description: 'Via Highway - Clear traffic' },
  { id: 'B', name: 'Route B', eta: '30 minutes', risk: 'Medium', description: 'Via City Route - Moderate traffic' }
];

export function LastMileDelivery() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Safe': return { bg: 'bg-green-50', border: 'border-green-500', text: 'text-green-700', badge: 'bg-green-500' };
      case 'Warning': return { bg: 'bg-yellow-50', border: 'border-yellow-500', text: 'text-yellow-700', badge: 'bg-yellow-500' };
      case 'Critical': return { bg: 'bg-red-50', border: 'border-red-500', text: 'text-red-700', badge: 'bg-red-500' };
      default: return { bg: 'bg-gray-50', border: 'border-gray-500', text: 'text-gray-700', badge: 'bg-gray-500' };
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'bg-green-500';
      case 'Medium': return 'bg-yellow-500';
      case 'High': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Last-Mile Delivery Optimization</h1>
        <p className="text-muted-foreground">Real-time driver tracking and smart cold-chain monitoring</p>
      </div>

      {/* Active Last-Mile Deliveries */}
      {lastMileDeliveries.map((delivery) => {
        const statusColors = getStatusColor(delivery.status);
        
        return (
          <Card key={delivery.id} className={`rounded-2xl border-2 ${statusColors.border}`}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="h-5 w-5 text-blue-600" />
                    {delivery.product}
                  </CardTitle>
                  <CardDescription className="mt-1">
                    {delivery.shipmentId} • Driver: {delivery.driver}
                  </CardDescription>
                </div>
                <Badge className={`${statusColors.badge} text-white rounded-lg`}>
                  {delivery.status}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Live Route Map */}
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Navigation className="h-4 w-4 text-blue-600" />
                  Live Route Navigation
                </h3>
                <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl h-[350px] relative overflow-hidden border-2">
                  {/* Street Grid Pattern */}
                  <svg className="absolute inset-0 w-full h-full opacity-20">
                    {/* Horizontal streets */}
                    {[20, 40, 60, 80].map((y) => (
                      <line key={`h-${y}`} x1="0" y1={`${y}%`} x2="100%" y2={`${y}%`} stroke="#94a3b8" strokeWidth="2" />
                    ))}
                    {/* Vertical streets */}
                    {[20, 40, 60, 80].map((x) => (
                      <line key={`v-${x}`} x1={`${x}%`} y1="0" x2={`${x}%`} y2="100%" stroke="#94a3b8" strokeWidth="2" />
                    ))}
                  </svg>

                  {/* Main Route Path */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
                    <defs>
                      <linearGradient id={`gradient-${delivery.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 1 }} />
                        <stop offset="100%" style={{ stopColor: '#10b981', stopOpacity: 1 }} />
                      </linearGradient>
                    </defs>
                    {/* Main route line */}
                    <line
                      x1={delivery.coordinates.start.left}
                      y1={delivery.coordinates.start.top}
                      x2={delivery.coordinates.end.left}
                      y2={delivery.coordinates.end.top}
                      stroke={`url(#gradient-${delivery.id})`}
                      strokeWidth="6"
                      strokeLinecap="round"
                    />
                    {/* Route shadow/outline */}
                    <line
                      x1={delivery.coordinates.start.left}
                      y1={delivery.coordinates.start.top}
                      x2={delivery.coordinates.end.left}
                      y2={delivery.coordinates.end.top}
                      stroke="#1e293b"
                      strokeWidth="8"
                      strokeLinecap="round"
                      opacity="0.2"
                    />
                  </svg>

                  {/* Start Point (Pickup Hub) */}
                  <div
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20"
                    style={{ left: delivery.coordinates.start.left, top: delivery.coordinates.start.top }}
                  >
                    <div className="bg-blue-500 rounded-full p-3 shadow-xl border-4 border-white">
                      <Package className="h-5 w-5 text-white" />
                    </div>
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
                      <div className="bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded shadow-lg">
                        Point A
                      </div>
                    </div>
                  </div>

                  {/* Current Driver Position */}
                  <div
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 z-30"
                    style={{ left: delivery.coordinates.current.left, top: delivery.coordinates.current.top }}
                  >
                    <div className="relative">
                      {/* Pulsing ring effect */}
                      <div className="absolute inset-0 rounded-full bg-orange-400 animate-ping opacity-75"></div>
                      <div className="absolute inset-0 -m-2 rounded-full bg-orange-300 animate-ping opacity-50" style={{ animationDelay: '0.3s' }}></div>
                      
                      {/* Driver truck icon */}
                      <div className="relative bg-orange-500 rounded-full p-4 shadow-xl border-4 border-white">
                        <Truck className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap">
                      <div className="bg-orange-500 text-white text-xs font-semibold px-2 py-1 rounded shadow-lg">
                        {delivery.driver}
                      </div>
                    </div>
                  </div>

                  {/* End Point (Destination) */}
                  <div
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20"
                    style={{ left: delivery.coordinates.end.left, top: delivery.coordinates.end.top }}
                  >
                    <div className="bg-green-500 rounded-full p-3 shadow-xl border-4 border-white">
                      <MapPin className="h-5 w-5 text-white" />
                    </div>
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
                      <div className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded shadow-lg">
                        Point B
                      </div>
                    </div>
                  </div>

                  {/* Map Legend */}
                  <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm rounded-xl p-3 shadow-lg border-2 z-30">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs">
                        <div className="bg-blue-500 rounded-full p-1">
                          <Package className="h-3 w-3 text-white" />
                        </div>
                        <span>Pickup Hub (A)</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <div className="bg-orange-500 rounded-full p-1">
                          <Truck className="h-3 w-3 text-white" />
                        </div>
                        <span>Driver (Live)</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <div className="bg-green-500 rounded-full p-1">
                          <MapPin className="h-3 w-3 text-white" />
                        </div>
                        <span>Destination (B)</span>
                      </div>
                    </div>
                  </div>

                  {/* ETA Display */}
                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm rounded-xl p-3 shadow-lg border-2 z-30">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-blue-600" />
                      <div>
                        <p className="text-xs text-muted-foreground">ETA</p>
                        <p className="font-bold text-lg text-blue-600">{delivery.eta}</p>
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm rounded-xl p-3 shadow-lg border-2 z-30 min-w-[150px]">
                    <p className="text-xs text-muted-foreground mb-2">Delivery Progress</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 rounded-full h-2 transition-all"
                          style={{ width: `${delivery.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-bold">{delivery.progress}%</span>
                    </div>
                  </div>
                </div>

                {/* Route Details */}
                <div className="mt-3 grid grid-cols-3 gap-3">
                  <div className="bg-blue-50 rounded-xl p-3 border border-blue-200">
                    <p className="text-xs text-muted-foreground mb-1">Pickup</p>
                    <p className="font-medium text-sm">{delivery.pickup}</p>
                  </div>
                  <div className="bg-orange-50 rounded-xl p-3 border border-orange-200">
                    <p className="text-xs text-muted-foreground mb-1">Current Location</p>
                    <p className="font-medium text-sm">{delivery.currentLocation}</p>
                  </div>
                  <div className="bg-green-50 rounded-xl p-3 border border-green-200">
                    <p className="text-xs text-muted-foreground mb-1">Destination</p>
                    <p className="font-medium text-sm">{delivery.destination}</p>
                  </div>
                </div>
              </div>

              {/* Smart Cold-Chain Monitoring */}
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Thermometer className="h-4 w-4 text-red-600" />
                  Smart Cold-Chain Monitoring
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {/* Live Temperature */}
                  <Card className={`rounded-xl border-2 ${statusColors.border} ${statusColors.bg}`}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium">Live Temperature</span>
                        <Thermometer className={`h-5 w-5 ${statusColors.text}`} />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-baseline gap-2">
                          <span className={`text-4xl font-bold ${statusColors.text}`}>{delivery.currentTemp}°C</span>
                          <Badge variant="outline" className="rounded-lg">
                            Safe Range: {delivery.safeTemp}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <CheckCircle className="h-3 w-3" />
                          <span>IoT Sensor Active • Last Update: 10s ago</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Time Remaining Before Spoilage */}
                  <Card className={`rounded-xl border-2 ${statusColors.border} ${statusColors.bg}`}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium">Safe Time Remaining</span>
                        <Timer className={`h-5 w-5 ${statusColors.text}`} />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-baseline gap-2">
                          <span className={`text-4xl font-bold ${statusColors.text}`}>{delivery.timeRemaining}</span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          <p>Calculated from:</p>
                          <ul className="mt-1 space-y-0.5 ml-2">
                            <li>• Current temperature & insulation</li>
                            <li>• Outside temperature: 22°C</li>
                            <li>• Remaining distance: {100 - delivery.progress}%</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Driver Assistance Panel */}
              <div>
                <h3 className="font-semibold mb-3">Driver Assistance Panel</h3>
                <div className="grid md:grid-cols-2 gap-3">
                  <Button className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white h-auto py-3">
                    <Navigation className="h-4 w-4 mr-2" />
                    <div className="text-left">
                      <p className="font-semibold">Route Navigation</p>
                      <p className="text-xs opacity-90">Turn-by-turn guidance</p>
                    </div>
                  </Button>

                  {delivery.status === 'Warning' && (
                    <Button className="rounded-xl bg-yellow-500 hover:bg-yellow-600 text-white h-auto py-3">
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      <div className="text-left">
                        <p className="font-semibold">Temperature Alert</p>
                        <p className="text-xs opacity-90">Above safe threshold</p>
                      </div>
                    </Button>
                  )}

                  <Button variant="outline" className="rounded-xl h-auto py-3">
                    <Clock className="h-4 w-4 mr-2" />
                    <div className="text-left">
                      <p className="font-semibold">Delivery Deadline</p>
                      <p className="text-xs text-muted-foreground">{delivery.eta} remaining</p>
                    </div>
                  </Button>

                  <Button variant="outline" className="rounded-xl h-auto py-3">
                    <Phone className="h-4 w-4 mr-2" />
                    <div className="text-left">
                      <p className="font-semibold">Contact Operations</p>
                      <p className="text-xs text-muted-foreground">24/7 support line</p>
                    </div>
                  </Button>
                </div>
              </div>

              {/* Automatic Rerouting System (Only show if there's risk) */}
              {delivery.status === 'Warning' && (
                <Card className="rounded-xl border-2 border-yellow-500 bg-yellow-50">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-yellow-600" />
                      Automatic Rerouting System
                    </CardTitle>
                    <CardDescription>
                      Risk detected due to traffic and temperature. Suggested alternative route available.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-3">
                      {alternativeRoutes.map((route) => (
                        <Card key={route.id} className="rounded-xl border-2">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-semibold">{route.name}</h4>
                              <Badge className={`${getRiskColor(route.risk)} text-white rounded-lg`}>
                                {route.risk}
                              </Badge>
                            </div>
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">ETA: <strong>{route.eta}</strong></span>
                              </div>
                              <p className="text-xs text-muted-foreground">{route.description}</p>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    <Button className="w-full rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white">
                      <TrendingDown className="h-4 w-4 mr-2" />
                      Switch to Recommended Route A
                    </Button>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}