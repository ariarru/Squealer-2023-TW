import Card from './Card'
import Avatar from './Avatar'
import Link from 'next/link'
import ReactTimeAgo from 'react-time-ago'
import React, { useState } from 'react'
import moment from 'moment'
import { useEffect } from 'react'
import { useSupabaseClient } from '@supabase/auth-helpers-react'

export default function PrivateMessage ({
  content,
  created_at,
  photos,
  author
}) {

  console.log(photos)
  return (
    <Card>
      <div className='flex gap-3'>
        <div>
          <Link href={'/profile'}>
            <span className='cursor-pointer'>
              <Avatar url={author?.avatar} />
            </span>
          </Link>
        </div>
        <div className='flex flex-col'>
          <p className='text-gray-500 text-sm'>
            @{author?.username} - {moment(created_at).fromNow()}
          </p>
          <p>{content}</p>
          <br></br>
        </div>
      </div>

      <div className='my-4'>
        <p className='my-3 text-md'></p>

        <div className=''>
          {photos?.length > 0 && (
            <div className='mt-4'>
              {photos?.length === 4 ? (
                <table className='w-full'>
                  <tbody>
                    <tr>
                      <td className='p-2'>
                        <img
                          src={photos[0]}
                          className='w-full h-auto rounded-md object-cover'
                          alt=''
                        />
                      </td>
                      <td className='p-2'>
                        <img
                          src={photos[1]}
                          className='w-full h-auto rounded-md object-cover'
                          alt=''
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className='p-2'>
                        <img
                          src={photos[2]}
                          className='w-full h-auto rounded-md object-cover'
                          alt=''
                        />
                      </td>
                      <td className='p-2'>
                        <img
                          src={photos[3]}
                          className='w-full h-auto rounded-md object-cover'
                          alt=''
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              ) : (
                <div className='flex gap-2.5'>
                  {photos.map(photo => (
                    <div className='' key={photo}>
                      <img
                        src={photo}
                        className='w-auto h-40 rounded-md object-cover'
                        alt=''
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}