import { useNavigate } from 'react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { 
  Thermometer, 
  TrendingUp, 
  AlertTriangle, 
  Clock, 
  Package, 
  CheckCircle2,
  Search,
  Plane,
  Truck,
  MapPin,
  PlusCircle,
  ShoppingCart
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import worldMapBg from 'figma:asset/c7230fcf991b0848d1de94be47c71521c1e3d5e2.png';

const statsData = [
  { name: 'Mon', shipments: 24 },
  { name: 'Tue', shipments: 32 },
  { name: 'Wed', shipments: 28 },
  { name: 'Thu', shipments: 45 },
  { name: 'Fri', shipments: 38 },
  { name: 'Sat', shipments: 22 },
  { name: 'Sun', shipments: 18 },
];

const recentShipments = [
  { 
    id: 'SH-2024-001', 
    route: 'Singapore → Frankfurt', 
    mode: 'Air', 
    status: 'In Transit', 
    temp: '2-8°C', 
    eta: '18 hrs',
    summary: 'Shipment initiated in Singapore warehouse, transported via air freight carrier to Dubai hub for customs clearance, currently flying toward Frankfurt international airport with expected ground transfer to final destination via refrigerated truck.'
  },
  { 
    id: 'SH-2024-002', 
    route: 'Boston → Tokyo', 
    mode: 'Sea', 
    status: 'In Transit', 
    temp: '-20°C', 
    eta: '5 days',
    summary: 'Biologic material dispatched from Boston cold storage facility, loaded onto temperature-controlled container ship, currently crossing Pacific Ocean with consistent -20°C monitoring and scheduled to arrive at Tokyo port for final ground delivery.'
  },
  { 
    id: 'SH-2024-003', 
    route: 'Mumbai → London', 
    mode: 'Air', 
    status: 'Delivered', 
    temp: '2-8°C', 
    eta: 'Arrived',
    summary: 'Vaccine batch moved from Mumbai manufacturing cold storage to airport facility, flown directly to London Heathrow, cleared customs successfully, transferred to refrigerated truck and delivered to hospital distribution center maintaining 2-8°C throughout entire journey.'
  },
  { 
    id: 'SH-2024-004', 
    route: 'Shanghai → Dubai', 
    mode: 'Rail', 
    status: 'Alert', 
    temp: '-70°C', 
    eta: '3 days',
    summary: 'Temperature-sensitive pharmaceutical dispatched from Shanghai production facility, transported by specialized rail system across Central Asia hub with brief delay at customs checkpoint, currently experiencing minor temperature fluctuation requiring immediate monitoring and corrective action.'
  },
];

