import { HttpAgent } from "@dfinity/agent";
import { Principal } from "@dfinity/principal";
import { Ed25519KeyIdentity } from "@dfinity/identity";

// Import the generated actor factories and IDL
import { createActor as createNuruBackendActor } from "../../../declarations/nuru_backend";
import { createActor as createBitcoinActor } from "../../../declarations/canister_two";
import { createActor as createGovernanceActor } from "../../../declarations/canister_three";
import { createActor as createYieldActor } from "../../../declarations/canister_four";

// Import canister IDs
import { canisterId as nuruBackendCanisterId } from "../../../declarations/nuru_backend";
import { canisterId as bitcoinCanisterId } from "../../../declarations/canister_two";
import { canisterId as governanceCanisterId } from "../../../declarations/canister_three";
import { canisterId as yieldCanisterId } from "../../../declarations/canister_four";

// Import types from generated declarations
import type { User, SavingsPool, Investment } from "../../../declarations/nuru_backend/nuru_backend.did";
import type { Proposal } from "../../../declarations/canister_three/canister_three.did";
import type { YieldStrategy, UserPosition } from "../../../declarations/canister_four/canister_four.did";
import type { Wallet } from "../../../declarations/canister_two/canister_two.did";

// Define the host based on environment - force local development for now
const isDevelopment = import.meta.env.DEV || import.meta.env.DFX_NETWORK === "local" || !import.meta.env.DFX_NETWORK;
const HOST = isDevelopment ? "http://localhost:4943" : "https://ic0.app";

console.log("🔧 Backend Configuration:", {
  isDevelopment,
  HOST,
  DFX_NETWORK: import.meta.env.DFX_NETWORK,
  DEV: import.meta.env.DEV,
  CANISTER_ID_NURU_BACKEND: import.meta.env.CANISTER_ID_NURU_BACKEND
});

// Create a development identity for consistent caller principal
const mockIdentity = Ed25519KeyIdentity.generate(); // This will create a consistent identity
console.log("🔑 Mock Identity Principal:", mockIdentity.getPrincipal().toString());

// Export the identity for use in AuthComponent
export { mockIdentity };

// Create HTTP agent with identity
const agent = new HttpAgent({ 
  host: HOST,
  identity: mockIdentity
});

// Only fetch root key when in development
if (isDevelopment) {
  agent.fetchRootKey().catch(err => {
    console.warn("Unable to fetch root key. Check to ensure that your local replica is running");
    console.error(err);
  });
}

console.log("🎯 Canister IDs:", {
  nuruBackendCanisterId,
  bitcoinCanisterId,
  governanceCanisterId,
  yieldCanisterId
});

// Create actor instances
export const nuruBackendActor = createNuruBackendActor(nuruBackendCanisterId, { agent });
export const bitcoinActor = createBitcoinActor(bitcoinCanisterId, { agent });
export const governanceActor = createGovernanceActor(governanceCanisterId, { agent });
export const yieldActor = createYieldActor(yieldCanisterId, { agent });

// Export canister IDs for reference
export {
  nuruBackendCanisterId,
  bitcoinCanisterId,
  governanceCanisterId,
  yieldCanisterId
};

