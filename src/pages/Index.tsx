import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  Shield, 
  TrendingUp, 
  Eye, 
  Link as LinkIcon,
  CheckCircle,
  AlertTriangle,
  Users,
  MapPin,
  Activity,
  Zap
} from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-6">
        <div className="absolute inset-0 bg-gradient-to-br from-mining/10 via-background to-safe/5"></div>
        <div className="relative container mx-auto text-center">
          <div className="mb-8 flex justify-center">
            <div className="w-20 h-20 bg-gradient-to-br from-mining to-mining/80 rounded-2xl flex items-center justify-center shadow-mining">
              <Shield className="w-12 h-12 text-mining-foreground" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            MineGuard AI
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-4">
            AI-Based Rockfall Prediction & Alert System
          </p>
          
          <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
            Revolutionizing open-pit mining safety with Digital Twins, Blockchain technology, 
            and predictive AI to prevent accidents and save lives.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/dashboard">
              <Button size="lg" className="text-lg px-8 py-6">
                Launch Dashboard
                <TrendingUp className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6">
              View Demo
              <Eye className="ml-2 w-5 h-5" />
            </Button>
          </div>
          
          <div className="flex justify-center gap-6 mt-8">
            <Badge className="bg-safe text-safe-foreground">Real-time Monitoring</Badge>
            <Badge className="bg-mining text-mining-foreground">AI Powered</Badge>
            <Badge className="bg-caution text-caution-foreground">Blockchain Secured</Badge>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Complete Safety Ecosystem
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-0 bg-card shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-safe/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-6 h-6 text-safe" />
                </div>
                <CardTitle className="text-lg">AI Prediction Engine</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground text-center">
                  Machine learning models analyze slope stability, weather, and sensor data to predict rockfall incidents.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-card shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-mining/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Eye className="w-6 h-6 text-mining" />
                </div>
                <CardTitle className="text-lg">Digital Twin</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground text-center">
                  Interactive 3D visualization of mine slopes with real-time risk zones and what-if simulations.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-card shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-caution/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <LinkIcon className="w-6 h-6 text-caution" />
                </div>
                <CardTitle className="text-lg">Blockchain Security</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground text-center">
                  Immutable logging of safety alerts and decisions ensuring transparency and accountability.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-card shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-danger/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="w-6 h-6 text-danger" />
                </div>
                <CardTitle className="text-lg">Multi-Role Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground text-center">
                  Tailored dashboards for Admin, Sector Heads, and Workers with role-specific safety information.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* System Architecture */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            How It Works
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-mining to-mining/80 rounded-full flex items-center justify-center mx-auto">
                <Activity className="w-8 h-8 text-mining-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Data Collection</h3>
              <p className="text-muted-foreground">
                Sensors, drones, and satellite imagery continuously monitor slope stability, weather conditions, and equipment movement.
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-safe to-safe/80 rounded-full flex items-center justify-center mx-auto">
                <Zap className="w-8 h-8 text-safe-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">AI Analysis</h3>
              <p className="text-muted-foreground">
                Machine learning algorithms process data in real-time to identify patterns and predict potential rockfall incidents.
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-caution to-caution/80 rounded-full flex items-center justify-center mx-auto">
                <Users className="w-8 h-8 text-caution-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Alert & Response</h3>
              <p className="text-muted-foreground">
                Automated alerts are sent to relevant personnel with blockchain-secured logging for complete transparency.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-safe mb-2">99.5%</div>
              <div className="text-muted-foreground">Prediction Accuracy</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-mining mb-2">&lt; 2s</div>
              <div className="text-muted-foreground">Alert Response Time</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-caution mb-2">247</div>
              <div className="text-muted-foreground">Blockchain Records</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-foreground mb-2">142</div>
              <div className="text-muted-foreground">Lives Protected</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-6">
            Ready to Transform Mining Safety?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Experience the future of mining safety with our comprehensive AI-powered prediction system.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/dashboard">
              <Button size="lg" className="text-lg px-8 py-6">
                Explore Dashboard
                <Shield className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6">
              Request Demo
              <MapPin className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card py-8 px-6">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Shield className="w-6 h-6 text-mining" />
            <span className="text-lg font-semibold text-foreground">MineGuard AI</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Revolutionizing mining safety through AI, Digital Twins, and Blockchain technology.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
