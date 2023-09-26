"use client"

import React, { useState, useEffect } from 'react'
import { useSpring, animated } from 'react-spring'
import { FaThumbsDown } from 'react-icons/fa'
import "@/styles/DisLikeButton.css"

function DisLikeButton({ isActive, onClick, fetchReactions }) {

  const [isMounted, setIsMounted] = useState(false)
  const [isActiveState, setIsActive] = useState(isActive)

  useEffect(() => setIsMounted(true)), []

  const thumbAnimation = useSpring({
    transform: isActiveState ? 'scale(1.2)' : 'scale(1)',
    color: isActiveState ? 'red' : 'gray',
  })

  const handleClick = () => {
    setIsActive(!isActiveState)
    onClick()
    fetchReactions()
  }

  if (!isMounted) return null

  return (

    <animated.button
      onClick={handleClick}
      style={thumbAnimation}
      className="dislike-button"
    >
      <FaThumbsDown />
    </animated.button>
  )
}

export default DisLikeButton