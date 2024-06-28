"use server"
import React from 'react'
import * as C from "@/components/ui/carousel"
import { Card,CardContent } from '../ui/card'
import AdvertCard from './AdvertCard'


type Props = {}

export const AdvertBar = (props: Props) => {
  return (
    <div className='xl:pr-8 xl:pb-8 xl:pt-32'>
      <div className="p-4 xl:w-[15vw] w-auto border-def rounded-xl xl:h-full h-1/5 bg-sec flex flex-col justify-between ">
        <C.Carousel className="flex flex-col justify-between w-full h-full" orientation='vertical' opts={{loop:true}} delay={8000}>
          <C.CarouselContent className='h-full w-[100%] '>
            {Array.from({ length: 5 }).map((_, index) => (
              <C.CarouselItem key={index} className='w-full h-full'>
                <AdvertCard name={"Werbung "+(index+1)} imageUrl={''} index={0} />
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
    </div>
  )
}