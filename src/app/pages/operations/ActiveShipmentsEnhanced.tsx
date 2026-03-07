import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Package, Plane, Ship, Truck, MapPin, Thermometer, FileText, Download, X, TrendingUp, Clock, AlertTriangle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const shipments = [
  {
    id: 'SH-2024-001',
    client: 'PharmaCorp Inc.',
    material: 'mRNA Vaccine',
    origin: 'Singapore',
    destination: 'Frankfurt',
    mode: 'Air',
    temp: '2-8°C',
    lastUpdate: '2 min ago',
    eta: '18 hrs',
    status: 'In Transit',
    risk: 'Low',
    currentTemp: 5.2,
    route: 'Singapore → Dubai (Hub) → Frankfurt',
    progress: 45
  },
  {
    id: 'SH-2024-002',
    client: 'MedSupply Global',
    material: 'Monoclonal Antibody',
    origin: 'Boston',
    destination: 'Tokyo',
    mode: 'Sea',
    temp: '-20°C',
    lastUpdate: '15 min ago',
    eta: '5 days',
    status: 'In Transit',
    risk: 'Low',
    currentTemp: -19.8,
    route: 'Boston → Los Angeles (Hub) → Tokyo',
    progress: 30
  },
  {
    id: 'SH-2024-004',
    client: 'BioTech Solutions',
    material: 'Cell Therapy Product',
    origin: 'Shanghai',
    destination: 'Dubai',
    mode: 'Air',
    temp: '-70°C',
    lastUpdate: '1 min ago',
    eta: '3 days',
    status: 'Alert',
    risk: 'High',
    currentTemp: -68.5,
    route: 'Shanghai → Hong Kong (Hub) → Dubai',
    progress: 60
  },
  {
    id: 'SH-2024-005',
    client: 'HealthCare Partners',
    material: 'Insulin Formulation',
    origin: 'Mumbai',
    destination: 'London',
    mode: 'Air',
    temp: '2-8°C',
    lastUpdate: '5 min ago',
    eta: '12 hrs',
    status: 'In Transit',
    risk: 'Medium',
    currentTemp: 6.8,
    route: 'Mumbai → Dubai (Hub) → London',
    progress: 70
  },
  {
    id: 'SH-2024-007',
    client: 'Global Pharma Ltd',
    material: 'Lyophilized Protein',
    origin: 'Paris',
    destination: 'Sydney',
    mode: 'Sea',
    temp: '-20°C',
    lastUpdate: '30 min ago',
    eta: '14 days',
    status: 'In Transit',
    risk: 'Low',
    currentTemp: -20.1,
    route: 'Paris → Singapore (Hub) → Sydney',
    progress: 25
  },
];

const temperatureData = [
  { time: '00:00', temp: 5.1 },
  { time: '04:00', temp: 5.3 },
  { time: '08:00', temp: 5.0 },
  { time: '12:00', temp: 5.2 },
  { time: '16:00', temp: 5.4 },
  { time: '20:00', temp: 5.2 },
];

