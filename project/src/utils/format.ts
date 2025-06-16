export const formatNumber = (num: number, decimals: number = 0): string => {
  return new Intl.NumberFormat('vi-VN', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(num);
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(amount);
};

export const formatCompactNumber = (num: number): string => {
  if (num >= 1e9) {
    return (num / 1e9).toFixed(1) + 'B';
  }
  if (num >= 1e6) {
    return (num / 1e6).toFixed(1) + 'M';
  }
  if (num >= 1e3) {
    return (num / 1e3).toFixed(1) + 'K';
  }
  return num.toString();
};

export const formatPercent = (value: number, decimals: number = 2): string => {
  return `${value >= 0 ? '+' : ''}${formatNumber(value, decimals)}%`;
};

export const getChangeColor = (change: number): string => {
  if (change > 0) return 'text-success-600';
  if (change < 0) return 'text-danger-600';
  return 'text-warning-600';
};

export const getChangeBgColor = (change: number): string => {
  if (change > 0) return 'bg-success-50 border-success-200';
  if (change < 0) return 'bg-danger-50 border-danger-200';
  return 'bg-warning-50 border-warning-200';
};