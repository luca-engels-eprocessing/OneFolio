import React from 'react'
import Link from 'next/link'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Image from "next/image"

type Props = {
  name:string
  imageUrl?:string
  index:number
}

const AdvertCard = (props: Props) => {
  let imgUrl = props.imageUrl
  if(!imgUrl) imgUrl="/OneFolio.png"
  return (
    <div className="w-full h-full">
      <Link href={"https://www.google.com"}>
        <Card className='h-full w-full'>
          <CardHeader className="flex items-center justify-center p-6">
            <CardTitle >{props.name}</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <Image src={imgUrl} width={0} height={0} alt={props.name} sizes="50vh" className='w-full h-auto' />
          </CardContent>
          <CardFooter>
            <p>Werbung</p>
          </CardFooter>
        </Card>
      </Link>
    </div>
  )
}

export default AdvertCard