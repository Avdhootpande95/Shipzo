import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { 
  Phone, 
  Mail, 
  MessageSquare, 
  MapPin, 
  Ship,
  Plane,
  Truck,
  User,
  Clock,
  Navigation,
  Headphones
} from 'lucide-react';

const activeCarriers = [
  {
    shipmentId: 'SH-2024-001',
    route: 'Singapore → Frankfurt',
    carrier: 'Global Air Cargo Ltd',
    mode: 'Air',
    currentLocation: 'Over Arabian Sea',
    contact: {
      name: 'Captain James Wilson',
      phone: '+65 9123 4567',
      email: 'operations@globalair.com',
      status: 'Available'
    }
  },
  {
    shipmentId: 'SH-2024-002',
    route: 'Boston → Tokyo',
    carrier: 'Pacific Freight Solutions',
    mode: 'Sea',
    currentLocation: 'Pacific Ocean',
    contact: {
      name: 'Captain Maria Santos',
      phone: '+1 617 555 0123',
      email: 'marine@pacificfreight.com',
      status: 'Available'
    }
  },
  {
    shipmentId: 'SH-2024-004',
    route: 'Shanghai → Dubai',
    carrier: 'Trans-Asia Rail Services',
    mode: 'Rail',
    currentLocation: 'Central Asia Hub',
    contact: {
      name: 'Operations Manager Liu Chen',
      phone: '+86 21 5555 8888',
      email: 'ops@transasiarail.com',
      status: 'Busy'
    }
  },
];

