import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'About Peng Ji',
    description: 'Learn more about Peng Ji (0009-aH), a developer from Soochow University.',
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

export default function AboutPage() {
    return (
        <section className="prose prose-lg dark:prose-invert mx-auto py-12">
            <h1>About Peng Ji</h1>
            <p>
                Hi! I&apos;m Peng Ji (also known as <code>0009-aH</code>), a developer and student at <strong>Soochow University</strong> in Suzhou, China.
            </p>
            <p>
                This blog is where I document my journey in software development, share technical insights, and explore new technologies.
            </p>

            <h2>Tech Stack</h2>
            <p>
                I&apos;m passionate about the modern web ecosystem. My current focus includes:
            </p>
            <ul>
                <li><strong>Frontend:</strong> React, Next.js, Tailwind CSS</li>
                <li><strong>Backend:</strong> Node.js, Serverless</li>
                <li><strong>Tools:</strong> Git, VS Code</li>
            </ul>

            <h2>Connect</h2>
            <div className="flex flex-col gap-4 not-prose">
                <SocialLink href="https://github.com/0009-aH" icon={<GithubIcon />} label="GitHub (@0009-aH)" />
            </div>

            <div className="mt-12 bg-gray-50 dark:bg-zinc-900 p-6 rounded-lg not-prose border border-gray-100 dark:border-zinc-800">
                <h3 className="text-xl font-bold mb-4">Contact</h3>
                <p className="text-gray-600 dark:text-gray-400">
                    You can find me on GitHub or reach out via email if you have any questions or collaboration ideas.
                </p>
            </div>
        </section>
    );
}
