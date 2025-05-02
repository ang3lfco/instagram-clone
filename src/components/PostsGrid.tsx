'use client'
import { Post } from '@prisma/client';
import Link from 'next/link';
import Masonry from 'react-masonry-css';

// const images = [
//     'https://picsum.photos/id/32/1024/768',
//     'https://picsum.photos/id/33/768/1024',
//     'https://picsum.photos/id/34/1024/768',
//     'https://picsum.photos/id/35/768/1024',
//     'https://picsum.photos/id/36/1024/768',
//     'https://picsum.photos/id/37/768/1024',
//     'https://picsum.photos/id/38/1024/768',
//     'https://picsum.photos/id/39/768/1024',
//     'https://picsum.photos/id/40/1024/768',
//     'https://picsum.photos/id/41/768/1024',
//     'https://picsum.photos/id/42/1024/768',
//     'https://picsum.photos/id/43/768/1024',
//     'https://picsum.photos/id/44/1024/768',
//     'https://picsum.photos/id/45/768/1024',
//     'https://picsum.photos/id/46/768/1024',
//     'https://picsum.photos/id/47/1024/768',
//     'https://picsum.photos/id/48/768/1024',
//     'https://picsum.photos/id/49/1024/768',
//     'https://picsum.photos/id/50/768/1024',
// ];

export default function PostsGrid({posts}:{posts:Post[]}){
    return(
        <div className='max-w-4xl mx-auto'>
            <Masonry
                breakpointCols={{
                    default: 4,
                    1100: 3,
                    700: 2,
                    500: 1
                }}
                className="flex -ml-4"
                columnClassName="pl-4">
                {posts.map((post, index) => (
                    <Link href={`/posts/${post.id}`} key={post.id} className='mb-4'>
                        <img src={post.image} alt=""/>
                    </Link>
                ))}
            </Masonry>
        </div>
    );
}