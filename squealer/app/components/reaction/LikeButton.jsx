"use client"

import React, { useState, useEffect } from 'react'
import { useSpring, animated } from 'react-spring'
import { FaThumbsUp } from 'react-icons/fa'
import "@/styles/LikeButton.css"

function LikeButton({ active, onClick }) {
    const [isMounted, setIsMounted] = useState(false)
    const [isActive, setIsActive] = useState(active)

    useEffect(() => setIsMounted(true)), []


    const thumbAnimation = useSpring({
        transform: isActive ? 'scale(1.2)' : 'scale(1)',
        color: isActive ? 'green' : 'gray',
    })

    const handleClick = () => {
        setIsActive(!isActive)
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