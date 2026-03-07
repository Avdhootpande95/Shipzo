import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { 
  Plane, 
  Ship, 
  Truck, 
  CheckCircle2, 
  Clock, 
  MapPin,
  Thermometer,
  Package,
  Calendar
} from 'lucide-react';

const shipmentHistory = [
  {
    id: 'SH-2024-001',
    route: 'Singapore → Frankfurt',
    stages: [
      {
        mode: 'Rail',
        carrier: 'Trans-Asia Rail Services',
        from: 'Singapore Manufacturing Hub',
        to: 'Kuala Lumpur Transit',
        departure: '2024-03-01 08:00',
        arrival: '2024-03-01 14:00',
        duration: '6 hrs',
        temp: '2-8°C',
        status: 'completed',
        compliance: 'Compliant'
      },
      {
        mode: 'Air',
        carrier: 'Global Air Cargo Ltd',
        from: 'Kuala Lumpur International',
        to: 'Frankfurt Airport',
        departure: '2024-03-01 18:00',
        arrival: '2024-03-02 06:00',
        duration: '12 hrs',
        temp: '2-8°C',
        status: 'completed',
        compliance: 'Compliant'
      },
      {
        mode: 'Truck',
        carrier: 'ColdExpress Logistics GmbH',
        from: 'Frankfurt Airport',
        to: 'Frankfurt Distribution Center',
        departure: '2024-03-02 08:00',
        arrival: '2024-03-02 14:00',
        duration: '6 hrs',
        temp: '2-8°C',
        status: 'in-transit',
        compliance: 'Monitoring'
      }
    ]
  }
];

const carrierPerformance = [
  { carrier: 'Global Air Cargo Ltd', deliveries: 142, onTime: 98, tempCompliance: 99.5 },
  { carrier: 'Trans-Asia Rail Services', deliveries: 87, onTime: 95, tempCompliance: 98.2 },
  { carrier: 'ColdExpress Logistics GmbH', deliveries: 203, onTime: 97, tempCompliance: 99.1 },
  { carrier: 'Pacific Freight Solutions', deliveries: 64, onTime: 92, tempCompliance: 97.8 },
];

