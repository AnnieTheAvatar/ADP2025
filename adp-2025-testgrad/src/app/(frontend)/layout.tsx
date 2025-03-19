// /app/layout.tsx
import { getPayload } from 'payload';
import { Degree } from '@/payload-types';  // Assuming this type is defined for your Payload collection
import configPromise from '@payload-config'; // Path to your Payload config
import './styles.css'
import Header from '@/components/Header';

interface LayoutProps {
  children: React.ReactNode;
  degrees: Degree[];  // Fetched degrees data
}

export const metadata = {
  description: 'Architecture, Design, and Planning 2025 Graduate Show Website',
  title: 'ADP 2025 Grad Show',
}

// Layout component where data is fetched and passed as props to child pages
const Layout = async ({ children }: LayoutProps) => {
  // Fetch degrees data server-side
  const payload = await getPayload({ config: configPromise });
  const result = await payload.find({
    collection: 'degrees',
    limit: 1000,
    pagination: false,
  });

  const degrees = result.docs || [];

  return (
    <html lang="en">
      <body>
        <div>
        <Header degrees={degrees} /> {/* Use the Header component */}
      <main>{children}</main>
    </div>
    </body>
    </html>
  );
};

export default Layout;
