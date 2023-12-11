# Descent Library

Descent SDK is a Typescript library that makes it easy to build applications on top of Descent's multi-currency Stablecoin System. You can use Descent's contracts to open Collateralized Debt Positions, withdraw loans in xNGN, trade tokens on Onboard Exchange, and more.

The library features a pluggable, service-based architecture, which allows users maximal control when integrating the Descent protocol's functionality into existing infrastructures. It also includes convenient configuration presets for out-of-the-box usability, and support for both front-end and back-end applications.

Descent's entire suite of contracts will eventually be accessible through this library—including the DAO governance and the current alpha version is limited to the following areas:

- Managing Vault Positions
- Locking and unlocking collateral
- Withdrawing and repaying xNGN
- Automated token conversions
- Buying and selling $DSN and $xNGN with built-in DEX integration

TODO

- ✅ Improve presets and configuration settings
- ✅ Make configuration services oriented
- ✅ Perform getters using MultiStaticCall in the [protocol-periphery](<[https://github.com/Descent-Collective/protocol-periphery](https://github.com/Descent-Collective/protocol-periphery/blob/main/src/mutliStaticcall.sol)>) contract to interact with the VaultGetter contract
- ✅ Perform state change calls using the VaultRouter [protocol-periphery](<[https://github.com/Descent-Collective/protocol-periphery](https://github.com/Descent-Collective/protocol-periphery/blob/main/src/vaultRouter.sol)>) contract
- [ ] Enable listening of events for state changes
- [ ] Add functionality for automated token conversions (V2)
- [ ] Add functionality for buying and selling of $DSN and $xNGN in DEXs (V2)
- [ ] Add USD onramp and xNGN offramp functionalities (V2)

## Installation

Install the package with npm in your terminal:

```tsx
npm install @descent-protocol/sdk
```

Once it's installed, import the module into your project as shown below.

```tsx
import Descent from '@descent-protocol/sdk';
// or
const Descent = require('@descent-protocol/sdk');
```

### UMD

This library is also usable as a browser module

```html
<script src="./descent.js" />

<script>
  // once the script loads, window.Descent is available
</script>
```

Quick examples

### Look up information about a vault

This code uses getVaultInfo to look up a vault that was created in the Descent protocol UI. Since this code is only reading data, not creating any transactions, it is not necessary to provide a private key or connect a wallet.

```tsx
// you provide these values
const infuraKey = 'your-infura-api-key';
const ownerAddress = '0xf00...';

const descent = await Descent.create('https', {
  url: `https://mainnet.infura.io/v3/${infuraKey}`
  collateral: 'USDC'
});

const vaultInfo = descent.getVaultInfo(ownerAddress);
```

```tsx
console.log(
  vault.depositedCollateral, // amount of collateral tokens deposited
  vault.collateralLocked, // amount of collateral locked in the system
  vault.borrowedAmount, // amount of currency(xNGN) debt
  vault.accruedFees, // amount of fees accrued by the vault
  vault.currentCollateralRatio, // collateralValue  to debt ratio
  vault.healthFactor, // vaults health factor to determine liquidatable status
  vault.availableCollateral, // amount of collateral in the system available
  vault.availablexNGN, // amount of xNGN in the system ready to be minted
  vault.currentRate, // current accumulated rate of vault
);
```

## Descent.create

You can configure the behavior of descent.js by passing different arguments to Descent.create. The first argument is the name of a preset, and the second is an options object.

### Presets

- `'browser'`
  Use this preset when using the library in a browser environment. It will attempt to connect using window.ethereum or window.web3. Make sure you pass in the connected browser provider instance

- `'https'`
  Connect to a JSON-RPC node. Requires url to be set in the options.

```tsx
const descentBrowser = await Descent.create('browser');

const descentHttp = await Descent.create('httpsRA_PROJECT_ID'
});

```

### Options

- `privateKey`
  - Optional. The private key used to sign transactions. If this is omitted, the first account available from the Ethereum provider will be used. Only used with the 'https' preset.
  - If this is omitted and the provider does not have an unlocked account, the descent object will start in read-only mode.
- `url`

  - The URL of the node to connect to. Only used with the 'http' preset.

- `ethereum`
  - For advanced users. You can inject your own custom instance of a Web3 provider with this, instead of using the default HttpProvider.

```tsx
// It doesn't necessarily make sense to set all these
// options at the same time (e.g. `url` and `inject`),
// this is just meant to illustrate the shape of the
// options object.
const descent = await Descent.create('https', {
  privateKey: YOUR_PRIVATE_KEY, // '0xabc...'
  url: 'http://some-ethereum-rpc-node.net',
  ethereum: someProviderInstance
  },
});
```

## API Reference

1. [Methods](#methods)
   - [1. getVaultInfo(ownerAddress: string)](#getvaultinfo)
   - [2. setupVault()](#setupVault)
   - [3. getVaultSetupStatus()](#getVaultSetupStatus)
   - [4. depositCollateral(collateralAmount: string)](#depositcollateral)
   - [5. borrowCurrency(borrowAmount: string)](#borrowcurrency)
   - [6. repayCurrency(amount: string)](#repaycurrency)
   - [7. withdrawCollateral(collateralAmount: string)](#withdrawcollateral)
   - [8. getCollateralInfo()](#getcollateralinfo)

### methods

#### getVaultInfo

```ts
descent.getVaultInfo(ownerAddress: string): Promise<{}>
```

Gets detailed information about a vault specified by the owner's address.

**Parameters**

- `ownerAddress``: The owner's address of the vault.

