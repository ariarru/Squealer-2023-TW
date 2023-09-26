"use client"

import React, { useState, useEffect } from 'react'
import { useSpring, animated } from 'react-spring'
import { FaThumbsUp } from 'react-icons/fa'
import "@/styles/LikeButton.css"

function LikeButton({ isActive, onClick, fetchReactions }) {

    const [isMounted, setIsMounted] = useState(false)
    const [isActiveState, setIsActive] = useState(isActive)

    useEffect(() => setIsMounted(true)), []


    const thumbAnimation = useSpring({
        transform: isActiveState ? 'scale(1.2)' : 'scale(1)',
        color: isActiveState ? 'green' : 'gray',
    })

    const handleClick = async () => {
        setIsActive(!isActiveState)
        fetchReactions()
        onClick()
    }

    if (!isMounted) return null

    return (

        <animated.button
            onClick={handleClick}
            style={thumbAnimation}
            className="like-button"
        >
            <FaThumbsUp />
        </animated.button>
    )
}

export default LikeButton