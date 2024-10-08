'use client'
import useSWR from 'swr'
import { JSend, JSendError } from '@/lib/api/jsend'
import { jsonFetcher, stringifyError } from '@/lib/utils/client'
import PostRenderer from '../post/[slug]/PostRenderer'
import Card from './Card'
import { DashboardInfoResponse } from './info/route'

export default function Cards() {
    const { data, error, isLoading } = useSWR<JSend<DashboardInfoResponse>>(
        '/dashboard/info',
        jsonFetcher,
        {
            refreshInterval: 30_000,
        }
    )

    if (isLoading) {
        return <div>Loading...</div>
    } else if (error || data?.status !== 'success') {
        return (
            <div>
                Error:{' '}
                {error ? stringifyError(error) : (data as JSendError)?.message}
            </div>
        )
    }

    return (
        <div className="flex flex-col md:flex-row gap-5 justify-center items-start">
            {data.data.posts.map((post, index) =>
                index == 0 ? (
                    <Card
                        key={post.slug}
                        className="max-w-[450px]"
                        // cardStyle={post.cardStyle}
                        href={
                            post.contentSource
                                ? `/post/${post.slug}`
                                : undefined
                        }
                    >
                        <PostRenderer
                            post={post}
                            sourceType="briefSource"
                            context={data.data.ctx}
                        />
                    </Card>
                ) : (
                    <></>
                )
            ) ?? 'Loading...'}
            <div className="flex flex-col gap-3 flex-1 w-full">
                {data.data.posts.map((post, index) =>
                    index != 0 ? (
                        <Card
                            key={post.slug}
                            className="max-w-[450px] flex-1 w-full"
                            // cardStyle={post.cardStyle}
                            href={
                                post.contentSource
                                    ? `/post/${post.slug}`
                                    : undefined
                            }
                        >
                            <PostRenderer
                                post={post}
                                sourceType="briefSource"
                                context={data.data.ctx}
                            />
                        </Card>
                    ) : (
                        <></>
                    )
                ) ?? 'Loading...'}
            </div>
        </div>
    )
}
