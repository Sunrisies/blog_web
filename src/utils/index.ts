export const generateHeadingId = (children: React.ReactNode) => {
    // 提取纯文本内容
    const getTextContent = (elements: React.ReactNode): string => {
        if (typeof elements === 'string') return elements
        if (Array.isArray(elements)) return elements.map(getTextContent).join('')
        if (elements?.props?.children) return getTextContent(elements.props.children)
        return ''
    }

    // 生成有效ID
    const text = getTextContent(children)
        .toLowerCase()
        .replace(/[^\w\u4e00-\u9fa5]+/g, '-') // 保留中文、英文、数字
        .replace(/^-+|-+$/g, '') // 去除首尾连接符

    // 或者使用浏览器原生方法
    return encodeURIComponent(text)
        .replace(/%/g, '')
        .substring(0, 50)
}
export const checkDeviceType = () => {
    let deviceType = 'desktop'
    if (window.matchMedia('(max-width: 767px)').matches) {
        deviceType = 'mobile'
    } else if (window.matchMedia('(min-width: 768px) and (max-width: 1023px)').matches) {
        deviceType = 'tablet'
    } else {
        deviceType = 'desktop'
    }
    return deviceType
};