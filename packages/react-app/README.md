# Lockie x BWC [Minipay]

Live Demo - [Watch Video](https://drive.google.com/file/d/1yUIWSLDOX2UzLD5x91ifjGiSGzbOJjm3/view) <br />
Minipay Link - [Lockie dApp](https://lockie-minipay.vercel.app) <br />
Slides - [Presentation Slides](https://he-s3.s3.amazonaws.com/media/sprint/lancelot-hackathon-4/team/1887941/b21642elockie_slides.pdf)

## ✨ Description

[Lockie](https://lockie-minipay.vercel.app) is a Minipay widget that allows users save in cUSD and earn interest on their savings.

This works by connecting Lockie with [MOOLA market](https://moola.market/) on CELO network, to provide a simple interface where users can deposit into the lending pool, earn interest and withdraw at any time!

The insipiration behind Lockie is to help Africans combat hyperinflation by leveraging on Minipay and the CELO DeFi ecosystem.

![Lockie Dashboard](https://lockie-minipay.vercel.app/img/preview.png)

## 💻 How we built Lockie

We created and deployed Lockie smart contract on Celo Mainnet:

1. Lockie 0x97912976B292131c35c96041fB282c098D23F45B - [View on Celo scan](https://celoscan.io/address/0x97912976B292131c35c96041fB282c098D23F45B)

Here are some of the recent transactions on Lockie:

1. Savings [View txn on Celo Scan](https://celoscan.io/tx/0x002b93034c28e7ddd483b3b60e30196a6def0675f43fc982c7c3d7955b0bb28a)

2. Withdrawal [View txn on Celo Scan](https://celoscan.io/tx/0x30c3dd1c2544aab8ed53f17edcd278f4ff25ac3f2c72ac8088089cf107956aed)

This is an original work by our team. We built our solution using: **`CELO Composer`**, **`NextJs/Typescript`**, **`Wagmi`**, **`Rainbowkit`**, **`TailwindCSS`** and **`Remix`**

## 🧑‍💻 Instructions for testing locally

\***\* Smart contract \*\***

Note: Recommend using [Remix](https://remix.ethereum.org) for quick smart contract deployment, or alternatively hardhat:

1. Deploy `Lockie` on Celo by running the necessary Hardhat script

\***\* Frontend \*\***

2. Update your deployed `Lockie` address on the `packages/react-app/constants/connect.ts file.

3. run `cp .env.example .env`

4. Update the fields on the .env file with your keys

5. Run `yarn dev` to start the DApp on your development environment.

6. You can connect from your Minipay wallet and enjoy a world of limitless possibilities.
