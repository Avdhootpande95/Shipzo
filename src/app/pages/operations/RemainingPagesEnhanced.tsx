import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
import { 
  MapPin, Plane, Ship, Truck, DollarSign, TrendingDown, Lightbulb,
  FileText, CheckCircle, Clock, Download, Share, Eye, User, Send, Bell, MessageSquare,
  Navigation, AlertTriangle, Thermometer
} from 'lucide-react';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import worldMapBg from 'figma:asset/c7230fcf991b0848d1de94be47c71521c1e3d5e2.png';

// Live Shipments Data for Route Planning Map
const liveShipments = [
  {
    id: 'SH-2024-001',
    route: 'Singapore → Frankfurt',
    mode: 'Air',
    status: 'In Transit',
    currentLocation: 'Over Arabian Sea',
    progress: 65,
    coordinates: { left: '60%', top: '35%' }
  },
  {
    id: 'SH-2024-002',
    route: 'Boston → Tokyo',
    mode: 'Sea',
    status: 'In Transit',
    currentLocation: 'Pacific Ocean',
    progress: 42,
    coordinates: { left: '25%', top: '45%' }
  },
  {
    id: 'SH-2024-003',
    route: 'Mumbai → London',
    mode: 'Air',
    status: 'In Transit',
    currentLocation: 'Middle East Airspace',
    progress: 80,
    coordinates: { left: '55%', top: '40%' }
  },
  {
    id: 'SH-2024-004',
    route: 'Shanghai → Dubai',
    mode: 'Rail',
    status: 'Alert',
    currentLocation: 'Central Asia Hub',
    progress: 28,
    coordinates: { left: '65%', top: '42%' }
  },
  {
    id: 'SH-2024-005',
    route: 'New York → Amsterdam',
    mode: 'Air',
    status: 'In Transit',
    currentLocation: 'Atlantic Ocean',
    progress: 55,
    coordinates: { left: '38%', top: '35%' }
  },
  {
    id: 'SH-2024-006',
    route: 'Sydney → Los Angeles',
    mode: 'Air',
    status: 'In Transit',
    currentLocation: 'Pacific Crossing',
    progress: 70,
    coordinates: { left: '15%', top: '65%' }
  },
  {
    id: 'SH-2024-007',
    route: 'Cape Town → Paris',
    mode: 'Air',
    status: 'In Transit',
    currentLocation: 'Over Mediterranean',
    progress: 85,
    coordinates: { left: '48%', top: '55%' }
  },
  {
    id: 'SH-2024-008',
    route: 'Tokyo → Frankfurt',
    mode: 'Air',
    status: 'In Transit',
    currentLocation: 'Over Russia',
    progress: 50,
    coordinates: { left: '75%', top: '30%' }
  },
];

// Route Planning Data
const routes = [
  {
    id: 1,
    name: 'Singapore → Frankfurt (Direct)',
    mode: 'Air',
    eta: '14 hours',
    cost: '$12,500',
    risk: 'Low',
    recommended: true,
    details: 'Direct flight, optimal temperature control'
  },
  {
    id: 2,
    name: 'Singapore → Dubai → Frankfurt',
    mode: 'Air',
    eta: '18 hours',
    cost: '$10,800',
    risk: 'Medium',
    recommended: false,
    details: 'One hub transfer, minor delay risk'
  },
  {
    id: 3,
    name: 'Singapore → Rotterdam → Frankfurt',
    mode: 'Sea',
    eta: '28 days',
    cost: '$4,200',
    risk: 'Low',
    recommended: false,
    details: 'Ocean freight, longer transit time'
  },
  {
    id: 4,
    name: 'Singapore → Hong Kong → Frankfurt',
    mode: 'Air',
    eta: '16 hours',
    cost: '$11,200',
    risk: 'Low',
    recommended: false,
    details: 'Via Hong Kong hub, reliable route'
  },
];

// Cost Monitoring Data
const costBreakdownData = [
  { name: 'Transport', value: 45, color: '#3b82f6' },
  { name: 'Cold Storage', value: 25, color: '#10b981' },
  { name: 'Handling', value: 15, color: '#f59e0b' },
  { name: 'Customs', value: 10, color: '#f97316' },
  { name: 'Emergency', value: 5, color: '#ef4444' },
];

