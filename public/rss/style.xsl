<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <xsl:output method="html" encoding="UTF-8" indent="yes"/>

  <xsl:template match="/">
    <html lang="zh-CN">
      <head>
        <meta charset="UTF-8"/>
        <title>朝阳的码农札记 - RSS Feed</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f8f9fa;
          }
          .header {
            text-align: center;
            margin-bottom: 2rem;
            padding-bottom: 1rem;
            border-bottom: 1px solid #eaeaea;
          }
          .header h1 {
            color: #2c3e50;
            margin-bottom: 0.5rem;
          }
          .header p {
            color: #7f8c8d;
            margin-top: 0;
          }
          .channel-desc {
            background: white;
            padding: 1.5rem;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            margin-bottom: 2rem;
            font-style: italic;
            color: #555;
          }
          .item {
            background: white;
            margin-bottom: 1.5rem;
            padding: 1.5rem;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }
          .item h2 {
            margin-top: 0;
            color: #2c3e50;
            font-size: 1.4rem;
          }
          .item h2 a {
            color: inherit;
            text-decoration: none;
          }
          .item h2 a:hover {
            color: #e74c3c;
          }
          .item .pubDate {
            color: #95a5a6;
            font-size: 0.9rem;
            margin-bottom: 0.5rem;
          }
          .item .description {
            color: #444;
          }
          .footer {
            text-align: center;
            margin-top: 2rem;
            padding-top: 1rem;
            border-top: 1px solid #eaeaea;
            color: #95a5a6;
            font-size: 0.9rem;
          }
          @media (max-width: 600px) {
            body {
              padding: 10px;
            }
            .item {
              padding: 1rem;
            }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>朝阳的码农札记</h1>
          <p>全栈开发者的技术分享与经验总结</p>
        </div>

        <div class="channel-desc">
          <xsl:value-of select="/rss/channel/description"/>
        </div>

        <xsl:for-each select="/rss/channel/item">
          <div class="item">
            <h2>
              <a>
                <xsl:attribute name="href">
                  <xsl:value-of select="link"/>
                </xsl:attribute>
                <xsl:value-of select="title"/>
              </a>
            </h2>
            <div class="pubDate">
              <xsl:variable name="pubDate" select="pubDate"/>
              <xsl:value-of select="concat(
                substring($pubDate, 6, 2), '/',
                substring($pubDate, 9, 2), '/',
                substring($pubDate, 1, 4), ' - ',
                substring($pubDate, 12, 5))"/>
            </div>
            <div class="description">
              <xsl:value-of select="description"/>
            </div>
          </div>
        </xsl:for-each>

        <div class="footer">
          <p>Copyright © <xsl:value-of select="substring(/rss/channel/pubDate, 1, 4)"/> 朝阳的码农札记</p>
          <p>通过 <a href="https://sunrise1024.top">sunrise1024.top</a> 订阅此 Feed</p>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>