// Helper functions for common backend operations
export const backendService = {
  // Main backend operations
  async getUserProfile(): Promise<User | null> {
    try {
      console.log("🔍 Backend service: Calling getUserProfile...");
      console.log("🔍 Using actor:", nuruBackendActor);
      
      const result = await nuruBackendActor.getUserProfile();
      console.log("🔍 Backend service: getUserProfile result:", result);
      
      if ('ok' in result) {
        console.log("✅ User profile found:", result.ok);
        return result.ok;
      }
      console.log("❌ No user profile found");
      return null;
    } catch (error) {
      console.error("❌ Error fetching user profile:", error);
      return null;
    }
  },

  async registerUser(): Promise<boolean> {
    try {
      console.log("🔧 Backend service: Calling registerUser...");
      console.log("🔧 Using actor:", nuruBackendActor);
      
      const result = await nuruBackendActor.registerUser();
      console.log("🔧 Backend service: registerUser result:", result);
      
      const success = 'ok' in result;
      console.log(success ? "✅ Registration successful" : "❌ Registration failed");
      return success;
    } catch (error) {
      console.error("❌ Error registering user:", error);
      return false;
    }
  },

  // Savings operations
  async getAllActivePools(): Promise<SavingsPool[]> {
    try {
      const result = await nuruBackendActor.getAllActivePools();
      return result;
    } catch (error) {
      console.error("Error fetching active pools:", error);
      return [];
    }
  },

  async createSavingsPool(name: string, targetAmount: number, deadline: bigint, poolType: 'individual' | 'group'): Promise<bigint | null> {
    try {
      console.log("Backend service: Creating pool with params:", { name, targetAmount, deadline, poolType });
      
      const poolTypeValue = poolType === 'individual' ? { individual: null } : { group: null };
      // Convert targetAmount to Float and deadline to Time.Time (Int)
      const targetAmountFloat = parseFloat(targetAmount.toString());
      const deadlineInt = BigInt(Date.now() + Number(deadline) * 24 * 60 * 60 * 1000); // Convert days to milliseconds from now
      
      console.log("Backend service: Converted params:", { 
        name, 
        targetAmountFloat, 
        deadlineInt: deadlineInt.toString(), 
        poolTypeValue 
      });
      
      const result = await nuruBackendActor.createSavingsPool(name, targetAmountFloat, deadlineInt, poolTypeValue);
      console.log("Backend service: createSavingsPool result:", result);
      
      if ('ok' in result) {
        return result.ok;
      }
      return null;
    } catch (error) {
      console.error("Error creating savings pool:", error);
      return null;
    }
  },

  async joinPool(poolId: bigint): Promise<boolean> {
    try {
      const result = await nuruBackendActor.joinPool(poolId);
      return 'ok' in result;
    } catch (error) {
      console.error("Error joining pool:", error);
      return false;
    }
  },

  async depositToPool(poolId: bigint, amount: number): Promise<boolean> {
    try {
      const result = await nuruBackendActor.depositToPool(poolId, amount);
      return 'ok' in result;
    } catch (error) {
      console.error("Error depositing to pool:", error);
      return false;
    }
  },

  async getUserInvestments(userId: Principal): Promise<Investment[]> {
    try {
      const result = await nuruBackendActor.getUserInvestments(userId);
      return result;
    } catch (error) {
      console.error("Error fetching user investments:", error);
      return [];
    }
  },

  async startInvestment(amount: number, duration: bigint): Promise<boolean> {
    try {
      const result = await nuruBackendActor.startInvestment(amount, duration);
      return 'ok' in result;
    } catch (error) {
      console.error("Error starting investment:", error);
      return false;
    }
  },

  async calculateReturns(): Promise<number> {
    try {
      const result = await nuruBackendActor.calculateReturns();
      return result;
    } catch (error) {
      console.error("Error calculating returns:", error);
      return 0;
    }
  },

  // Bitcoin operations
  async getWalletInfo(): Promise<Wallet | null> {
    try {
      const result = await bitcoinActor.getWalletInfo();
      if ('ok' in result) {
        return result.ok;
      }
      return null;
    } catch (error) {
      console.error("Error fetching wallet info:", error);
      return null;
    }
  },

  async getBalance(): Promise<number> {
    try {
      const result = await bitcoinActor.getBalance();
      if ('ok' in result) {
        return Number(result.ok) / 100000000; // Convert from satoshis to BTC
      }
      return 0;
    } catch (error) {
      console.error("Error fetching balance:", error);
      return 0;
    }
  },

  async createWallet(): Promise<string | null> {
    try {
      const result = await bitcoinActor.createWallet();
      if ('ok' in result) {
        return result.ok;
      }
      return null;
    } catch (error) {
      console.error("Error creating wallet:", error);
      return null;
    }
  },

  async transferToSavings(amount: bigint, poolId: bigint): Promise<boolean> {
    try {
      const result = await bitcoinActor.transferToSavings(amount, poolId);
      return 'ok' in result;
    } catch (error) {
      console.error("Error transferring to savings:", error);
      return false;
    }
  },

  async simulateDeposit(amount: bigint): Promise<boolean> {
    try {
      const result = await bitcoinActor.simulateDeposit(amount);
      return 'ok' in result;
    } catch (error) {
      console.error("Error simulating deposit:", error);
      return false;
    }
  },

  // Governance operations
  async getActiveProposals(): Promise<Proposal[]> {
    try {
      const result = await governanceActor.getActiveProposals();
      return result;
    } catch (error) {
      console.error("Error fetching active proposals:", error);
      return [];
    }
  },

  async getProposal(proposalId: bigint): Promise<Proposal | null> {
    try {
      const result = await governanceActor.getProposal(proposalId);
      if ('ok' in result) {
        return result.ok;
      }
      return null;
    } catch (error) {
      console.error("Error fetching proposal:", error);
      return null;
    }
  },

  async vote(proposalId: bigint, support: boolean): Promise<boolean> {
    try {
      const voteType = support ? { for: null } : { against: null };
      const result = await governanceActor.vote(proposalId, voteType);
      return 'ok' in result;
    } catch (error) {
      console.error("Error voting:", error);
      return false;
    }
  },

  async createProposal(title: string, description: string, proposalType: 'newFeature' | 'parameterChange' | 'treasurySpend'): Promise<boolean> {
    try {
      const typeValue = proposalType === 'newFeature' ? { newFeature: null } : 
                       proposalType === 'parameterChange' ? { parameterChange: null } : 
                       { treasurySpend: null };
      const result = await governanceActor.createProposal(title, description, typeValue);
      return 'ok' in result;
    } catch (error) {
      console.error("Error creating proposal:", error);
      return false;
    }
  },

  // Yield operations
  async getAvailableStrategies(): Promise<YieldStrategy[]> {
    try {
      const result = await yieldActor.getAvailableStrategies();
      return result;
    } catch (error) {
      console.error("Error fetching yield strategies:", error);
      return [];
    }
  },

  async enterPosition(strategyId: string, amount: number): Promise<boolean> {
    try {
      const result = await yieldActor.enterPosition(strategyId, amount);
      return 'ok' in result;
    } catch (error) {
      console.error("Error entering position:", error);
      return false;
    }
  },

  async getUserPositions(): Promise<UserPosition[]> {
    try {
      const result = await yieldActor.getUserPositions();
      return result;
    } catch (error) {
      console.error("Error fetching user positions:", error);
      return [];
    }
  },

  async calculateCurrentYield(): Promise<number> {
    try {
      const result = await yieldActor.calculateCurrentYield();
      if ('ok' in result) {
        return result.ok;
      }
      return 0;
    } catch (error) {
      console.error("Error calculating current yield:", error);
      return 0;
    }
  },

  async claimYields(): Promise<number> {
    try {
      const result = await yieldActor.claimYields();
      if ('ok' in result) {
        return result.ok;
      }
      return 0;
    } catch (error) {
      console.error("Error claiming yields:", error);
      return 0;
    }
  },

  async projectReturns(amount: number, strategyId: string, duration: bigint): Promise<number> {
    try {
      const result = await yieldActor.projectReturns(amount, strategyId, duration);
      if ('ok' in result) {
        return result.ok;
      }
      return 0;
    } catch (error) {
      console.error("Error projecting returns:", error);
      return 0;
    }
  },

  async getStrategyPerformance(strategyId: string): Promise<number> {
    try {
      const result = await yieldActor.getStrategyPerformance(strategyId);
      if ('ok' in result) {
        return result.ok;
      }
      return 0;
    } catch (error) {
      console.error("Error getting strategy performance:", error);
      return 0;
    }
  }
};
