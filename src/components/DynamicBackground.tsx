'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

type Season = 'spring' | 'summer' | 'autumn' | 'winter';

export default function DynamicBackground() {
    const [season, setSeason] = useState<Season>('spring');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const month = new Date().getMonth(); // 0-indexed (0 = Jan, 11 = Dec)
        
        // Logical seasons in China
        // Spring: Mar (2), Apr (3), May (4)
        // Summer: Jun (5), Jul (6), Aug (7)
        // Autumn: Sep (8), Oct (9), Nov (10)
        // Winter: Dec (11), Jan (0), Feb (1)
        
        if (month >= 2 && month <= 4) setSeason('spring');
        else if (month >= 5 && month <= 7) setSeason('summer');
        else if (month >= 8 && month <= 10) setSeason('autumn');
        else setSeason('winter');
    }, []);

    // Prevent hydration mismatch
    if (!mounted) {
        return <div className="fixed inset-0 z-[-2] bg-[#f8fafc] dark:bg-[#0a0a0a]" />;
    }

    const seasonImages: Record<Season, string> = {
        spring: '/backgrounds/spring.png',
        summer: '/backgrounds/summer.png',
        autumn: '/backgrounds/autumn.png',
        winter: '/backgrounds/winter.png',
    };

    return (
        <div className="fixed inset-0 z-[-2] overflow-hidden">
            {/* Background Image */}
            <Image
                src={seasonImages[season]}
                alt={`${season} background`}
                fill
                quality={85}
                priority // Always load background quickly
                className="object-cover animate-fade-in transition-opacity duration-1000"
                sizes="100vw"
            />
            {/* Readability Overlay (Optimized for performance: removed backdrop-blur) */}
            <div className="absolute inset-0 bg-white/80 dark:bg-black/85 pointer-events-none transition-colors duration-500" />
        </div>
    );
}
