'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface HomeCardProps {
  orderId: string;
  title: string;
  image: string;
  description: string;
  buttonText: string;
  color: string;
  hoverColor: string;
  buttonLink: string;
  mobileLink: string;
}

const HomeCard: React.FC<{ card: HomeCardProps }> = ({ card }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [urlType, setUrlType] = useState('');

  useEffect(() => {
    handleResize();
    function handleResize() {
      if (window.innerWidth < 1024) {
        setUrlType('mobile');
      } else {
        setUrlType('desktop');
      }
    }

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [])
  
  return (
    <div className='flex flex-col gap-4 justify-between'>

      <div>
        <figure className="border-b-4" style={{ borderColor: card.color }}>  
          <img src={'https://files.sringeri.net/'+card.image} className='' alt={card.title} />
        </figure>

        <div className="flex flex-col justify-start text-[#443D32]">
          <h1 className="text-[14px] md:text-[22px] my-4 font-pt-serif max-sm:my-2">{card.title}</h1>
          <p className="font-inter text-[10px] md:text-[15px] pr-6 sm:leading-[21px] text-left line-clamp-4">{card.description}</p>
        </div>
      </div>

      <Link href={urlType === 'desktop' ? card.buttonLink : card.mobileLink}
        className="font-inter self-start uppercase rounded-[3px] font-semibold py-2 px-4 md:py-3 md:px-5 text-white text-[8px] md:text-[10.5px]"
        style={{ backgroundColor: isHovered ? card.hoverColor : card.color }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {card.buttonText}
      </Link>

    </div>
  );
};

export default HomeCard;