export function ActiveShipmentsEnhanced() {
  const [selectedShipment, setSelectedShipment] = useState<typeof shipments[0] | null>(null);

  const getModeIcon = (mode: string) => {
    switch (mode) {
      case 'Air': return <Plane className="h-4 w-4" />;
      case 'Sea': return <Ship className="h-4 w-4" />;
      case 'Rail': return <Truck className="h-4 w-4 rotate-180" />;
      default: return <Truck className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'Alert' ? 'bg-destructive' : 'bg-secondary';
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'bg-green-500';
      case 'Medium': return 'bg-yellow-500';
      case 'High': return 'bg-destructive';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Active Shipments</h1>
        <p className="text-muted-foreground">All shipments currently managed by operations</p>
      </div>

      <Card className="rounded-2xl border-2">
        <CardHeader>
          <CardTitle>Shipment Management</CardTitle>
          <CardDescription>Real-time overview of all active shipments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Shipment ID</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Client</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Material</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Origin</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Destination</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Mode</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Temperature</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Last Update</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">ETA</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Risk</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {shipments.map((shipment) => (
                  <tr key={shipment.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{shipment.id}</td>
                    <td className="py-3 px-4">{shipment.client}</td>
                    <td className="py-3 px-4">{shipment.material}</td>
                    <td className="py-3 px-4">{shipment.origin}</td>
                    <td className="py-3 px-4">{shipment.destination}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        {getModeIcon(shipment.mode)}
                        <span>{shipment.mode}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="outline" className="rounded-lg">{shipment.temp}</Badge>
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{shipment.lastUpdate}</td>
                    <td className="py-3 px-4">{shipment.eta}</td>
                    <td className="py-3 px-4">
                      <Badge className={`${getStatusColor(shipment.status)} text-white rounded-lg`}>
                        {shipment.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={`${getRiskColor(shipment.risk)} text-white rounded-lg`}>
                        {shipment.risk}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="rounded-lg"
                        onClick={() => setSelectedShipment(shipment)}
                      >
                        View Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Shipment Details Modal */}
      {selectedShipment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border-2">
            <CardHeader className="border-b bg-gradient-to-r from-secondary/10 to-primary/10">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl">{selectedShipment.id}</CardTitle>
                  <CardDescription className="text-base mt-1">
                    {selectedShipment.origin} → {selectedShipment.destination}
                  </CardDescription>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setSelectedShipment(null)}
                  className="rounded-lg"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {/* Shipment Info Grid */}
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Package className="h-5 w-5 text-secondary" />
                    <span className="text-sm text-muted-foreground">Client</span>
                  </div>
                  <p className="font-semibold">{selectedShipment.client}</p>
                </div>
                <div className="bg-orange-50 rounded-xl p-4 border border-orange-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Thermometer className="h-5 w-5 text-primary" />
                    <span className="text-sm text-muted-foreground">Current Temp</span>
                  </div>
                  <p className="font-semibold">{selectedShipment.currentTemp}°C</p>
                </div>
                <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="h-5 w-5 text-green-600" />
                    <span className="text-sm text-muted-foreground">ETA</span>
                  </div>
                  <p className="font-semibold">{selectedShipment.eta}</p>
                </div>
              </div>

              {/* Route Information */}
              <Card className="rounded-xl border-2">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-secondary" />
                    Route Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">Complete Route</p>
                    <p className="font-medium">{selectedShipment.route}</p>
                    <div className="relative pt-4">
                      <div className="h-2 bg-gray-200 rounded-full">
                        <div 
                          className="h-2 bg-secondary rounded-full transition-all"
                          style={{ width: `${selectedShipment.progress}%` }}
                        />
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">{selectedShipment.progress}% Complete</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Temperature Monitoring Graph */}
              <Card className="rounded-xl border-2">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Thermometer className="h-5 w-5 text-primary" />
                    Temperature Monitoring (Last 24 Hours)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={temperatureData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="time" stroke="#888888" fontSize={12} />
                      <YAxis stroke="#888888" fontSize={12} domain={[0, 10]} />
                      <Tooltip />
                      <Line type="monotone" dataKey="temp" stroke="#f97316" strokeWidth={2} dot={{ fill: '#f97316' }} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Shipment Timeline */}
              <Card className="rounded-xl border-2">
                <CardHeader>
                  <CardTitle className="text-lg">Shipment Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className="bg-green-500 rounded-full p-2">
                          <Package className="h-4 w-4 text-white" />
                        </div>
                        <div className="w-0.5 h-12 bg-gray-300"></div>
                      </div>
                      <div>
                        <p className="font-semibold">Shipment Created</p>
                        <p className="text-sm text-muted-foreground">2 days ago - {selectedShipment.origin}</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className="bg-secondary rounded-full p-2">
                          <TrendingUp className="h-4 w-4 text-white" />
                        </div>
                        <div className="w-0.5 h-12 bg-gray-300"></div>
                      </div>
                      <div>
                        <p className="font-semibold">In Transit</p>
                        <p className="text-sm text-muted-foreground">Current - En route via {selectedShipment.mode}</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className="bg-gray-300 rounded-full p-2">
                          <MapPin className="h-4 w-4 text-white" />
                        </div>
                      </div>
                      <div>
                        <p className="font-semibold text-muted-foreground">Arrival Expected</p>
                        <p className="text-sm text-muted-foreground">ETA {selectedShipment.eta} - {selectedShipment.destination}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button className="flex-1 rounded-xl bg-secondary hover:bg-secondary/90">
                  <MapPin className="h-4 w-4 mr-2" />
                  Track on Map
                </Button>
                <Button className="flex-1 rounded-xl bg-primary hover:bg-primary/90">
                  <Thermometer className="h-4 w-4 mr-2" />
                  View Temp Logs
                </Button>
                <Button variant="outline" className="flex-1 rounded-xl">
                  <Download className="h-4 w-4 mr-2" />
                  Download Docs
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
