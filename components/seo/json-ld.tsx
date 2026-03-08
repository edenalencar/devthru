import { WithContext, SoftwareApplication, BreadcrumbList, Graph, BlogPosting, TechArticle, ItemList } from "schema-dts";

type JsonLdProps = {
    data: WithContext<SoftwareApplication> | WithContext<BreadcrumbList> | Graph | WithContext<BlogPosting> | WithContext<TechArticle> | WithContext<ItemList>;
};

export function JsonLd({ data }: JsonLdProps) {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
    );
}
