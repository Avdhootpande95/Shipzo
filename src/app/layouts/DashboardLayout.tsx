import { Outlet, useNavigate, useLocation } from 'react-router';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { 
  Snowflake, 
  LayoutDashboard, 
  PlusCircle, 
  Route, 
  History, 
  Thermometer, 
  MapPin, 
  DollarSign, 
  Phone,
  Bell,
  User,
  LogOut,
  Menu,
  X,
  Navigation
} from 'lucide-react';
import { useState } from 'react';

export function DashboardLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/dashboard/create-order', label: 'Create Order', icon: PlusCircle },
    { path: '/dashboard/route-comparison', label: 'Route Comparison', icon: Route },
    { path: '/dashboard/carrier-history', label: 'Carrier History', icon: History },
    { path: '/dashboard/temperature-change', label: 'Temperature Change', icon: Thermometer },
    { path: '/dashboard/operations-map', label: 'Operations Map', icon: MapPin },
    { path: '/dashboard/cost-breakdown', label: 'Cost Breakdown', icon: DollarSign },
    { path: '/dashboard/contact-carrier', label: 'Contact Carrier', icon: Phone },
    { path: '/dashboard/last-mile-delivery', label: 'Last-Mile Delivery', icon: Navigation },
  ];

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            <div className="flex items-center gap-2">
              <div className="bg-primary rounded-xl p-2">
                <Snowflake className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">Shipzo Platform</h1>
                <p className="text-xs text-muted-foreground hidden sm:block">Pharmaceutical Logistics</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="rounded-xl relative">
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-destructive text-white text-xs">
                3
              </Badge>
            </Button>
            <Button variant="ghost" size="sm" className="rounded-xl hidden sm:flex">
              <User className="h-5 w-5 mr-2" />
              <span className="hidden md:inline">Admin User</span>
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="rounded-xl"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside 
          className={`
            fixed lg:sticky top-[60px] left-0 z-30 h-[calc(100vh-60px)] 
            w-64 bg-white border-r border-gray-200 overflow-y-auto
            transition-transform duration-300 ease-in-out
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          `}
        >
          <nav className="p-4 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Button
                  key={item.path}
                  variant={isActive ? 'default' : 'ghost'}
                  className={`w-full justify-start rounded-xl ${
                    isActive 
                      ? 'bg-primary text-white hover:bg-primary/90' 
                      : 'hover:bg-gray-100'
                  }`}
                  onClick={() => {
                    navigate(item.path);
                    setIsSidebarOpen(false);
                  }}
                >
                  <Icon className="h-4 w-4 mr-3" />
                  {item.label}
                </Button>
              );
            })}
          </nav>
        </aside>

        {/* Mobile overlay */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-20 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}