'use client'

import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import XIcon from '@mui/icons-material/X';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { COPY_LINK_ICON } from '@/public/assets/svgs/svg';

interface Props {
  title: string;
  url: string;
}

const SocialIcons = ({ title, url }: Props) => {
    const handleCopy = () => {
        navigator.clipboard.writeText(url);
        alert("Link copied to clipboard!");
    }
    const shareOnFacebook = () => {
        if (!url) {
            console.error("URL is undefined or empty.");
            return;
        }
        const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        
        const width = 550;
        const height = 400;
        const left = window.screen.width / 2 - width / 2;
        const top = window.screen.height / 2 - height / 2;

        window.open(
            facebookUrl,
            "facebook-share-dialog",
            `width=${width},height=${height},top=${top},left=${left},toolbar=0,location=0,menubar=0,directories=0,scrollbars=0`
        );
    };

    const shareOnWhatsApp = () => {
        const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(url)}`;
        window.open(whatsappUrl, "_blank");
    };

    const shareOnTwitter = () => {
      if (!url) {
          console.error("URL is undefined or empty.");
          return;
      }
      const tweetText = "Check this out!";
      const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(tweetText)}`;

      const width = 550;
      const height = 400;
      const left = window.screen.width / 2 - width / 2;
      const top = window.screen.height / 2 - height / 2;

      window.open(
          twitterUrl,
          "twitter-share-dialog",
          `width=${width},height=${height},top=${top},left=${left},toolbar=0,location=0,menubar=0,directories=0,scrollbars=0`
      );
    };

    const shareViaGmail = () => {
        if (!url) {
            console.error("URL is undefined or empty.");
            return;
        }
        const subject = "Have a look at this!";
        const body = `I thought you might find this interesting: ${url}`;
        
        const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}&tf=1`;

        window.open(gmailUrl, "_blank");
    };

    return (
      <div className="flex space-x-10 justify-center items-center py-1 sm:pl-6 sm:border-l-2 border-solid border-[#E6E1DC]">
        <div 
          title='Copy Link'
          onClick={handleCopy}
          className='hover:text-[var(--brown-medium)] cursor-pointer'
        >
          {COPY_LINK_ICON}
        </div>

        <div 
          title='Whatsapp'
          onClick={shareOnWhatsApp}
          className='hover:text-[var(--brown-medium)] cursor-pointer'
        >
          <WhatsAppIcon fontSize='medium' />
        </div>
        
        <div
          title='Facebook'
          onClick={shareOnFacebook}
          className='hover:text-[var(--brown-medium)] cursor-pointer'
        >
          <FacebookRoundedIcon fontSize='medium' />
        </div>
        
        <div 
          title='Twitter'
          onClick={shareOnTwitter}
          className='hover:text-[var(--brown-medium)] cursor-pointer'
        >
          <XIcon fontSize='small' />
        </div>
        
        <div 
          title='Mail'
          onClick={shareViaGmail}
          className='hover:text-[var(--brown-medium)] cursor-pointer'
        >
          <MailOutlineIcon fontSize='medium' />
        </div>
      </div>

    )
}

export default SocialIcons