export function ContactCarrier() {
  const [selectedCarrier, setSelectedCarrier] = useState('');
  const [contactMethod, setContactMethod] = useState('');
  const [message, setMessage] = useState('');

  const getModeIcon = (mode: string) => {
    switch (mode) {
      case 'Air': return <Plane className="h-5 w-5" />;
      case 'Sea': return <Ship className="h-5 w-5" />;
      case 'Rail': return <Truck className="h-5 w-5 rotate-180" />;
      default: return <Truck className="h-5 w-5" />;
    }
  };

  const handleContact = (method: string) => {
    const carrier = activeCarriers.find(c => c.shipmentId === selectedCarrier);
    if (carrier) {
      if (method === 'phone') {
        alert(`Initiating call to ${carrier.contact.phone}...`);
      } else if (method === 'email') {
        alert(`Opening email client to ${carrier.contact.email}...`);
      } else if (method === 'message') {
        alert('Message sent successfully!');
        setMessage('');
      }
    }
  };

  const selectedCarrierData = activeCarriers.find(c => c.shipmentId === selectedCarrier);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Contact Carrier</h1>
        <p className="text-muted-foreground">Communicate with active transport operators</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Contact Form */}
        <div className="space-y-6">
          <Card className="rounded-2xl border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Headphones className="h-5 w-5 text-primary" />
                Contact Information
              </CardTitle>
              <CardDescription>Select a shipment to view carrier contact details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="shipment">Select Active Shipment</Label>
                <Select value={selectedCarrier} onValueChange={setSelectedCarrier}>
                  <SelectTrigger id="shipment" className="rounded-xl">
                    <SelectValue placeholder="Choose a shipment" />
                  </SelectTrigger>
                  <SelectContent>
                    {activeCarriers.map((carrier) => (
                      <SelectItem key={carrier.shipmentId} value={carrier.shipmentId}>
                        {carrier.shipmentId} - {carrier.carrier}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedCarrierData && (
                <>
                  <div className="space-y-4 p-4 bg-gradient-to-br from-orange-50 to-blue-50 rounded-xl border-2">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary rounded-xl p-3">
                        {getModeIcon(selectedCarrierData.mode)}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold">{selectedCarrierData.carrier}</h4>
                        <p className="text-sm text-muted-foreground">{selectedCarrierData.mode} Transport</p>
                      </div>
                      <Badge 
                        className={`rounded-lg ${
                          selectedCarrierData.contact.status === 'Available' 
                            ? 'bg-green-500' 
                            : 'bg-yellow-500'
                        } text-white`}
                      >
                        {selectedCarrierData.contact.status}
                      </Badge>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                        <Navigation className="h-4 w-4 text-secondary" />
                        <div className="flex-1">
                          <p className="text-xs text-muted-foreground">Current Location</p>
                          <p className="font-medium">{selectedCarrierData.currentLocation}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                        <MapPin className="h-4 w-4 text-primary" />
                        <div className="flex-1">
                          <p className="text-xs text-muted-foreground">Route</p>
                          <p className="font-medium">{selectedCarrierData.route}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                        <User className="h-4 w-4 text-secondary" />
                        <div className="flex-1">
                          <p className="text-xs text-muted-foreground">Contact Person</p>
                          <p className="font-medium">{selectedCarrierData.contact.name}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Contact Buttons */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm">Quick Contact</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <Button 
                        className="rounded-xl bg-primary hover:bg-primary/90"
                        onClick={() => handleContact('phone')}
                      >
                        <Phone className="h-4 w-4 mr-2" />
                        Call Carrier
                      </Button>
                      <Button 
                        variant="outline" 
                        className="rounded-xl"
                        onClick={() => handleContact('email')}
                      >
                        <Mail className="h-4 w-4 mr-2" />
                        Send Email
                      </Button>
                    </div>

                    <div className="space-y-3 pt-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4 text-primary" />
                        <span className="font-medium">{selectedCarrierData.contact.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-4 w-4 text-secondary" />
                        <span className="font-medium">{selectedCarrierData.contact.email}</span>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {selectedCarrierData && (
            <Card className="rounded-2xl border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-secondary" />
                  Send Message
                </CardTitle>
                <CardDescription>Send a direct message to the carrier</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Select value={contactMethod} onValueChange={setContactMethod}>
                    <SelectTrigger id="subject" className="rounded-xl">
                      <SelectValue placeholder="Select message type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="status">Request Status Update</SelectItem>
                      <SelectItem value="temp">Temperature Inquiry</SelectItem>
                      <SelectItem value="eta">ETA Confirmation</SelectItem>
                      <SelectItem value="special">Special Instructions</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Type your message here..."
                    className="rounded-xl min-h-[120px]"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>

                <Button 
                  className="w-full rounded-xl bg-secondary hover:bg-secondary/90"
                  onClick={() => handleContact('message')}
                  disabled={!contactMethod || !message}
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* All Active Carriers */}
        <div className="space-y-6">
          <Card className="rounded-2xl border-2">
            <CardHeader>
              <CardTitle>All Active Carriers</CardTitle>
              <CardDescription>Current transport operators for your shipments</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {activeCarriers.map((carrier) => (
                <Card 
                  key={carrier.shipmentId} 
                  className={`rounded-xl border-2 hover:shadow-md transition-all cursor-pointer ${
                    selectedCarrier === carrier.shipmentId ? 'border-primary ring-2 ring-primary/20' : ''
                  }`}
                  onClick={() => setSelectedCarrier(carrier.shipmentId)}
                >
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                          <div className="bg-primary/10 rounded-lg p-2">
                            {getModeIcon(carrier.mode)}
                          </div>
                          <div>
                            <h4 className="font-semibold">{carrier.carrier}</h4>
                            <p className="text-sm text-muted-foreground">{carrier.shipmentId}</p>
                          </div>
                        </div>
                        <Badge 
                          className={`rounded-lg ${
                            carrier.contact.status === 'Available' 
                              ? 'bg-green-500' 
                              : 'bg-yellow-500'
                          } text-white`}
                        >
                          {carrier.contact.status}
                        </Badge>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-3 w-3 text-muted-foreground" />
                          <span className="text-muted-foreground">{carrier.route}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Navigation className="h-3 w-3 text-muted-foreground" />
                          <span className="text-muted-foreground">{carrier.currentLocation}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <User className="h-3 w-3 text-muted-foreground" />
                          <span className="text-muted-foreground">{carrier.contact.name}</span>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="flex-1 rounded-lg"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedCarrier(carrier.shipmentId);
                            handleContact('phone');
                          }}
                        >
                          <Phone className="h-3 w-3 mr-1" />
                          Call
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="flex-1 rounded-lg"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedCarrier(carrier.shipmentId);
                            handleContact('email');
                          }}
                        >
                          <Mail className="h-3 w-3 mr-1" />
                          Email
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>

          {/* Communication History */}
          <Card className="rounded-2xl border-2">
            <CardHeader>
              <CardTitle>Recent Communication</CardTitle>
              <CardDescription>Message history with carriers</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-start gap-2 mb-2">
                  <Clock className="h-4 w-4 text-secondary mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Status Update Request</p>
                    <p className="text-xs text-muted-foreground">2 hours ago • Global Air Cargo</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">Requested ETA confirmation for SH-2024-001</p>
              </div>

              <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-start gap-2 mb-2">
                  <Clock className="h-4 w-4 text-green-600 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Response Received</p>
                    <p className="text-xs text-muted-foreground">5 hours ago • Pacific Freight</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">Temperature monitoring confirmed stable at -20°C</p>
              </div>

              <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                <div className="flex items-start gap-2 mb-2">
                  <Clock className="h-4 w-4 text-orange-600 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Alert Notification</p>
                    <p className="text-xs text-muted-foreground">Yesterday • Trans-Asia Rail</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">Notified about temperature deviation on SH-2024-004</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
