import { ReactNode } from "react";
import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { AiChatWidget } from "@/components/ai/ai-chat-widget";

type PublicLayoutProps = {
  children: ReactNode;
};

export function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
      <CartDrawer />
      <AiChatWidget />
    </>
  );
}