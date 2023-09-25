"use server"
import React from 'react';
import moment from 'moment';
import Link from 'next/link';
import Card from '../Card';
import Avatar from '../Avatar';
import Media from './Media';
import ReactionServer from '../reaction/Reaction-server';
import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

export default async function PostCard(
    {
        id,
        author,
        content,
        created_at,
        photos: uploads,
    }
) {
    const supabase = createServerComponentClient({ cookies })
    const { data: { session } } = await supabase.auth.getSession()

    console.log(session);
    return (
        <Card>
            <div className='flex gap-3'>
                <div>
                    <Link href={'/profile/' + author?.name}>
                        <span className='cursor-pointer'>
                            <Avatar url={author?.avatar} />
                        </span>
                    </Link>
                </div>
                <div className='flex flex-col'>
                    <p>
                        <Link href={'/profile/' + author?.id}>
                            <span className='font-semibold hover:underline cursor-pointer '>
                                {author}
                            </span>{' '}
                            shared a squeal
                        </Link>
                    </p>
                    <p className='text-gray-500 text-sm'>
                        {moment(created_at).fromNow()}
                    </p>
                </div>
            </div>

            <p className='my-5 text-md'>
                {content}
            </p>

            {uploads?.length > 0 && (
                <div
                    style={{
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'container',
                    }}
                    className='w-full h-full rounded-2xl bg-center'>
                    <Media uploads={uploads} />
                </div>
            )}

            <ReactionServer postId={id} />
        </Card >
    );
} 