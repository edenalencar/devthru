import { Graph, SoftwareApplication, BreadcrumbList, FAQPage, Person } from "schema-dts";
import { TOOL_FAQS } from "./faqs";

interface GetToolSchemaGraphProps {
    name: string;
    description: string;
    categoryLabel: string;
    path: string;
    toolSlug: string;
}

export function getToolSchemaGraph({
    name,
    description,
    categoryLabel,
    path,
    toolSlug
}: GetToolSchemaGraphProps): Graph {
    const personId = "https://www.devthru.com/#person/edenalencar";
    const appUrl = `https://www.devthru.com${path}`;

    const author: Person = {
        "@type": "Person",
        "@id": personId,
        "name": "Eden Alencar",
        "jobTitle": "Lead Developer & Founder",
        "url": "https://github.com/edenalencar",
        "sameAs": [
            "https://github.com/edenalencar",
            "https://www.linkedin.com/in/edenalencar"
        ]
    };

    const softwareApp: SoftwareApplication = {
        "@type": "SoftwareApplication",
        "name": `${name} - DevThru`,
        "operatingSystem": "Web",
        "applicationCategory": `${categoryLabel}Application`,
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "BRL"
        },
        "description": description,
        "url": appUrl,
        "author": { "@id": personId },
        "publisher": { "@id": personId }
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

    if (pathParts.length >= 2) {
        itemListElement.push({
            "@type": "ListItem",
            "position": 2,
            "name": "Ferramentas",
            "item": "https://www.devthru.com/ferramentas"
        });
    }

    if (pathParts.length >= 3) {
        itemListElement.push({
            "@type": "ListItem",
            "position": 3,
            "name": categoryLabel,
            "item": `https://www.devthru.com/tools/${pathParts[1]}`
        });
        itemListElement.push({
            "@type": "ListItem",
            "position": 4,
            "name": name,
            "item": appUrl
        });
    } else if (pathParts.length === 2) {
        itemListElement.push({
            "@type": "ListItem",
            "position": 3,
            "name": name,
            "item": appUrl
        });
    }

    const breadcrumbs: BreadcrumbList = {
        "@type": "BreadcrumbList",
        "itemListElement": itemListElement
    };

    const graph: any[] = [author, softwareApp, breadcrumbs];

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
            })),
            "author": { "@id": personId }
        };
        graph.push(faqPage);
    }

    return {
        "@context": "https://schema.org",
        "@graph": graph
    } as unknown as Graph;
}
