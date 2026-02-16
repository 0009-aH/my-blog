export default function Footer() {
    return (
        <footer className="w-full border-t border-gray-200 dark:border-zinc-800 py-8 mt-12 bg-gray-50 dark:bg-zinc-900/50">
            <div className="container mx-auto max-w-4xl px-4 text-center text-sm text-gray-500 dark:text-zinc-500">
                <p>© {new Date().getFullYear()} Peng Ji. Built with Next.js & MDX.</p>
                <div className="mt-4 flex justify-center gap-4">
                    <a href="https://github.com/0009-aH" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">GitHub</a>
                </div>
            </div>
        </footer>
    );
}
