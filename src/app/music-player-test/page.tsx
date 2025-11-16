'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function MusicPlayerTestPage() {
  const [testResults, setTestResults] = useState<string[]>([]);

  const runTests = () => {
    const results: string[] = [];
    
    // 测试1: 检查音乐播放器组件是否加载
    const playerElement = document.querySelector('[aria-label*="音乐"]') || 
                         document.querySelector('[aria-label*="播放"]') ||
                         document.querySelector('button[class*="purple"]');
    
    if (playerElement) {
      results.push('✅ 音乐播放器组件成功加载');
    } else {
      results.push('❌ 音乐播放器组件未找到');
    }

    // 测试2: 检查播放按钮
    const playButton = document.querySelector('button[class*="purple"]') as HTMLButtonElement;
    if (playButton) {
      results.push('✅ 播放按钮存在且可见');
      
      // 模拟点击测试
      playButton.click();
      setTimeout(() => {
        const musicIcon = playButton.querySelector('svg');
        if (musicIcon) {
          results.push('✅ 播放按钮图标显示正常');
        } else {
          results.push('❌ 播放按钮图标显示异常');
        }
      }, 100);
    } else {
      results.push('❌ 播放按钮未找到');
    }

    // 测试3: 检查响应式设计
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      results.push('📱 检测到移动端视图');
    } else {
      results.push('💻 检测到桌面端视图');
    }

    // 测试4: 检查主题适配
    const darkMode = document.documentElement.classList.contains('dark');
    if (darkMode) {
      results.push('🌙 检测到暗色主题');
    } else {
      results.push('☀️ 检测到亮色主题');
    }

    setTestResults(results);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8">
      <div className="max-w-4xl mx-auto">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">🎵 音乐播放器测试页面</CardTitle>
            <CardDescription>
              测试新添加的音乐播放器功能是否正常工作
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">功能说明：</h3>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• 右下角圆形播放按钮（48px直径，Material Design风格）</li>
                  <li>• 点击按钮展开音乐列表面板（300px高，200px宽）</li>
                  <li>• 支持播放/暂停切换，显示当前播放状态</li>
                  <li>• 音乐列表包含封面、歌曲名、歌手信息</li>
                  <li>• 支持点击列表中的歌曲进行播放</li>
                  <li>• 移动端适配：底部弹出面板</li>
                  <li>• 暗色/亮色主题支持</li>
                  <li>• 平滑动画效果（300ms过渡）</li>
                </ul>
              </div>

              <Button onClick={runTests} className="w-full">
                运行测试
              </Button>

              {testResults.length > 0 && (
                <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <h4 className="font-semibold mb-3">测试结果：</h4>
                  <div className="space-y-2">
                    {testResults.map((result, index) => (
                      <div key={index} className="text-sm">
                        {result}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>🎯 测试指南</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div>
                  <h4 className="font-medium">1. 播放按钮测试</h4>
                  <p className="text-muted-foreground">
                    点击右下角的圆形播放按钮，检查是否能正常展开/收起音乐面板
                  </p>
                </div>
                <div>
                  <h4 className="font-medium">2. 音乐列表测试</h4>
                  <p className="text-muted-foreground">
                    在音乐面板中点击任意歌曲，检查是否能正常播放
                  </p>
                </div>
                <div>
                  <h4 className="font-medium">3. 响应式测试</h4>
                  <p className="text-muted-foreground">
                    调整浏览器窗口大小，检查移动端适配效果
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>🎨 设计验证</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div>
                  <h4 className="font-medium">Material Design风格</h4>
                  <p className="text-muted-foreground">
                    圆形播放按钮采用渐变背景和阴影效果
                  </p>
                </div>
                <div>
                  <h4 className="font-medium">动画效果</h4>
                  <p className="text-muted-foreground">
                    面板展开/收起有平滑的300ms过渡动画
                  </p>
                </div>
                <div>
                  <h4 className="font-medium">主题适配</h4>
                  <p className="text-muted-foreground">
                    在暗色和亮色主题下都有良好的可视性
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            💡 提示：音乐播放器组件已集成到所有页面，您可以在任何页面看到右下角的播放按钮
          </p>
        </div>
      </div>
    </div>
  );
}