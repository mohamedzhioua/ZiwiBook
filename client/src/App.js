import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
//Routes
import Router from "./routes/Router";
//Layouts
import { Footer, ModalManager } from "./layouts/index";
//Styles
import "./index.css";
import { ToastContainer } from "react-toastify";

export const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
         <ModalManager />
         <Router />
        <Footer />
        <ToastContainer />
    </QueryClientProvider>
  );
}

export default App;
