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
                disallow: '/api', // api 이하만 차단, 나머지 전체 허용(이유는 백엔드 엔드포인트용이라 사람이나 검색엔진에게 보여줄 콘텐츠가 아님)
            },
        ],
    },
};