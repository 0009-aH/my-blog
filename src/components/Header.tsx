import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';

export default function Header() {
    return (
        <header className="w-full border-b border-gray-200 dark:border-zinc-800 bg-white/70 dark:bg-[#0a0a0a]/70 backdrop-blur-md sticky top-0 z-50 transition-colors duration-300">
            <div className="container mx-auto max-w-4xl px-4 h-16 flex items-center justify-between">
                <Link href="/" className="text-xl font-bold tracking-tight">
                    Peng Ji&apos;s Blog
                </Link>
                <nav className="flex items-center gap-6 text-sm font-medium">
                    <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        Home
                    </Link>
                    <Link href="/about" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        About
                    </Link>
                    <ThemeToggle />
                </nav>
            </div>
        </header>
    );
}
