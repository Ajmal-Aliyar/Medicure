import { Toaster } from "react-hot-toast";
import { AppRouter } from "./router";
import { useAuthCheck } from "@/hooks/useAuthCheck";
import GlobalModal from "@/components/common/GlobalModal";
import { GlobalLoader } from "@/components/common/GlobalLoader";
import { useDispatch } from "react-redux";
import { setLoading } from "@/slices/globalSlice";

const App = () => {
  const dispatch = useDispatch()
  const loading = useAuthCheck()
  dispatch(setLoading(loading))

  return <div className="w-screen bg-surface">
    <Toaster reverseOrder={false} />
    <AppRouter />
    <GlobalModal />
    <GlobalLoader />
   
  </div>;
};

export default App;
