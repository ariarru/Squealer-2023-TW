"use client"

import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react'
import LikeButton from './LikeButton'
import DislikeButton from './DisLikeButton'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/navigation';

export default function Reaction({ postId, session }) {

    const [likeSelected, setLikeSelected] = useState(false)
    const [disLikeSelected, setDisLikeSelected] = useState(false)
    
    const router = useRouter()

    const supabase = createClientComponentClient({ cookies })
    const userId = session.user.id

    useEffect(() => {
        fetchReactions()
    }), []

    async function fetchReactions() {
        try {
            await supabase
                .from('likes')
                .select()
                .match({
                    post_id: postId,
                    user_id: userId
                })
                .then((result) => {
                    result?.data?.length > 0 ? setLikeSelected(true) : setLikeSelected(false)
                })

            await supabase
                .from('dislikes')
                .select()
                .match({
                    post_id: postId,
                    user_id: userId
                })
                .then((result) => {
                    result?.data?.length > 0 ? setDisLikeSelected(true) : setDisLikeSelected(false)
                })
        } catch (error) {
            console.log(error + 'Errore nel fetch dei like e dislike')
        }
    }

    const likeClickHandler = async () => {
        try {
            if (likeSelected)
                await removeLike()
            else
                await addLike()

            if (disLikeSelected)
                await removeDislike()
            router.refresh()
            console.log('like cliccato')
        } catch (error) {
            console.log(error, 'Errore nel like')
        }
    }

    const dislikeClickHandler = async () => {
        try {
            if (disLikeSelected)
                await removeDislike()
            else
                await addDislike()

            if (setLikeSelected())
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
                    setLikeSelected(!likeSelected)
                })
        } catch (error) {
            console.log(error, 'Errore nel like')
            console.log("errorino stupido spero");
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
                    setDisLikeSelected(!disLikeSelected)
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
                    user_id: userId
                })
                .then(() => {
                    setLikeSelected(!likeSelected)
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
                    user_id: userId
                })
                .then(() => {
                    setDisLikeSelected(!disLikeSelected)
                })
        } catch (error) {
            console.log(error, 'Errore nel like')
        }
    }

    return (
        <div className='w-full h-[30px] flex inline gap-2.5'>

            <div>Post number {postId}</div>
            {/* è per comodità, poi lo togliamo */}
            <LikeButton
                isActive={likeSelected}
                fetchReactions={fetchReactions}
                onClick={likeClickHandler}
            />
            <DislikeButton
                isActive={disLikeSelected}
                fetchReactions={fetchReactions}
                onClick={dislikeClickHandler}
            />
        </div>
    )
}