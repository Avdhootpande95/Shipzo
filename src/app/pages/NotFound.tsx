import { useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { AlertCircle, Home } from 'lucide-react';

export function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full rounded-2xl border-2 shadow-xl">
        <CardContent className="p-8 text-center space-y-6">
          <div className="bg-destructive/10 rounded-full p-6 w-24 h-24 mx-auto flex items-center justify-center">
            <AlertCircle className="h-12 w-12 text-destructive" />
          </div>
          
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-gray-900">404</h1>
            <h2 className="text-xl font-semibold text-gray-700">Page Not Found</h2>
            <p className="text-muted-foreground">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </div>

          <div className="flex gap-3">
            <Button 
              className="flex-1 rounded-xl bg-primary hover:bg-primary/90"
              onClick={() => navigate('/')}
            >
              <Home className="h-4 w-4 mr-2" />
              Go to Login
            </Button>
            <Button 
              variant="outline"
              className="flex-1 rounded-xl"
              onClick={() => navigate('/dashboard')}
            >
              Dashboard
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
