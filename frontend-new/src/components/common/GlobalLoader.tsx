import type { RootState } from '@/app/store';
import { useSelector } from 'react-redux';
import "@/assets/style/dotSpinner.css"
import Loader from '../ui/Loader';

export const GlobalLoader = () => {
  const loading = useSelector((state: RootState) => state.global.globalLoading);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 bg-background/90 bg-opacity-30 z-50 flex items-center justify-center w-full h-full">
      <Loader />
    </div>
  );
};
