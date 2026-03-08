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
  Shield,
  Leaf,
  TreePine,
  Thermometer
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
    co2Emissions: 1.8, // in tons
    sustainabilityScore: 45,
    ecoRating: 'High Impact',
    coldChainStability: 99, // percentage
    details: [
      { stage: 'Air Cargo', from: 'Singapore', to: 'Frankfurt', duration: '14 hrs' },
      { stage: 'Refrigerated Truck', from: 'Frankfurt', to: 'Final Destination', duration: '22 hrs' }
    ],
    whyRecommended: [
      'Fastest delivery time available',
      'Ultra-cold transport certified carriers',
      'Best for time-sensitive vaccines',
      'Premium cold-chain monitoring'
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
    co2Emissions: 0.5, // in tons
    sustainabilityScore: 88,
    ecoRating: 'Eco-Friendly',
    coldChainStability: 94, // percentage
    details: [
      { stage: 'Rail Transport', from: 'Singapore', to: 'Intermediate Hub', duration: '48 hrs' },
      { stage: 'Refrigerated Truck', from: 'Hub', to: 'Final Destination', duration: '24 hrs' }
    ],
    whyRecommended: [
      'Lowest carbon footprint (0.5 tons CO₂)',
      'Most cost-effective option',
      'Excellent sustainability score (88%)',
      'Stable temperature control'
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
    co2Emissions: 1.1, // in tons
    sustainabilityScore: 65,
    ecoRating: 'Moderate Impact',
    coldChainStability: 97, // percentage
    details: [
      { stage: 'Sea Freight', from: 'Singapore', to: 'Port Hub', duration: '48 hrs' },
      { stage: 'Air Cargo', from: 'Port Hub', to: 'Regional Airport', duration: '32 hrs' },
      { stage: 'Refrigerated Truck', from: 'Airport', to: 'Final Destination', duration: '16 hrs' }
    ],
    whyRecommended: [
      'Balanced cost and emissions',
      'High reliability score (95%)',
      'Good cold-chain stability',
      'Multi-modal redundancy'
    ]
  }
];

const costComparisonData = routes.map(r => ({
  name: r.name,
  Cost: r.cost / 1000,
  ETA: r.etaHours
}));

// Carbon emissions data for comparison chart
const carbonEmissionsData = routes.map(r => ({
  name: r.name,
  'CO₂ Emissions': r.co2Emissions,
  'Sustainability Score': r.sustainabilityScore
}));

