RAY = 10 ** 27; // 10 to the power 27
SECONDS_PER_YEAR = 31536000;

// Deposit and Borrow calculations
// APY and APR are returned here as decimals, multiply by 100 to get the percents

depositAPR = liquidityRate / RAY;
variableBorrowAPR = variableBorrowRate / RAY;
stableBorrowAPR = variableBorrowRate / RAY;

depositAPY = ((1 + depositAPR / SECONDS_PER_YEAR) ^ SECONDS_PER_YEAR) - 1;
variableBorrowAPY =
  ((1 + variableBorrowAPR / SECONDS_PER_YEAR) ^ SECONDS_PER_YEAR) - 1;
stableBorrowAPY =
  ((1 + stableBorrowAPR / SECONDS_PER_YEAR) ^ SECONDS_PER_YEAR) - 1;

// Incentives calculation

aEmissionPerYear = aEmissionPerSecond * SECONDS_PER_YEAR;
vEmissionPerYear = vEmissionPerSecond * SECONDS_PER_YEAR;

WEI_DECIMALS = 10 ** 18; // All emissions are in wei units, 18 decimal places

// UNDERLYING_TOKEN_DECIMALS will be the decimals of token underlying the aToken or debtToken
// For Example, UNDERLYING_TOKEN_DECIMALS for aUSDC will be 10**6 because USDC has 6 decimals

incentiveDepositAPRPercent =
  (100 * (aEmissionPerYear * REWARD_PRICE_ETH * WEI_DECIMALS)) /
  (totalATokenSupply * TOKEN_PRICE_ETH * UNDERLYING_TOKEN_DECIMALS);

incentiveBorrowAPRPercent =
  (100 * (vEmissionPerYear * REWARD_PRICE_ETH * WEI_DECIMALS)) /
  (totalCurrentVariableDebt * TOKEN_PRICE_ETH * UNDERLYING_TOKEN_DECIMALS);
