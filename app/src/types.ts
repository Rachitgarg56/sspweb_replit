export interface Announcement {
    id: string;
    title: string;
    date: {
        seconds: number;
        nanoseconds: number;
    };
    description: string;
    slug: string;
    images: string[];
    attachments: string[];
}

export interface AnnouncementsSectionProps {
    announcements: Announcement[];
}

export interface SidebarItem {
    title: string;
    link?: string; 
    children?: SidebarItem[];
    showChildren?: boolean;
    id?: string;
};

export interface Event {
    id: string;
    slug: string;
    title: string;
    date: {
      seconds: number;
      nanoseconds: number;
    };
    time: string;
    location: string;
    description: string;
    images: string[];
    imagesCaptions: string[];
    yTLink: string;
    isOffline: boolean;
    isOnline: boolean;
    showAccomodation?: boolean;
    showSeva?: boolean;
    showLiveStream?: boolean;
  }
  

export interface PageData {
    slug: [];
    id: string;
    title: string;
    mainMenu: string;
    subMenu: string;
    subSubMenu: string;
    breadcrumbs: [];
    content: string;
    created_at: string;
    link: string;
}

export interface PageDataProps {
    params: { slug: [] };
}

export interface DeityTitle {
    lang: string;
    value: string;
  }
  
  export interface Stotra {
    title: DeityTitle[];
    url: string;
    audioPath: string;
    id?: string;
  }
  
  export interface Deity {
    title: DeityTitle[];
    stotras: Stotra[];
    url: string;
    orderId: number;
    id: string;
    totalShlokas: number;
  }

  export interface Occasion {
    date: string;
    occasion: string;
  }
  
  export interface Collection {
    deities: Deity[];
    title: { lang: string, value: string }[];
    url: string;
  }
