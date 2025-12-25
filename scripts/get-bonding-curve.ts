/**
 * Helper script to derive bonding curve addresses from pump.fun token
 *
 * Usage: npm run derive-addresses
 *    or: ts-node scripts/get-bonding-curve.ts <TOKEN_ADDRESS>
 */

import { PublicKey } from '@solana/web3.js';
import * as readline from 'readline';

// Pump.fun program ID
const PUMP_FUN_PROGRAM = new PublicKey('6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P');

// Token program
const TOKEN_PROGRAM_ID = new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA');

// Associated Token Program
const ASSOCIATED_TOKEN_PROGRAM_ID = new PublicKey('ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL');

async function getTokenAddress(): Promise<string> {
  // Check if passed as command line argument
  if (process.argv[2]) {
    return process.argv[2];
  }

  // Check if in environment
  if (process.env.TOKEN_ADDRESS) {
    return process.env.TOKEN_ADDRESS;
  }

  // Otherwise prompt user
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question('Enter your pump.fun token address: ', (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

async function deriveBondingCurveAddresses(tokenMint: string) {
  console.log('');
  console.log('🎅 Deriving Bonding Curve Addresses');
  console.log('═'.repeat(50));
  console.log('');
  console.log('Token Mint:', tokenMint);
  console.log('');

  const mint = new PublicKey(tokenMint);

  try {
    // Derive Bonding Curve PDA
    const [bondingCurve, bondingCurveBump] = PublicKey.findProgramAddressSync(
      [
        Buffer.from('bonding-curve'),
        mint.toBuffer(),
      ],
      PUMP_FUN_PROGRAM
    );

    console.log('✅ Bonding Curve Address:');
    console.log('   ', bondingCurve.toString());
    console.log('   Bump:', bondingCurveBump);
    console.log('');

    // Derive Associated Bonding Curve (ATA for bonding curve)
    const [associatedBondingCurve] = PublicKey.findProgramAddressSync(
      [
        bondingCurve.toBuffer(),
        TOKEN_PROGRAM_ID.toBuffer(),
        mint.toBuffer(),
      ],
      ASSOCIATED_TOKEN_PROGRAM_ID
    );

    console.log('✅ Associated Bonding Curve:');
    console.log('   ', associatedBondingCurve.toString());
    console.log('');

    console.log('═'.repeat(50));
    console.log('📋 Copy these to your .env file or Render dashboard:');
    console.log('═'.repeat(50));
    console.log('');
    console.log(`BONDING_CURVE_ADDRESS=${bondingCurve.toString()}`);
    console.log(`ASSOCIATED_BONDING_CURVE=${associatedBondingCurve.toString()}`);
    console.log('');
    console.log('═'.repeat(50));

  } catch (error) {
    console.error('❌ Error deriving addresses:', error);
    console.error('');
    console.error('Make sure you entered a valid Solana address.');
  }
}

// Run if called directly
async function main() {
  const tokenAddress = await getTokenAddress();
  
  if (!tokenAddress) {
    console.error('❌ No token address provided');
    process.exit(1);
  }

  await deriveBondingCurveAddresses(tokenAddress);
}

main().catch(console.error);

export { deriveBondingCurveAddresses };
