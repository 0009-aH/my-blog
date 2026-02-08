export default function Footer() {
    return (
        <footer className="w-full border-t border-gray-200 dark:border-gray-800 py-8 mt-12 bg-gray-50 dark:bg-zinc-900">
            <div className="container mx-auto max-w-4xl px-4 text-center text-sm text-gray-500 dark:text-gray-400">
                <p>© {new Date().getFullYear()} My Tech Blog. Built with Next.js & MDX.</p>
                <div className="mt-4 flex justify-center gap-4">
                    <a href="#" className="hover:text-gray-900 dark:hover:text-gray-200">GitHub</a>
                    <a href="#" className="hover:text-gray-900 dark:hover:text-gray-200">Twitter</a>
                </div>
            </div>
        </footer>
    );
}
