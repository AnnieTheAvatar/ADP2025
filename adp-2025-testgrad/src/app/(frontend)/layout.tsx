// /app/layout.tsx
import { getPayload } from 'payload';
import { Degree } from '@/payload-types';  // Ensure this type is correct
import configPromise from '@payload-config'; // Path to your Payload config
import './styles.css';
import Header from '@/components/Header';

export const metadata = {
  description: 'Architecture, Design, and Planning 2025 Graduate Show Website',
  title: 'ADP 2025 Grad Show',
};

// Layout component where data is fetched
const Layout = async ({ children }: { children: React.ReactNode }) => {
  // Fetch degrees inside the component (Next.js supports async components)
  const payload = await getPayload({ config: configPromise });
  const result = await payload.find({
    collection: 'degrees',
    limit: 1000,
    pagination: false,
  });

  const degrees: Degree[] = result.docs || [];

  return (
    <html lang="en">
      <body>
        <div>
          <Header degrees={degrees} /> {/* Pass degrees directly here */}
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
};

export default Layout;
