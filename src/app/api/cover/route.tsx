import { ImageResponse } from 'next/og';

export const runtime = 'edge';

const alt = 'Cover Image';
const size = {
    width: 1200,
    height: 630,
};

const contentType = 'image/png';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get('title') || 'My Tech Blog';
    const summary = searchParams.get('summary') || 'Explore the latest in web development and technology.';

    return new ImageResponse(
        (
            <div
                style={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#0606f5ff', // zinc-950
                    backgroundImage: 'linear-gradient(to bottom right, #09090b, #18181b)', // zinc-950 to zinc-900
                    position: 'relative',
                }}
            >
                {/* Simple Radial Background */}
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundImage: 'radial-gradient(circle at 50% 50%, #27272a 0%, #09090b 100%)',
                    }}
                />

                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                        padding: '40px 80px',
                        zIndex: 10,
                    }}
                >
                    <div
                        style={{
                            fontSize: 60,
                            fontWeight: 900,
                            color: 'white',
                            lineHeight: 1.2,
                            marginBottom: 30,
                            textShadow: '0 10px 30px rgba(0,0,0,0.5)',
                        }}
                    >
                        {title}
                    </div>

                    <div
                        style={{
                            fontSize: 30,
                            color: '#a1a1aa', // zinc-400
                            lineHeight: 1.5,
                            maxWidth: '900px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                        }}
                    >
                        {summary}
                    </div>
                </div>

                <div
                    style={{
                        position: 'absolute',
                        bottom: 40,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                    }}
                >
                    <div
                        style={{
                            width: 40,
                            height: 40,
                            borderRadius: '50%',
                            background: 'linear-gradient(to right, #3b82f6, #8b5cf6)',
                        }}
                    />
                    <span style={{ fontSize: 24, color: '#e4e4e7', fontWeight: 600 }}>My Tech Blog</span>
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}
