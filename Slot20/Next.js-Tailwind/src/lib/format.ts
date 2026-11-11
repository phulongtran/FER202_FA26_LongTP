export const formatUSD = (n: number): string =>
  n.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
