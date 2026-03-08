import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { 
  X, 
  Thermometer, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle,
  CheckCircle,
  Package,
  MapPin,
  Clock
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Area, AreaChart } from 'recharts';

interface PredictiveTemperatureRiskProps {
  shipment: {
    id: string;
    route: string;
    product?: string;
    currentTemp: number;
    requiredRange: string;
    riskScore: number;
    status: 'Safe' | 'Warning' | 'Critical';
    currentLocation?: string;
    eta?: string;
    progress?: number;
  };
  onClose: () => void;
}

// Generate temperature trend data with predictions
const generateTemperatureData = (currentTemp: number, status: string) => {
  const data = [];
  const baseTemp = currentTemp;
  
  // Historical data (last 12 hours)
  for (let i = -12; i <= 0; i++) {
    let temp = baseTemp;
    
    if (status === 'Warning') {
      temp = baseTemp - Math.abs(i) * 0.15 + Math.random() * 0.3;
    } else if (status === 'Critical') {
      temp = baseTemp - Math.abs(i) * 0.25 + Math.random() * 0.5;
    } else {
      temp = baseTemp + (Math.random() - 0.5) * 0.4;
    }
    
    data.push({
      time: `${i}h`,
      temperature: parseFloat(temp.toFixed(1)),
      predicted: null,
      type: 'actual'
    });
  }
  
  // Predicted data (next 12 hours)
  for (let i = 1; i <= 12; i++) {
    let temp = baseTemp;
    
    if (status === 'Warning') {
      temp = baseTemp + i * 0.2 + Math.random() * 0.3;
    } else if (status === 'Critical') {
      temp = baseTemp + i * 0.35 + Math.random() * 0.5;
    } else {
      temp = baseTemp + (Math.random() - 0.5) * 0.3;
    }
    
    data.push({
      time: `+${i}h`,
      temperature: null,
      predicted: parseFloat(temp.toFixed(1)),
      type: 'predicted'
    });
  }
  
  return data;
};

