import { FaDiscord, FaGithub, FaTiktok, FaXTwitter } from "react-icons/fa6";

export const socials = [
  // {
  //   name: 'LinkedIn',
  //   className: `group-hover:text-linkedin`,
  //   icon: FaLinkedin,
  //   url: 'https://www.linkedin.com/in/jwu31',
  // },
  {
    name: 'Discord @kazdesu',
    className: 'group-hover:text-discord group-hover:animate-[spin_1.5s_ease-in-out_infinite]',
    icon: FaDiscord,
    url: 'https://discord.com/channels/@me',
  },
  {
    name: 'X @jwu2121',
    className: '',
    icon: FaXTwitter,
    url: 'https://x.com/jwu2121',
  },
  {
    name: 'GitHub @jwu02',
    className: '',
    icon: FaGithub,
    url: 'https://github.com/jwu02',
  },
  // {
  //   name: 'YouTube @jwoo2121',
  //   className: '',
  //   icon: FaYoutube,
  //   url: 'https://www.youtube.com/@jwoo2121',
  // },
  {
    name: 'TikTok @jwoo21',
    className: '',
    icon: FaTiktok,
    url: 'https://www.tiktok.com/@jwoo21',
  }
];

export const MS_IN_SECOND = 1000
export const MS_IN_MINUTE = 60*MS_IN_SECOND
export const MS_IN_HOUR = 60*MS_IN_MINUTE
export const MS_IN_DAY = 24*MS_IN_HOUR
export const MS_IN_WEEK = 7*MS_IN_DAY
export const MS_IN_MONTH = 30*MS_IN_DAY

export const activityTypeMapping = {
  keyPresses: {
    endPoint: 'key-presses',
    summaryLabel: 'key presses',
    dataKey: 'Key Presses',
    linearGradientId: 'colorKp',
    colour: '#4477aa',
  }, 
  leftClicks: {
    endPoint: 'left-clicks',
    summaryLabel: 'left clicks',
    dataKey: 'Left Clicks',
    linearGradientId: 'colorLc',
    colour: '#228833',
  }, 
  rightClicks: {
    endPoint: 'right-clicks',
    summaryLabel: 'right clicks',
    dataKey: 'Right Clicks',
    linearGradientId: 'colorRc',
    colour: '#ccbb44',
  }, 
  mouseMovements: {
    endPoint: 'mouse-movements',
    summaryLabel: 'mouse movements',
    dataKey: 'Mouse Movements',
    linearGradientId: 'colorMm',
    colour: '#aa3377',
  }
}

export const filterWindowMapping = {
  day: {
    label: '24h',
    multiplier: 1
  },
  week: {
    label: '7d',
    multiplier: 7
  },
  month: {
    label: '30d',
    multiplier: 30
  }
}

export const fmContainerCommon = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2
    }
  }
};

export const fmItemCommon = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
};
