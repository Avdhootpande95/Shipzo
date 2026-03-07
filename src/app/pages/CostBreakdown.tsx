import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { 
  DollarSign, 
  TrendingUp, 
  AlertCircle,
  Snowflake,
  Package,
  Truck,
  FileText
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from 'recharts';

const costBreakdown = [
  { category: 'Base Shipping', amount: 12000, percentage: 40 },
  { category: 'Cold Storage', amount: 6000, percentage: 20 },
  { category: 'Handling', amount: 3000, percentage: 10 },
  { category: 'Customs Fees', amount: 4500, percentage: 15 },
  { category: 'Re-route Cost', amount: 2500, percentage: 8.3 },
  { category: 'Emergency Refrigeration', amount: 2000, percentage: 6.7 },
];

const pieData = [
  { name: 'Base Shipping', value: 12000, color: '#f97316' },
  { name: 'Cold Storage', value: 6000, color: '#3b82f6' },
  { name: 'Handling', value: 3000, color: '#10b981' },
  { name: 'Customs', value: 4500, color: '#f59e0b' },
  { name: 'Re-route', value: 2500, color: '#8b5cf6' },
  { name: 'Emergency', value: 2000, color: '#ef4444' },
];

const recentCosts = [
  { 
    shipmentId: 'SH-2024-001', 
    route: 'Singapore → Frankfurt',
    baseShipping: 12000,
    coldStorage: 6000,
    handling: 3000,
    customs: 4500,
    rerouteCost: 0,
    emergencyCost: 0,
    total: 25500
  },
  { 
    shipmentId: 'SH-2024-002', 
    route: 'Boston → Tokyo',
    baseShipping: 15000,
    coldStorage: 8000,
    handling: 3500,
    customs: 5000,
    rerouteCost: 2500,
    emergencyCost: 2000,
    total: 36000
  },
  { 
    shipmentId: 'SH-2024-003', 
    route: 'Mumbai → London',
    baseShipping: 10000,
    coldStorage: 5000,
    handling: 2500,
    customs: 3500,
    rerouteCost: 0,
    emergencyCost: 0,
    total: 21000
  },
];

export function CostBreakdown() {
  const totalCost = costBreakdown.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Cost Breakdown & Analysis</h1>
        <p className="text-muted-foreground">Detailed logistics cost analysis and tracking</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="rounded-2xl border-2 hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardDescription>Total Cost</CardDescription>
              <DollarSign className="h-5 w-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">${(totalCost / 1000).toFixed(1)}k</div>
            <p className="text-sm text-muted-foreground mt-1">Current shipment</p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-2 hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardDescription>Base Shipping</CardDescription>
              <Truck className="h-5 w-5 text-secondary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">$12k</div>
            <p className="text-sm text-green-600 flex items-center gap-1 mt-1">
              40% of total
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-2 hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardDescription>Cold Storage</CardDescription>
              <Snowflake className="h-5 w-5 text-blue-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">$6k</div>
            <p className="text-sm text-muted-foreground mt-1">Temperature control</p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-2 hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardDescription>Additional Costs</CardDescription>
              <AlertCircle className="h-5 w-5 text-orange-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">$4.5k</div>
            <p className="text-sm text-orange-600 mt-1">Re-route + Emergency</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <Card className="rounded-2xl border-2">
          <CardHeader>
            <CardTitle>Cost Distribution</CardTitle>
            <CardDescription>Breakdown by cost category</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={costBreakdown} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis type="number" stroke="#888888" fontSize={12} />
                <YAxis dataKey="category" type="category" stroke="#888888" fontSize={12} width={120} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb' }}
                  cursor={{ fill: 'rgba(249, 115, 22, 0.1)' }}
                />
                <Bar dataKey="amount" fill="#f97316" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Pie Chart */}
        <Card className="rounded-2xl border-2">
          <CardHeader>
            <CardTitle>Cost Proportion</CardTitle>
            <CardDescription>Percentage distribution by category</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Cost Breakdown */}
      <Card className="rounded-2xl border-2">
        <CardHeader>
          <CardTitle>Detailed Cost Breakdown</CardTitle>
          <CardDescription>Itemized expenses for current shipment</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {costBreakdown.map((item, idx) => (
            <div key={idx} className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    idx === 0 ? 'bg-orange-100' :
                    idx === 1 ? 'bg-blue-100' :
                    idx === 2 ? 'bg-green-100' :
                    idx === 3 ? 'bg-yellow-100' :
                    idx === 4 ? 'bg-purple-100' : 'bg-red-100'
                  }`}>
                    {idx === 0 && <Truck className="h-4 w-4 text-primary" />}
                    {idx === 1 && <Snowflake className="h-4 w-4 text-blue-600" />}
                    {idx === 2 && <Package className="h-4 w-4 text-green-600" />}
                    {idx === 3 && <FileText className="h-4 w-4 text-yellow-600" />}
                    {idx === 4 && <AlertCircle className="h-4 w-4 text-purple-600" />}
                    {idx === 5 && <Snowflake className="h-4 w-4 text-red-600" />}
                  </div>
                  <div>
                    <p className="font-medium">{item.category}</p>
                    <p className="text-sm text-muted-foreground">{item.percentage.toFixed(1)}% of total</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg">${(item.amount / 1000).toFixed(1)}k</p>
                  <p className="text-sm text-muted-foreground">${item.amount.toLocaleString()}</p>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-primary rounded-full h-2 transition-all"
                  style={{ width: `${item.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}

          <div className="pt-4 border-t-2 border-gray-200">
            <div className="flex justify-between items-center">
              <p className="text-lg font-semibold">Total Cost</p>
              <p className="text-2xl font-bold text-primary">${totalCost.toLocaleString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cost History Table */}
      <Card className="rounded-2xl border-2">
        <CardHeader>
          <CardTitle>Recent Shipment Costs</CardTitle>
          <CardDescription>Historical cost data for comparison</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Shipment</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Route</th>
                  <th className="text-right py-3 px-4 font-semibold text-sm text-gray-700">Base</th>
                  <th className="text-right py-3 px-4 font-semibold text-sm text-gray-700">Cold</th>
                  <th className="text-right py-3 px-4 font-semibold text-sm text-gray-700">Handling</th>
                  <th className="text-right py-3 px-4 font-semibold text-sm text-gray-700">Customs</th>
                  <th className="text-right py-3 px-4 font-semibold text-sm text-gray-700">Extra</th>
                  <th className="text-right py-3 px-4 font-semibold text-sm text-gray-700">Total</th>
                </tr>
              </thead>
              <tbody>
                {recentCosts.map((cost) => (
                  <tr key={cost.shipmentId} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{cost.shipmentId}</td>
                    <td className="py-3 px-4 text-sm">{cost.route}</td>
                    <td className="py-3 px-4 text-right">${(cost.baseShipping / 1000).toFixed(0)}k</td>
                    <td className="py-3 px-4 text-right">${(cost.coldStorage / 1000).toFixed(0)}k</td>
                    <td className="py-3 px-4 text-right">${(cost.handling / 1000).toFixed(1)}k</td>
                    <td className="py-3 px-4 text-right">${(cost.customs / 1000).toFixed(1)}k</td>
                    <td className="py-3 px-4 text-right">
                      {cost.rerouteCost + cost.emergencyCost > 0 ? (
                        <Badge variant="outline" className="rounded-lg">
                          ${((cost.rerouteCost + cost.emergencyCost) / 1000).toFixed(1)}k
                        </Badge>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right font-bold">${(cost.total / 1000).toFixed(1)}k</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Cost Optimization Tips */}
      <Card className="rounded-2xl border-2 bg-gradient-to-br from-blue-50 to-orange-50">
        <CardContent className="p-6">
          <div className="flex gap-4 items-start">
            <div className="bg-white rounded-xl p-3">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-2">Cost Optimization Recommendations</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Re-route costs can be reduced by 40% with improved route planning and weather monitoring</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Consider bulk shipping contracts for cold storage to reduce per-shipment costs by 15-20%</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Emergency refrigeration costs indicate need for more robust primary cooling systems</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
