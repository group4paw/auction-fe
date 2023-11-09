"use client";

import Navbar from "@/components/Navbar";
import { store } from "./store";
import { Provider } from "react-redux";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <Navbar />
      {children}
    </Provider>
  );
}