**Returns:**

- A promise resolving to the vault information.

```ts
    {
      healthFactor: 'Safe',
      depositedCollateral: '300.0',
      collateralLocked: 3.636504000000002,
      borrowedAmount: '3000.0',
      accruedFees: '0.115509259026984',
      currentCollateralRatio: '0.9090924378872408%',
      availableCollateral: '296.363496',
     availablexNGN: '244499.769094051707348'
    }
```

#### setupVault

```ts
descent.setupVault(): Promise<{}>
```

Initializes a vault for a first time user and sets up the appropriate configuration for the vault on the ssmart contract

**Returns:**

- A promise resolving to the transaction object.

#### getVaultSetupStatus

```ts
descent.getVaultSetupStatus(): Promise<{}>
```

Checks if a vault has already been initialized for the connected address or owner.

**Returns:**

- A boolean.

#### depositCollateral

```ts
descent.depositCollateral('100'): Promise<{}>
```

Deposits USDC for a particular vault.

**Parameters**

- `collateralAmount`: The amount of unlocked collateral to deposit.

**Returns:**

- A promise resolving to the transaction object.

#### borrowCurrency

```ts
descent.borrowCurrency('10000'): Promise<{}>
```

Borrows xNGN against deposited USDC.

**Parameters**

- `borrowAmount`: The amount of `xNGN` to borrow.

**Returns:**

- A promise resolving to the transaction object.

#### repayCurrency

```ts
descent.repayCurrency('9000'): Promise<{}>
```

Repays borrowed `xNGN` for a particular vault.

**Parameters**

- `amount`: The amount of `xNGN` to repay.

**Returns:**

- A promise resolving to the transaction object.

#### withdrawCollateral

```ts
descent.withdrawCollateal('9000'): Promise<{}>
```

Withdraws USDC for a particular vault.

**Parameters**

- `collateralAmount`: The amount of unlocked collateral to withdraw.

**Returns:**

- A promise resolving to the transaction object.

#### getCollateralInfo

```ts
descent.getCollateralInfo(): Promise<{}>
```

Gets information about the collateral initialized in `create()`.

**Returns:**

- A promise resolving to the collateral information.

```ts
{
      totalDepositedCollateral: '300.0',
      totalBorrowedAmount: '3000.0',
      liquidationThreshold: '75.0%',
      debtCeiling: '115792089237316195423570985008687907853269984665640564039457.584007913129639935',
      rate: '475.646879',
      minDeposit: '0.0',
      collateralPrice: '1100.0'
    }
```
