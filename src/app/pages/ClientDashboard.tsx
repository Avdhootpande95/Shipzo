import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { useNavigate } from 'react-router';
import { 
  Package, 
  Clock, 
  AlertTriangle, 
  ShoppingCart, 
  CheckCircle, 
  PlusCircle, 
  Search, 
  TrendingUp,
  Ship,
  Plane,
  Truck,
  MapPin
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

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
  { id: 'SH-2024-001', route: 'Singapore → Frankfurt', mode: 'Air', status: 'In Transit', temp: '2-8°C', eta: '18 hrs' },
  { id: 'SH-2024-002', route: 'Boston → Tokyo', mode: 'Sea', status: 'In Transit', temp: '-20°C', eta: '5 days' },
  { id: 'SH-2024-003', route: 'Mumbai → London', mode: 'Air', status: 'Delivered', temp: '2-8°C', eta: 'Arrived' },
  { id: 'SH-2024-004', route: 'Shanghai → Dubai', mode: 'Rail', status: 'Alert', temp: '-70°C', eta: '3 days' },
];

export function ClientDashboard() {
  const navigate = useNavigate();

  const getModeIcon = (mode: string) => {
    switch (mode) {
      case 'Air': return <Plane className="h-4 w-4" />;
      case 'Sea': return <Ship className="h-4 w-4" />;
      case 'Rail': return <Truck className="h-4 w-4" />;
      default: return <Truck className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Transit': return 'bg-secondary';
      case 'Delivered': return 'bg-green-500';
      case 'Alert': return 'bg-destructive';
      default: return 'bg-gray-500';
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
            className="rounded-xl bg-primary hover:bg-primary/90"
            onClick={() => navigate('/dashboard/create-order')}
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Create New Order
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="rounded-2xl border-2 hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardDescription>Active Shipments</CardDescription>
              <Package className="h-5 w-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">24</div>
            <p className="text-sm text-green-600 flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3" /> +12% this week
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-2 hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardDescription>Pending Deliveries</CardDescription>
              <Clock className="h-5 w-5 text-secondary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">18</div>
            <p className="text-sm text-muted-foreground mt-1">Expected in 48hrs</p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-2 hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardDescription>Temperature Alerts</CardDescription>
              <AlertTriangle className="h-5 w-5 text-destructive" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">3</div>
            <p className="text-sm text-destructive mt-1">Requires attention</p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-2 hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardDescription>Procurement Requests</CardDescription>
              <ShoppingCart className="h-5 w-5 text-orange-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">7</div>
            <p className="text-sm text-muted-foreground mt-1">Awaiting approval</p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-2 hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardDescription>Completed Orders</CardDescription>
              <CheckCircle className="h-5 w-5 text-green-500" />
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
          <CardTitle>Recent Shipments</CardTitle>
          <CardDescription>Live tracking of your active deliveries</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Shipment ID</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Route</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Mode</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Temperature</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">ETA</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody>
                {recentShipments.map((shipment) => (
                  <tr key={shipment.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{shipment.id}</td>
                    <td className="py-3 px-4">{shipment.route}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        {getModeIcon(shipment.mode)}
                        <span>{shipment.mode}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="outline" className="rounded-lg">
                        {shipment.temp}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={`${getStatusColor(shipment.status)} text-white rounded-lg`}>
                        {shipment.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">{shipment.eta}</td>
                    <td className="py-3 px-4">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="rounded-lg"
                        onClick={() => navigate('/dashboard/operations-map')}
                      >
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
          <div className="bg-gradient-to-br from-blue-50 to-orange-50 rounded-xl h-64 flex items-center justify-center border-2 border-dashed border-gray-300">
            <div className="text-center space-y-3">
              <MapPin className="h-12 w-12 text-primary mx-auto" />
              <p className="text-muted-foreground">Interactive map showing 24 active shipments worldwide</p>
              <Button 
                className="rounded-xl bg-secondary hover:bg-secondary/90"
                onClick={() => navigate('/dashboard/operations-map')}
              >
                Open Full Map View
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
