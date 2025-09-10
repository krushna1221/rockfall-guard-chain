import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Shield, 
  AlertTriangle, 
  Users, 
  Activity 
} from "lucide-react";

export const StatsCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="bg-safe/10 border-safe/20">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-foreground">Safe Zones</CardTitle>
          <Shield className="h-4 w-4 text-safe" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-safe">7</div>
          <p className="text-xs text-muted-foreground">
            Areas with low risk probability
          </p>
        </CardContent>
      </Card>

      <Card className="bg-caution/10 border-caution/20">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-foreground">Caution Zones</CardTitle>
          <AlertTriangle className="h-4 w-4 text-caution" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-caution">3</div>
          <p className="text-xs text-muted-foreground">
            Areas requiring monitoring
          </p>
        </CardContent>
      </Card>

      <Card className="bg-danger/10 border-danger/20">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-foreground">High Risk Zones</CardTitle>
          <AlertTriangle className="h-4 w-4 text-danger" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-danger">1</div>
          <p className="text-xs text-muted-foreground">
            Areas with evacuation recommended
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-foreground">Active Workers</CardTitle>
          <Users className="h-4 w-4 text-mining" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-mining">142</div>
          <p className="text-xs text-muted-foreground">
            Currently on site
          </p>
        </CardContent>
      </Card>
    </div>
  );
};