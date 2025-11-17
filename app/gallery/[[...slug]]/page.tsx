
import { notFound } from 'next/navigation';
import React, { cache } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { PlayCircleOutline } from "@mui/icons-material"
import PanchamgamContent from '@/app/components/PanchamgamContent';
import { Metadata } from 'next';
import { DropdownSidebarMobile } from '@/app/components/DropdownSidebarMobile';
import { SidebarItem } from '@/app/src/types';
import { getSidebarData } from '@/utils/helpers';
import DropdownSidebar from '@/app/components/DropdownSidebar';

interface PageData {
    content?: string | React.ReactNode,
    title: string,
    route: string,
    images: { lowres: string, highres: string, title?: string, subtitle?: string }[],
    attachments: { title?: string, subtitle?: string, link: string, type: string }[],
    type?: string;
}

interface Props { 
    params: Promise<{ slug?: string[] }>
}

const getPageData = cache((slugPath: string) => {
    return pageData.find(d => d.route === slugPath)
})

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params; 
    const slugPath = slug ? slug.join("/") : "";    
    const data = getPageData(slugPath);

    return {
        title: data?.title,
        // description: data?.description,
        openGraph: {
            title: data?.title,
            // description: getFirstNWords(stripHTML(data?.description), 50),
            images: [
                {
                    url: data?.images?.length ? data.images[0].highres : '',
                    alt: data?.title,
                },
            ],
            type: "website",
        }
    };
}

const pageData = [
    {
        title: 'Gallery',
        route: '',
        images: [],
        attachments: [],
    },
    {
        title: 'Wallpapers',
        route: 'wallpapers',
        images: [
            {lowres: '/assets/images/gallery/wallpapers/low/adi-shankara.jpg', highres: '/assets/images/gallery/wallpapers/high/adi-shankara.jpg', title: '', subtitle: ''},
            {lowres: '/assets/images/gallery/wallpapers/low/adi-shankaracharya-with-shishyas.jpg', highres: '/assets/images/gallery/wallpapers/high/adi-shankaracharya-with-shishyas.jpg', title: '', subtitle: ''},
            {lowres: '/assets/images/gallery/wallpapers/low/goddess-sharada.jpg', highres: '/assets/images/gallery/wallpapers/high/goddess-sharada.jpg', title: '', subtitle: ''},
            {lowres: '/assets/images/gallery/wallpapers/low/kamadhenu-alankara.jpg', highres: '/assets/images/gallery/wallpapers/high/kamadhenu-alankara.jpg', title: '', subtitle: ''},
            {lowres: '/assets/images/gallery/wallpapers/low/mayura-vahana.jpg', highres: '/assets/images/gallery/wallpapers/high/mayura-vahana.jpg', title: '', subtitle: ''},
            {lowres: '/assets/images/gallery/wallpapers/low/rishabha-vahana.jpg', highres: '/assets/images/gallery/wallpapers/high/rishabha-vahana.jpg', title: '', subtitle: ''},
            {lowres: '/assets/images/gallery/wallpapers/low/saraswati-alankara.jpg', highres: '/assets/images/gallery/wallpapers/high/saraswati-alankara.jpg', title: '', subtitle: ''},
            {lowres: '/assets/images/gallery/wallpapers/low/sharada_durga_wallpaper.jpg', highres: '/assets/images/gallery/wallpapers/high/sharada_durga_wallpaper.jpg', title: '', subtitle: ''},
            {lowres: '/assets/images/gallery/wallpapers/low/srisharadamba-wallpaper.jpg', highres: '/assets/images/gallery/wallpapers/high/srisharadamba-wallpaper.jpg', title: '', subtitle: ''},
            {lowres: '/assets/images/gallery/wallpapers/low/swamiji.jpg', highres: '/assets/images/gallery/wallpapers/high/swamiji.jpg', title: '', subtitle: ''},
            {lowres: '/assets/images/gallery/wallpapers/low/vidyashankara-a.jpg', highres: '/assets/images/gallery/wallpapers/high/vidyashankara-a.jpg', title: '', subtitle: ''},
            {lowres: '/assets/images/gallery/wallpapers/low/vidyashankara-b.jpg', highres: '/assets/images/gallery/wallpapers/high/vidyashankara-b.jpg', title: '', subtitle: ''},
        ],
        attachments: [],
    },
    {
        title: 'Panchangam',
        route: 'downloadables/panchangam',
        content: <PanchamgamContent/>,
        images: [],
        attachments: [],
        type: 'html',
    },
    {
        title: 'Poster Size Images of Sringeri Jagadgurus',
        route: 'downloadables/poster-size-images-of-sringeri-jagadgurus',
        images: [
            {lowres: '/assets/images/gallery/sringeri-jagadgurus/low/36thsringerijagadguru_mar2015.jpg', highres: '/assets/images/gallery/sringeri-jagadgurus/high/36thsringerijagadguru_mar2015.jpg', title: '', subtitle: ''},
            {lowres: '/assets/images/gallery/sringeri-jagadgurus/low/37thsringerijagadguru_mar2015.jpg', highres: '/assets/images/gallery/sringeri-jagadgurus/high/37thsringerijagadguru_mar2015.jpg', title: '', subtitle: ''},
        ],
        attachments: [],
    },
    {
        title: 'Sri Guro Pahimam',
        route: 'downloadables/sri-guro-pahimam',
        images: [
            {lowres: '/assets/images/gallery/sri-guro-pahiman/low/sri_sri_bharati_tirtha_mahaswamigal.jpg', highres: '/assets/images/gallery/sri-guro-pahiman/high/sri_sri_bharati_tirtha_mahaswamigal.jpg', title: '', subtitle: ''},
        ],
        attachments: [{title: 'MP3 Clip', subtitle: '', link:'/assets/mp3/sriguru.mp3', type:'mp3'}],
    },
    {
        title: 'Sriman Narayaneeyam',
        route: 'downloadables/sriman-narayaneeyam',
        images: [
            {lowres: '/assets/images/gallery/sri-narayaneeyam/low/06_Tulasi-Archana-to-Sri-Janardana-Swami-as-part-of-Tungabhadra-Antya-Pushakara-Mahotsava_Nov_15_0R9A3968.jpg', highres: '/assets/images/gallery/sri-narayaneeyam/high/06_Tulasi-Archana-to-Sri-Janardana-Swami-as-part-of-Tungabhadra-Antya-Pushakara-Mahotsava_Nov_15_0R9A3968.jpg', title: '', subtitle: ''},
            {lowres: '/assets/images/gallery/sri-narayaneeyam/low/narayneeya.jpg', highres: '/assets/images/gallery/sri-narayaneeyam/high/narayneeya.png', title: '', subtitle: ''},
        ],
        attachments: [],
    },
    {
        title: 'Sringeri Clock Screensaver',
        route: 'downloadables/sringeri-clock-screensaver',
        images: [
            {lowres: '/assets/images/gallery/clock-screensaver/low/clock_ss.jpg', highres: '/assets/images/gallery/clock-screensaver/high/clock_ss.jpg', title: '', subtitle: ''},
        ],
        attachments: [
            {title: 'Download the Sringeri Clock Screensaver', link: '/assets/application/sringeri-clock-screensaver.exe', type: 'application'},
        ],
    },
]

