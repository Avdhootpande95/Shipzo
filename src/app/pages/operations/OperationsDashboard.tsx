import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { 
  Package, 
  TrendingUp, 
  AlertTriangle, 
  Clock, 
  Warehouse, 
  Truck,
  Calendar,
  Thermometer,
  Plane,
  Ship,
  MapPin
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from 'recharts';
import worldMapBg from 'figma:asset/c7230fcf991b0848d1de94be47c71521c1e3d5e2.png';

const shipmentModeData = [
  { name: 'Air', value: 45, color: '#3b82f6' },
  { name: 'Sea', value: 28, color: '#10b981' },
  { name: 'Rail', value: 18, color: '#f59e0b' },
  { name: 'Road', value: 32, color: '#f97316' },
];

const tempComplianceData = [
  { day: 'Mon', compliance: 98.5 },
  { day: 'Tue', compliance: 99.2 },
  { day: 'Wed', compliance: 97.8 },
  { day: 'Thu', compliance: 99.5 },
  { day: 'Fri', compliance: 98.9 },
  { day: 'Sat', compliance: 99.1 },
  { day: 'Sun', compliance: 99.3 },
];

const deliveryPerformanceData = [
  { month: 'Jan', onTime: 142, delayed: 12 },
  { month: 'Feb', onTime: 158, delayed: 8 },
  { month: 'Mar', onTime: 165, delayed: 15 },
];

const recentAlerts = [
  { id: 'SH-2024-004', type: 'Temperature', severity: 'high', message: 'Temperature deviation detected', time: '15 min ago' },
  { id: 'SH-2024-012', type: 'Delay', severity: 'medium', message: 'Shipment delayed due to weather', time: '1 hour ago' },
  { id: 'SH-2024-008', type: 'Customs', severity: 'low', message: 'Customs clearance pending', time: '2 hours ago' },
];

export function OperationsDashboard() {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-destructive';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Operations Dashboard</h1>
        <p className="text-muted-foreground">Real-time operational overview and monitoring</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4">
        <Card className="rounded-2xl border-2 hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardDescription>Active Shipments</CardDescription>
              <Package className="h-5 w-5 text-secondary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">123</div>
            <p className="text-sm text-green-600 flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3" /> +8% today
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-2 hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardDescription>In Transit</CardDescription>
              <Truck className="h-5 w-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">87</div>
            <p className="text-sm text-muted-foreground mt-1">Currently moving</p>
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
            <div className="text-3xl font-bold text-gray-900">5</div>
            <p className="text-sm text-destructive mt-1">Need attention</p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-2 hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardDescription>Delayed Shipments</CardDescription>
              <Clock className="h-5 w-5 text-yellow-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">12</div>
            <p className="text-sm text-muted-foreground mt-1">Behind schedule</p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-2 hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardDescription>Inventory Items</CardDescription>
              <Warehouse className="h-5 w-5 text-green-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">1,248</div>
            <p className="text-sm text-muted-foreground mt-1">Total units</p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-2 hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardDescription>Carrier Utilization</CardDescription>
              <Truck className="h-5 w-5 text-blue-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">76%</div>
            <p className="text-sm text-muted-foreground mt-1">Fleet capacity</p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-2 hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardDescription>Upcoming Deliveries</CardDescription>
              <Calendar className="h-5 w-5 text-purple-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">34</div>
            <p className="text-sm text-muted-foreground mt-1">Next 24 hours</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Transport Mode Distribution */}
        <Card className="rounded-2xl border-2">
          <CardHeader>
            <CardTitle>Transport Mode Distribution</CardTitle>
            <CardDescription>Active shipments by transport type</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={shipmentModeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {shipmentModeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Temperature Compliance */}
        <Card className="rounded-2xl border-2">
          <CardHeader>
            <CardTitle>Temperature Compliance</CardTitle>
            <CardDescription>Weekly compliance percentage</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={tempComplianceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" stroke="#888888" fontSize={12} />
                <YAxis domain={[95, 100]} stroke="#888888" fontSize={12} />
                <Tooltip />
                <Line type="monotone" dataKey="compliance" stroke="#10b981" strokeWidth={2} dot={{ fill: '#10b981' }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Delivery Performance */}
        <Card className="rounded-2xl border-2">
          <CardHeader>
            <CardTitle>Delivery Performance</CardTitle>
            <CardDescription>On-time vs delayed deliveries</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={deliveryPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#888888" fontSize={12} />
                <YAxis stroke="#888888" fontSize={12} />
                <Tooltip />
                <Legend />
                <Bar dataKey="onTime" fill="#10b981" radius={[8, 8, 0, 0]} name="On Time" />
                <Bar dataKey="delayed" fill="#ef4444" radius={[8, 8, 0, 0]} name="Delayed" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Central Operations Map */}
        <Card className="lg:col-span-2 rounded-2xl border-2">
          <CardHeader>
            <CardTitle>Global Operations Map</CardTitle>
            <CardDescription>Real-time shipment tracking worldwide</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-white rounded-xl h-[400px] relative overflow-hidden border-2">
              {/* World Map Background */}
              <div className="absolute inset-0">
                <img 
                  src={worldMapBg} 
                  alt="World Map" 
                  className="w-full h-full object-cover opacity-40"
                />
              </div>

              {/* Shipment Indicators Overlay */}
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="text-center space-y-3">
                  <MapPin className="h-12 w-12 text-secondary mx-auto drop-shadow-lg" />
                  <p className="text-gray-900 font-semibold">123 Active Shipments</p>
                  <p className="text-sm text-muted-foreground">Tracking globally in real-time</p>
                  <div className="flex gap-2 justify-center pt-2">
                    <Badge variant="outline" className="rounded-lg bg-white/90 backdrop-blur-sm border-2">
                      <Plane className="h-3 w-3 mr-1" /> 45 Air
                    </Badge>
                    <Badge variant="outline" className="rounded-lg bg-white/90 backdrop-blur-sm border-2">
                      <Ship className="h-3 w-3 mr-1" /> 28 Sea
                    </Badge>
                    <Badge variant="outline" className="rounded-lg bg-white/90 backdrop-blur-sm border-2">
                      <Truck className="h-3 w-3 mr-1" /> 50 Land
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Alerts */}
        <Card className="rounded-2xl border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              Recent Alerts
            </CardTitle>
            <CardDescription>Real-time risk notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentAlerts.map((alert, idx) => (
              <Card key={idx} className="rounded-xl border-2">
                <CardContent className="p-3">
                  <div className="flex gap-3">
                    <div className={`${getSeverityColor(alert.severity)} rounded-lg p-2 h-fit`}>
                      {alert.type === 'Temperature' && <Thermometer className="h-4 w-4 text-white" />}
                      {alert.type === 'Delay' && <Clock className="h-4 w-4 text-white" />}
                      {alert.type === 'Customs' && <AlertTriangle className="h-4 w-4 text-white" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <p className="font-semibold text-sm">{alert.id}</p>
                        <Badge variant="outline" className="text-xs rounded-lg">
                          {alert.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{alert.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}