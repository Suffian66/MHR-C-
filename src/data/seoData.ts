export interface SEOData {
    title: string;
    description: string;
    keywords: string[];
    canonical: string;
}

const BASE_URL = "https://www.magichammerrenovations.com";

export const seoData: Record<string, SEOData> = {
    home: {
        title:
            "Home Renovations Oakville, ON | Magic Hammer Renovations",

        description:
            "Transform your home with Magic Hammer Renovations in Oakville, Ontario. Explore kitchen, bathroom and basement renovations, drywall, home staging and window coverings.",

        keywords: [
            "home renovations Oakville",
            "home renovation contractors Oakville",
            "home remodeling Oakville",
            "renovation company Oakville",
        ],

        canonical: `${BASE_URL}/`,
    },

    about: {
        title:
            "Magic Hammer Renovations | About Our Oakville Team",

        description:
            "Learn about Magic Hammer Renovations, serving Oakville, Ontario with home renovation, kitchen and bathroom remodeling, basement finishing and interior improvement services.",

        keywords: [
            "Magic Hammer Renovations",
            "Oakville renovation company",
            "home renovation contractors Oakville",
            "renovation professionals Oakville",
        ],

        canonical: `${BASE_URL}/about`,
    },

    contact: {
        title:
            "Contact Magic Hammer Renovations | Oakville, Ontario",

        description:
            "Contact Magic Hammer Renovations in Oakville, Ontario to discuss your kitchen, bathroom, basement or home renovation project. Get in touch to plan your next home improvement.",

        keywords: [
            "contact renovation contractor Oakville",
            "Magic Hammer Renovations contact",
            "home renovation estimate Oakville",
            "renovation company Oakville",
        ],

        canonical: `${BASE_URL}/contact`,
    },

    portfolio: {
        title:
            "Home Renovation Portfolio Oakville | Magic Hammer",

        description:
            "Explore the Magic Hammer Renovations portfolio featuring kitchen renovations, bathroom makeovers, basement transformations, drywall work and home improvement projects in Oakville.",

        keywords: [
            "renovation portfolio Oakville",
            "kitchen renovation projects Oakville",
            "bathroom renovation projects Oakville",
            "home remodeling before and after",
        ],

        canonical: `${BASE_URL}/portfolio`,
    },

    kitchenRenovation: {
        title:
            "Kitchen Renovation Oakville, ON | Magic Hammer",

        description:
            "Upgrade your kitchen with Magic Hammer Renovations in Oakville, Ontario. Transform your layout, cabinetry and finishes with a kitchen renovation tailored to your home.",

        keywords: [
            "kitchen renovation Oakville",
            "kitchen remodeling Oakville",
            "kitchen renovation contractor Oakville",
            "kitchen remodel company Oakville",
        ],

        canonical: `${BASE_URL}/kitchen-renovation`,
    },

    bathroomRenovation: {
        title:
            "Bathroom Renovation Oakville, ON | Magic Hammer",

        description:
            "Refresh your bathroom with Magic Hammer Renovations in Oakville, Ontario. Explore bathroom remodeling options for modern showers, vanities, tile and functional layouts.",

        keywords: [
            "bathroom renovation Oakville",
            "bathroom remodeling Oakville",
            "bathroom renovation contractor Oakville",
            "bathroom remodel Oakville",
        ],

        canonical: `${BASE_URL}/bathroom-renovation`,
    },

    basementRenovation: {
        title:
            "Basement Renovation Oakville, ON | Magic Hammer",

        description:
            "Transform your unfinished or outdated basement with Magic Hammer Renovations in Oakville, Ontario. Create a more functional living space with professional basement renovation services.",

        keywords: [
            "basement renovation Oakville",
            "basement finishing Oakville",
            "basement remodeling Oakville",
            "basement renovation contractor Oakville",
        ],

        canonical: `${BASE_URL}/basement-renovation`,
    },

    drywall: {
        title:
            "Drywall Installation & Repair Oakville | Magic Hammer",

        description:
            "Need drywall installation or repair in Oakville, Ontario? Magic Hammer Renovations helps prepare and finish interior walls and ceilings for renovation and home improvement projects.",

        keywords: [
            "drywall installation Oakville",
            "drywall repair Oakville",
            "drywall contractors Oakville",
            "drywall finishing Oakville",
        ],

        canonical: `${BASE_URL}/drywall`,
    },

    homeStaging: {
        title:
            "Home Staging Oakville, ON | Magic Hammer Renovations",

        description:
            "Prepare your property for sale with home staging services from Magic Hammer Renovations in Oakville, Ontario. Enhance presentation and help buyers envision the space.",

        keywords: [
            "home staging Oakville",
            "home staging services Oakville",
            "property staging Oakville",
            "real estate staging Oakville",
        ],

        canonical: `${BASE_URL}/home-staging`,
    },

    blindsAndWindowCoverings: {
        title:
            "Blinds & Window Coverings Oakville | Magic Hammer",

        description:
            "Explore blinds and window coverings with Magic Hammer Renovations in Oakville, Ontario. Find stylish options to enhance privacy, manage natural light and complement your home.",

        keywords: [
            "blinds Oakville",
            "window coverings Oakville",
            "custom blinds Oakville",
            "window blinds installation Oakville",
        ],

        canonical: `${BASE_URL}/blinds-and-window-coverings`,
    },
};
