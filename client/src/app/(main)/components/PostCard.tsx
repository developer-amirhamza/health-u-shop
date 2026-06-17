import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface Type {
    title: string,
    subtitle: string,
    buttons: any,
    paragraph: string,
    image: any,
}
const PostCard: React.FC<Type> = ({ title, subtitle, buttons, paragraph, image }) => {
    return (
        <div className="flex w-full h-full items-center justify-start gap-10  not-even:flex-col-reverse sm:flex-row sm:not-even:flex-row-reverse py-12">
            <div className="flex w-full ">
                <Image src={image} alt={title} />
            </div>
            <div className="grid place-content-start place-items-center gap-5 ">
                <span className="text-base text-center uppercase tracking-widest">{subtitle}</span>
                <h1 className="text-4xl text-center font-semibold">{title} </h1>
                <p className="text-base text-center font-medium">{paragraph} </p>
                <div className="flex gap-5 items-center justify-center ">
                    {buttons.map((item: any, index: any) => {
                        return (
                            <Link key={index} href={item.path}
                                className='first:bg-primary first:text-white px-3.5 py-1.5 rounded-full  '
                            >{item.label}</Link>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default PostCard