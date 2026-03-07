import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { 
  ShieldCheck, Package, Wrench, Thermometer, Plane, Ship, 
  TrendingUp, Globe, Mail, Lock, CheckCircle
} from 'lucide-react';

export function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userRole, setUserRole] = useState<'client' | 'operations'>('client');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Demo login - accept any email with @ and any password
    if (email.includes('@') && password.length > 0) {
      if (userRole === 'client') {
        navigate('/dashboard');
      } else {
        navigate('/operations');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #FAFAFA 0%, #F6F8FB 100%)'
    }}>
      {/* Subtle Background Graphics */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 1000 1000">
          {/* World Map Inspired Network Lines */}
          <path d="M100 200 Q 250 150 400 200 T 700 200" stroke="currentColor" strokeWidth="2" fill="none" />
          <path d="M200 400 Q 400 350 600 400 T 900 400" stroke="currentColor" strokeWidth="2" fill="none" />
          <path d="M150 600 Q 350 550 550 600 T 850 600" stroke="currentColor" strokeWidth="2" fill="none" />
          <circle cx="100" cy="200" r="8" fill="currentColor" />
          <circle cx="400" cy="200" r="8" fill="currentColor" />
          <circle cx="700" cy="200" r="8" fill="currentColor" />
          <circle cx="200" cy="400" r="8" fill="currentColor" />
          <circle cx="600" cy="400" r="8" fill="currentColor" />
          <circle cx="900" cy="400" r="8" fill="currentColor" />
        </svg>
      </div>

      <div className="w-full max-w-7xl grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Side - Product Overview */}
        <div className="space-y-8 text-center lg:text-left px-4">
          {/* Logo and Brand */}
          <div className="space-y-4">
            <div className="flex items-center justify-center lg:justify-start gap-3">
              <div className="bg-gradient-to-br from-primary to-orange-600 rounded-2xl p-4 shadow-lg">
                <Package className="h-12 w-12 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-900">Shipzo</h1>
                <p className="text-sm text-primary font-medium">Logistics Company</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                Monitor, predict, and optimize global pharmaceutical cold-chain shipments
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Enterprise platform for pharmaceutical procurement, temperature-controlled logistics, 
                compliance monitoring, and global shipment visibility. Trusted by leading pharmaceutical companies worldwide.
              </p>
            </div>
          </div>

          {/* Feature Highlights with Icons */}
          <div className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <Card className="rounded-2xl border-2 hover:shadow-lg transition-all hover:border-primary/30">
                <CardContent className="p-5">
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 rounded-xl p-2.5">
                      <Thermometer className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm mb-1">Real-Time Temperature</h3>
                      <p className="text-xs text-muted-foreground">Monitor every shipment 24/7</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-2xl border-2 hover:shadow-lg transition-all hover:border-secondary/30">
                <CardContent className="p-5">
                  <div className="flex items-start gap-3">
                    <div className="bg-secondary/10 rounded-xl p-2.5">
                      <Globe className="h-5 w-5 text-secondary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm mb-1">Global Visibility</h3>
                      <p className="text-xs text-muted-foreground">Track across continents</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-2xl border-2 hover:shadow-lg transition-all hover:border-green-500/30">
                <CardContent className="p-5">
                  <div className="flex items-start gap-3">
                    <div className="bg-green-100 rounded-xl p-2.5">
                      <TrendingUp className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm mb-1">Predictive Analytics</h3>
                      <p className="text-xs text-muted-foreground">AI-powered risk insights</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-2xl border-2 hover:shadow-lg transition-all hover:border-purple-500/30">
                <CardContent className="p-5">
                  <div className="flex items-start gap-3">
                    <div className="bg-purple-100 rounded-xl p-2.5">
                      <div className="flex gap-1">
                        <Plane className="h-4 w-4 text-purple-600" />
                        <Ship className="h-4 w-4 text-purple-600" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm mb-1">Multimodal Tracking</h3>
                      <p className="text-xs text-muted-foreground">Air, Sea, Rail, Road</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Certification Badges */}
          <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
            <Badge variant="outline" className="px-5 py-2.5 rounded-xl border-2 border-green-200 bg-green-50 hover:shadow-md transition-shadow">
              <ShieldCheck className="h-5 w-5 mr-2 text-green-600" />
              <span className="text-green-700 font-semibold">GMP Compliant</span>
            </Badge>
            <Badge variant="outline" className="px-5 py-2.5 rounded-xl border-2 border-blue-200 bg-blue-50 hover:shadow-md transition-shadow">
              <CheckCircle className="h-5 w-5 mr-2 text-blue-600" />
              <span className="text-blue-700 font-semibold">GDP Certified</span>
            </Badge>
          </div>
        </div>

        {/* Right Side - Enhanced Login Form */}
        <Card className="border-2 rounded-3xl shadow-2xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="space-y-2 pb-6">
            <CardTitle className="text-3xl">Sign In</CardTitle>
            <CardDescription className="text-base">
              Access your pharmaceutical logistics control center
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-5">
              {/* User Role Selection with Descriptions */}
              <div className="space-y-3">
                <Label className="text-base font-semibold">Select Your Role</Label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setUserRole('client')}
                    className={`p-5 rounded-2xl border-2 transition-all group ${ 
                      userRole === 'client'
                        ? 'border-primary bg-gradient-to-br from-orange-50 to-orange-100 shadow-md'
                        : 'border-gray-200 bg-white hover:border-primary/30 hover:shadow-sm'
                    }`}
                  >
                    <Package className={`h-7 w-7 mx-auto mb-2 ${
                      userRole === 'client' ? 'text-primary' : 'text-gray-400 group-hover:text-primary'
                    }`} />
                    <span className={`font-semibold block mb-1 ${
                      userRole === 'client' ? 'text-primary' : 'text-gray-700'
                    }`}>Client</span>
                    <span className="text-xs text-muted-foreground block">
                      Track shipments & documents
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setUserRole('operations')}
                    className={`p-5 rounded-2xl border-2 transition-all group ${
                      userRole === 'operations'
                        ? 'border-secondary bg-gradient-to-br from-blue-50 to-blue-100 shadow-md'
                        : 'border-gray-200 bg-white hover:border-secondary/30 hover:shadow-sm'
                    }`}
                  >
                    <Wrench className={`h-7 w-7 mx-auto mb-2 ${
                      userRole === 'operations' ? 'text-secondary' : 'text-gray-400 group-hover:text-secondary'
                    }`} />
                    <span className={`font-semibold block mb-1 ${
                      userRole === 'operations' ? 'text-secondary' : 'text-gray-700'
                    }`}>Operations</span>
                    <span className="text-xs text-muted-foreground block">
                      Manage routes & carriers
                    </span>
                  </button>
                </div>
              </div>

              {/* Email with Icon */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-base font-semibold">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="text"
                    placeholder="your.email@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="rounded-xl h-12 pl-12 border-2 hover:border-primary/30 transition-colors"
                    required
                  />
                </div>
              </div>

              {/* Password with Icon */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-base font-semibold">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="rounded-xl h-12 pl-12 border-2 hover:border-primary/30 transition-colors"
                    required
                  />
                </div>
              </div>

              {/* Demo Notice */}
              <div className="text-xs text-center text-muted-foreground bg-blue-50 p-3 rounded-xl border-2 border-blue-100">
                <span className="font-medium">Demo Mode:</span> Any valid email format and password accepted
              </div>

              {/* Enhanced Sign In Button */}
              <Button 
                type="submit" 
                className="w-full rounded-xl h-12 text-base font-semibold bg-gradient-to-r from-primary to-orange-600 hover:from-primary/90 hover:to-orange-500 shadow-lg hover:shadow-xl transition-all"
              >
                Sign In to Shipzo
              </Button>

              {/* Trust Indicators */}
              <div className="text-center space-y-2 pt-2">
                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                  <ShieldCheck className="h-4 w-4 text-green-600" />
                  <span>Secure Shipzo Network</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  GDP and FDA compliant infrastructure
                </div>
              </div>

              {/* Secondary Actions */}
              <div className="flex gap-2 pt-2">
                <Button 
                  type="button" 
                  variant="ghost" 
                  className="flex-1 rounded-xl hover:bg-gray-100" 
                  size="sm"
                >
                  Forgot Password?
                </Button>
                <Button 
                  type="button" 
                  variant="ghost" 
                  className="flex-1 rounded-xl hover:bg-gray-100" 
                  size="sm"
                >
                  Contact Support
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}