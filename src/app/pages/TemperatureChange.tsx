import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { 
  Thermometer, 
  AlertTriangle, 
  CheckCircle2, 
  Clock,
  Shield,
  FileText
} from 'lucide-react';

const activeShipments = [
  { id: 'SH-2024-001', route: 'Singapore → Frankfurt', currentTemp: '2-8°C', status: 'In Transit' },
  { id: 'SH-2024-002', route: 'Boston → Tokyo', currentTemp: '-20°C', status: 'In Transit' },
  { id: 'SH-2024-004', route: 'Shanghai → Dubai', currentTemp: '-70°C', status: 'In Transit' },
];

const changeRequests = [
  { 
    id: 'TCR-001', 
    shipmentId: 'SH-2023-456', 
    from: '2-8°C', 
    to: '-20°C', 
    status: 'Approved',
    requestDate: '2024-03-05',
    approver: 'Quality Assurance Team'
  },
  { 
    id: 'TCR-002', 
    shipmentId: 'SH-2023-789', 
    from: '-20°C', 
    to: '2-8°C', 
    status: 'Pending',
    requestDate: '2024-03-06',
    approver: 'Pending Review'
  },
  { 
    id: 'TCR-003', 
    shipmentId: 'SH-2023-234', 
    from: '-70°C', 
    to: '-20°C', 
    status: 'Rejected',
    requestDate: '2024-03-04',
    approver: 'Operations Manager'
  },
];

export function TemperatureChange() {
  const [selectedShipment, setSelectedShipment] = useState('');
  const [newTemp, setNewTemp] = useState('');
  const [reason, setReason] = useState('');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'bg-green-500';
      case 'Pending': return 'bg-yellow-500';
      case 'Rejected': return 'bg-destructive';
      default: return 'bg-gray-500';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    alert('Temperature change request submitted successfully!');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Temperature Change Request</h1>
        <p className="text-muted-foreground">Request temperature range changes for active shipments</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Request Form */}
        <Card className="rounded-2xl border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Thermometer className="h-5 w-5 text-primary" />
              New Change Request
            </CardTitle>
            <CardDescription>Submit a temperature modification request</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="shipment">Select Shipment</Label>
                <Select value={selectedShipment} onValueChange={setSelectedShipment}>
                  <SelectTrigger id="shipment" className="rounded-xl">
                    <SelectValue placeholder="Choose active shipment" />
                  </SelectTrigger>
                  <SelectContent>
                    {activeShipments.map((shipment) => (
                      <SelectItem key={shipment.id} value={shipment.id}>
                        {shipment.id} - {shipment.route} ({shipment.currentTemp})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedShipment && (
                <>
                  <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Thermometer className="h-4 w-4 text-secondary" />
                      <span className="font-medium">Current Temperature Requirement</span>
                    </div>
                    <p className="text-2xl font-bold text-secondary">
                      {activeShipments.find(s => s.id === selectedShipment)?.currentTemp}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="newTemp">Requested New Temperature Range</Label>
                    <Select value={newTemp} onValueChange={setNewTemp}>
                      <SelectTrigger id="newTemp" className="rounded-xl">
                        <SelectValue placeholder="Select new temperature range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2-8">2–8°C (Standard Refrigerated)</SelectItem>
                        <SelectItem value="-20">−20°C (Frozen)</SelectItem>
                        <SelectItem value="-70">−70°C (Ultra-Cold)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reason">Reason for Change</Label>
                    <Textarea
                      id="reason"
                      placeholder="Provide detailed justification for temperature change..."
                      className="rounded-xl min-h-[100px]"
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                    />
                  </div>

                  {newTemp && (
                    <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
                      <div className="flex gap-3">
                        <AlertTriangle className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                        <div className="space-y-2">
                          <p className="font-medium text-orange-900">Compliance & Risk Impact</p>
                          <ul className="text-sm text-orange-700 space-y-1">
                            <li>• Temperature change requires carrier equipment modification</li>
                            <li>• Additional validation and documentation required</li>
                            <li>• May impact delivery timeline by 4-8 hours</li>
                            <li>• Estimated additional cost: $2,500 - $4,000</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-3">
                    <Button 
                      type="submit" 
                      className="flex-1 rounded-xl bg-primary hover:bg-primary/90"
                      disabled={!reason}
                    >
                      Submit Request
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="flex-1 rounded-xl"
                      onClick={() => {
                        setSelectedShipment('');
                        setNewTemp('');
                        setReason('');
                      }}
                    >
                      Reset
                    </Button>
                  </div>
                </>
              )}
            </form>
          </CardContent>
        </Card>

        {/* Request Status Info */}
        <div className="space-y-6">
          <Card className="rounded-2xl border-2 bg-gradient-to-br from-orange-50 to-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Request Guidelines
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="bg-primary rounded-lg p-2 h-fit">
                    <CheckCircle2 className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">Approval Process</h4>
                    <p className="text-sm text-muted-foreground">
                      Requests are reviewed within 2-4 hours by the Quality Assurance team
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="bg-secondary rounded-lg p-2 h-fit">
                    <FileText className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">Documentation</h4>
                    <p className="text-sm text-muted-foreground">
                      Provide detailed scientific or regulatory justification
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="bg-green-500 rounded-lg p-2 h-fit">
                    <Clock className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">Timeline Impact</h4>
                    <p className="text-sm text-muted-foreground">
                      Changes may extend delivery time and incur additional costs
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-2">
            <CardHeader>
              <CardTitle>Active Shipments</CardTitle>
              <CardDescription>Available for temperature modification</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {activeShipments.map((shipment) => (
                <Card key={shipment.id} className="rounded-xl border-2">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold">{shipment.id}</h4>
                        <p className="text-sm text-muted-foreground">{shipment.route}</p>
                      </div>
                      <Badge variant="outline" className="rounded-lg">
                        {shipment.currentTemp}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Request History */}
      <Card className="rounded-2xl border-2">
        <CardHeader>
          <CardTitle>Recent Change Requests</CardTitle>
          <CardDescription>History of temperature modification requests</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Request ID</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Shipment</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">From</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">To</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Date</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Approver</th>
                </tr>
              </thead>
              <tbody>
                {changeRequests.map((request) => (
                  <tr key={request.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{request.id}</td>
                    <td className="py-3 px-4">{request.shipmentId}</td>
                    <td className="py-3 px-4">
                      <Badge variant="outline" className="rounded-lg">{request.from}</Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="outline" className="rounded-lg">{request.to}</Badge>
                    </td>
                    <td className="py-3 px-4">{request.requestDate}</td>
                    <td className="py-3 px-4">
                      <Badge className={`${getStatusColor(request.status)} text-white rounded-lg`}>
                        {request.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{request.approver}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
