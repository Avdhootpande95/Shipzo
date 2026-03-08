import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Badge } from '../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { useNavigate } from 'react-router';
import { 
  MapPin, 
  Thermometer, 
  Calendar, 
  Weight, 
  AlertCircle, 
  ShieldCheck, 
  Package,
  Plus,
  Minus,
  Search
} from 'lucide-react';

const materials = [
  { 
    id: 1, 
    name: 'mRNA Lipid Nanoparticle', 
    cert: 'GMP', 
    available: 250, 
    expiry: '2027', 
    temp: '−70°C',
    usedIn: ['mRNA Vaccines', 'COVID-19 Vaccine', 'Gene Therapy Treatments']
  },
  { 
    id: 2, 
    name: 'Vaccine Adjuvant MF59', 
    cert: 'GMP', 
    available: 180, 
    expiry: '2026', 
    temp: '2–8°C',
    usedIn: ['Influenza Vaccines', 'Pandemic Vaccines', 'Immunization Programs']
  },
  { 
    id: 3, 
    name: 'Monoclonal Antibody Solution', 
    cert: 'GDP', 
    available: 95, 
    expiry: '2027', 
    temp: '2–8°C',
    usedIn: ['Cancer Treatments', 'Autoimmune Disease Therapy', 'Oncology Applications']
  },
  { 
    id: 4, 
    name: 'Lyophilized Protein Powder', 
    cert: 'GMP', 
    available: 320, 
    expiry: '2028', 
    temp: '−20°C',
    usedIn: ['Enzyme Replacement Therapy', 'Biologics Production', 'Research Applications']
  },
  { 
    id: 5, 
    name: 'Injectable Suspension', 
    cert: 'GDP', 
    available: 140, 
    expiry: '2026', 
    temp: '2–8°C',
    usedIn: ['Insulin Formulations', 'Long-Acting Injectables', 'Hormone Therapies']
  },
];

