import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { useNavigate } from 'react-router';
import { 
  Plane, 
  Ship, 
  Truck, 
  Clock, 
  DollarSign, 
  AlertCircle, 
  CheckCircle2,
  TrendingUp,
  Shield
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const routes = [
  {
    id: 'A',
    name: 'Route A',
    modes: ['Air', 'Truck'],
    eta: '36 hrs',
    etaHours: 36,
    cost: 18000,
    risk: 'Low',
    reliability: 98,
    details: [
      { stage: 'Air Cargo', from: 'Singapore', to: 'Frankfurt', duration: '14 hrs' },
      { stage: 'Refrigerated Truck', from: 'Frankfurt', to: 'Final Destination', duration: '22 hrs' }
    ]
  },
  {
    id: 'B',
    name: 'Route B',
    modes: ['Rail', 'Truck'],
    eta: '72 hrs',
    etaHours: 72,
    cost: 9000,
    risk: 'Medium',
    reliability: 92,
    details: [
      { stage: 'Rail Transport', from: 'Singapore', to: 'Intermediate Hub', duration: '48 hrs' },
      { stage: 'Refrigerated Truck', from: 'Hub', to: 'Final Destination', duration: '24 hrs' }
    ]
  },
  {
    id: 'C',
    name: 'Route C',
    modes: ['Sea', 'Air', 'Truck'],
    eta: '96 hrs',
    etaHours: 96,
    cost: 12000,
    risk: 'Medium',
    reliability: 95,
    details: [
      { stage: 'Sea Freight', from: 'Singapore', to: 'Port Hub', duration: '48 hrs' },
      { stage: 'Air Cargo', from: 'Port Hub', to: 'Regional Airport', duration: '32 hrs' },
      { stage: 'Refrigerated Truck', from: 'Airport', to: 'Final Destination', duration: '16 hrs' }
    ]
  }
];

const costComparisonData = routes.map(r => ({
  name: r.name,
  Cost: r.cost / 1000,
  ETA: r.etaHours
}));

export function RouteComparison() {
  const navigate = useNavigate();

  const getModeIcon = (mode: string) => {
    switch (mode) {
      case 'Air': return <Plane className="h-4 w-4" />;
      case 'Sea': return <Ship className="h-4 w-4" />;
      case 'Rail': return <Truck className="h-4 w-4 rotate-180" />;
      case 'Truck': return <Truck className="h-4 w-4" />;
      default: return <Truck className="h-4 w-4" />;
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'bg-green-500';
      case 'Medium': return 'bg-yellow-500';
      case 'High': return 'bg-destructive';
      default: return 'bg-gray-500';
    }
  };

  const getRiskBadgeVariant = (risk: string) => {
    switch (risk) {
      case 'Low': return 'default';
      case 'Medium': return 'secondary';
      case 'High': return 'destructive';
      default: return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Route Comparison</h1>
        <p className="text-muted-foreground">Compare available logistics routes for your shipment</p>
      </div>

      {/* Cost Comparison Chart */}
      <Card className="rounded-2xl border-2">
        <CardHeader>
          <CardTitle>Cost & Time Analysis</CardTitle>
          <CardDescription>Visual comparison of route costs and delivery times</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={costComparisonData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#888888" fontSize={12} />
              <YAxis stroke="#888888" fontSize={12} />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb' }}
                cursor={{ fill: 'rgba(249, 115, 22, 0.1)' }}
              />
              <Legend />
              <Bar dataKey="Cost" fill="#f97316" radius={[8, 8, 0, 0]} name="Cost ($k)" />
              <Bar dataKey="ETA" fill="#3b82f6" radius={[8, 8, 0, 0]} name="ETA (hrs)" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Route Cards */}
      <div className="grid lg:grid-cols-3 gap-6">
        {routes.map((route) => (
          <Card 
            key={route.id} 
            className={`rounded-2xl border-2 hover:shadow-xl transition-all ${
              route.id === 'A' ? 'border-primary/50 ring-2 ring-primary/20' : ''
            }`}
          >
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl">{route.name}</CardTitle>
                  <CardDescription className="mt-1">
                    {route.modes.join(' + ')}
                  </CardDescription>
                </div>
                {route.id === 'A' && (
                  <Badge className="bg-primary text-white rounded-lg">
                    Recommended
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Transport Modes */}
              <div className="flex gap-2 flex-wrap">
                {route.modes.map((mode, idx) => (
                  <Badge key={idx} variant="outline" className="rounded-lg px-3 py-1">
                    {getModeIcon(mode)}
                    <span className="ml-2">{mode}</span>
                  </Badge>
                ))}
              </div>

              {/* Key Metrics */}
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-xl border border-blue-200">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-secondary" />
                    <span className="font-medium">ETA</span>
                  </div>
                  <span className="text-xl font-bold text-secondary">{route.eta}</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl border border-green-200">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-green-600" />
                    <span className="font-medium">Cost</span>
                  </div>
                  <span className="text-xl font-bold text-green-600">${(route.cost / 1000).toFixed(0)}k</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-orange-50 rounded-xl border border-orange-200">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-primary" />
                    <span className="font-medium">Risk Level</span>
                  </div>
                  <Badge className={`${getRiskColor(route.risk)} text-white rounded-lg`}>
                    {route.risk}
                  </Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-xl border border-purple-200">
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-purple-600" />
                    <span className="font-medium">Reliability</span>
                  </div>
                  <span className="text-xl font-bold text-purple-600">{route.reliability}%</span>
                </div>
              </div>

              {/* Route Details */}
              <div className="space-y-2">
                <h4 className="font-semibold text-sm text-muted-foreground">Route Details</h4>
                <div className="space-y-2">
                  {route.details.map((detail, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm">
                      <div className={`h-2 w-2 rounded-full mt-1.5 ${getRiskColor('Low')}`}></div>
                      <div className="flex-1">
                        <p className="font-medium">{detail.stage}</p>
                        <p className="text-muted-foreground text-xs">
                          {detail.from} → {detail.to} • {detail.duration}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Select Button */}
              <Button 
                className={`w-full rounded-xl ${
                  route.id === 'A' 
                    ? 'bg-primary hover:bg-primary/90' 
                    : 'bg-secondary hover:bg-secondary/90'
                }`}
                onClick={() => navigate('/dashboard')}
              >
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Select {route.name}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Additional Information */}
      <Card className="rounded-2xl border-2 bg-gradient-to-br from-orange-50 to-blue-50">
        <CardContent className="p-6">
          <div className="flex gap-4 items-start">
            <div className="bg-white rounded-xl p-3">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-2">Route Optimization Recommendations</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Route A offers the best balance of speed and reliability for temperature-sensitive pharmaceuticals</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Route B provides significant cost savings if delivery timeline allows for 72-hour transit</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>All routes include real-time temperature monitoring and GDP-compliant carriers</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
