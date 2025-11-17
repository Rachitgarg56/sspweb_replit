import Link from 'next/link';
import { API_URL } from '@/config/api';

async function getHeaderNotice() {
  try {
    const res = await fetch(`${API_URL}headerNotices`, {
      cache: 'no-store',
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch header notices');
    }
    
    return res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}

export default async function HeaderNotice() {
  const notice = await getHeaderNotice();

  if (!notice) return null;

  const { title, buttonText, link } = notice;

  return (
    <div className="flex items-center gap-[5px] h-[27px] max-sm:h-[23px] justify-center bg-[var(--gray-200)] font-inter max-sm:text-[9px] text-[11.5px] font-medium">
      <p className="text-[var(--brown-medium)] max-sm:max-w-[250px] max-sm:truncate">
        {title}
      </p>
      <Link href={link} replace className="text-[var(--learn-more)]">
        {buttonText}
      </Link>
    </div>
  );
}
