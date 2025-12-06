// Given a list of prices, where each element prices[i] represents the price of a particular stock on day i, determine the maximum profit to be made by purchasing the stock and selling it on a future date. If it is not possible to generate a profit, return 0.

export default function optimalStockTrading(prices) {
  let maxProfit = 0;
  let lowestPrice = Number.MAX_SAFE_INTEGER;

  for (const currentPrice of prices) {
    lowestPrice = Math.min(lowestPrice, currentPrice);
    const potentialProfit = currentPrice - lowestPrice;
    maxProfit = Math.max(maxProfit, potentialProfit);
  }

  return maxProfit;
}
