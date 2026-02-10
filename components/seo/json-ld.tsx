import { WithContext, SoftwareApplication, BreadcrumbList, Graph } from "schema-dts";

type JsonLdProps = {
    data: WithContext<SoftwareApplication> | WithContext<BreadcrumbList> | Graph;
};

export function JsonLd({ data }: JsonLdProps) {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
    );
}
