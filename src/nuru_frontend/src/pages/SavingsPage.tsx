"use client"

import { useState } from "react"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Textarea } from "../components/ui/textarea"
import { Progress } from "../components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { Bitcoin, Users, Shield, Plus, Calendar, User } from "lucide-react"
import Link from "next/link"

// Mock data for existing pools
const mockActivePools = [
  {
    id: 1,
    name: "Emergency Fund Pool",
    creator: "alice.btc",
    currentAmount: 2.45,
    targetAmount: 5.0,
    members: 12,
    deadline: "2024-06-15",
    type: "group" as "individual" | "group",
    description: "Community emergency fund for unexpected expenses",
  },
  {
    id: 2,
    name: "Vacation Savings",
    creator: "bob.crypto",
    currentAmount: 1.23,
    targetAmount: 3.0,
    members: 8,
    deadline: "2024-07-01",
    type: "group" as "individual" | "group",
    description: "Save together for a group vacation",
  },
  {
    id: 3,
    name: "House Down Payment",
    creator: "charlie.hodl",
    currentAmount: 0.87,
    targetAmount: 2.0,
    members: 1,
    deadline: "2024-12-31",
    type: "individual" as "individual" | "group",
    description: "Personal savings for house down payment",
  },
]

export default function SavingsPage() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newPool, setNewPool] = useState({
    name: "",
    targetAmount: "",
    deadline: "",
    type: "group" as "individual" | "group",
    description: "",
  })

  const handleCreatePool = () => {
    // In real app, this would call your SavingsApp canister's createSavingsPool function
    console.log("Creating pool:", newPool)
    setIsCreateDialogOpen(false)
    setNewPool({
      name: "",
      targetAmount: "",
      deadline: "",
      type: "group",
      description: "",
    })
  }

  const handleJoinPool = (poolId: number) => {
    // In real app, this would call your SavingsApp canister's joinPool function
    console.log("Joining pool:", poolId)
  }

  const handleDepositToPool = (poolId: number, amount: string) => {
    // In real app, this would call your SavingsApp canister's depositToPool function
    console.log("Depositing to pool:", poolId, "amount:", amount)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 max-w-7xl mx-auto border-b border-gray-800">
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center">
    <img 
      src="/Nuru_logo.svg" 
      alt="Nuru_logo" 
      className="w-12 h-12 object-contain"
    />
  </div>
          <span className="text-white font-bold text-xl">Nuru Finance</span>
        </Link>
        <div className="flex items-center space-x-6">
          <Link href="/dashboard" className="text-gray-300 hover:text-white transition-colors">
            Dashboard
          </Link>
          <Link href="/yield" className="text-gray-300 hover:text-white transition-colors">
            Yield
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
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Savings Pools</h1>
            <p className="text-gray-400">Create or join savings pools to reach your financial goals together.</p>
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-orange-600 hover:bg-orange-700 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Create Pool
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-900 border-gray-800 text-white">
              <DialogHeader>
                <DialogTitle>Create New Savings Pool</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Pool Name</Label>
                  <Input
                    id="name"
                    value={newPool.name}
                    onChange={(e) => setNewPool({ ...newPool, name: e.target.value })}
                    placeholder="Enter pool name"
                    className="bg-gray-800 border-gray-700"
                  />
                </div>
                <div>
                  <Label htmlFor="target">Target Amount (BTC)</Label>
                  <Input
                    id="target"
                    type="number"
                    step="0.001"
                    value={newPool.targetAmount}
                    onChange={(e) => setNewPool({ ...newPool, targetAmount: e.target.value })}
                    placeholder="0.000"
                    className="bg-gray-800 border-gray-700"
                  />
                </div>
                <div>
                  <Label htmlFor="deadline">Deadline</Label>
                  <Input
                    id="deadline"
                    type="date"
                    value={newPool.deadline}
                    onChange={(e) => setNewPool({ ...newPool, deadline: e.target.value })}
                    className="bg-gray-800 border-gray-700"
                  />
                </div>
                <div>
                  <Label htmlFor="type">Pool Type</Label>
                  <Select
                    value={newPool.type}
                    onValueChange={(value: "individual" | "group") => setNewPool({ ...newPool, type: value })}
                  >
                    <SelectTrigger className="bg-gray-800 border-gray-700">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="individual">Individual</SelectItem>
                      <SelectItem value="group">Group</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newPool.description}
                    onChange={(e) => setNewPool({ ...newPool, description: e.target.value })}
                    placeholder="Describe your savings goal..."
                    className="bg-gray-800 border-gray-700"
                  />
                </div>
                <Button onClick={handleCreatePool} className="w-full bg-orange-600 hover:bg-orange-700">
                  Create Pool
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gray-900/50 border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Pools</p>
                  <p className="text-2xl font-bold text-white">{mockActivePools.length}</p>
                </div>
                <div className="w-12 h-12 bg-orange-600/20 rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-orange-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Saved</p>
                  <p className="text-2xl font-bold text-white">
                    ₿{mockActivePools.reduce((sum, pool) => sum + pool.currentAmount, 0).toFixed(3)}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center">
                  <Bitcoin className="w-6 h-6 text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Active Members</p>
                  <p className="text-2xl font-bold text-white">
                    {mockActivePools.reduce((sum, pool) => sum + pool.members, 0)}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pools Grid */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="bg-gray-900/50 border-gray-800 text-white">
            <TabsTrigger value="all" className="data-[state=active]:bg-orange-600">
              All Pools
            </TabsTrigger>
            <TabsTrigger value="group" className="data-[state=active]:bg-blue-600">
              Group Pools
            </TabsTrigger>
            <TabsTrigger value="individual" className="data-[state=active]:bg-purple-600">
              Individual Pools
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockActivePools.map((pool) => (
                <Card key={pool.id} className="bg-gray-900/50 border-gray-800 hover:border-gray-700 transition-colors">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-white text-lg">{pool.name}</CardTitle>
                      <Badge
                        className={
                          pool.type === "group" ? "bg-blue-900/50 text-blue-400" : "bg-purple-900/50 text-purple-400"
                        }
                      >
                        {pool.type}
                      </Badge>
                    </div>
                    <p className="text-gray-400 text-sm">{pool.description}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-400">Progress</span>
                        <span className="text-white">
                          ₿{pool.currentAmount} / ₿{pool.targetAmount}
                        </span>
                      </div>
                      <Progress value={(pool.currentAmount / pool.targetAmount) * 100} className="h-2" />
                      <p className="text-xs text-gray-500 mt-1">
                        {((pool.currentAmount / pool.targetAmount) * 100).toFixed(1)}% complete
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-1 text-gray-400">
                        <User className="w-4 h-4" />
                        <span>{pool.creator}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-gray-400">
                        <Users className="w-4 h-4" />
                        <span>{pool.members}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-1 text-gray-400 text-sm">
                      <Calendar className="w-4 h-4" />
                      <span>Due: {pool.deadline}</span>
                    </div>

                    <div className="flex space-x-2">
                      {pool.type === "group" && (
                        <Button
                          onClick={() => handleJoinPool(pool.id)}
                          className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-800"
                        >
                          Join Pool
                        </Button>
                      )}
                      <Button
                        onClick={() => handleDepositToPool(pool.id, "0.01")}
                        className="flex-1 bg-orange-600 hover:bg-orange-700"
                      >
                        Deposit
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="group">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockActivePools
                .filter((pool) => pool.type === "group")
                .map((pool) => (
                  <Card
                    key={pool.id}
                    className="bg-gray-900/50 border-gray-800 hover:border-gray-700 transition-colors"
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-white text-lg">{pool.name}</CardTitle>
                        <Badge className="bg-blue-900/50 text-blue-400">
                          group
                        </Badge>
                      </div>
                      <p className="text-gray-400 text-sm">{pool.description}</p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-400">Progress</span>
                          <span className="text-white">
                            ₿{pool.currentAmount} / ₿{pool.targetAmount}
                          </span>
                        </div>
                        <Progress value={(pool.currentAmount / pool.targetAmount) * 100} className="h-2" />
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-1 text-gray-400">
                          <User className="w-4 h-4" />
                          <span>{pool.creator}</span>
                        </div>
                        <div className="flex items-center space-x-1 text-gray-400">
                          <Users className="w-4 h-4" />
                          <span>{pool.members}</span>
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <Button
                          onClick={() => handleJoinPool(pool.id)}
                          className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-800"
                        >
                          Join Pool
                        </Button>
                        <Button
                          onClick={() => handleDepositToPool(pool.id, "0.01")}
                          className="flex-1 bg-orange-600 hover:bg-orange-700"
                        >
                          Deposit
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="individual">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockActivePools
                .filter((pool) => pool.type === "individual")
                .map((pool) => (
                  <Card
                    key={pool.id}
                    className="bg-gray-900/50 border-gray-800 hover:border-gray-700 transition-colors"
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-white text-lg">{pool.name}</CardTitle>
                        <Badge className="bg-purple-900/50 text-purple-400">
                          individual
                        </Badge>
                      </div>
                      <p className="text-gray-400 text-sm">{pool.description}</p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-400">Progress</span>
                          <span className="text-white">
                            ₿{pool.currentAmount} / ₿{pool.targetAmount}
                          </span>
                        </div>
                        <Progress value={(pool.currentAmount / pool.targetAmount) * 100} className="h-2" />
                      </div>

                      <div className="flex items-center space-x-1 text-gray-400 text-sm">
                        <User className="w-4 h-4" />
                        <span>{pool.creator}</span>
                      </div>

                      <Button
                        onClick={() => handleDepositToPool(pool.id, "0.01")}
                        className="w-full bg-orange-600 hover:bg-orange-700"
                      >
                        Deposit
                      </Button>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