export function ClientDashboard() {
  const navigate = useNavigate();

  const getModeIcon = (mode: string) => {
    switch (mode) {
      case 'Air': return <Plane className="h-4 w-4" />;
      case 'Sea': return <Truck className="h-4 w-4" />;
      case 'Rail': return <Truck className="h-4 w-4" />;
      default: return <Truck className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Transit': return 'bg-blue-500 text-white'; // Blue for active shipments
      case 'Delivered': return 'bg-green-500 text-white'; // Green for success
      case 'Alert': return 'bg-red-500 text-white'; // Red for critical alerts
      default: return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Client Dashboard</h1>
          <p className="text-muted-foreground">Overview of your pharmaceutical logistics operations</p>
        </div>
        <div className="flex gap-2">
          <Button 
            className="rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white"
            onClick={() => navigate('/dashboard/create-order')}
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Create New Order
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="rounded-2xl border-2 hover:shadow-lg transition-shadow bg-blue-50/30">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardDescription>Active Shipments</CardDescription>
              <Package className="h-5 w-5 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">24</div>
            <p className="text-sm text-green-600 flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3" /> +12% this week
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-2 hover:shadow-lg transition-shadow bg-yellow-50/30">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardDescription>Pending Deliveries</CardDescription>
              <Clock className="h-5 w-5 text-yellow-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">18</div>
            <p className="text-sm text-muted-foreground mt-1">Expected in 48hrs</p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-2 hover:shadow-lg transition-shadow bg-red-50/30">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardDescription>Temperature Alerts</CardDescription>
              <AlertTriangle className="h-5 w-5 text-red-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">3</div>
            <p className="text-sm text-red-600 mt-1">Requires attention</p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-2 hover:shadow-lg transition-shadow bg-orange-50/30">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardDescription>Procurement Requests</CardDescription>
              <ShoppingCart className="h-5 w-5 text-orange-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">7</div>
            <p className="text-sm text-muted-foreground mt-1">Awaiting approval</p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-2 hover:shadow-lg transition-shadow bg-green-50/30">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardDescription>Completed Orders</CardDescription>
              <CheckCircle2 className="h-5 w-5 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">142</div>
            <p className="text-sm text-muted-foreground mt-1">This month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Shipment Activity Chart */}
        <Card className="lg:col-span-2 rounded-2xl border-2">
          <CardHeader>
            <CardTitle>Weekly Shipment Activity</CardTitle>
            <CardDescription>Number of active shipments per day</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={statsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#888888" fontSize={12} />
                <YAxis stroke="#888888" fontSize={12} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb' }}
                  cursor={{ fill: 'rgba(249, 115, 22, 0.1)' }}
                />
                <Bar dataKey="shipments" fill="#f97316" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="rounded-2xl border-2">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and operations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              className="w-full justify-start rounded-xl bg-primary hover:bg-primary/90"
              onClick={() => navigate('/dashboard/create-order')}
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Create New Order
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start rounded-xl"
              onClick={() => navigate('/dashboard/create-order')}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Request Raw Material
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start rounded-xl"
              onClick={() => navigate('/dashboard/operations-map')}
            >
              <Search className="h-4 w-4 mr-2" />
              Track Shipment
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start rounded-xl"
              onClick={() => navigate('/dashboard/carrier-history')}
            >
              <MapPin className="h-4 w-4 mr-2" />
              View Carrier History
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Shipments */}
      <Card className="rounded-2xl border-2">
        <CardHeader>
          <CardTitle>Active Shipments with Journey Summary</CardTitle>
          <CardDescription>Live tracking with detailed shipment lifecycle</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentShipments.map((shipment) => (
              <Card key={shipment.id} className="rounded-xl border-2 hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    {/* Shipment Info */}
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-lg flex items-center gap-2">
                            {shipment.id}
                            <Badge className={`${getStatusColor(shipment.status)} rounded-lg`}>
                              {shipment.status}
                            </Badge>
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">{shipment.route}</p>
                        </div>
                      </div>

                      {/* Journey Summary */}
                      <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                        <h4 className="text-xs font-semibold text-blue-900 mb-2 flex items-center gap-1">
                          <Package className="h-3 w-3" />
                          Journey Summary
                        </h4>
                        <p className="text-sm text-gray-700 leading-relaxed">
                          {shipment.summary}
                        </p>
                      </div>

                      {/* Shipment Details */}
                      <div className="grid grid-cols-3 gap-3">
                        <div className="flex items-center gap-2">
                          {getModeIcon(shipment.mode)}
                          <span className="text-sm">{shipment.mode}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Thermometer className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{shipment.temp}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">ETA: {shipment.eta}</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex md:flex-col gap-2">
                      <Button 
                        size="sm"
                        className="rounded-lg bg-blue-600 hover:bg-blue-700"
                        onClick={() => navigate('/dashboard/operations-map')}
                      >
                        Track Live
                      </Button>
                      <Button 
                        size="sm"
                        variant="outline"
                        className="rounded-lg"
                        onClick={() => navigate('/dashboard/temperature-change')}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Mini Shipment Map Placeholder */}
      <Card className="rounded-2xl border-2">
        <CardHeader>
          <CardTitle>Active Shipments Map</CardTitle>
          <CardDescription>Real-time location tracking</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-white rounded-xl h-64 relative overflow-hidden border-2">
            {/* World Map Background */}
            <div className="absolute inset-0">
              <img 
                src={worldMapBg} 
                alt="World Map" 
                className="w-full h-full object-cover opacity-40"
              />
            </div>

            {/* Overlay Content */}
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="text-center space-y-3">
                <MapPin className="h-12 w-12 text-primary mx-auto drop-shadow-lg" />
                <p className="text-gray-900 font-semibold">24 Active Shipments Worldwide</p>
                <p className="text-sm text-muted-foreground">Real-time tracking across all regions</p>
                <Button 
                  className="rounded-xl bg-secondary hover:bg-secondary/90 shadow-lg"
                  onClick={() => navigate('/dashboard/operations-map')}
                >
                  Open Full Map View
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}