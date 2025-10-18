// app/api/rss/route.ts
import { NextResponse } from "next/server";
import { Feed } from "feed";
import Http, { PaginatedResponseDto } from "@/services/request";
import { IBlog } from "@/types/blog";

const getPostApi = async <T>() => {
  return (
    await (
      await Http.get(`v1/posts?page=1&limit=1000`)
    ).json<PaginatedResponseDto<T[]>>()
  ).data;
};

export async function GET() {
  const baseUrl = "https://blog.sunrise1024.top";

  const feed = new Feed({
    title: "朝阳的码农札记",
    description: "全栈开发者的技术分享与经验总结",
    id: baseUrl,
    link: baseUrl,
    language: "zh-CN",
    image: `${baseUrl}/og-image.png`,
    favicon: `${baseUrl}/favicon.ico`,
    copyright: `Copyright © ${new Date().getFullYear()} 朝阳的码农札记`,
    updated: new Date(),
    generator: "Next.js with Feed",
    feedLinks: {
      rss2: `${baseUrl}/api/rss`,
      json: `${baseUrl}/api/feed.json`,
      atom: `${baseUrl}/api/atom`,
    },
    author: {
      name: "朝阳",
      email: "your-email@example.com",
      link: "https://github.com/Sunrisies",
    },
  });

  const { data: posts } = await getPostApi<IBlog>();
  console.log(posts, "posts");
  posts.forEach((post) => {
    feed.addItem({
      title: post.title,
      id: `${baseUrl}/blog/${post.id}`,
      link: `${baseUrl}/blog/${post.uuid}`,
      description: post.description,
      content: post.content,
      author: [
        {
          name: "朝阳",
          email: "your-email@example.com",
          link: "https://github.com/Sunrisies",
        },
      ],
      contributor: [
        {
          name: "朝阳",
          email: "your-email@example.com",
          link: "https://github.com/Sunrisies",
        },
      ],
      date: new Date(post.publish_time),
      image: post.cover || `${baseUrl}/og-image.png`,
    });
  });

  return new NextResponse(feed.rss2(), {
    status: 200,
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
