import { useState } from "react";
import { Principal } from "@dfinity/principal";
import { Button } from "./ui/button";
import { useApp } from "../contexts/AppContext";

// For demo purposes, we'll use a simple mock authentication
// In a real app, you'd integrate with Internet Identity or another auth provider
export const AuthComponent: React.FC = () => {
  const { user, login, logout, registerUser, isLoading } = useApp();
  const [showCreateUser, setShowCreateUser] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const handleMockLogin = async () => {
    // For demo purposes, create a mock principal
    // In a real app, this would come from Internet Identity
    const mockPrincipal = Principal.fromText("rdmx6-jaaaa-aaaah-qcaiq-cai");
    
    try {
      const userIsRegistered = await login(mockPrincipal);
      
      // If user is not registered, automatically register them
      if (!userIsRegistered) {
        console.log("User not registered, auto-registering...");
        const registrationSuccess = await registerUser();
        if (registrationSuccess) {
          console.log("User automatically registered successfully!");
        } else {
          console.error("Failed to auto-register user");
          setShowCreateUser(true); // Fallback to manual registration
        }
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleCreateUser = async () => {
    if (!username.trim()) return;
    
    const success = await registerUser();
    if (success) {
      setShowCreateUser(false);
      setUsername("");
      setEmail("");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center space-x-2">
        <div className="animate-spin h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full"></div>
        <span className="text-gray-300">Loading...</span>
      </div>
    );
  }

  if (!user.isAuthenticated) {
    return (
      <Button onClick={handleMockLogin} className="bg-blue-600 hover:bg-blue-700">
        Connect Wallet
      </Button>
    );
  }

  if (showCreateUser) {
    return (
      <div className="bg-gray-800 p-4 rounded-lg space-y-4">
        <h3 className="text-white font-semibold">Create Your Profile</h3>
        <div className="space-y-2">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
          />
          <input
            type="email"
            placeholder="Email (optional)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
          />
        </div>
        <div className="flex space-x-2">
          <Button 
            onClick={handleCreateUser} 
            disabled={!username.trim() || isLoading}
            className="bg-green-600 hover:bg-green-700"
          >
            Create Profile
          </Button>
          <Button 
            onClick={() => setShowCreateUser(false)}
            variant="outline"
          >
            Cancel
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-4">
      <div className="text-white">
        <div className="font-semibold">Connected User</div>
        <div className="text-sm text-gray-300">
          Balance: {user.bitcoinBalance.toFixed(8)} BTC
        </div>
      </div>
      <Button onClick={logout} variant="outline" size="sm">
        Disconnect
      </Button>
    </div>
  );
};
