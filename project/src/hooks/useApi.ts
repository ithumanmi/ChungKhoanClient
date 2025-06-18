import { useQuery, useMutation, useQueryClient } from 'react-query';
import { authAPI, stockAPI, portfolioAPI, watchlistAPI } from '../services/api';

// Auth hooks
export const useLogin = () => {
  const queryClient = useQueryClient();
  
  return useMutation(
    ({ email, password }: { email: string; password: string }) =>
      authAPI.login({ email, password }),
    {
      onSuccess: (data) => {
        // Invalidate và refetch user data
        queryClient.invalidateQueries('user');
        queryClient.setQueryData('user', data.user);
      },
    }
  );
};

export const useRegister = () => {
  const queryClient = useQueryClient();
  
  return useMutation(
    ({ email, password, fullName }: { email: string; password: string; fullName: string }) =>
      authAPI.register({ email, password, fullName }),
    {
      onSuccess: (data) => {
        // Invalidate và refetch user data
        queryClient.invalidateQueries('user');
        queryClient.setQueryData('user', data.user);
      },
    }
  );
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  
  return useMutation(authAPI.logout, {
    onSuccess: () => {
      // Clear all queries khi logout
      queryClient.clear();
    },
  });
};

export const useCurrentUser = () => {
  return useQuery('user', authAPI.getCurrentUser, {
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Stock hooks
export const useStocks = (page = 1, limit = 20) => {
  return useQuery(
    ['stocks', page, limit],
    () => stockAPI.getStocks(page, limit),
    {
      staleTime: 2 * 60 * 1000, // 2 minutes
      cacheTime: 5 * 60 * 1000, // 5 minutes
    }
  );
};

export const useStockDetail = (symbol: string) => {
  return useQuery(
    ['stock', symbol],
    () => stockAPI.getStockDetail(symbol),
    {
      enabled: !!symbol,
      staleTime: 1 * 60 * 1000, // 1 minute
      cacheTime: 3 * 60 * 1000, // 3 minutes
    }
  );
};

export const useStockPrice = (symbol: string, period = '1d') => {
  return useQuery(
    ['stockPrice', symbol, period],
    () => stockAPI.getStockPrice(symbol, period),
    {
      enabled: !!symbol,
      staleTime: 30 * 1000, // 30 seconds
      cacheTime: 2 * 60 * 1000, // 2 minutes
      refetchInterval: 30 * 1000, // Auto refetch every 30 seconds
    }
  );
};

// Portfolio hooks
export const usePortfolio = () => {
  return useQuery('portfolio', portfolioAPI.getPortfolio, {
    staleTime: 1 * 60 * 1000, // 1 minute
    cacheTime: 3 * 60 * 1000, // 3 minutes
  });
};

export const useAddToPortfolio = () => {
  const queryClient = useQueryClient();
  
  return useMutation(
    ({ symbol, quantity, price }: { symbol: string; quantity: number; price: number }) =>
      portfolioAPI.addToPortfolio(symbol, quantity, price),
    {
      onSuccess: () => {
        // Invalidate portfolio data
        queryClient.invalidateQueries('portfolio');
      },
    }
  );
};

export const useRemoveFromPortfolio = () => {
  const queryClient = useQueryClient();
  
  return useMutation(
    (symbol: string) => portfolioAPI.removeFromPortfolio(symbol),
    {
      onSuccess: () => {
        // Invalidate portfolio data
        queryClient.invalidateQueries('portfolio');
      },
    }
  );
};

// Watchlist hooks
export const useWatchlist = () => {
  return useQuery('watchlist', watchlistAPI.getWatchlist, {
    staleTime: 1 * 60 * 1000, // 1 minute
    cacheTime: 3 * 60 * 1000, // 3 minutes
  });
};

export const useAddToWatchlist = () => {
  const queryClient = useQueryClient();
  
  return useMutation(
    (symbol: string) => watchlistAPI.addToWatchlist(symbol),
    {
      onSuccess: () => {
        // Invalidate watchlist data
        queryClient.invalidateQueries('watchlist');
      },
    }
  );
};

export const useRemoveFromWatchlist = () => {
  const queryClient = useQueryClient();
  
  return useMutation(
    (symbol: string) => watchlistAPI.removeFromWatchlist(symbol),
    {
      onSuccess: () => {
        // Invalidate watchlist data
        queryClient.invalidateQueries('watchlist');
      },
    }
  );
}; 