export function PredictiveTemperatureRisk({ shipment, onClose }: PredictiveTemperatureRiskProps) {
  const temperatureData = generateTemperatureData(shipment.currentTemp, shipment.status);
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Safe': 
        return { 
          bg: 'bg-green-50', 
          border: 'border-green-500', 
          text: 'text-green-700', 
          badge: 'bg-green-500',
          ring: 'ring-green-500',
          gradient: 'from-green-500 to-green-600'
        };
      case 'Warning': 
        return { 
          bg: 'bg-yellow-50', 
          border: 'border-yellow-500', 
          text: 'text-yellow-700', 
          badge: 'bg-yellow-500',
          ring: 'ring-yellow-500',
          gradient: 'from-yellow-500 to-yellow-600'
        };
      case 'Critical': 
        return { 
          bg: 'bg-red-50', 
          border: 'border-red-500', 
          text: 'text-red-700', 
          badge: 'bg-red-500',
          ring: 'ring-red-500',
          gradient: 'from-red-500 to-red-600'
        };
      default: 
        return { 
          bg: 'bg-gray-50', 
          border: 'border-gray-500', 
          text: 'text-gray-700', 
          badge: 'bg-gray-500',
          ring: 'ring-gray-500',
          gradient: 'from-gray-500 to-gray-600'
        };
    }
  };

  const getSuggestedAction = (status: string, riskScore: number) => {
    if (status === 'Critical' || riskScore >= 75) {
      return {
        title: 'Immediate Action Required',
        actions: [
          'Increase cooling level to maximum capacity',
          'Reroute shipment to nearest cold storage facility',
          'Notify receiving facility of potential quality issue',
          'Dispatch emergency refrigeration unit to location'
        ]
      };
    } else if (status === 'Warning' || riskScore >= 40) {
      return {
        title: 'Preventive Actions Recommended',
        actions: [
          'Check refrigeration unit performance',
          'Monitor temperature every 15 minutes',
          'Prepare backup cooling system',
          'Consider alternative route with climate control'
        ]
      };
    } else {
      return {
        title: 'System Operating Normally',
        actions: [
          'Continue standard monitoring protocol',
          'Maintain current temperature settings',
          'Regular sensor data validation',
          'No immediate action required'
        ]
      };
    }
  };

  const statusColors = getStatusColor(shipment.status);
  const suggestedAction = getSuggestedAction(shipment.status, shipment.riskScore);
  
  // Parse temperature range
  const tempRange = shipment.requiredRange.match(/-?\d+/g);
  const minTemp = tempRange ? parseFloat(tempRange[0]) : 2;
  const maxTemp = tempRange ? parseFloat(tempRange[tempRange.length - 1]) : 8;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className={`${statusColors.bg} border-b-2 ${statusColors.border} p-6 sticky top-0 z-10 rounded-t-2xl`}>
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-2xl font-bold text-gray-900">{shipment.id}</h2>
                <Badge className={`${statusColors.badge} text-white rounded-lg px-3 py-1`}>
                  {shipment.status}
                </Badge>
              </div>
              <p className="text-muted-foreground">{shipment.route}</p>
              {shipment.product && (
                <p className="text-sm text-gray-600 mt-1 flex items-center gap-2">
                  <Package className="h-4 w-4" />
                  {shipment.product}
                </p>
              )}
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onClose}
              className="rounded-full hover:bg-white/50"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Current Status Grid */}
          <div className="grid md:grid-cols-3 gap-4">
            {/* Current Temperature */}
            <Card className={`rounded-xl border-2 ${statusColors.border}`}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-muted-foreground">Current Temperature</span>
                  <Thermometer className={`h-5 w-5 ${statusColors.text}`} />
                </div>
                <p className={`text-3xl font-bold ${statusColors.text}`}>{shipment.currentTemp}°C</p>
                <p className="text-xs text-muted-foreground mt-1">Live sensor reading</p>
              </CardContent>
            </Card>

            {/* Required Range */}
            <Card className="rounded-xl border-2">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-muted-foreground">Required Range</span>
                  <CheckCircle className="h-5 w-5 text-blue-600" />
                </div>
                <p className="text-3xl font-bold text-gray-900">{shipment.requiredRange}</p>
                <p className="text-xs text-muted-foreground mt-1">Safe operating zone</p>
              </CardContent>
            </Card>

            {/* Risk Score */}
            <Card className={`rounded-xl border-2 ${statusColors.border} ${statusColors.bg}`}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-muted-foreground">Risk Score</span>
                  <AlertTriangle className={`h-5 w-5 ${statusColors.text}`} />
                </div>
                <p className={`text-3xl font-bold ${statusColors.text}`}>{shipment.riskScore}%</p>
                <div className="mt-2">
                  <div className="bg-gray-200 rounded-full h-2">
                    <div 
                      className={`bg-gradient-to-r ${statusColors.gradient} rounded-full h-2 transition-all`}
                      style={{ width: `${shipment.riskScore}%` }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Additional Info */}
          {(shipment.currentLocation || shipment.eta || shipment.progress !== undefined) && (
            <div className="grid md:grid-cols-3 gap-4">
              {shipment.currentLocation && (
                <div className="flex items-center gap-3 bg-blue-50 rounded-xl p-3 border border-blue-200">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-xs text-muted-foreground">Current Location</p>
                    <p className="font-medium text-sm">{shipment.currentLocation}</p>
                  </div>
                </div>
              )}
              {shipment.eta && (
                <div className="flex items-center gap-3 bg-green-50 rounded-xl p-3 border border-green-200">
                  <Clock className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-xs text-muted-foreground">ETA</p>
                    <p className="font-medium text-sm">{shipment.eta}</p>
                  </div>
                </div>
              )}
              {shipment.progress !== undefined && (
                <div className="flex items-center gap-3 bg-orange-50 rounded-xl p-3 border border-orange-200">
                  <Package className="h-5 w-5 text-orange-600" />
                  <div>
                    <p className="text-xs text-muted-foreground">Progress</p>
                    <p className="font-medium text-sm">{shipment.progress}%</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Temperature Trend Chart */}
          <Card className="rounded-xl border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                Predictive Temperature Trend Analysis
              </CardTitle>
              <CardDescription>
                Real-time sensor data and AI-predicted temperature values over 24 hours
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={temperatureData}>
                    <defs>
                      <linearGradient id="actualGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="predictedGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis 
                      dataKey="time" 
                      stroke="#6b7280"
                      style={{ fontSize: '12px' }}
                    />
                    <YAxis 
                      stroke="#6b7280"
                      style={{ fontSize: '12px' }}
                      label={{ value: 'Temperature (°C)', angle: -90, position: 'insideLeft' }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        borderRadius: '8px', 
                        border: '2px solid #e5e7eb',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                      }}
                    />
                    
                    {/* Safe temperature range */}
                    <ReferenceLine 
                      y={maxTemp} 
                      stroke="#ef4444" 
                      strokeDasharray="5 5" 
                      label={{ value: `Max ${maxTemp}°C`, fill: '#ef4444', fontSize: 11 }}
                    />
                    <ReferenceLine 
                      y={minTemp} 
                      stroke="#3b82f6" 
                      strokeDasharray="5 5" 
                      label={{ value: `Min ${minTemp}°C`, fill: '#3b82f6', fontSize: 11 }}
                    />
                    
                    {/* Actual temperature line */}
                    <Area
                      type="monotone"
                      dataKey="temperature"
                      stroke="#3b82f6"
                      strokeWidth={3}
                      fill="url(#actualGradient)"
                      connectNulls={false}
                    />
                    
                    {/* Predicted temperature line */}
                    <Area
                      type="monotone"
                      dataKey="predicted"
                      stroke="#f97316"
                      strokeWidth={3}
                      strokeDasharray="5 5"
                      fill="url(#predictedGradient)"
                      connectNulls={false}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              
              {/* Legend */}
              <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                  <span className="text-sm">Actual Data</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-orange-500 border-2 border-dashed border-orange-300"></div>
                  <span className="text-sm">Predicted Trend</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-0.5 w-8 bg-red-500"></div>
                  <span className="text-sm">Safe Range Limits</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Suggested Actions */}
          <Card className={`rounded-xl border-2 ${statusColors.border}`}>
            <CardHeader>
              <CardTitle className={`flex items-center gap-2 ${statusColors.text}`}>
                {shipment.status === 'Critical' ? (
                  <AlertTriangle className="h-5 w-5" />
                ) : shipment.status === 'Warning' ? (
                  <AlertTriangle className="h-5 w-5" />
                ) : (
                  <CheckCircle className="h-5 w-5" />
                )}
                {suggestedAction.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {suggestedAction.actions.map((action, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className={`mt-1 h-1.5 w-1.5 rounded-full ${statusColors.badge} flex-shrink-0`}></div>
                    <span className="text-sm text-gray-700">{action}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <Button 
              className="flex-1 rounded-xl bg-blue-600 hover:bg-blue-700 text-white"
              onClick={onClose}
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Acknowledge & Monitor
            </Button>
            {shipment.status !== 'Safe' && (
              <Button 
                className="flex-1 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white"
              >
                <AlertTriangle className="h-4 w-4 mr-2" />
                Take Corrective Action
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
