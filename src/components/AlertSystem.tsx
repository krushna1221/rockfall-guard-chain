import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  AlertTriangle, 
  Bell, 
  CheckCircle, 
  Clock, 
  Users,
  MapPin,
  Phone
} from "lucide-react";

interface AlertSystemProps {
  userRole: "admin" | "sector" | "worker";
}

interface Alert {
  id: string;
  type: "critical" | "warning" | "info";
  title: string;
  description: string;
  sector: string;
  timestamp: string;
  status: "active" | "acknowledged" | "resolved";
  affectedWorkers?: number;
}

export const AlertSystem = ({ userRole }: AlertSystemProps) => {
  const [alerts] = useState<Alert[]>([
    {
      id: "1",
      type: "critical",
      title: "High Risk Rockfall Prediction",
      description: "AI model predicts 85% probability of rockfall in next 6 hours",
      sector: "Sector C - North Slope",
      timestamp: "2024-01-10 14:30:00",
      status: "active",
      affectedWorkers: 12
    },
    {
      id: "2",
      type: "warning",
      title: "Increased Vibration Detected",
      description: "Seismic sensors showing elevated activity levels",
      sector: "Sector B - East Wall",
      timestamp: "2024-01-10 13:45:00",
      status: "acknowledged",
      affectedWorkers: 8
    },
    {
      id: "3",
      type: "info",
      title: "Weather Alert",
      description: "Heavy rainfall expected in next 4 hours - monitor drainage",
      sector: "All Sectors",
      timestamp: "2024-01-10 12:15:00",
      status: "active",
      affectedWorkers: 142
    },
    {
      id: "4",
      type: "warning",
      title: "Equipment Proximity Warning",
      description: "Heavy machinery detected near unstable slope area",
      sector: "Sector A - South Access",
      timestamp: "2024-01-10 11:30:00",
      status: "resolved",
      affectedWorkers: 3
    }
  ]);

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "critical":
        return <AlertTriangle className="w-5 h-5 text-danger" />;
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-caution" />;
      default:
        return <Bell className="w-5 h-5 text-mining" />;
    }
  };

  const getAlertBadge = (type: string, status: string) => {
    if (status === "resolved") {
      return <Badge className="bg-safe text-safe-foreground">Resolved</Badge>;
    }
    
    switch (type) {
      case "critical":
        return <Badge className="bg-danger text-danger-foreground">Critical</Badge>;
      case "warning":
        return <Badge className="bg-caution text-caution-foreground">Warning</Badge>;
      default:
        return <Badge variant="outline">Info</Badge>;
    }
  };

  const activeAlerts = alerts.filter(alert => alert.status === "active");
  const acknowledgedAlerts = alerts.filter(alert => alert.status === "acknowledged");
  const resolvedAlerts = alerts.filter(alert => alert.status === "resolved");

  const filteredAlerts = userRole === "worker" 
    ? alerts.filter(alert => alert.type === "critical" || alert.type === "warning")
    : alerts;

  return (
    <div className="space-y-6">
      {/* Alert Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-danger/10 border-danger/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Active Alerts</p>
                <p className="text-2xl font-bold text-danger">{activeAlerts.length}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-danger" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-caution/10 border-caution/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Acknowledged</p>
                <p className="text-2xl font-bold text-caution">{acknowledgedAlerts.length}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-caution" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-safe/10 border-safe/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Resolved Today</p>
                <p className="text-2xl font-bold text-safe">{resolvedAlerts.length}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-safe" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Worker-specific critical alert */}
      {userRole === "worker" && activeAlerts.some(a => a.type === "critical") && (
        <Card className="border-danger bg-danger/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-danger">
              <AlertTriangle className="w-6 h-6" />
              CRITICAL SAFETY ALERT
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeAlerts.filter(a => a.type === "critical").map(alert => (
                <div key={alert.id}>
                  <h4 className="font-semibold text-danger">{alert.title}</h4>
                  <p className="text-sm text-foreground">{alert.description}</p>
                  <p className="text-sm text-muted-foreground">Location: {alert.sector}</p>
                </div>
              ))}
              <div className="flex gap-2">
                <Button className="bg-danger text-danger-foreground hover:bg-danger/90">
                  <Phone className="w-4 h-4 mr-2" />
                  Call Supervisor
                </Button>
                <Button variant="outline">
                  <MapPin className="w-4 h-4 mr-2" />
                  View Evacuation Route
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Alert List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-mining" />
            Alert History - {userRole === "admin" ? "All Sectors" : userRole === "sector" ? "Your Sector" : "Safety Alerts"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredAlerts.map((alert, index) => (
              <div key={alert.id}>
                <div className="flex items-start justify-between space-x-4">
                  <div className="flex items-start space-x-3">
                    {getAlertIcon(alert.type)}
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-foreground">{alert.title}</h4>
                        {getAlertBadge(alert.type, alert.status)}
                      </div>
                      <p className="text-sm text-muted-foreground">{alert.description}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {alert.sector}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {alert.timestamp}
                        </div>
                        {alert.affectedWorkers && (userRole === "admin" || userRole === "sector") && (
                          <div className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            {alert.affectedWorkers} workers
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {(userRole === "admin" || userRole === "sector") && alert.status === "active" && (
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Acknowledge
                      </Button>
                      <Button size="sm">
                        Resolve
                      </Button>
                    </div>
                  )}
                </div>
                {index < filteredAlerts.length - 1 && <Separator className="mt-4" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};