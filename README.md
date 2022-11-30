# ixo-ipfs-worker

This is a cloudflare worker project for storing files on ipfs using Cloudflare Workers.

# ixo-nft-worker

This is a cloudflare worker project for processing NFT data using Cloudflare Workers.

## Features

- Minimal
- TypeScript
- Wrangler to develop and deploy.

## Usage

Install

```
yarn install

yarn add wrangler --global

```

Develop

```
yarn dev
```

Test

```
yarn test
```

Deploy

```
yarn deploy
```

Add your Web3storage Secret key housed in the secret manager tool of cloudflare.

```
wrangler secret put IPFS_WORKER_MNEMONIC
```

## Author

Andrew Margetts <https://github.com/demondayza>

## License

MIT
