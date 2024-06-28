"use server"
import React from 'react'
import * as C from "@/components/ui/carousel"
import { Card,CardContent } from '../ui/card'
import AdvertCard from './AdvertCard'


type Props = {}

export const AdvertBar = (props: Props) => {
  return (
  <div className="p-4 xl:w-[15vw] w-auto border-def rounded-xl xl:h-fit h-1/5 bg-sec flex flex-col justify-between xl:mr-8 xl:mb-8 xl:mt-32">
    <C.Carousel className="flex flex-col justify-between w-full h-full xl:grid" orientation='vertical' opts={{loop:true}} delay={5000}>
      <C.CarouselContent className='h-full'>
        {Array.from({ length: 5 }).map((_, index) => (
          <C.CarouselItem key={index}>
            <AdvertCard name={"Werbung "+index + 1} imageUrl={''} index={0} />
          </C.CarouselItem>
        ))}
      </C.CarouselContent>
      <div className='flex h-8 flex-row w-full justify-center gap-2 items-end'>
        <C.CarouselPrevious className='static translate-x-0' />
        <C.CarouselNext className='static translate-x-0'  />
      </div>
      <p className='text-xs absolute bottom-0 text-muted'>Werbung</p>
    </C.Carousel>
  </div>
  )
}