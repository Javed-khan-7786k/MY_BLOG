import { Link } from 'react-router-dom';
import type { FC } from 'react';

const NotFoundPage: FC = () => (
  <div className='bg-[#f0f2f5]' style={{ padding: '2rem', textAlign: 'center' }}>
    <h1 style={{ color: '#111827' }}>404 - Page Not Found</h1>
    <p style={{ color: '#374151', marginBottom: '1rem' }}>
      The page or article you are looking for does not exist.
    </p>
    <Link to="/" style={{ color: '#2563eb', fontWeight: 'bold' }}>
      Go back home
    </Link>
  </div>
);

export default NotFoundPage;
