/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://zootypes.com',
    generateRobotsTxt: true,
    sitemapSize: 7000,    // 페이지 수가 많아질 경우 자동 분할
    changefreq: 'weekly', // 검색봇에 추천하는 업데이트 주기
    priority: 0.7,
    robotsTxtOptions: {
        policies: [
            {
                userAgent: '*',
                allow: '/',
            },
        ],
    },
};
