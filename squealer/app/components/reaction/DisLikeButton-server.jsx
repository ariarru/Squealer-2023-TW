import DisLikeButton from "./DisLikeButton";

const DisLikeButtonServer = (hasDisliked, handleDisLike, count, toDisable) => {
    return (
        <DisLikeButton
            hasDisliked={hasDisliked}
            handleDisLikes={() => handleDisLike(!hasDisliked)}
            count={count}
            toDisable={toDisable} />
    );
}

export default DisLikeButtonServer;
