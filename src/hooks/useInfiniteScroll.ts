import { useEffect } from 'react';

interface UseInfiniteScrollOptions {
  threshold?: number; 
  enabled?: boolean; 
}

export const useInfiniteScroll = (
  callback: () => void,
  options: UseInfiniteScrollOptions = {}
) => {
  const { threshold = 200, enabled = true } = options;

  useEffect(() => {
    if (!enabled) return;

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      
      if (scrollTop + windowHeight >= docHeight - threshold) {
        callback();
      }
    };

    window.addEventListener('scroll', handleScroll);
    
   
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [callback, threshold, enabled]);
};