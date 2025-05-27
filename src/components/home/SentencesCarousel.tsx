'use client';

import { useEffect, useState } from 'react';

export default function SentencesCarousel() {
    const sentences = [
        '浮世三千，吾爱有三，日月与卿，日为朝，月为暮，卿为朝朝暮暮',
        'I love three things in this world. Sun,',
        ' moon and you. Sun for morning, moon for night , ',
        'and you forever'
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex(prev => (prev + 1) % sentences.length);
        }, 3000);
        return () => clearInterval(timer);
    }, [sentences.length]);

    return (
        <div
            className="mb-6 text-lg text-muted-foreground cursor-pointer relative h-20"
            onClick={() => setCurrentIndex(prev => (prev + 1) % sentences.length)}
        >
            {sentences.map((text, index) => (
                <p
                    key={index}
                    className={`absolute w-full transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${index === currentIndex
                            ? 'opacity-100 scale-100'
                            : 'opacity-0 scale-90'
                        }`}
                >
                    {text}
                </p>
            ))}
        </div>
    );
}