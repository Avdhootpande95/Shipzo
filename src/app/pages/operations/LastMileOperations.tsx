import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
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
  Timer,
  Eye,
  User
} from 'lucide-react';

// All Last-Mile Deliveries for Operations Dashboard
const allLastMileDeliveries = [
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
  },
  {
    id: 'LM-2024-004',
    shipmentId: 'SH-2024-009',
    product: 'Insulin Cold-Chain Batch',
    driver: 'Emma Thompson',
    currentTemp: 5,
    safeTemp: '2-8°C',
    timeRemaining: '2h 30m',
    currentLocation: 'Downtown traffic, 8km from destination',
    pickup: 'Boston Cold Hub',
    destination: 'Regional Clinic Boston',
    progress: 55,
    eta: '28 min',
    status: 'Safe',
    coordinates: { start: { left: '25%', top: '65%' }, current: { left: '55%', top: '45%' }, end: { left: '75%', top: '30%' } }
  }
];

export function LastMileOperations() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Safe': return { bg: 'bg-green-50', border: 'border-green-500', text: 'text-green-700', badge: 'bg-green-500' };
      case 'Warning': return { bg: 'bg-yellow-50', border: 'border-yellow-500', text: 'text-yellow-700', badge: 'bg-yellow-500' };
      case 'Critical': return { bg: 'bg-red-50', border: 'border-red-500', text: 'text-red-700', badge: 'bg-red-500' };
      default: return { bg: 'bg-gray-50', border: 'border-gray-500', text: 'text-gray-700', badge: 'bg-gray-500' };
    }
  };

  const safeCount = allLastMileDeliveries.filter(d => d.status === 'Safe').length;
  const warningCount = allLastMileDeliveries.filter(d => d.status === 'Warning').length;
  const criticalCount = allLastMileDeliveries.filter(d => d.status === 'Critical').length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Last-Mile Operations Control</h1>
        <p className="text-muted-foreground">Monitor and manage all active last-mile deliveries</p>
      </div>

      {/* Operations Overview */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="rounded-2xl border-2 hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Active Deliveries</span>
              <Truck className="h-5 w-5 text-blue-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{allLastMileDeliveries.length}</p>
            <p className="text-sm text-muted-foreground mt-1">In progress now</p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-2 hover:shadow-lg transition-shadow bg-green-50/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Safe Status</span>
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
            <p className="text-3xl font-bold text-green-700">{safeCount}</p>
            <p className="text-sm text-green-600 mt-1">All within parameters</p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-2 hover:shadow-lg transition-shadow bg-yellow-50/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Warning</span>
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
            </div>
            <p className="text-3xl font-bold text-yellow-700">{warningCount}</p>
            <p className="text-sm text-yellow-600 mt-1">Requires attention</p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-2 hover:shadow-lg transition-shadow bg-red-50/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Critical</span>
              <AlertTriangle className="h-5 w-5 text-red-600" />
            </div>
            <p className="text-3xl font-bold text-red-700">{criticalCount}</p>
            <p className="text-sm text-red-600 mt-1">Immediate action</p>
          </CardContent>
        </Card>
      </div>

      {/* Global Delivery Map */}
      <Card className="rounded-2xl border-2">
        <CardHeader>
          <CardTitle>Global Last-Mile Delivery Map</CardTitle>
          <CardDescription>Real-time view of all active last-mile deliveries</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-white rounded-xl h-[450px] relative overflow-hidden border-2">
            {/* World Map Background */}
            <div className="absolute inset-0">
              <img 
                src={worldMapBg} 
                alt="Global Delivery Map" 
                className="w-full h-full object-cover opacity-40"
              />
            </div>

            {/* All Driver Locations */}
            {allLastMileDeliveries.map((delivery) => {
              const statusColors = getStatusColor(delivery.status);
              
              return (
                <div key={delivery.id}>
                  {/* Driver Current Position */}
                  <div
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer group"
                    style={{ left: delivery.coordinates.current.left, top: delivery.coordinates.current.top }}
                  >
                    <div className="relative animate-pulse">
                      <div className={`${statusColors.badge} rounded-full p-3 shadow-lg`}>
                        <Truck className="h-4 w-4 text-white" />
                      </div>
                      <div className={`absolute inset-0 rounded-full ${statusColors.badge} animate-ping opacity-75`}></div>
                    </div>

                    {/* Hover Tooltip */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-30 whitespace-nowrap">
                      <div className="bg-white rounded-lg shadow-xl border-2 p-3">
                        <p className="font-semibold text-sm">{delivery.shipmentId}</p>
                        <p className="text-xs text-muted-foreground">{delivery.product}</p>
                        <p className="text-xs text-muted-foreground mt-1">Driver: {delivery.driver}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Thermometer className="h-3 w-3" />
                          <span className="text-xs">{delivery.currentTemp}°C</span>
                          <Clock className="h-3 w-3 ml-2" />
                          <span className="text-xs">{delivery.eta}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Destination Marker */}
                  <div
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
                    style={{ left: delivery.coordinates.end.left, top: delivery.coordinates.end.top }}
                  >
                    <div className="bg-green-500 rounded-full p-2 shadow-md">
                      <MapPin className="h-3 w-3 text-white" />
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Map Legend */}
            <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg border-2 z-40">
              <p className="font-semibold text-sm mb-3">Status Indicators</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  <span>Safe</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                  <span>Warning</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="h-3 w-3 rounded-full bg-red-500"></div>
                  <span>Critical</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Individual Delivery Details */}
      <div className="grid lg:grid-cols-2 gap-6">
        {allLastMileDeliveries.map((delivery) => {
          const statusColors = getStatusColor(delivery.status);
          
          return (
            <Card key={delivery.id} className={`rounded-2xl border-2 ${statusColors.border}`}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      {delivery.product}
                    </CardTitle>
                    <CardDescription className="mt-1">
                      {delivery.shipmentId} • {delivery.driver}
                    </CardDescription>
                  </div>
                  <Badge className={`${statusColors.badge} text-white rounded-lg`}>
                    {delivery.status}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Progress */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Delivery Progress</span>
                    <span className="text-sm font-bold">{delivery.progress}%</span>
                  </div>
                  <div className="bg-gray-200 rounded-full h-2">
                    <div 
                      className={`${statusColors.badge} rounded-full h-2 transition-all`}
                      style={{ width: `${delivery.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-3 gap-3">
                  <div className={`${statusColors.bg} rounded-xl p-3 border ${statusColors.border}`}>
                    <div className="flex items-center gap-1 mb-1">
                      <Thermometer className="h-3 w-3" />
                      <span className="text-xs text-muted-foreground">Temp</span>
                    </div>
                    <p className={`font-bold ${statusColors.text}`}>{delivery.currentTemp}°C</p>
                  </div>

                  <div className={`${statusColors.bg} rounded-xl p-3 border ${statusColors.border}`}>
                    <div className="flex items-center gap-1 mb-1">
                      <Timer className="h-3 w-3" />
                      <span className="text-xs text-muted-foreground">Safe Time</span>
                    </div>
                    <p className={`font-bold ${statusColors.text} text-sm`}>{delivery.timeRemaining}</p>
                  </div>

                  <div className={`${statusColors.bg} rounded-xl p-3 border ${statusColors.border}`}>
                    <div className="flex items-center gap-1 mb-1">
                      <Clock className="h-3 w-3" />
                      <span className="text-xs text-muted-foreground">ETA</span>
                    </div>
                    <p className={`font-bold ${statusColors.text}`}>{delivery.eta}</p>
                  </div>
                </div>

                {/* Location Info */}
                <div className="space-y-2">
                  <div className="flex items-start gap-2 text-sm">
                    <Package className="h-4 w-4 text-blue-600 mt-0.5" />
                    <div>
                      <p className="text-xs text-muted-foreground">Pickup</p>
                      <p className="font-medium">{delivery.pickup}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-green-600 mt-0.5" />
                    <div>
                      <p className="text-xs text-muted-foreground">Destination</p>
                      <p className="font-medium">{delivery.destination}</p>
                    </div>
                  </div>
                </div>

                {/* Operations Actions */}
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <Button variant="outline" size="sm" className="rounded-lg">
                    <Eye className="h-3 w-3 mr-1" />
                    View Details
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-lg">
                    <Phone className="h-3 w-3 mr-1" />
                    Contact Driver
                  </Button>
                  {delivery.status === 'Warning' && (
                    <Button size="sm" className="rounded-lg bg-[#F97316] hover:bg-[#EA580C] col-span-2">
                      <TrendingDown className="h-3 w-3 mr-1" />
                      Trigger Rerouting
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}