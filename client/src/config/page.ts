
import banner1 from "@/assets/banners/banner1.webp"
import banner2 from "@/assets/banners/banner2.webp"
import banner3 from "@/assets/banners/banner3.webp"
import banner4 from "@/assets/banners/banner4.webp"










export const nav_items = [
    {
        label: "Home",
        options: [{ label: "About Health U", path: "/about" }]
    },
    { label: "NDIS", path: "/ndis" },
    {
        label: "Services",
        options: [
            { label: "Community Participation", path: "/community-participation" },
            { label: "Capacity Building", path: "/capacity-building" },
            { label: "Support Coordination", path: "/support-coordination" },
            { label: "Assist In Self-care", path: "/assist-in-self-care" },
            { label: "Assist In Transport", path: "/assist-in-transport" },
            { label: "Home Modification", path: "/home-modification" },
            { label: "Non NDIS Service", path: "/compassion-in-action" },
            { label: "Gardening/House And Yard", path: "/gardening-house-yard" },
        ]
    },
    { label: "SIL House", path: "/sil-house" },
    { label: "Compassion in Action", path: "/compassion-in-action" },
    {
        label: "Events And News",
        options: [
            { label: "Current Events", path: "current-events" },
            { label: "Past Events", path: "past-events" },
        ]
    },
    { label: "Career", path: "/career" },
    { label: "Contact Us", path: "/contact-us" },
    { label: "Referral", path: "/referral" },
]



export const banner_slides = [banner1,banner2,banner3,banner4]