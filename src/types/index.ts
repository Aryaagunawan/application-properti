// --- TYPESCRIPT INTERFACES ---
export interface Property {
    id: number;
    title: string;
    location: string;
    type: string;
    price: string;
    beds: number;
    baths: number;
    area: number;
    image: string;
    images: string[];
    desc: string;
}

export interface FilterState {
    location: string;
    type: string;
}

export interface ToastState {
    show: boolean;
    message: string;
    bgClass: string;
}

export interface FaqItem {
    question: string;
    answer: string;
}

export interface TestimonialItem {
    name: string;
    role: string;
    image: string;
    quote: string;
}

export interface NavLink {
    label: string;
    href: string;
}