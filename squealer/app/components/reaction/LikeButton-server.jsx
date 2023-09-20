import LikeButton from "./LikeButton";

const LikeButtonServer = (hasLiked, handleLike, count, toDisable) => {
    return (
        <LikeButton
            hasLiked={hasLiked}
            handleLikes={() => handleLike(!hasLiked)}
            count={count}
            toDisable={toDisable} />
    )
}

export default LikeButtonServer;
