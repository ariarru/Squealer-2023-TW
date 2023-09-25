import dynamic from 'next/dynamic';

const LikeButtonServer = (active, onClick) => {
    const LikeButton = dynamic(() => import('../reaction/Reaction'), { ssr: false })

    return (
        <LikeButton
            active={active}
            onClick={onClick}
        />
    )
}

export default LikeButtonServer;
