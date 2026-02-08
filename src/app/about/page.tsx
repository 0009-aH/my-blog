import Link from 'next/link';

export const metadata = {
    title: 'About Me - My Tech Blog',
    description: 'Learn more about me and my technical journey.',
};

function SocialLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
            {icon}
            <span>{label}</span>
        </a>
    );
}

function GithubIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
            <path d="M9 18c-4.51 2-5-2-7-2" />
        </svg>
    );
}

function TwitterIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
        </svg>
    );
}

function LinkedinIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
            <rect width="4" height="12" x="2" y="9" />
            <circle cx="4" cy="4" r="2" />
        </svg>
    );
}

export default function AboutPage() {
    return (
        <section className="prose prose-lg dark:prose-invert mx-auto py-12">
            <h1>About Me</h1>
            <p>
                Hello! I&apos;m a passionate developer building things for the web. This blog is a place where I share my learnings, thoughts, and technical tutorials.
            </p>

            <h2>Tech Stack</h2>
            <p>
                I specialize in the JavaScript ecosystem, particularly React, Next.js, and Node.js. I also love exploring new technologies and tools that improve developer experience.
            </p>

            <h2>Connect</h2>
            <div className="flex flex-col gap-4 not-prose">
                <SocialLink href="https://github.com" icon={<GithubIcon />} label="GitHub" />
                <SocialLink href="https://twitter.com" icon={<TwitterIcon />} label="Twitter / X" />
                <SocialLink href="https://linkedin.com" icon={<LinkedinIcon />} label="LinkedIn" />
            </div>

            <div className="mt-12 bg-gray-50 dark:bg-zinc-900 p-6 rounded-lg not-prose border border-gray-100 dark:border-zinc-800">
                <h3 className="text-xl font-bold mb-4">Contact</h3>
                <p className="text-gray-600 dark:text-gray-400">
                    Feel free to reach out via email at <a href="mailto:contact@example.com" className="text-blue-600 dark:text-blue-400 hover:underline">contact@example.com</a>.
                </p>
            </div>
        </section>
    );
}
