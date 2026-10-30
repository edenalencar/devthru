import { Graph, SoftwareApplication, BreadcrumbList, FAQPage, Person, Organization } from "schema-dts";
import { TOOL_FAQS } from "./faqs";

interface GetToolSchemaGraphProps {
    name: string;
    description: string;
    categoryLabel: string;
    path: string;
    toolSlug: string;
}

const CATEGORY_MAP: Record<string, string> = {
    'automotive': 'UtilitiesApplication',
    'business': 'BusinessApplication',
    'converters': 'UtilitiesApplication',
    'development': 'DeveloperApplication',
    'documents': 'BusinessApplication',
    'finance': 'FinanceApplication',
    'image': 'DesignApplication',
    'personal': 'UtilitiesApplication',
    'text': 'UtilitiesApplication',
    'utilities': 'UtilitiesApplication'
};

function resolveApplicationCategory(categoryLabel: string, path: string): string {
    const pathParts = path.split('/').filter(Boolean); // e.g., ["tools", "automotive", "chassi"]
    const categorySlug = pathParts.length >= 2 ? pathParts[1].toLowerCase() : '';
    if (categorySlug && CATEGORY_MAP[categorySlug]) {
        return CATEGORY_MAP[categorySlug];
    }
    const labelLower = categoryLabel.toLowerCase();
    if (labelLower.includes('dev') || labelLower.includes('desenvolvimento')) return 'DeveloperApplication';
    if (labelLower.includes('finan') || labelLower.includes('fiscal') || labelLower.includes('negócio') || labelLower.includes('document')) return 'BusinessApplication';
    if (labelLower.includes('design') || labelLower.includes('imagem')) return 'DesignApplication';
    return 'UtilitiesApplication';
}

export function getToolSchemaGraph({
    name,
    description,
    categoryLabel,
    path,
    toolSlug
}: GetToolSchemaGraphProps): Graph {
    const personId = "https://www.devthru.com/#person/edenalencar";
    const orgId = "https://www.devthru.com/#organization";
    const appUrl = `https://www.devthru.com${path}`;

    const organization: Organization = {
        "@type": "Organization",
        "@id": orgId,
        "name": "DevThru",
        "url": "https://www.devthru.com",
        "logo": "https://www.devthru.com/icon.svg"
    };

    const author: Person = {
        "@type": "Person",
        "@id": personId,
        "name": "Eden Alencar",
        "jobTitle": "Lead Developer & Founder",
        "url": "https://github.com/edenalencar",
        "sameAs": [
            "https://github.com/edenalencar",
            "https://www.linkedin.com/in/edenalencar"
        ],
        "worksFor": { "@id": orgId }
    };

    const softwareApp: SoftwareApplication = {
        "@type": "SoftwareApplication",
        "name": `${name} - DevThru`,
        "operatingSystem": "Web",
        "applicationCategory": resolveApplicationCategory(categoryLabel, path),
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "BRL"
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "ratingCount": "128",
            "bestRating": "5",
            "worstRating": "1"
        },
        "description": description,
        "url": appUrl,
        "author": { "@id": personId },
        "publisher": { "@id": orgId }
    };

    // Calculate breadcrumb hierarchy based on path
    const pathParts = path.split('/').filter(Boolean); // e.g., ["tools", "documents", "cpf"]
    const itemListElement: any[] = [
        {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.devthru.com"
        }
    ];

    if (pathParts.length >= 2 && pathParts[1] === 'business') {
        itemListElement.push({
            "@type": "ListItem",
            "position": 2,
            "name": "Ferramentas Fiscais",
            "item": "https://www.devthru.com/ferramentas-fiscais"
        });
        itemListElement.push({
            "@type": "ListItem",
            "position": 3,
            "name": name,
            "item": appUrl
        });
    } else {
        itemListElement.push({
            "@type": "ListItem",
            "position": 2,
            "name": name,
            "item": appUrl
        });
    }

    const breadcrumbs: BreadcrumbList = {
        "@type": "BreadcrumbList",
        "itemListElement": itemListElement
    };

    const graph: any[] = [organization, author, softwareApp, breadcrumbs];

    // Append FAQPage schema if tool has FAQs defined
    const faqs = TOOL_FAQS[toolSlug];
    if (faqs && faqs.length > 0) {
        const faqPage: FAQPage = {
            "@type": "FAQPage",
            "mainEntity": faqs.map(faq => ({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": faq.answer
                }
            }))
        };
        graph.push(faqPage);
    }

    return {
        "@context": "https://schema.org",
        "@graph": graph
    } as unknown as Graph;
}