const monthlyCostData = [
  { month: 'Oct', cost: 450 },
  { month: 'Nov', cost: 480 },
  { month: 'Dec', cost: 520 },
  { month: 'Jan', cost: 490 },
  { month: 'Feb', cost: 470 },
  { month: 'Mar', cost: 510 },
];

// Compliance Data
const documents = [
  { id: 1, name: 'GDP Certification', shipmentId: 'SH-2024-001', status: 'Verified', date: '2024-03-05' },
  { id: 2, name: 'Temperature Log Report', shipmentId: 'SH-2024-002', status: 'Approved', date: '2024-03-06' },
  { id: 3, name: 'FDA Transport Certificate', shipmentId: 'SH-2024-004', status: 'Pending', date: '2024-03-07' },
  { id: 4, name: 'Cold Chain Validation', shipmentId: 'SH-2024-005', status: 'Verified', date: '2024-03-07' },
  { id: 5, name: 'GMP Compliance Report', shipmentId: 'SH-2024-007', status: 'Approved', date: '2024-03-06' },
];

const auditLog = [
  { time: '10:45 AM', user: 'John Smith', action: 'Approved GDP Certificate', shipment: 'SH-2024-002' },
  { time: '09:30 AM', user: 'Sarah Johnson', action: 'Uploaded Temperature Log', shipment: 'SH-2024-004' },
  { time: '08:15 AM', user: 'Mike Chen', action: 'Verified Cold Chain', shipment: 'SH-2024-001' },
  { time: 'Yesterday', user: 'Emma Davis', action: 'Downloaded FDA Certificate', shipment: 'SH-2024-007' },
];

// Communications Data
const conversations = [
  { id: 1, carrier: 'Global Air Cargo', lastMessage: 'Shipment SH-2024-001 departed on time', time: '5 min ago', unread: 2 },
  { id: 2, carrier: 'Pacific Shipping Lines', lastMessage: 'Customs clearance completed', time: '1 hour ago', unread: 0 },
  { id: 3, carrier: 'EuroRail Logistics', lastMessage: 'Temperature sensors calibrated', time: '3 hours ago', unread: 1 },
  { id: 4, carrier: 'ColdChain Express', lastMessage: 'Route deviation due to weather', time: '5 hours ago', unread: 3 },
];

const notifications = [
  { id: 1, type: 'Shipment Update', message: 'SH-2024-001 arrived at destination', time: '10 min ago' },
  { id: 2, type: 'Alert', message: 'Temperature alert for SH-2024-004', time: '30 min ago' },
  { id: 3, type: 'Confirmation', message: 'Carrier confirmed shipment pickup', time: '2 hours ago' },
  { id: 4, type: 'Document', message: 'GDP certificate uploaded', time: '4 hours ago' },
];

