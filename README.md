# Nuru Finance – Decentralized Savings, Lending & Investing on ICP

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![DFX](https://img.shields.io/badge/dfx-0.15.0+-green.svg)](https://internetcomputer.org/)
[![Motoko](https://img.shields.io/badge/motoko-latest-orange.svg)](https://motoko.dev/)
[![TypeScript](https://img.shields.io/badge/typescript-5.1+-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/react-18.2+-61DAFB.svg)](https://reactjs.org/)

##  Overview
**Nuru** is a decentralized platform that empowers users to **save, lend, and invest Bitcoin** either individually or in groups using the **Internet Computer Protocol (ICP)**. Key capabilities include:

- Solo and group Bitcoin savings with multisig support  
- Peer-to-peer lending and borrowing  
- Dynamic DeFi yields with up to 15%+ APY  
- Integrated KYC and decentralized governance  
- Future-ready with multi-currency and fiat ramp support

---

##  Key Features

- **Solo & Group Savings:** Create personal goals or group pools using multisig logic.
- **Bitcoin DeFi Integration:** Leverages ckBTC for direct, native Bitcoin functionality.
- **Dynamic Yields:** Offers APYs from 4.5% to 15%+ through HODLing, staking, lending.
- **KYC System:** Modular user verification using HTTPS outcalls.
- **Governance & DAO:** Token-weighted proposals and voting on platform upgrades.
- **Multi-Currency Support:** Roadmap includes fiat on/off ramps and stablecoins.
- - **Internet Identity**: Secure authentication using ICP's Internet Identity.
- **Modern UI**: Responsive React frontend with Tailwind CSS and Radix UI components.

##  Architecture

Nuru Finance is built as a multi-canister application on the Internet Computer:

```
├── nuru_backend (main.mo)          # Core business logic and user management
├── canister_two (bitcoin.mo)       # Bitcoin integration and wallet management
├── canister_three (governancekyc.mo) # Governance voting and KYC verification
├── canister_four (yieldmanager.mo)  # Yield farming and investment strategies
└── nuru_frontend                   # React TypeScript frontend application
```

##  Pitch-Deck
https://docs.google.com/presentation/d/1xqolEPvv72BphxwvgASr87t__41lDvw3BO9Mlh2QTqY/edit?usp=sharing


##  Quick Start

### Prerequisites

- **Node.js** ≥ 16.0.0
- **npm** ≥ 7.0.0
- **DFX** ≥ 0.15.0 ([Installation Guide](https://internetcomputer.org/docs/current/developer-docs/setup/install))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/CipherG7/Nuru_Finance.git
   cd Nuru_Finance
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the local Internet Computer replica**
   ```bash
   dfx start --background
   ```

4. **Deploy canisters and start development**
   ```bash
   # Deploy all canisters
   dfx deploy
   
   # Generate type declarations
   dfx generate
   
   # Start frontend development server
   npm start
   ```

5. **Access the application**
   - Frontend: `http://localhost:3000`
   - Candid UI: `http://localhost:4943/?canisterId={canister_id}`

##  Development

### Project Structure

```
nuru_finance/
├── dfx.json                    # DFX configuration
├── package.json               # Root package configuration
├── README.md                  # This file
├── tsconfig.json             # TypeScript configuration
├── src/
│   ├── declarations/         # Auto-generated type declarations
│   ├── nuru_backend/        # Motoko backend canisters
│   │   ├── main.mo          # Core savings and user management
│   │   ├── bitcoin.mo       # Bitcoin integration
│   │   ├── governancekyc.mo # Governance and KYC
│   │   └── yieldmanager.mo  # Yield farming logic
│   └── nuru_frontend/       # React frontend application
│       ├── src/
│       │   ├── components/  # Reusable UI components
│       │   ├── contexts/    # React contexts
│       │   ├── lib/         # Utility libraries
│       │   └── pages/       # Application pages
│       ├── public/          # Static assets
│       └── package.json     # Frontend dependencies
```

### Available Scripts

```bash
# Development
npm start              # Start frontend development server
npm run dev           # Alternative development command
npm run build         # Build production bundle
npm test              # Run test suite
npm run format        # Format code with Prettier

# DFX Commands
dfx start             # Start local IC replica
dfx deploy            # Deploy all canisters
dfx generate          # Generate type declarations
dfx canister call     # Interact with canisters
```

### Environment Setup

The project uses environment variables for configuration. Create a `.env` file in the root directory:

```env
DFX_NETWORK=local
CANISTER_ID_NURU_BACKEND=...
CANISTER_ID_NURU_FRONTEND=...
```

##  Testing

```bash
# Run all tests
npm test

# Run specific canister tests
dfx canister call nuru_backend test_function

# Frontend testing
cd src/nuru_frontend
npm test
```

## 🚀 Deployment

### Local Deployment

```bash
dfx start --background
dfx deploy
```

### Mainnet Deployment

```bash
dfx deploy --network ic
```

##  API Documentation

### Core Backend Functions

The main backend canister (`nuru_backend`) provides the following key functions:

- `createUser(btcAddress: ?Text)` - Register a new user
- `createSavingsPool(name: Text, targetAmount: Float, duration: Int)` - Create a savings pool
- `joinPool(poolId: Nat)` - Join an existing savings pool
- `depositToPool(poolId: Nat, amount: Float)` - Deposit funds to a pool
- `getUserProfile()` - Get current user's profile
- `getAllPools()` - List all available savings pools

For complete API documentation, see the Candid interface files in `src/declarations/`.

##  Contributing

We welcome contributions from the community! Please follow these guidelines:

### Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/Nuru_Finance.git
   cd Nuru_Finance
   ```
3. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

### Development Workflow

1. **Set up the development environment** following the [Quick Start](#quick-start) guide
2. **Make your changes** following our coding standards
3. **Test your changes** thoroughly:
   ```bash
   npm test
   dfx deploy
   ```
4. **Commit with conventional commits**:
   ```bash
   git commit -m "feat: add new savings pool feature"
   ```
5. **Push to your fork** and **create a Pull Request**

### Coding Standards

- **Motoko**: Follow [Motoko style guidelines](https://internetcomputer.org/docs/current/motoko/main/style)
- **TypeScript/React**: Use ESLint and Prettier configurations
- **Commits**: Use [Conventional Commits](https://www.conventionalcommits.org/)
- **Testing**: Write tests for new features and bug fixes

### Code Review Process

1. All changes must be made via Pull Requests
2. PRs require at least one approval from a maintainer
3. All CI checks must pass
4. Code coverage should not decrease

### Reporting Issues

Please use the [GitHub Issues](https://github.com/CipherG7/Nuru_Finance/issues) tracker to:

- Report bugs (use the bug report template)
- Request features (use the feature request template)
- Ask questions (use the question template)

### Development Guidelines

- **Branch naming**: `feature/description`, `bugfix/description`, `hotfix/description`
- **PR titles**: Follow conventional commit format
- **Documentation**: Update documentation for new features
- **Testing**: Maintain or improve test coverage

##  License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

##  Links

- **Internet Computer**: [internetcomputer.org](https://internetcomputer.org/)
- **Motoko Documentation**: [motoko.dev](https://motoko.dev/)
- **DFX SDK**: [SDK Documentation](https://internetcomputer.org/docs/current/developer-docs/setup/install)



- Built on the [Internet Computer Protocol](https://internetcomputer.org/)
- UI components from [Radix UI](https://www.radix-ui.com/)
- Styling with [Tailwind CSS](https://tailwindcss.com/)
- Icons from [Lucide React](https://lucide.dev/)

---
