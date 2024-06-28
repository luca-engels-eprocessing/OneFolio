import React from 'react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'

type Props = {
  name:string
  imageUrl:string
  index:number
}

const AdvertCard = (props: Props) => {
  return (
    <div className="p-1 w-full h-full">
      <Link href={"https://www.google.com"}>
        <Card className='h-full'>
          <CardContent className="flex items-center justify-center p-6">
            <span className="text-4xl font-semibold">Werbung: {props.name}</span>
          </CardContent>
        </Card>
      </Link>
    </div>
  )
}

export default AdvertCard