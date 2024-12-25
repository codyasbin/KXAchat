import { ClerkProvider } from '@clerk/nextjs';
import "./globals.css";
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-background text-primary font-sans min-h-screen flex flex-col">
        <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
          <div className="flex-1">{children}</div>
        </ClerkProvider>
      </body>
    </html>
  );
}
