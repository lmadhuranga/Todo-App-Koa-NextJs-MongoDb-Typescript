import { Toaster } from "react-hot-toast";
import "./globals.css";

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        {children}

        {/* Toast container */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000
          }}
        />
      </body>
    </html>
  );
}
