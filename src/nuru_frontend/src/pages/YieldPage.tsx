import { Link } from "react-router-dom";
"use client"

import { useState } from "react"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../components/ui/dialog"
import { Alert, AlertDescription } from "../components/ui/alert"
import {
  Bitcoin,
  TrendingUp,
  Shield,
  AlertTriangle,
  Zap,
  Plus,
  ArrowUpRight,
  Clock,
  Target,
  DollarSign,
  Info,
} from "lucide-react"

// Mock data based on your YieldManager canister
const mockStrategies = [
  {
    id: "btc_hodl",
    name: "Bitcoin HODL",
    baseApy: 4.5,
    currentApy: 4.8, // baseApy + market bonus
    riskLevel: "low" as "low" | "medium" | "high",
    minAmount: 0.001,
    isActive: true,
    description: "Low-risk Bitcoin holding strategy with steady returns",
    totalLocked: 12.45,
    participants: 234,
  },
  {
    id: "btc_lending",
    name: "Bitcoin Lending",
    baseApy: 7.2,
    currentApy: 8.1,
    riskLevel: "medium" as "low" | "medium" | "high",
    minAmount: 0.01,
    isActive: true,
    description: "Medium-risk lending strategy with competitive yields",
    totalLocked: 8.92,
    participants: 156,
  },
  {
    id: "defi_yield",
    name: "DeFi Yield Farming",
    baseApy: 12.8,
    currentApy: 15.3,
    riskLevel: "high" as "low" | "medium" | "high",
    minAmount: 0.1,
    isActive: true,
    description: "High-risk DeFi farming with maximum yield potential",
    totalLocked: 5.67,
    participants: 89,
  },
]

const mockUserPositions = [
  {
    userId: "user123",
    strategyId: "btc_hodl",
    amount: 0.05,
    entryTime: Date.now() - 30 * 24 * 60 * 60 * 1000, // 30 days ago
    currentYield: 0.00123,
    claimedYield: 0.00089,
    strategy: mockStrategies[0],
  },
  {
    userId: "user123",
    strategyId: "btc_lending",
    amount: 0.03,
    entryTime: Date.now() - 15 * 24 * 60 * 60 * 1000, // 15 days ago
    currentYield: 0.00089,
    claimedYield: 0.00034,
    strategy: mockStrategies[1],
  },
]

