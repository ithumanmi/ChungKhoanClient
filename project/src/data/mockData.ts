import { MarketIndex, Stock } from '../types/stock';

export const mockMarketIndices: MarketIndex[] = [
  {
    id: '1',
    name: 'VN-Index',
    code: 'VNINDEX',
    value: 1248.67,
    change: 12.45,
    changePercent: 1.01,
    lastUpdate: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'HNX-Index',
    code: 'HNX',
    value: 235.89,
    change: -2.34,
    changePercent: -0.98,
    lastUpdate: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'UPCOM-Index',
    code: 'UPCOM',
    value: 78.45,
    change: 0.89,
    changePercent: 1.15,
    lastUpdate: new Date().toISOString(),
  },
];

export const mockTopStocks: Stock[] = [
  {
    id: '1',
    symbol: 'VCB',
    name: 'Ngân hàng TMCP Ngoại thương Việt Nam',
    price: 88500,
    change: 2500,
    changePercent: 2.91,
    volume: 2456780,
    value: 217432650000,
    high: 89000,
    low: 86000,
    ceiling: 94500,
    floor: 77500,
    reference: 86000,
    marketCap: 890456000000,
    pe: 8.5,
    pb: 1.2,
    eps: 10400,
    lastUpdate: new Date().toISOString(),
  },
  {
    id: '2',
    symbol: 'VHM',
    name: 'CTCP Vinhomes',
    price: 65800,
    change: -1200,
    changePercent: -1.79,
    volume: 1875420,
    value: 123456789000,
    high: 67500,
    low: 65200,
    ceiling: 73700,
    floor: 60300,
    reference: 67000,
    marketCap: 567890000000,
    pe: 12.3,
    pb: 2.1,
    eps: 5350,
    lastUpdate: new Date().toISOString(),
  },
  {
    id: '3',
    symbol: 'HPG',
    name: 'CTCP Tập đoàn Hòa Phát',
    price: 25600,
    change: 800,
    changePercent: 3.23,
    volume: 3567890,
    value: 91234567000,
    high: 26000,
    low: 24800,
    ceiling: 27300,
    floor: 22300,
    reference: 24800,
    marketCap: 234567000000,
    pe: 6.8,
    pb: 0.9,
    eps: 3765,
    lastUpdate: new Date().toISOString(),
  },
  {
    id: '4',
    symbol: 'VIC',
    name: 'CTCP Vingroup',
    price: 54300,
    change: 1800,
    changePercent: 3.43,
    volume: 1234567,
    value: 67012345000,
    high: 55000,
    low: 52500,
    ceiling: 57800,
    floor: 47300,
    reference: 52500,
    marketCap: 456789000000,
    pe: 15.2,
    pb: 1.8,
    eps: 3572,
    lastUpdate: new Date().toISOString(),
  },
  {
    id: '5',
    symbol: 'MSN',
    name: 'CTCP Tập đoàn Masan',
    price: 89200,
    change: -3400,
    changePercent: -3.67,
    volume: 987654,
    value: 88123456000,
    high: 93000,
    low: 88500,
    ceiling: 101900,
    floor: 83300,
    reference: 92600,
    marketCap: 189456000000,
    pe: 18.9,
    pb: 2.3,
    eps: 4721,
    lastUpdate: new Date().toISOString(),
  },
  {
    id: '6',
    symbol: 'GAS',
    name: 'CTCP Khí Đồng Tâm',
    price: 78900,
    change: 2100,
    changePercent: 2.73,
    volume: 456789,
    value: 36012345000,
    high: 79500,
    low: 76800,
    ceiling: 84500,
    floor: 69100,
    reference: 76800,
    marketCap: 123789000000,
    pe: 9.7,
    pb: 1.1,
    eps: 8134,
    lastUpdate: new Date().toISOString(),
  },
];

export const mockHotStocks: Stock[] = [
  ...mockTopStocks.slice(0, 3),
  {
    id: '7',
    symbol: 'FPT',
    name: 'CTCP FPT',
    price: 123400,
    change: 5600,
    changePercent: 4.75,
    volume: 1567890,
    value: 193456789000,
    high: 124000,
    low: 118000,
    ceiling: 129500,
    floor: 106100,
    reference: 117800,
    marketCap: 345678000000,
    pe: 16.8,
    pb: 3.2,
    eps: 7345,
    lastUpdate: new Date().toISOString(),
  },
  {
    id: '8',
    symbol: 'MWG',
    name: 'CTCP Đầu tư Thế Giới Di Động',
    price: 67800,
    change: -2300,
    changePercent: -3.28,
    volume: 2345678,
    value: 158901234000,
    high: 70500,
    low: 67200,
    ceiling: 77100,
    floor: 63000,
    reference: 70100,
    marketCap: 198765000000,
    pe: 11.2,
    pb: 1.9,
    eps: 6054,
    lastUpdate: new Date().toISOString(),
  },
];