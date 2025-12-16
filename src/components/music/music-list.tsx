'use client'

import { useMusicPlayer } from '@/hooks/use-music-player'
import { cn } from '@/lib/utils'
import { IMusic } from '@/types/music'
import { Pause, Play } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'

interface MusicListProps {
  onMusicSelect: (music: IMusic) => void
  currentMusic: IMusic | null
}

export function MusicList({ onMusicSelect, currentMusic }: MusicListProps) {
  const [musicList, setMusicList] = useState<IMusic[]>([])
  const [loading, setLoading] = useState(true)
  const { isPlaying } = useMusicPlayer()

  useEffect(() => {
    fetchMusicList()
  }, [])

  const fetchMusicList = async () => {
    try {
      setLoading(true)

      // 首先尝试使用模拟数据，避免API调用问题
      setMusicList(getMockMusicList())

      // 如果后续需要真实API数据，可以在这里添加
      // const response = await Http.get('v1/music/list?limit=10').json<IMusicListResponse>();
      // if (response.data?.data && response.data.data.length > 0) {
      //   setMusicList(response.data.data);
      // }
    } catch (error) {
      console.warn('获取音乐列表失败，使用模拟数据:', error)
      setMusicList(getMockMusicList())
    } finally {
      setLoading(false)
    }
  }

  const getMockMusicList = (): IMusic[] => {
    return [
      {
        id: 1,
        title: "夜曲",
        artist: "周杰伦",
        cover: "https://picsum.photos/200/200?random=1",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        duration: 226,
        album: "十一月的萧邦",
        lyrics: `[00:12.50]一群嗜血的蚂蚁
[00:15.20]被腐肉所吸引
[00:18.00]我面无表情
[00:20.50]看孤独的风景
[00:23.30]失去你
[00:25.80]爱恨开始分明
[00:28.60]失去你
[00:31.20]还有什么事好关心`
      },
      {
        id: 2,
        title: "稻香",
        artist: "周杰伦",
        cover: "https://picsum.photos/200/200?random=2",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
        duration: 223,
        album: "魔杰座",
        lyrics: `[00:15.20]对这个世界如果你有太多的抱怨
[00:18.50]跌倒了就不敢继续往前走
[00:22.00]为什么人要这么的脆弱 堕落
[00:28.80]请你打开电视看看
[00:31.50]多少人为生命在努力勇敢的走下去`
      },
      {
        id: 3,
        title: "青花瓷",
        artist: "周杰伦",
        cover: "https://picsum.photos/200/200?random=3",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
        duration: 228,
        album: "我很忙",
        lyrics: `[00:18.50]素胚勾勒出青花笔锋浓转淡
[00:22.20]瓶身描绘的牡丹一如你初妆
[00:26.00]冉冉檀香透过窗心事我了然
[00:29.80]宣纸上走笔至此搁一半
[00:33.50]釉色渲染仕女图韵味被私藏`
      },
      {
        id: 4,
        title: "告白气球",
        artist: "周杰伦",
        cover: "https://picsum.photos/200/200?random=4",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
        duration: 207,
        album: "周杰伦的床边故事",
        lyrics: `[00:12.50]塞纳河畔 左岸的咖啡
[00:16.20]我手一杯 品尝你的美
[00:19.80]留下唇印的嘴
[00:23.50]花店玫瑰 名字写错谁
[00:27.20]告白气球 风吹到对街`
      },
      {
        id: 5,
        title: "七里香",
        artist: "周杰伦",
        cover: "https://picsum.photos/200/200?random=5",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
        duration: 299,
        album: "七里香",
        lyrics: `[00:15.20]窗外的麻雀在电线杆上多嘴
[00:18.80]你说这一句很有夏天的感觉
[00:22.50]手中的铅笔在纸上来来回回
[00:26.20]我用几行字形容你是我的谁`
      },
      {
        id: 6,
        title: "晴天",
        artist: "周杰伦",
        cover: "https://picsum.photos/200/200?random=6",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
        duration: 269,
        album: "叶惠美",
        lyrics: `[00:20.50]故事的小黄花
[00:23.20]从出生那年就飘着
[00:26.80]童年的荡秋千
[00:29.50]随记忆一直晃到现在`
      },
      {
        id: 7,
        title: "简单爱",
        artist: "周杰伦",
        cover: "https://picsum.photos/200/200?random=7",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
        duration: 258,
        album: "范特西",
        lyrics: `[00:12.50]说不上为什么 我变得很主动
[00:16.20]若爱上一个人什么都会值得去做
[00:19.80]我想大声宣布 对你依依不舍
[00:23.50]连隔壁邻居都猜到我现在的感受`
      },
      {
        id: 8,
        title: "不能说的秘密",
        artist: "周杰伦",
        cover: "https://picsum.photos/200/200?random=8",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
        duration: 246,
        album: "不能说的秘密",
        lyrics: `[00:15.20]冷咖啡离开了杯垫
[00:18.80]我忍住的情绪在很后面
[00:22.50]拼命想挽回的从前
[00:26.20]在我脸上依旧清晰可见`
      }
    ]
  }

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  if (loading) {
    return (
      <div className="p-4 space-y-3">
        { [1, 2, 3].map((i) => (
          <div key={ i } className="flex items-center space-x-3 animate-pulse">
            <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-md" />
            <div className="flex-1 space-y-2">
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
            </div>
          </div>
        )) }
      </div>
    )
  }

  if (musicList.length === 0) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        <p>暂无音乐</p>
      </div>
    )
  }

  return (
    <div className="max-h-[240px] overflow-y-auto">
      <div className="p-2 space-y-1">
        { musicList.map((music) => {
          const isCurrentMusic = currentMusic?.id === music.id
          const isCurrentPlaying = isCurrentMusic && isPlaying

          return (
            <div
              key={ music.id }
              onClick={ () => onMusicSelect(music) }
              className={ cn(
                'flex items-center space-x-3 p-3 rounded-lg cursor-pointer',
                'hover:bg-accent hover:text-accent-foreground transition-colors',
                'group',
                isCurrentMusic && 'bg-accent text-accent-foreground'
              ) }
            >
              {/* 封面图片 */ }
              <div className="relative w-10 h-10 flex-shrink-0">
                <Image
                  src={ music.cover }
                  alt={ music.title }
                  width={ 40 }
                  height={ 40 }
                  className="rounded-md object-cover"
                />
                {/* 播放状态覆盖层 */ }
                <div className={ cn(
                  'absolute inset-0 bg-black bg-opacity-50 rounded-md flex items-center justify-center',
                  'opacity-0 group-hover:opacity-100 transition-opacity',
                  isCurrentMusic && 'opacity-100'
                ) }>
                  { isCurrentPlaying ? (
                    <Pause className="w-4 h-4 text-white" />
                  ) : (
                    <Play className="w-4 h-4 text-white" />
                  ) }
                </div>
              </div>

              {/* 歌曲信息 */ }
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <p className={ cn(
                      'text-sm font-medium truncate',
                      isCurrentMusic && 'text-primary'
                    ) }>
                      { music.title }
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      { music.artist }
                      { music.album && ` · ${music.album}` }
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground ml-2">
                    { formatDuration(music.duration) }
                  </span>
                </div>
              </div>
            </div>
          )
        }) }
      </div>
    </div>
  )
}