export default function YieldPage() {
  const [selectedStrategy, setSelectedStrategy] = useState<(typeof mockStrategies)[0] | null>(null)
  const [investAmount, setInvestAmount] = useState("")
  const [duration, setDuration] = useState("30")
  const [isInvestDialogOpen, setIsInvestDialogOpen] = useState(false)
  const [projectedReturns, setProjectedReturns] = useState<number | null>(null)

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low":
        return "text-green-400 bg-green-900/20 border-green-800"
      case "medium":
        return "text-yellow-400 bg-yellow-900/20 border-yellow-800"
      case "high":
        return "text-red-400 bg-red-900/20 border-red-800"
      default:
        return "text-gray-400 bg-gray-900/20 border-gray-800"
    }
  }

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case "low":
        return <Shield className="w-4 h-4" />
      case "medium":
        return <AlertTriangle className="w-4 h-4" />
      case "high":
        return <Zap className="w-4 h-4" />
      default:
        return <Shield className="w-4 h-4" />
    }
  }

  const handleEnterPosition = () => {
    if (!selectedStrategy || !investAmount) return

    // In real app, this would call your YieldManager canister's enterPosition function
    console.log("Entering position:", {
      strategyId: selectedStrategy.id,
      amount: Number.parseFloat(investAmount),
    })

    setIsInvestDialogOpen(false)
    setSelectedStrategy(null)
    setInvestAmount("")
    setDuration("30")
  }

  const handleClaimYields = (strategyId: string) => {
    // In real app, this would call your YieldManager canister's claimYields function
    console.log("Claiming yields for strategy:", strategyId)
  }

  const calculateProjectedReturns = () => {
    if (!selectedStrategy || !investAmount || !duration) return

    // Simulate the projectReturns function from your canister
    const amount = Number.parseFloat(investAmount)
    const days = Number.parseInt(duration)
    const apy = selectedStrategy.currentApy / 100
    const dailyRate = apy / 365
    const compoundFactor = Math.pow(1 + dailyRate, days)
    const finalAmount = amount * compoundFactor
    const profit = finalAmount - amount

    setProjectedReturns(profit)
  }

  const formatTimeAgo = (timestamp: number) => {
    const days = Math.floor((Date.now() - timestamp) / (24 * 60 * 60 * 1000))
    return `${days} days ago`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 max-w-7xl mx-auto border-b border-gray-800">
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-yellow-400 rounded-lg flex items-center justify-center">
            <Bitcoin className="w-5 h-5 text-white" />
          </div>
          <span className="text-white font-bold text-xl">Nuru Finance</span>
        </Link>
        <div className="flex items-center space-x-6">
          <Link href="/dashboard" className="text-gray-300 hover:text-white transition-colors">
            Dashboard
          </Link>
          <Link href="/savings" className="text-gray-300 hover:text-white transition-colors">
            Savings
          </Link>
          <Link href="/governance" className="text-gray-300 hover:text-white transition-colors">
            Governance
          </Link>
          <Link href="/wallet" className="text-gray-300 hover:text-white transition-colors">
            Wallet
          </Link>
          <Button className="bg-green-600 hover:bg-green-700 text-white">Connected</Button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Yield Strategies</h1>
          <p className="text-gray-400">Maximize your Bitcoin returns with our diversified yield farming strategies.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gray-900/50 border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Invested</p>
                  <p className="text-2xl font-bold text-white">
                    ₿{mockUserPositions.reduce((sum, pos) => sum + pos.amount, 0).toFixed(3)}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Current Yield</p>
                  <p className="text-2xl font-bold text-white">
                    ₿{mockUserPositions.reduce((sum, pos) => sum + pos.currentYield, 0).toFixed(5)}
                  </p>
                </div>
                <div className="w-12 h-12 bg-orange-600/20 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-orange-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Claimed Yield</p>
                  <p className="text-2xl font-bold text-white">
                    ₿{mockUserPositions.reduce((sum, pos) => sum + pos.claimedYield, 0).toFixed(5)}
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center">
                  <Target className="w-6 h-6 text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Avg APY</p>
                  <p className="text-2xl font-bold text-white">
                    {mockUserPositions.length > 0
                      ? (
                          mockUserPositions.reduce((sum, pos) => sum + pos.strategy.currentApy, 0) /
                          mockUserPositions.length
                        ).toFixed(1)
                      : "0.0"}
                    %
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center">
                  <ArrowUpRight className="w-6 h-6 text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="strategies" className="space-y-6">
          <TabsList className="bg-gray-900/50 border-gray-800">
            <TabsTrigger value="strategies" className="data-[state=active]:bg-green-600">
              Available Strategies
            </TabsTrigger>
            <TabsTrigger value="positions" className="data-[state=active]:bg-orange-600">
              My Positions
            </TabsTrigger>
          </TabsList>

          <TabsContent value="strategies" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockStrategies.map((strategy) => (
                <Card
                  key={strategy.id}
                  className="bg-gray-900/50 border-gray-800 hover:border-gray-700 transition-colors"
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-white text-lg">{strategy.name}</CardTitle>
                      <Badge className={getRiskColor(strategy.riskLevel)}>
                        {getRiskIcon(strategy.riskLevel)}
                        <span className="ml-1">{strategy.riskLevel}</span>
                      </Badge>
                    </div>
                    <p className="text-gray-400 text-sm">{strategy.description}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-gray-400 text-sm">Current APY</p>
                        <p className="text-2xl font-bold text-green-400">{strategy.currentApy}%</p>
                        <p className="text-xs text-gray-500">Base: {strategy.baseApy}%</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Min Amount</p>
                        <p className="text-white font-medium">₿{strategy.minAmount}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Total Locked</span>
                        <span className="text-white">₿{strategy.totalLocked}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Participants</span>
                        <span className="text-white">{strategy.participants}</span>
                      </div>
                    </div>

                    <Button
                      onClick={() => {
                        setSelectedStrategy(strategy)
                        setIsInvestDialogOpen(true)
                      }}
                      className="w-full bg-green-600 hover:bg-green-700"
                      disabled={!strategy.isActive}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Enter Position
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="positions" className="space-y-6">
            {mockUserPositions.length === 0 ? (
              <Card className="bg-gray-900/50 border-gray-800">
                <CardContent className="p-12 text-center">
                  <TrendingUp className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">No Active Positions</h3>
                  <p className="text-gray-400 mb-6">
                    Start earning yield by entering a position in one of our strategies.
                  </p>
                  <Button
                    onClick={() => {
                      // Switch to strategies tab
                      const strategiesTab = document.querySelector('[value="strategies"]') as HTMLElement
                      strategiesTab?.click()
                    }}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Browse Strategies
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mockUserPositions.map((position, index) => (
                  <Card key={index} className="bg-gray-900/50 border-gray-800">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-white text-lg">{position.strategy.name}</CardTitle>
                        <Badge className={getRiskColor(position.strategy.riskLevel)}>
                          {getRiskIcon(position.strategy.riskLevel)}
                          <span className="ml-1">{position.strategy.riskLevel}</span>
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-400 text-sm">
                        <Clock className="w-4 h-4" />
                        <span>Entered {formatTimeAgo(position.entryTime)}</span>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-gray-400 text-sm">Amount</p>
                          <p className="text-white font-medium">₿{position.amount}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">Current APY</p>
                          <p className="text-green-400 font-medium">{position.strategy.currentApy}%</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Current Yield</span>
                          <span className="text-green-400">₿{position.currentYield.toFixed(6)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Claimed Yield</span>
                          <span className="text-white">₿{position.claimedYield.toFixed(6)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Claimable</span>
                          <span className="text-orange-400">
                            ₿{(position.currentYield - position.claimedYield).toFixed(6)}
                          </span>
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <Button
                          onClick={() => handleClaimYields(position.strategyId)}
                          className="flex-1 bg-orange-600 hover:bg-orange-700"
                          disabled={position.currentYield <= position.claimedYield}
                        >
                          Claim Yield
                        </Button>
                        <Button
                          onClick={() => {
                            setSelectedStrategy(position.strategy)
                            setIsInvestDialogOpen(true)
                          }}
                          className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-800"
                        >
                          Add More
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Investment Dialog */}
        <Dialog open={isInvestDialogOpen} onOpenChange={setIsInvestDialogOpen}>
          <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-md">
            <DialogHeader>
              <DialogTitle>Enter Position: {selectedStrategy?.name}</DialogTitle>
            </DialogHeader>
            {selectedStrategy && (
              <div className="space-y-4">
                <Alert className="border-blue-800 bg-blue-900/20">
                  <Info className="h-4 w-4" />
                  <AlertDescription className="text-blue-300">
                    Current APY: {selectedStrategy.currentApy}% | Risk Level: {selectedStrategy.riskLevel}
                  </AlertDescription>
                </Alert>

                <div>
                  <Label htmlFor="amount">Investment Amount (BTC)</Label>
                  <Input
                    id="amount"
                    type="number"
                    step="0.001"
                    min={selectedStrategy.minAmount}
                    value={investAmount}
                    onChange={(e) => setInvestAmount(e.target.value)}
                    placeholder={`Min: ${selectedStrategy.minAmount} BTC`}
                    className="bg-gray-800 border-gray-700"
                  />
                  <p className="text-xs text-gray-500 mt-1">Minimum: ₿{selectedStrategy.minAmount}</p>
                </div>

                <div>
                  <Label htmlFor="duration">Duration (days)</Label>
                  <Input
                    id="duration"
                    type="number"
                    min="1"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="bg-gray-800 border-gray-700"
                  />
                </div>

                <Button
                  onClick={calculateProjectedReturns}
                  className="w-full border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
                  disabled={!investAmount || !duration}
                >
                  Calculate Projected Returns
                </Button>

                {projectedReturns !== null && (
                  <Alert className="border-green-800 bg-green-900/20">
                    <TrendingUp className="h-4 w-4" />
                    <AlertDescription className="text-green-300">
                      Projected profit after {duration} days: ₿{projectedReturns.toFixed(6)}
                    </AlertDescription>
                  </Alert>
                )}

                <div className="flex space-x-2">
                  <Button
                    onClick={() => setIsInvestDialogOpen(false)}
                    className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-800"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleEnterPosition}
                    className="flex-1 bg-green-600 hover:bg-green-700"
                    disabled={!investAmount || Number.parseFloat(investAmount) < selectedStrategy.minAmount}
                  >
                    Enter Position
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
