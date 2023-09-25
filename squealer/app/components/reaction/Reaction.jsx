"use client"
import { useEffect } from 'react'
import LikeButton from './LikeButton'
import DislikeButton from './DisLikeButton'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/navigation'
import LikeButtonServer from './LikeButton-server'

export default function Reaction({ postId, session }) {

    const supabase = createClientComponentClient({ cookies })
    const userId = session.user.id

    let likeSelectedState = false
    let dislikeSelectedState = false

    useEffect(() => {
        try {
            // Controllo che ci siano già like o dislike
            async function fetchReactions() {
                await supabase
                    .from('likes')
                    .select()
                    .match({
                        post_id: postId,
                        user_id: session.user.id
                    })
                    .then((result) => {
                        result?.data?.length > 0 ? likeSelectedState = true : likeSelectedState = false
                    })

                await supabase
                    .from('dislikes')
                    .select()
                    .match({
                        post_id: postId,
                        user_id: session.user.id
                    })
                    .then((result) => {
                        result?.data?.length > 0 ? dislikeSelectedState = true : dislikeSelectedState = false
                    })
            }
            fetchReactions()
        } catch (error) {
            console.log(error + 'Errore nel fetch dei like e dislike')
        }
    })

    const likeClickHandler = async () => {
        try {
            if (likeSelectedState)
                await removeLike()
            else
                await addLike()

            if (dislikeSelectedState)
                await removeDislike()

            console.log('like cliccato')
        } catch (error) {
            console.log(error, 'Errore nel like')
        }
    }

    const dislikeClickHandler = async () => {
        try {
            if (dislikeSelectedState)
                await removeDislike()
            else
                await addDislike()

            if (likeSelectedState)
                await removeLike()

            console.log('dislike cliccato')
        } catch (error) {
            console.log(error, 'Errore nel dislike')
        }
    }

    async function addLike() {
        try {
            await supabase
                .from('likes')
                .upsert([
                    {
                        post_id: postId,
                        user_id: userId
                    }])
                .then(() => {
                    likeSelectedState = !likeSelectedState
                })
        } catch (error) {
            console.log(error, 'Errore nel like')
        }
    }

    async function addDislike() {
        try {
            await supabase
                .from('dislikes')
                .upsert([
                    {
                        post_id: postId,
                        user_id: userId
                    }])
                .then(() => {
                    dislikeSelectedState = !dislikeSelectedState
                })
        } catch (error) {
            console.log(error, 'Errore nel like')
        }
    }

    async function removeLike() {
        try {
            await supabase
                .from('likes')
                .delete()
                .match({
                    post_id: postId,
                    user_id: session.user.id
                })
                .then(() => {
                    likeSelectedState = !likeSelectedState
                })
        } catch (error) {
            console.log(error, 'Errore nel like')
        }
    }

    async function removeDislike() {
        try {
            await supabase
                .from('dislikes')
                .delete()
                .match({
                    post_id: postId,
                    user_id: session.user.id
                })
                .then(() => {
                    dislikeSelectedState = !dislikeSelectedState
                })
        } catch (error) {
            console.log(error, 'Errore nel like')
        }
    }

    return (
        <div className='w-full h-[30px] flex inline gap-2.5'>
            <LikeButton
                active={likeSelectedState}
                onClick={likeClickHandler}
            />
            <DislikeButton
                active={dislikeSelectedState}
                onClick={dislikeClickHandler}
            />
        </div>
    )
}