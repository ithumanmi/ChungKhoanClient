export interface MarketIndex {
  id: string;
  name: string;
  code: string;
  value: number;
  change: number;
  changePercent: number;
  lastUpdate: string;
}

export interface Stock {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  value: number;
  high: number;
  low: number;
  ceiling: number;
  floor: number;
  reference: number;
  marketCap?: number;
  pe?: number;
  pb?: number;
  eps?: number;
  lastUpdate: string;
}

export interface StockPrice {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface OrderBookItem {
  price: number;
  volume: number;
}

export interface OrderBook {
  buy: OrderBookItem[];
  sell: OrderBookItem[];
}

export interface WatchlistItem {
  id: string;
  stockId: string;
  userId: string;
  addedAt: string;
}

export interface PortfolioItem {
  id: string;
  stockId: string;
  userId: string;
  quantity: number;
  averagePrice: number;
  totalValue: number;
  currentValue: number;
  profitLoss: number;
  profitLossPercent: number;
}

export interface Alert {
  id: string;
  userId: string;
  stockId: string;
  type: 'price_above' | 'price_below' | 'volume_above' | 'percent_change';
  value: number;
  isActive: boolean;
  createdAt: string;
}

export interface ForumPost {
  id: string;
  userId: string;
  title: string;
  content: string;
  stockSymbol?: string;
  createdAt: string;
  updatedAt: string;
  likesCount: number;
  commentsCount: number;
}

export interface User {
  id: string;
  email: string;
  fullName: string;
  avatar?: string;
  createdAt: string;
}