// Route Planning Component
export function RoutePlanningEnhanced() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Route Planning</h1>
        <p className="text-muted-foreground">Optimize shipping routes and logistics planning</p>
      </div>

      {/* AI Recommendations */}
      <Card className="rounded-2xl border-2 border-secondary/20 bg-gradient-to-r from-secondary/5 to-primary/5">
        <CardContent className="p-6">
          <div className="flex gap-4">
            <div className="bg-secondary rounded-xl p-3 h-fit">
              <Lightbulb className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-2">AI Route Recommendation</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Based on current conditions, we recommend <strong>Singapore → Frankfurt (Direct)</strong> route. 
                This saves 4 hours transit time and reduces temperature excursion risk by 35%.
              </p>
              <div className="flex gap-2">
                <Badge variant="outline" className="rounded-lg bg-white">
                  <TrendingDown className="h-3 w-3 mr-1" />
                  12% Cost Reduction
                </Badge>
                <Badge variant="outline" className="rounded-lg bg-white">
                  Faster ETA
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Route Comparison Table */}
      <Card className="rounded-2xl border-2">
        <CardHeader>
          <CardTitle>Route Comparison</CardTitle>
          <CardDescription>Compare available routes and select optimal path</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Route</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Transport Mode</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">ETA</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Cost</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Risk Score</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Details</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody>
                {routes.map((route) => (
                  <tr key={route.id} className={`border-b border-gray-100 hover:bg-gray-50 ${route.recommended ? 'bg-green-50' : ''}`}>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{route.name}</span>
                        {route.recommended && (
                          <Badge className="bg-green-500 text-white rounded-lg text-xs">
                            Recommended
                          </Badge>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        {route.mode === 'Air' && <Plane className="h-4 w-4" />}
                        {route.mode === 'Sea' && <Ship className="h-4 w-4" />}
                        <span>{route.mode}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">{route.eta}</td>
                    <td className="py-3 px-4 font-semibold">{route.cost}</td>
                    <td className="py-3 px-4">
                      <Badge variant="outline" className="rounded-lg">
                        {route.risk}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{route.details}</td>
                    <td className="py-3 px-4">
                      <Button size="sm" variant="outline" className="rounded-lg">
                        Select Route
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Interactive Map */}
      <Card className="rounded-2xl border-2">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>Live Shipment Tracking Map</CardTitle>
              <CardDescription>Real-time global shipment locations and routes</CardDescription>
            </div>
            <Badge variant="outline" className="rounded-lg">
              <Navigation className="h-3 w-3 mr-1" />
              {liveShipments.length} Active Shipments
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="bg-white rounded-xl h-[500px] relative overflow-hidden border-2">
            {/* World Map Background */}
            <div className="absolute inset-0">
              <img 
                src={worldMapBg} 
                alt="World Map" 
                className="w-full h-full object-cover opacity-40"
              />
            </div>

            {/* Live Shipment Markers */}
            {liveShipments.map((shipment) => {
              const getModeIcon = () => {
                switch (shipment.mode) {
                  case 'Air': return <Plane className="h-4 w-4 text-white" />;
                  case 'Sea': return <Ship className="h-4 w-4 text-white" />;
                  case 'Rail': return <Truck className="h-4 w-4 text-white rotate-180" />;
                  default: return <Truck className="h-4 w-4 text-white" />;
                }
              };

              const getStatusColor = () => {
                return shipment.status === 'Alert' ? 'bg-destructive' : 'bg-secondary';
              };

              return (
                <div
                  key={shipment.id}
                  className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition-transform z-10"
                  style={{
                    left: shipment.coordinates.left,
                    top: shipment.coordinates.top
                  }}
                >
                  <div className="relative group">
                    <div className={`${getStatusColor()} rounded-full p-3 shadow-lg animate-pulse`}>
                      {getModeIcon()}
                    </div>
                    
                    {/* Tooltip on hover */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-20 whitespace-nowrap">
                      <div className="bg-white rounded-lg shadow-xl border-2 p-3">
                        <p className="font-semibold text-sm text-gray-900">{shipment.id}</p>
                        <p className="text-xs text-muted-foreground mt-1">{shipment.route}</p>
                        <p className="text-xs text-muted-foreground">{shipment.currentLocation}</p>
                        <div className="flex items-center gap-1 mt-2">
                          <div className="w-full bg-gray-200 rounded-full h-1.5">
                            <div 
                              className="bg-secondary rounded-full h-1.5"
                              style={{ width: `${shipment.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-xs font-medium text-gray-700">{shipment.progress}%</span>
                        </div>
                      </div>
                    </div>

                    {/* Ping animation for alerts */}
                    {shipment.status === 'Alert' && (
                      <div className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-75"></div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Map Legend */}
            <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg border-2 z-20">
              <p className="font-semibold text-sm mb-3">Transport Modes</p>
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
            <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg border-2 z-20">
              <p className="font-semibold text-sm mb-3">Status Indicators</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <div className="h-3 w-3 rounded-full bg-secondary animate-pulse"></div>
                  <span>In Transit</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="h-3 w-3 rounded-full bg-destructive animate-pulse"></div>
                  <span>Alert</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Cost Monitoring Component
export function CostMonitoringEnhanced() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Cost Monitoring</h1>
        <p className="text-muted-foreground">Track operational expenses and optimize logistics costs</p>
      </div>

      {/* Cost Overview Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="rounded-2xl border-2 hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Total Logistics Cost</span>
              <DollarSign className="h-5 w-5 text-secondary" />
            </div>
            <p className="text-3xl font-bold">$510K</p>
            <p className="text-sm text-green-600 mt-1">↓ 4.2% vs last month</p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-2 hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Transport Cost</span>
              <Plane className="h-5 w-5 text-primary" />
            </div>
            <p className="text-3xl font-bold">$230K</p>
            <p className="text-sm text-muted-foreground mt-1">45% of total</p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-2 hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Cold Storage</span>
              <Badge className="h-5 px-2 bg-green-500">New</Badge>
            </div>
            <p className="text-3xl font-bold">$128K</p>
            <p className="text-sm text-muted-foreground mt-1">25% of total</p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-2 hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Avg Cost/Shipment</span>
              <TrendingDown className="h-5 w-5 text-green-600" />
            </div>
            <p className="text-3xl font-bold">$4.1K</p>
            <p className="text-sm text-green-600 mt-1">↓ 8% optimized</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Cost Breakdown Pie Chart */}
        <Card className="rounded-2xl border-2">
          <CardHeader>
            <CardTitle>Logistics Cost Breakdown</CardTitle>
            <CardDescription>Cost distribution by category</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={costBreakdownData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {costBreakdownData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Monthly Cost Trend */}
        <Card className="rounded-2xl border-2">
          <CardHeader>
            <CardTitle>Monthly Logistics Cost Trend</CardTitle>
            <CardDescription>6-month cost analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyCostData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#888888" fontSize={12} />
                <YAxis stroke="#888888" fontSize={12} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="cost" stroke="#3b82f6" strokeWidth={2} name="Cost ($K)" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Operational Efficiency Insights */}
      <Card className="rounded-2xl border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-secondary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-primary" />
            Operational Efficiency Insights
          </CardTitle>
          <CardDescription>AI-powered cost optimization recommendations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Card className="rounded-xl border-2">
              <CardContent className="p-4">
                <div className="flex gap-3">
                  <Badge className="bg-green-500 text-white h-fit rounded-lg">Save $12K</Badge>
                  <div>
                    <h3 className="font-semibold mb-1">Bundle Shipments to Frankfurt</h3>
                    <p className="text-sm text-muted-foreground">
                      Consolidate 3 separate air freight shipments scheduled for next week. Estimated savings: $12,000
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-xl border-2">
              <CardContent className="p-4">
                <div className="flex gap-3">
                  <Badge className="bg-blue-500 text-white h-fit rounded-lg">Save $8K</Badge>
                  <div>
                    <h3 className="font-semibold mb-1">Switch to Sea Freight for Non-Urgent</h3>
                    <p className="text-sm text-muted-foreground">
                      2 shipments can use ocean transport without impacting delivery deadlines
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-xl border-2">
              <CardContent className="p-4">
                <div className="flex gap-3">
                  <Badge className="bg-yellow-500 text-white h-fit rounded-lg">Save $5K</Badge>
                  <div>
                    <h3 className="font-semibold mb-1">Avoid Congested Port Rotterdam</h3>
                    <p className="text-sm text-muted-foreground">
                      Reroute via Hamburg to avoid 3-day customs delays and additional handling fees
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Compliance & Documents Component
export function ComplianceEnhanced() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Verified': return 'bg-green-500';
      case 'Approved': return 'bg-secondary';
      case 'Pending': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Compliance & Documents</h1>
        <p className="text-muted-foreground">Manage compliance certifications and documentation</p>
      </div>

      {/* Compliance Overview */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="rounded-2xl border-2 border-green-500/20 hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <CheckCircle className="h-8 w-8 text-green-500" />
              <Badge className="bg-green-500 text-white rounded-lg">Active</Badge>
            </div>
            <h3 className="font-semibold mb-1">GDP Compliance</h3>
            <p className="text-sm text-muted-foreground">Valid until Dec 2024</p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-2 border-green-500/20 hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <CheckCircle className="h-8 w-8 text-green-500" />
              <Badge className="bg-green-500 text-white rounded-lg">Active</Badge>
            </div>
            <h3 className="font-semibold mb-1">FDA Transport Certification</h3>
            <p className="text-sm text-muted-foreground">Valid until Nov 2024</p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-2 border-green-500/20 hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <CheckCircle className="h-8 w-8 text-green-500" />
              <Badge className="bg-green-500 text-white rounded-lg">Active</Badge>
            </div>
            <h3 className="font-semibold mb-1">Cold Chain Validation</h3>
            <p className="text-sm text-muted-foreground">Valid until Jan 2025</p>
          </CardContent>
        </Card>
      </div>

      {/* Document Library */}
      <Card className="rounded-2xl border-2">
        <CardHeader>
          <CardTitle>Document Library</CardTitle>
          <CardDescription>Shipment documentation and certificates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Document Name</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Shipment ID</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Date</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {documents.map((doc) => (
                  <tr key={doc.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-secondary" />
                        <span className="font-medium">{doc.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">{doc.shipmentId}</td>
                    <td className="py-3 px-4">{doc.date}</td>
                    <td className="py-3 px-4">
                      <Badge className={`${getStatusColor(doc.status)} text-white rounded-lg`}>
                        {doc.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="rounded-lg">
                          <Eye className="h-3 w-3 mr-1" />
                          View
                        </Button>
                        <Button variant="outline" size="sm" className="rounded-lg">
                          <Download className="h-3 w-3 mr-1" />
                          Download
                        </Button>
                        <Button variant="outline" size="sm" className="rounded-lg">
                          <Share className="h-3 w-3 mr-1" />
                          Share
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Audit Log */}
      <Card className="rounded-2xl border-2">
        <CardHeader>
          <CardTitle>Audit Log</CardTitle>
          <CardDescription>Track user actions and document changes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {auditLog.map((log, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-xl border-2 hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="bg-secondary/10 rounded-lg p-2">
                    <User className="h-4 w-4 text-secondary" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{log.action}</p>
                    <p className="text-xs text-muted-foreground">
                      {log.user} • {log.shipment} • {log.time}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Communications Component
export function CommunicationsEnhanced() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Communications</h1>
        <p className="text-muted-foreground">Internal and external logistics communications</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Logistics Chat Panel */}
        <Card className="lg:col-span-2 rounded-2xl border-2">
          <CardHeader>
            <CardTitle>Carrier Conversations</CardTitle>
            <CardDescription>Direct communication with logistics partners</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 mb-4">
              {conversations.map((conv) => (
                <Card key={conv.id} className="rounded-xl border-2 hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="bg-secondary/10 rounded-xl p-3">
                          <User className="h-5 w-5 text-secondary" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{conv.carrier}</h3>
                            {conv.unread > 0 && (
                              <Badge className="bg-destructive text-white rounded-full h-5 w-5 p-0 flex items-center justify-center text-xs">
                                {conv.unread}
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{conv.lastMessage}</p>
                          <p className="text-xs text-muted-foreground mt-1">{conv.time}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="rounded-lg">
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Message Input */}
            <Card className="rounded-xl border-2 bg-gray-50">
              <CardContent className="p-4">
                <div className="flex gap-2">
                  <Input 
                    placeholder="Type a message to carrier..." 
                    className="rounded-xl bg-white"
                  />
                  <Button className="rounded-xl bg-secondary hover:bg-secondary/90">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>

        {/* Notifications Feed */}
        <Card className="rounded-2xl border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              Notifications
            </CardTitle>
            <CardDescription>Recent updates and alerts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {notifications.map((notif) => (
              <Card key={notif.id} className="rounded-xl border-2">
                <CardContent className="p-3">
                  <div className="space-y-1">
                    <Badge variant="outline" className="rounded-lg text-xs mb-1">
                      {notif.type}
                    </Badge>
                    <p className="text-sm font-medium">{notif.message}</p>
                    <p className="text-xs text-muted-foreground">{notif.time}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Contact Directory */}
      <Card className="rounded-2xl border-2">
        <CardHeader>
          <CardTitle>Contact Directory</CardTitle>
          <CardDescription>Quick access to carrier contacts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {['Global Air Cargo', 'Pacific Shipping Lines', 'EuroRail Logistics', 'ColdChain Express'].map((carrier, idx) => (
              <Card key={idx} className="rounded-xl border-2 hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="text-center space-y-2">
                    <div className="bg-secondary/10 rounded-xl p-3 w-fit mx-auto">
                      <User className="h-6 w-6 text-secondary" />
                    </div>
                    <h3 className="font-semibold text-sm">{carrier}</h3>
                    <p className="text-xs text-muted-foreground">operations@carrier.com</p>
                    <Button size="sm" variant="outline" className="w-full rounded-lg">
                      <MessageSquare className="h-3 w-3 mr-1" />
                      Contact
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}