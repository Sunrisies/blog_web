import { headers } from 'next/headers'
import { UAParser } from 'ua-parser-js'

// 定义客户端信息的类型
export interface ClientInfo {
  browser: UAParser.IBrowser;
  device: UAParser.IDevice;
  os: UAParser.IOS;
  engine: UAParser.IEngine;
  cpu: UAParser.ICPU;
}

// 定义请求头信息的类型
export interface RequestHeaders {
  'X-Real-IP': string;
  'X-Forwarded-For': string;
  acceptLanguage: string;
  userAgent: string;
  referer: string;
  method: string;
  protocol: string;
  secChUa: string;
  secChUaMobile: string;
  secChUaPlatform: string;
  secFetchDest: string;
  secFetchMode: string;
  secFetchSite: string;
  secFetchUser: string;
  upgradeInsecureRequests: string;
  accept: string;
  clientInfo: string;
}

// 获取客户端信息的通用函数
export const getClientInfo = async (): Promise<RequestHeaders> => {
  const headersList = await headers()

  // 获取基础请求头信息
  const baseHeaders = {
    'X-Real-IP': headersList.get('x-real-ip') || '',
    'X-Forwarded-For': headersList.get('x-forwarded-for') || '',
    'acceptLanguage': headersList.get('accept-language') || '',
    "userAgent": headersList.get('user-agent') || '',
    "referer": headersList.get('referer') || '',
    "method": headersList.get('method') || '',
    "protocol": headersList.get('protocol') || '',
    "secChUa": headersList.get('sec-ch-ua') || '',
    "secChUaMobile": headersList.get('sec-ch-ua-mobile') || '',
    "secChUaPlatform": headersList.get('sec-ch-ua-platform') || '',
    "secFetchDest": headersList.get('sec-fetch-dest') || '',
    "secFetchMode": headersList.get('sec-fetch-mode') || '',
    "secFetchSite": headersList.get('sec-fetch-site') || '',
    "secFetchUser": headersList.get('sec-fetch-user') || '',
    "upgradeInsecureRequests": headersList.get('upgrade-insecure-requests') || '',
    "accept": headersList.get('accept') || '',
  }

  // 解析用户代理信息
  const userAgentInfo = new UAParser(baseHeaders.userAgent).getResult()

  // 获取客户端详细信息
  const clientInfo: ClientInfo = {
    browser: userAgentInfo.browser,
    device: userAgentInfo.device,
    os: userAgentInfo.os,
    engine: userAgentInfo.engine,
    cpu: userAgentInfo.cpu
  }

  // 返回完整的请求头信息
  return {
    ...baseHeaders,
    clientInfo: JSON.stringify(clientInfo)
  }
}