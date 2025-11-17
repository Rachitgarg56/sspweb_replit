import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import XIcon from '@mui/icons-material/X';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

const SocialIcons = () => {
  return (
    <div className="flex space-x-10 justify-center items-center py-1 pl-6 border-l-2 border-solid border-[var(--brown-light)]">
      <a 
        href="https://facebook.com/yourprofile" 
        target="_blank" 
        rel="noopener noreferrer"
        // className="text-blue-600 hover:text-blue-800 transition-colors duration-300"
      >
        <WhatsAppIcon fontSize='small' />
      </a>
      
      <a 
        href="https://twitter.com/yourhandle" 
        target="_blank" 
        rel="noopener noreferrer"
        // className="text-sky-500 hover:text-sky-700 transition-colors duration-300"
      >
        <FacebookRoundedIcon fontSize='medium' />
      </a>
      
      <a 
        href="https://instagram.com/yourprofile" 
        target="_blank" 
        rel="noopener noreferrer"
        // className="text-pink-600 hover:text-pink-800 transition-colors duration-300"
      >
        <XIcon fontSize='small' />
      </a>
      
      <a 
        href="https://linkedin.com/in/yourprofile" 
        target="_blank" 
        rel="noopener noreferrer"
        // className="text-blue-700 hover:text-blue-900 transition-colors duration-300"
      >
        <MailOutlineIcon fontSize='medium' />
      </a>
    </div>

  )
}

export default SocialIcons