// Get eco rating colors
const getEcoRatingColor = (rating: string) => {
  switch (rating) {
    case 'Eco-Friendly':
      return { bg: 'bg-green-50', border: 'border-green-500', text: 'text-green-700', badge: 'bg-green-500', icon: 'text-green-600' };
    case 'Moderate Impact':
      return { bg: 'bg-yellow-50', border: 'border-yellow-500', text: 'text-yellow-700', badge: 'bg-yellow-500', icon: 'text-yellow-600' };
    case 'High Impact':
      return { bg: 'bg-red-50', border: 'border-red-500', text: 'text-red-700', badge: 'bg-red-500', icon: 'text-red-600' };
    default:
      return { bg: 'bg-gray-50', border: 'border-gray-500', text: 'text-gray-700', badge: 'bg-gray-500', icon: 'text-gray-600' };
  }
};

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
      case 'Low': return 'bg-green-500'; // Green for success/low risk
      case 'Medium': return 'bg-yellow-500'; // Yellow for warning/medium risk
      case 'High': return 'bg-red-500'; // Red for critical/high risk
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
      <div className="space-y-4">
        {/* AI Recommendation Notice */}
        <Card className="rounded-xl border-2 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="bg-white rounded-lg p-2 shadow-sm">
                <TrendingUp className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="font-semibold text-sm text-gray-900 mb-1">AI-Powered Route Recommendation</p>
                <p className="text-xs text-gray-600">
                  Our recommendation considers <strong>delivery time</strong>, <strong>temperature stability</strong>, <strong>cost efficiency</strong>, <strong>carrier reliability</strong>, and <strong>carbon footprint</strong>. 
                  While eco-friendly routes are preferred, time-sensitive or ultra-cold shipments may prioritize speed and cold-chain safety.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          {routes.map((route) => {
            // Calculate badges for each route
            const fastestRoute = routes.reduce((min, r) => r.etaHours < min.etaHours ? r : min);
            const cheapestRoute = routes.reduce((min, r) => r.cost < min.cost ? r : min);
            const mostReliableRoute = routes.reduce((max, r) => r.reliability > max.reliability ? r : max);
            const mostEcoRoute = routes.reduce((min, r) => r.co2Emissions < min.co2Emissions ? r : min);
            const bestColdChainRoute = routes.reduce((max, r) => r.coldChainStability > max.coldChainStability ? r : max);

            const badges = [];
            if (route.id === fastestRoute.id) badges.push({ label: '⚡ Fastest Delivery', color: 'bg-blue-500' });
            if (route.id === mostEcoRoute.id) badges.push({ label: '🌱 Most Eco-Friendly', color: 'bg-green-500' });
            if (route.id === bestColdChainRoute.id) badges.push({ label: '❄️ Best Cold-Chain Stability', color: 'bg-cyan-500' });
            if (route.id === cheapestRoute.id) badges.push({ label: '💰 Lowest Cost', color: 'bg-emerald-500' });
            if (route.id === mostReliableRoute.id) badges.push({ label: '🛡️ Most Reliable', color: 'bg-purple-500' });

            return (
              <Card 
                key={route.id} 
                className={`rounded-2xl border-2 hover:shadow-xl transition-all ${
                  route.id === 'A' ? 'border-primary/50 ring-2 ring-primary/20' : ''
                }`}
              >
                <CardHeader>
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <CardTitle className="text-2xl">{route.name}</CardTitle>
                      <CardDescription className="mt-1">
                        {route.modes.join(' + ')}
                      </CardDescription>
                    </div>
                    {route.id === 'A' && (
                      <Badge className="bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg px-3 py-1.5 shadow-md">
                        ⭐ Recommended Route
                      </Badge>
                    )}
                  </div>

                  {/* Context-Aware Badges */}
                  {badges.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {badges.map((badge, idx) => (
                        <Badge 
                          key={idx} 
                          className={`${badge.color} text-white text-xs rounded-lg px-2.5 py-1`}
                        >
                          {badge.label}
                        </Badge>
                      ))}
                    </div>
                  )}
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

                    <div className="flex items-center justify-between p-3 bg-cyan-50 rounded-xl border border-cyan-200">
                      <div className="flex items-center gap-2">
                        <Thermometer className="h-5 w-5 text-cyan-600" />
                        <span className="font-medium">Cold-Chain</span>
                      </div>
                      <span className="text-xl font-bold text-cyan-600">{route.coldChainStability}%</span>
                    </div>
                  </div>

                  {/* Why This Route Section */}
                  {route.id === 'A' && (
                    <Card className="rounded-xl bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-200">
                      <CardContent className="p-4">
                        <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-orange-600" />
                          Why this route?
                        </h4>
                        <ul className="space-y-2">
                          {route.whyRecommended.map((reason, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-xs text-gray-700">
                              <span className="text-orange-500 mt-0.5">•</span>
                              <span>{reason}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  )}

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
            );
          })}
        </div>
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

      {/* Carbon Footprint Tracking Section */}
      <Card className="rounded-2xl border-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Leaf className="h-6 w-6 text-green-600" />
                Carbon Footprint Tracking & Sustainability
              </CardTitle>
              <CardDescription className="mt-1">Compare environmental impact across different routes and transport modes</CardDescription>
            </div>
            <Badge variant="outline" className="rounded-lg bg-green-50 text-green-700 border-green-300 px-3 py-1">
              <TreePine className="h-4 w-4 mr-1" />
              Sustainability Insights
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Carbon Emissions Comparison Chart */}
          <div>
            <h3 className="font-semibold mb-4">CO₂ Emissions & Sustainability Comparison</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={carbonEmissionsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#888888" fontSize={12} />
                <YAxis yAxisId="left" stroke="#888888" fontSize={12} label={{ value: 'CO₂ (tons)', angle: -90, position: 'insideLeft' }} />
                <YAxis yAxisId="right" orientation="right" stroke="#888888" fontSize={12} label={{ value: 'Score (%)', angle: 90, position: 'insideRight' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb' }}
                  cursor={{ fill: 'rgba(34, 197, 94, 0.1)' }}
                />
                <Legend />
                <Bar yAxisId="left" dataKey="CO₂ Emissions" fill="#ef4444" radius={[8, 8, 0, 0]} name="CO₂ Emissions (tons)" />
                <Bar yAxisId="right" dataKey="Sustainability Score" fill="#22c55e" radius={[8, 8, 0, 0]} name="Sustainability Score (%)" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Individual Route Carbon Footprint Cards */}
          <div>
            <h3 className="font-semibold mb-4">Detailed Carbon Impact Analysis</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {routes.map((route) => {
                const ecoColors = getEcoRatingColor(route.ecoRating);
                const lowestEmission = Math.min(...routes.map(r => r.co2Emissions));
                const potentialSavings = route.co2Emissions - lowestEmission;
                
                return (
                  <Card key={route.id} className={`rounded-xl border-2 ${ecoColors.border}`}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="font-bold text-lg">{route.name}</p>
                          <p className="text-xs text-muted-foreground">{route.modes.join(' + ')}</p>
                        </div>
                        <Badge className={`${ecoColors.badge} text-white text-xs rounded-lg`}>
                          {route.ecoRating}
                        </Badge>
                      </div>

                      {/* CO2 Emissions Display */}
                      <div className={`${ecoColors.bg} rounded-lg p-4 mb-3 border ${ecoColors.border}`}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-medium text-muted-foreground">CO₂ Emissions</span>
                          <Leaf className={`h-4 w-4 ${ecoColors.icon}`} />
                        </div>
                        <p className={`text-3xl font-bold ${ecoColors.text}`}>
                          {route.co2Emissions} <span className="text-lg">tons</span>
                        </p>
                      </div>

                      {/* Sustainability Score */}
                      <div className="mb-3">
                        <div className="flex items-center justify-between text-xs mb-2">
                          <span className="text-muted-foreground">Sustainability Score</span>
                          <span className={`font-bold ${ecoColors.text}`}>{route.sustainabilityScore}%</span>
                        </div>
                        <div className="bg-gray-200 rounded-full h-2">
                          <div 
                            className={`${ecoColors.badge} rounded-full h-2 transition-all`}
                            style={{ width: `${route.sustainabilityScore}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Greener Alternative Message */}
                      {potentialSavings > 0 && (
                        <div className={`${ecoColors.bg} rounded-lg p-3 border ${ecoColors.border}`}>
                          <p className="text-xs font-medium mb-1">
                            <span className={ecoColors.text}>🌍 Greener Alternative Available</span>
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Switch to Route B and save <span className="font-bold text-green-600">{potentialSavings.toFixed(1)} tons CO₂</span>
                          </p>
                        </div>
                      )}

                      {route.co2Emissions === lowestEmission && (
                        <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                          <p className="text-xs font-medium text-green-700">
                            ✓ Most Eco-Friendly Option
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Lowest carbon footprint available
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Environmental Impact Summary */}
          <Card className="rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200">
            <CardContent className="p-5">
              <div className="flex gap-4 items-start">
                <div className="bg-white rounded-xl p-3 shadow-sm">
                  <TreePine className="h-7 w-7 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-3 text-gray-900">Environmental Impact Summary</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">Carbon Savings Opportunity</p>
                      <ul className="space-y-1.5 text-sm text-gray-600">
                        <li className="flex items-start gap-2">
                          <span className="text-green-600">•</span>
                          <span>Choosing Route B over Route A saves <strong className="text-green-700">1.3 tons CO₂</strong></span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-600">•</span>
                          <span>Rail transport produces <strong className="text-green-700">72% less emissions</strong> than air freight</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-600">•</span>
                          <span>Sea freight alternative reduces carbon by up to <strong className="text-green-700">78%</strong></span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">Sustainability Recommendations</p>
                      <ul className="space-y-1.5 text-sm text-gray-600">
                        <li className="flex items-start gap-2">
                          <span className="text-green-600">•</span>
                          <span>Combine shipments to optimize transport efficiency</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-600">•</span>
                          <span>Consider sea freight for non-urgent temperature-stable products</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-600">•</span>
                          <span>Offset remaining emissions through carbon credit programs</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
}