import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Shield, 
  Link, 
  CheckCircle, 
  Clock, 
  Hash,
  FileCheck,
  Download
} from "lucide-react";

interface BlockchainRecord {
  id: string;
  transactionHash: string;
  blockNumber: number;
  alertId: string;
  alertType: "critical" | "warning" | "info";
  alertTitle: string;
  timestamp: string;
  sector: string;
  gasUsed: string;
  status: "confirmed" | "pending";
  smartContractAddress: string;
}

export const BlockchainLogger = () => {
  const [records] = useState<BlockchainRecord[]>([
    {
      id: "1",
      transactionHash: "0x1a2b3c4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890",
      blockNumber: 18745632,
      alertId: "ALT-001",
      alertType: "critical",
      alertTitle: "High Risk Rockfall Prediction",
      timestamp: "2024-01-10 14:30:00",
      sector: "Sector C",
      gasUsed: "21,000",
      status: "confirmed",
      smartContractAddress: "0x742d35Cc8C4354c31E5c1d8b6dD8dE4C6aA77821"
    },
    {
      id: "2",
      transactionHash: "0x2b3c4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890ab",
      blockNumber: 18745631,
      alertId: "ALT-002",
      alertType: "warning",
      alertTitle: "Increased Vibration Detected",
      timestamp: "2024-01-10 13:45:00",
      sector: "Sector B",
      gasUsed: "18,500",
      status: "confirmed",
      smartContractAddress: "0x742d35Cc8C4354c31E5c1d8b6dD8dE4C6aA77821"
    },
    {
      id: "3",
      transactionHash: "0x3c4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890abcd",
      blockNumber: 18745630,
      alertId: "ALT-003",
      alertType: "info",
      alertTitle: "Weather Alert",
      timestamp: "2024-01-10 12:15:00",
      sector: "All Sectors",
      gasUsed: "19,200",
      status: "pending",
      smartContractAddress: "0x742d35Cc8C4354c31E5c1d8b6dD8dE4C6aA77821"
    }
  ]);

  const [networkStats] = useState({
    totalRecords: 247,
    confirmedRecords: 245,
    pendingRecords: 2,
    networkName: "Polygon Testnet",
    avgConfirmationTime: "2.3s",
    totalGasUsed: "4,758,920"
  });

  const getStatusBadge = (status: string) => {
    return status === "confirmed" 
      ? <Badge className="bg-safe text-safe-foreground">Confirmed</Badge>
      : <Badge className="bg-caution text-caution-foreground">Pending</Badge>;
  };

  const getAlertTypeBadge = (type: string) => {
    switch (type) {
      case "critical":
        return <Badge className="bg-danger text-danger-foreground">Critical</Badge>;
      case "warning":
        return <Badge className="bg-caution text-caution-foreground">Warning</Badge>;
      default:
        return <Badge variant="outline">Info</Badge>;
    }
  };

  const truncateHash = (hash: string) => {
    return `${hash.substring(0, 8)}...${hash.substring(hash.length - 8)}`;
  };

  return (
    <div className="space-y-6">
      {/* Blockchain Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Total Records</p>
                <p className="text-2xl font-bold text-mining">{networkStats.totalRecords}</p>
              </div>
              <FileCheck className="w-8 h-8 text-mining" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-safe/10 border-safe/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Confirmed</p>
                <p className="text-2xl font-bold text-safe">{networkStats.confirmedRecords}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-safe" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-caution/10 border-caution/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Pending</p>
                <p className="text-2xl font-bold text-caution">{networkStats.pendingRecords}</p>
              </div>
              <Clock className="w-8 h-8 text-caution" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Avg Confirmation</p>
                <p className="text-2xl font-bold text-mining">{networkStats.avgConfirmationTime}</p>
              </div>
              <Shield className="w-8 h-8 text-mining" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Network Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Link className="w-5 h-5 text-mining" />
            Blockchain Network Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Network:</span>
                <span className="font-medium">{networkStats.networkName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Smart Contract:</span>
                <span className="font-mono text-xs">0x742d35...7821</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Gas Used:</span>
                <span className="font-medium">{networkStats.totalGasUsed}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Data Integrity:</span>
                <Badge className="bg-safe text-safe-foreground">100% Verified</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Blockchain Records */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Hash className="w-5 h-5 text-mining" />
              Immutable Alert Records
            </CardTitle>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export Records
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {records.map((record, index) => (
              <div key={record.id}>
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-foreground">{record.alertTitle}</h4>
                        {getAlertTypeBadge(record.alertType)}
                        {getStatusBadge(record.status)}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Alert ID: {record.alertId} • Sector: {record.sector}
                      </p>
                    </div>
                    <div className="text-right text-sm text-muted-foreground">
                      <p>Block #{record.blockNumber.toLocaleString()}</p>
                      <p>{record.timestamp}</p>
                    </div>
                  </div>

                  <div className="bg-muted rounded-lg p-3 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Transaction Hash:</span>
                      <span className="font-mono text-xs">{truncateHash(record.transactionHash)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Gas Used:</span>
                      <span>{record.gasUsed}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Contract Address:</span>
                      <span className="font-mono text-xs">{truncateHash(record.smartContractAddress)}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Link className="w-4 h-4 mr-2" />
                      View on Explorer
                    </Button>
                    <Button variant="outline" size="sm">
                      <FileCheck className="w-4 h-4 mr-2" />
                      Verify Integrity
                    </Button>
                  </div>
                </div>
                {index < records.length - 1 && <Separator className="mt-4" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Smart Contract Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-mining" />
            Smart Contract Security Features
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-safe" />
                <span>Immutable alert logging</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-safe" />
                <span>Tamper-proof timestamps</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-safe" />
                <span>Multi-signature validation</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-safe" />
                <span>Automated compliance reporting</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-safe" />
                <span>Decentralized verification</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-safe" />
                <span>Audit trail transparency</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};