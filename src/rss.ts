import { sites } from './sites';

export const rss = async (siteName: string): Promise<string> => {
    const site = sites.get(siteName);

    if (!site) {
        return '';
    }

    const { fetch, name, url } = site;
    const posts = await fetch();

    return `
        <?xml version="1.0" encoding="UTF-8" ?>
        <rss version="2.0">
            <channel>
                <title>${name}</title>
                <description>${name}</description>
                <link>${url}</link>
                <ttl>720</ttl>
                ${posts
                    .map(
                        (post) => `
                    <item>
                        <title>${post.title}</title>
                        <description>${post.description}</description>
                        <guid>${post.link}</guid>
                        <link>${post.link}</link>
                        <pubDate>${post.date}</pubDate>
                    </item>
                `,
                    )
                    .join('')}
            </channel>
        </rss>
    `.trim();
};
