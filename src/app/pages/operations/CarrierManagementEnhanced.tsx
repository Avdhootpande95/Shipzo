import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Plane, Ship, Truck, Train, Eye, Send, MessageSquare } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const carriers = [
  { id: 1, name: 'Global Air Cargo', mode: 'Air', capacity: '50 tons', onTime: 96.5, reliability: 9.2, status: 'Active' },
  { id: 2, name: 'Pacific Shipping Lines', mode: 'Sea', capacity: '200 tons', onTime: 92.3, reliability: 8.8, status: 'Active' },
  { id: 3, name: 'EuroRail Logistics', mode: 'Rail', capacity: '80 tons', onTime: 94.1, reliability: 9.0, status: 'Active' },
  { id: 4, name: 'ColdChain Express', mode: 'Road', capacity: '30 tons', onTime: 89.7, reliability: 8.5, status: 'Active' },
  { id: 5, name: 'Asia Freight Airways', mode: 'Air', capacity: '45 tons', onTime: 91.2, reliability: 8.7, status: 'Active' },
  { id: 6, name: 'Arctic Shipping Co', mode: 'Sea', capacity: '180 tons', onTime: 87.5, reliability: 8.2, status: 'Limited' },
  { id: 7, name: 'TransContinental Rail', mode: 'Rail', capacity: '100 tons', onTime: 95.8, reliability: 9.4, status: 'Active' },
  { id: 8, name: 'Refrigerated Transport Ltd', mode: 'Road', capacity: '25 tons', onTime: 88.9, reliability: 8.4, status: 'Active' },
];

const performanceData = [
  { name: 'Global Air Cargo', rate: 96.5 },
  { name: 'Pacific Shipping', rate: 92.3 },
  { name: 'EuroRail Logistics', rate: 94.1 },
  { name: 'ColdChain Express', rate: 89.7 },
  { name: 'Asia Freight', rate: 91.2 },
];

const capacityData = [
  { type: 'Air Freight', utilization: 76, total: 95, color: '#3b82f6' },
  { type: 'Sea Freight', utilization: 68, total: 380, color: '#10b981' },
  { type: 'Rail Transport', utilization: 82, total: 180, color: '#f59e0b' },
  { type: 'Refrigerated Road', utilization: 71, total: 55, color: '#f97316' },
];

export function CarrierManagementEnhanced() {
  const getModeIcon = (mode: string) => {
    switch (mode) {
      case 'Air': return <Plane className="h-4 w-4" />;
      case 'Sea': return <Ship className="h-4 w-4" />;
      case 'Rail': return <Train className="h-4 w-4" />;
      case 'Road': return <Truck className="h-4 w-4" />;
      default: return <Truck className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-500';
      case 'Limited': return 'bg-yellow-500';
      case 'Inactive': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Carrier Management</h1>
        <p className="text-muted-foreground">Manage logistics carriers and performance tracking</p>
      </div>

      {/* Carrier Capacity Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {capacityData.map((item) => (
          <Card key={item.type} className="rounded-2xl border-2 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold">{item.type}</h3>
                  <Badge variant="outline" className="rounded-lg">
                    {item.utilization}%
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all"
                      style={{ 
                        width: `${item.utilization}%`,
                        backgroundColor: item.color
                      }}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {Math.round(item.total * item.utilization / 100)} / {item.total} tons utilized
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* On-Time Delivery Rate Chart */}
      <Card className="rounded-2xl border-2">
        <CardHeader>
          <CardTitle>On-Time Delivery Rate by Carrier</CardTitle>
          <CardDescription>Performance comparison across carriers</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#888888" fontSize={12} />
              <YAxis stroke="#888888" fontSize={12} domain={[80, 100]} />
              <Tooltip />
              <Bar dataKey="rate" fill="#3b82f6" radius={[8, 8, 0, 0]} name="On-Time %" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Carrier Performance Table */}
      <Card className="rounded-2xl border-2">
        <CardHeader>
          <CardTitle>Carrier Performance Overview</CardTitle>
          <CardDescription>Detailed carrier information and metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Carrier Name</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Transport Mode</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Capacity</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">On-Time Delivery %</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Reliability Score</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {carriers.map((carrier) => (
                  <tr key={carrier.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{carrier.name}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        {getModeIcon(carrier.mode)}
                        <span>{carrier.mode}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">{carrier.capacity}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{carrier.onTime}%</span>
                        <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-green-500 rounded-full"
                            style={{ width: `${carrier.onTime}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="outline" className="rounded-lg">
                        {carrier.reliability}/10
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={`${getStatusColor(carrier.status)} text-white rounded-lg`}>
                        {carrier.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="rounded-lg">
                          <Eye className="h-3 w-3 mr-1" />
                          View
                        </Button>
                        <Button variant="outline" size="sm" className="rounded-lg">
                          <Send className="h-3 w-3 mr-1" />
                          Assign
                        </Button>
                        <Button variant="outline" size="sm" className="rounded-lg">
                          <MessageSquare className="h-3 w-3 mr-1" />
                          Contact
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
    </div>
  );
}
