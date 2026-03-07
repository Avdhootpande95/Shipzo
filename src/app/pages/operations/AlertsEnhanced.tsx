import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { AlertTriangle, Thermometer, Clock, CloudRain, Package, TrendingUp, AlertCircle } from 'lucide-react';

const activeAlerts = [
  {
    id: 1,
    type: 'Temperature Excursion',
    shipmentId: 'SH-2024-004',
    severity: 'High',
    timestamp: '2 min ago',
    action: 'Immediate intervention required',
    details: 'Temperature rose to -68.5°C (threshold: -70°C)'
  },
  {
    id: 2,
    type: 'Delay Risk',
    shipmentId: 'SH-2024-012',
    severity: 'Medium',
    timestamp: '15 min ago',
    action: 'Monitor shipment progress',
    details: 'Weather conditions causing 2-hour delay'
  },
  {
    id: 3,
    type: 'Customs Clearance',
    shipmentId: 'SH-2024-008',
    severity: 'Low',
    timestamp: '1 hour ago',
    action: 'Awaiting documentation',
    details: 'Additional GDP certificate required'
  },
  {
    id: 4,
    type: 'Equipment Failure',
    shipmentId: 'SH-2024-015',
    severity: 'High',
    timestamp: '5 min ago',
    action: 'Arrange backup cooling system',
    details: 'Refrigeration unit sensor malfunction'
  },
  {
    id: 5,
    type: 'Route Deviation',
    shipmentId: 'SH-2024-007',
    severity: 'Medium',
    timestamp: '30 min ago',
    action: 'Verify alternate route',
    details: 'Carrier rerouted due to port congestion'
  },
  {
    id: 6,
    type: 'Battery Level Low',
    shipmentId: 'SH-2024-019',
    severity: 'Low',
    timestamp: '45 min ago',
    action: 'Schedule battery replacement',
    details: 'IoT sensor battery at 15%'
  },
];

const predictiveAlerts = [
  {
    id: 1,
    title: 'Temperature Excursion Predicted',
    description: 'SH-2024-023 may experience temperature rise in 3 hours',
    icon: Thermometer,
    severity: 'High',
    color: 'text-destructive'
  },
  {
    id: 2,
    title: 'Weather Disruption Alert',
    description: 'Storm system affecting Atlantic shipping routes',
    icon: CloudRain,
    severity: 'Medium',
    color: 'text-yellow-500'
  },
  {
    id: 3,
    title: 'Capacity Warning',
    description: 'Air freight utilization reaching 90% next week',
    icon: TrendingUp,
    severity: 'Low',
    color: 'text-blue-500'
  },
  {
    id: 4,
    title: 'Customs Backlog Alert',
    description: 'Frankfurt hub experiencing 24-hour clearance delays',
    icon: AlertCircle,
    severity: 'Medium',
    color: 'text-yellow-500'
  },
];

export function AlertsEnhanced() {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'High': return 'bg-destructive';
      case 'Medium': return 'bg-yellow-500';
      case 'Low': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getSeverityIcon = (type: string) => {
    switch (type) {
      case 'Temperature Excursion': return <Thermometer className="h-4 w-4" />;
      case 'Delay Risk': return <Clock className="h-4 w-4" />;
      case 'Customs Clearance': return <Package className="h-4 w-4" />;
      case 'Equipment Failure': return <AlertTriangle className="h-4 w-4" />;
      case 'Route Deviation': return <TrendingUp className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  const highRisk = activeAlerts.filter(a => a.severity === 'High').length;
  const mediumRisk = activeAlerts.filter(a => a.severity === 'Medium').length;
  const lowRisk = activeAlerts.filter(a => a.severity === 'Low').length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Alerts & Risk Monitoring</h1>
        <p className="text-muted-foreground">Real-time risk assessment and alerts</p>
      </div>

      {/* Shipment Risk Overview */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="rounded-2xl border-2 border-destructive/20 hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">High Risk Shipments</p>
                <p className="text-4xl font-bold text-destructive">{highRisk}</p>
              </div>
              <div className="bg-destructive/10 rounded-xl p-3">
                <AlertTriangle className="h-8 w-8 text-destructive" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-3">Immediate action required</p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-2 border-yellow-500/20 hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Medium Risk Shipments</p>
                <p className="text-4xl font-bold text-yellow-600">{mediumRisk}</p>
              </div>
              <div className="bg-yellow-100 rounded-xl p-3">
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-3">Monitor closely</p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-2 border-green-500/20 hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Low Risk Shipments</p>
                <p className="text-4xl font-bold text-green-600">{lowRisk}</p>
              </div>
              <div className="bg-green-100 rounded-xl p-3">
                <Package className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-3">Normal operations</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Active Alerts Table */}
        <Card className="lg:col-span-2 rounded-2xl border-2">
          <CardHeader>
            <CardTitle>Active Alerts</CardTitle>
            <CardDescription>Real-time risk notifications requiring action</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {activeAlerts.map((alert) => (
                <Card key={alert.id} className="rounded-xl border-2 hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <div className={`${getSeverityColor(alert.severity)} rounded-lg p-3 h-fit`}>
                        <div className="text-white">
                          {getSeverityIcon(alert.type)}
                        </div>
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold">{alert.type}</h3>
                              <Badge className={`${getSeverityColor(alert.severity)} text-white rounded-lg text-xs`}>
                                {alert.severity}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{alert.shipmentId}</p>
                          </div>
                          <span className="text-xs text-muted-foreground">{alert.timestamp}</span>
                        </div>
                        <p className="text-sm">{alert.details}</p>
                        <div className="flex items-center justify-between pt-2 border-t">
                          <p className="text-sm font-medium text-primary">
                            Recommended: {alert.action}
                          </p>
                          <Button size="sm" variant="outline" className="rounded-lg">
                            Take Action
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Predictive Alerts */}
        <Card className="rounded-2xl border-2">
          <CardHeader>
            <CardTitle>Predictive Alerts</CardTitle>
            <CardDescription>AI-powered risk predictions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {predictiveAlerts.map((alert) => {
              const Icon = alert.icon;
              return (
                <Card key={alert.id} className="rounded-xl border-2">
                  <CardContent className="p-4">
                    <div className="flex gap-3">
                      <div className={`${alert.color} p-2 h-fit`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm mb-1">{alert.title}</h3>
                        <p className="text-xs text-muted-foreground">{alert.description}</p>
                        <Button size="sm" variant="ghost" className="mt-2 h-7 text-xs rounded-lg">
                          View Details →
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