const page = async ({ params }: Props) => {
    const { slug } = await params; 

    const slugPath = slug ? slug.join("/") : "";

    let data: PageData;

    const sidebarData: SidebarItem[] = await getSidebarData('/gallery');

    function isValidRoute() {
        data = getPageData(slugPath);
        if (data) return true
        return false
    }

    if (!isValidRoute()) {
        return notFound()
    }

    return (
        <>
            {/* aside code */}
            <DropdownSidebar data={sidebarData} highlight="var(--resources)" />
            <div className="flex flex-col gap-6 w-full py-4 px-12 bg-[#FFFFFF] max-lg:px-6 max-[462px]:px-4">
                <DropdownSidebarMobile data={sidebarData} bgColor='var(--resources)' title={data.title} bgHover='var(--resources-hover)' />
                <h2 className='text-center text-[var(--resources)] text-3xl max-sm:text-2xl font-pt-serif'>{data?.title}</h2>

                {
    
                    data?.content ?

                    (
                        data.type === 'html' ?
                        data.content :
                        <div dangerouslySetInnerHTML={{ __html: data?.content }}></div>
                    ) :
                
                    <div className='flex flex-col items-center max-sm:gap-4 gap-8 w-full'>
                        {
                            data?.images?.map(link => {
                                return (
                                        <Link target='_blank' href={link?.highres} key={link?.lowres}>
                                            <Image
                                                src={link?.lowres}
                                                width={800}
                                                height={800} 
                                                alt='image'
                                            />
                                        </Link>
                                    )
                                }
                            )
                        }
                        {
                            data?.attachments?.map(attachment => {
                                if (attachment?.type === 'mp3') {
                                    return (
                                        <Link key={attachment?.link} className='self-start flex items-center gap-1 hover:text-[var(--resources-hover)] text-[var(--resources)]' href={attachment?.link}>
                                            <PlayCircleOutline fontSize='large' />
                                            <span className='text-lg'>{attachment?.title}</span>
                                        </Link>
                                    )
                                } else if (attachment?.type === 'application') {
                                    return (
                                        <a 
                                            key={attachment?.link}
                                            href={attachment?.link}
                                            download 
                                            className="text-blue-600 font-semibold text-center hover:underline cursor-pointer"
                                        >
                                            {attachment?.title}
                                        </a>
                                    )
                                }
                            })
                        }
                    </div>

                }
            </div>
        </>
    )
}

export default page