export function CreateOrder() {
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState<typeof materials>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const addToShipment = (material: typeof materials[0]) => {
    if (!selectedItems.find(item => item.id === material.id)) {
      setSelectedItems([...selectedItems, material]);
    }
  };

  const removeFromShipment = (id: number) => {
    setSelectedItems(selectedItems.filter(item => item.id !== id));
  };

  const filteredMaterials = materials.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Create New Order</h1>
          <p className="text-muted-foreground">Configure your pharmaceutical logistics shipment</p>
        </div>
      </div>

      <Tabs defaultValue="details" className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-2 rounded-xl">
          <TabsTrigger value="details" className="rounded-lg">Order Details</TabsTrigger>
          <TabsTrigger value="materials" className="rounded-lg">Add Materials</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-6">
          <Card className="rounded-2xl border-2">
            <CardHeader>
              <CardTitle>Shipment Information</CardTitle>
              <CardDescription>Enter the details for your logistics order</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="pickup" className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    Pickup Location
                  </Label>
                  <Input 
                    id="pickup" 
                    placeholder="e.g., Singapore Manufacturing Hub" 
                    className="rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="destination" className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-secondary" />
                    Destination
                  </Label>
                  <Input 
                    id="destination" 
                    placeholder="e.g., Frankfurt Distribution Center" 
                    className="rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="temperature" className="flex items-center gap-2">
                    <Thermometer className="h-4 w-4 text-primary" />
                    Temperature Requirement
                  </Label>
                  <Select>
                    <SelectTrigger id="temperature" className="rounded-xl">
                      <SelectValue placeholder="Select temperature range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2-8">2–8°C (Standard Refrigerated)</SelectItem>
                      <SelectItem value="-20">−20°C (Frozen)</SelectItem>
                      <SelectItem value="-70">−70°C (Ultra-Cold)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deadline" className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-secondary" />
                    Delivery Deadline
                  </Label>
                  <Input 
                    id="deadline" 
                    type="date" 
                    className="rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="weight" className="flex items-center gap-2">
                    <Weight className="h-4 w-4 text-primary" />
                    Shipment Weight (kg)
                  </Label>
                  <Input 
                    id="weight" 
                    type="number" 
                    placeholder="e.g., 250" 
                    className="rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="volume" className="flex items-center gap-2">
                    <Package className="h-4 w-4 text-secondary" />
                    Volume (m³)
                  </Label>
                  <Input 
                    id="volume" 
                    type="number" 
                    step="0.1" 
                    placeholder="e.g., 1.5" 
                    className="rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="route-type">Preferred Route Type</Label>
                  <Select>
                    <SelectTrigger id="route-type" className="rounded-xl">
                      <SelectValue placeholder="Select route preference" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="air">Air Freight (Fastest)</SelectItem>
                      <SelectItem value="sea">Sea Freight (Most Economical)</SelectItem>
                      <SelectItem value="rail">Rail Transport (Balanced)</SelectItem>
                      <SelectItem value="multimodal">Multimodal (Optimized)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="risk" className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-destructive" />
                    Risk Level
                  </Label>
                  <Select>
                    <SelectTrigger id="risk" className="rounded-xl">
                      <SelectValue placeholder="Assess risk level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low Risk</SelectItem>
                      <SelectItem value="medium">Medium Risk</SelectItem>
                      <SelectItem value="high">High Risk (Special Handling)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 flex gap-3">
                <AlertCircle className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-medium text-orange-900">Risk Assessment</p>
                  <p className="text-sm text-orange-700">
                    Based on your inputs, this shipment is classified as medium risk. 
                    Additional temperature monitoring and route optimization recommended.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Button 
                  className="rounded-xl bg-secondary hover:bg-secondary/90"
                  onClick={() => navigate('/dashboard/route-comparison')}
                >
                  View Route Options
                </Button>
                <Button 
                  variant="outline" 
                  className="rounded-xl"
                  onClick={() => navigate('/dashboard')}
                >
                  Save Draft
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="materials" className="space-y-6">
          {/* Material Catalog */}
          <Card className="rounded-2xl border-2">
            <CardHeader>
              <CardTitle>Material Catalog</CardTitle>
              <CardDescription>Search and add pharmaceutical materials to your shipment</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search materials by name..."
                  className="pl-10 rounded-xl"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {filteredMaterials.map((material) => (
                  <Card key={material.id} className="rounded-xl border-2 hover:shadow-md transition-shadow">
                    <CardContent className="p-4 space-y-3">
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <h4 className="font-semibold">{material.name}</h4>
                          <div className="flex gap-2 flex-wrap">
                            <Badge variant="outline" className="rounded-lg">
                              <ShieldCheck className="h-3 w-3 mr-1" />
                              {material.cert}
                            </Badge>
                            <Badge variant="outline" className="rounded-lg">
                              <Thermometer className="h-3 w-3 mr-1" />
                              {material.temp}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-sm space-y-1">
                        <p className="text-muted-foreground">
                          Available: <span className="font-medium text-green-600">{material.available} units</span>
                        </p>
                        <p className="text-muted-foreground">
                          Expiry: <span className="font-medium">{material.expiry}</span>
                        </p>
                      </div>

                      {/* Used In Section */}
                      <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                        <p className="text-xs font-semibold text-blue-900 mb-2">Used In</p>
                        <div className="space-y-1">
                          {material.usedIn.map((application, idx) => (
                            <div key={idx} className="flex items-start gap-1.5">
                              <span className="text-blue-600 text-xs mt-0.5">•</span>
                              <span className="text-xs text-blue-800">{application}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          className="flex-1 rounded-lg bg-primary hover:bg-primary/90"
                          onClick={() => addToShipment(material)}
                          disabled={selectedItems.some(item => item.id === material.id)}
                        >
                          <Plus className="h-3 w-3 mr-1" />
                          Add to Shipment
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Selected Items */}
          {selectedItems.length > 0 && (
            <Card className="rounded-2xl border-2 border-primary/20 bg-orange-50/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-primary" />
                  Selected Materials ({selectedItems.length})
                </CardTitle>
                <CardDescription>Items added to this shipment</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {selectedItems.map((item) => (
                  <div 
                    key={item.id} 
                    className="bg-white rounded-xl p-4 flex justify-between items-center border-2"
                  >
                    <div>
                      <h4 className="font-semibold">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">{item.temp}</p>
                    </div>
                    <Button 
                      size="sm" 
                      variant="destructive" 
                      className="rounded-lg"
                      onClick={() => removeFromShipment(item.id)}
                    >
                      <Minus className="h-3 w-3 mr-1" />
                      Remove
                    </Button>
                  </div>
                ))}

                <Button 
                  className="w-full rounded-xl bg-primary hover:bg-primary/90 mt-4"
                  onClick={() => navigate('/dashboard/route-comparison')}
                >
                  Continue to Route Selection
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}