export function CarrierHistory() {
  const getModeIcon = (mode: string) => {
    switch (mode) {
      case 'Air': return <Plane className="h-5 w-5" />;
      case 'Sea': return <Ship className="h-5 w-5" />;
      case 'Rail': return <Truck className="h-5 w-5 rotate-180" />;
      case 'Truck': return <Truck className="h-5 w-5" />;
      default: return <Package className="h-5 w-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'in-transit': return 'bg-blue-500';
      case 'delayed': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Completed';
      case 'in-transit': return 'In Transit';
      case 'delayed': return 'Delayed';
      default: return 'Unknown';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Carrier History</h1>
        <p className="text-muted-foreground">Multimodal transport history and carrier performance</p>
      </div>

      <Tabs defaultValue="history" className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-2 rounded-xl">
          <TabsTrigger value="history" className="rounded-lg">Shipment History</TabsTrigger>
          <TabsTrigger value="performance" className="rounded-lg">Carrier Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="history" className="space-y-6">
          {shipmentHistory.map((shipment) => (
            <Card key={shipment.id} className="rounded-2xl border-2">
              <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Package className="h-5 w-5 text-primary" />
                      {shipment.id}
                    </CardTitle>
                    <CardDescription className="mt-1">{shipment.route}</CardDescription>
                  </div>
                  <Badge className="bg-secondary text-white rounded-lg self-start">
                    Multimodal Transport
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                {/* Timeline */}
                <div className="relative space-y-6">
                  {shipment.stages.map((stage, idx) => (
                    <div key={idx} className="relative pl-8">
                      {/* Timeline Line */}
                      {idx < shipment.stages.length - 1 && (
                        <div className="absolute left-[15px] top-12 bottom-0 w-0.5 bg-gray-300"></div>
                      )}
                      
                      {/* Timeline Dot */}
                      <div className={`absolute left-0 top-2 h-8 w-8 rounded-full ${getStatusColor(stage.status)} flex items-center justify-center`}>
                        {stage.status === 'completed' ? (
                          <CheckCircle2 className="h-5 w-5 text-white" />
                        ) : (
                          <Clock className="h-5 w-5 text-white" />
                        )}
                      </div>

                      {/* Stage Card */}
                      <Card className="rounded-xl border-2 ml-4">
                        <CardContent className="p-4">
                          <div className="space-y-3">
                            {/* Header */}
                            <div className="flex items-start justify-between">
                              <div className="flex items-center gap-3">
                                <div className="bg-primary/10 rounded-lg p-2">
                                  {getModeIcon(stage.mode)}
                                </div>
                                <div>
                                  <h4 className="font-semibold">{stage.mode} Transport</h4>
                                  <p className="text-sm text-muted-foreground">{stage.carrier}</p>
                                </div>
                              </div>
                              <Badge className={`${getStatusColor(stage.status)} text-white rounded-lg`}>
                                {getStatusText(stage.status)}
                              </Badge>
                            </div>

                            {/* Details Grid */}
                            <div className="grid sm:grid-cols-2 gap-3 text-sm">
                              <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-primary" />
                                <div>
                                  <p className="text-muted-foreground">Departure</p>
                                  <p className="font-medium">{stage.from}</p>
                                  <p className="text-xs text-muted-foreground">{stage.departure}</p>
                                </div>
                              </div>

                              <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-secondary" />
                                <div>
                                  <p className="text-muted-foreground">Arrival</p>
                                  <p className="font-medium">{stage.to}</p>
                                  <p className="text-xs text-muted-foreground">{stage.arrival}</p>
                                </div>
                              </div>

                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-primary" />
                                <div>
                                  <p className="text-muted-foreground">Duration</p>
                                  <p className="font-medium">{stage.duration}</p>
                                </div>
                              </div>

                              <div className="flex items-center gap-2">
                                <Thermometer className="h-4 w-4 text-secondary" />
                                <div>
                                  <p className="text-muted-foreground">Temperature</p>
                                  <p className="font-medium">{stage.temp}</p>
                                </div>
                              </div>
                            </div>

                            {/* Compliance Status */}
                            <div className="flex items-center justify-between p-2 bg-green-50 rounded-lg border border-green-200">
                              <span className="text-sm font-medium">Temperature Compliance</span>
                              <Badge variant="outline" className="bg-white rounded-lg border-green-300">
                                {stage.compliance}
                              </Badge>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <Card className="rounded-2xl border-2">
            <CardHeader>
              <CardTitle>Carrier Performance Metrics</CardTitle>
              <CardDescription>Historical data on carrier reliability and compliance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {carrierPerformance.map((carrier, idx) => (
                  <Card key={idx} className="rounded-xl border-2 hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="space-y-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-semibold text-lg">{carrier.carrier}</h4>
                            <p className="text-sm text-muted-foreground">{carrier.deliveries} total deliveries</p>
                          </div>
                          <Badge variant="outline" className="rounded-lg">
                            Verified GDP
                          </Badge>
                        </div>

                        <div className="grid sm:grid-cols-3 gap-4">
                          <div className="bg-blue-50 rounded-xl p-3 border border-blue-200">
                            <p className="text-sm text-muted-foreground mb-1">On-Time Delivery</p>
                            <p className="text-2xl font-bold text-secondary">{carrier.onTime}%</p>
                          </div>

                          <div className="bg-orange-50 rounded-xl p-3 border border-orange-200">
                            <p className="text-sm text-muted-foreground mb-1">Temp Compliance</p>
                            <p className="text-2xl font-bold text-primary">{carrier.tempCompliance}%</p>
                          </div>

                          <div className="bg-green-50 rounded-xl p-3 border border-green-200">
                            <p className="text-sm text-muted-foreground mb-1">Overall Rating</p>
                            <div className="flex items-center gap-1">
                              <p className="text-2xl font-bold text-green-600">
                                {((carrier.onTime + carrier.tempCompliance) / 2 / 20).toFixed(1)}
                              </p>
                              <span className="text-muted-foreground">/5.0</span>
                            </div>
                          </div>
                        </div>

                        <Button variant="outline" className="w-full rounded-lg">
                          View Detailed History
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
