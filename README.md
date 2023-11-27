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

- [ ] Improve presets and configuration settings
- [ ] Make configuration services oriented
- [ ] Perform getters using MultiStaticCall in the [protocol-periphery](<[https://github.com/Descent-Collective/protocol-periphery](https://github.com/Descent-Collective/protocol-periphery/blob/main/src/mutliStaticcall.sol)>) contract to interact with the VaultGetter contract
- [ ] Perform state change calls using the VaultRouter [protocol-periphery](<[https://github.com/Descent-Collective/protocol-periphery](https://github.com/Descent-Collective/protocol-periphery/blob/main/src/vaultRouter.sol)>) contract
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

This library is also usable as a UMD module, which you can build with `npm run build:frontend.`

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
  Use this preset when using the library in a browser environment. It will attempt to connect using window.ethereum or window.web3.

- `'https'`
  Connect to a JSON-RPC node. Requires url to be set in the options.

- `'test'`
  Use a local node (e.g. Ganache) running at http://127.0.0.1:2000, and sign transactions using node-managed keys.

```tsx
const descentBrowser = await Descent.create('browser');

const descentHttp = await Descent.create('httpsRA_PROJECT_ID'
});

const descentTest = await Descent.create('test');
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
