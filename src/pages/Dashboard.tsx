import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  AlertTriangle, 
  Shield, 
  Users, 
  MapPin, 
  Activity,
  TrendingUp,
  Clock,
  Zap
} from "lucide-react";
import { RiskMap } from "@/components/RiskMap";
import { DigitalTwin } from "@/components/DigitalTwin";
import { AlertSystem } from "@/components/AlertSystem";
import { BlockchainLogger } from "@/components/BlockchainLogger";
import { StatsCards } from "@/components/StatsCards";

const Dashboard = () => {
  const [userRole, setUserRole] = useState<"admin" | "sector" | "worker">("admin");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-br from-mining to-mining/80 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-mining-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">MineGuard AI</h1>
                <p className="text-sm text-muted-foreground">Rockfall Prediction & Safety System</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                <Button 
                  variant={userRole === "admin" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setUserRole("admin")}
                >
                  Admin
                </Button>
                <Button 
                  variant={userRole === "sector" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setUserRole("sector")}
                >
                  Sector Head
                </Button>
                <Button 
                  variant={userRole === "worker" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setUserRole("worker")}
                >
                  Worker
                </Button>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-safe rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-foreground">System Active</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-6">
        <StatsCards />
        
        <div className="mt-6">
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="risk-map">Risk Map</TabsTrigger>
              <TabsTrigger value="digital-twin">Digital Twin</TabsTrigger>
              <TabsTrigger value="alerts">Alert System</TabsTrigger>
              <TabsTrigger value="blockchain">Blockchain Logs</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-mining" />
                      Risk Prediction Trends
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Sector A</span>
                        <Badge className="bg-safe text-safe-foreground">Low Risk</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Sector B</span>
                        <Badge className="bg-caution text-caution-foreground">Medium Risk</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Sector C</span>
                        <Badge className="bg-danger text-danger-foreground">High Risk</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="w-5 h-5 text-mining" />
                      Real-time Sensors
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Slope Monitoring</span>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-safe rounded-full"></div>
                          <span className="text-sm">Active</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Weather Station</span>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-safe rounded-full"></div>
                          <span className="text-sm">Active</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Vibration Sensors</span>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-caution rounded-full"></div>
                          <span className="text-sm">Warning</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {userRole === "worker" && (
                <Card className="border-danger bg-danger/5">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-danger">
                      <AlertTriangle className="w-5 h-5" />
                      Safety Alert - Your Area
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">
                      Medium risk detected in Sector B. Please maintain safe distance from slope area marked in yellow.
                    </p>
                    <Button className="mt-4 bg-danger text-danger-foreground hover:bg-danger/90">
                      View Evacuation Route
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="risk-map">
              <RiskMap userRole={userRole} />
            </TabsContent>

            <TabsContent value="digital-twin">
              <DigitalTwin />
            </TabsContent>

            <TabsContent value="alerts">
              <AlertSystem userRole={userRole} />
            </TabsContent>

            <TabsContent value="blockchain">
              <BlockchainLogger />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;