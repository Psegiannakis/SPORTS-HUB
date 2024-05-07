import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function Header() {
  return (
    <>
      <div className="bg-cyan-900 font-oswald text-white flex flex-col justify-center items-center ">
        <h1 className="p-5 pb-20 text-4xl">SPORTS HUB</h1>
        <Carousel className="w-2/3 text-xl cursor-pointer">
          <CarouselContent>
            <CarouselItem className="basis-1/3 mx-4">🏀 NBA 🏀</CarouselItem>
            <CarouselItem className="basis-1/3 mx-4">
              ⚽️ FOOTBALL ⚽️
            </CarouselItem>
            <CarouselItem className="basis-1/3 mx-4">🥊 UFC 🥊</CarouselItem>
            <CarouselItem className="basis-1/3 mx-4">🏁 F1 🏁</CarouselItem>
            <CarouselItem className="basis-1/3 mx-4">
              🏏 CRICKET 🏏
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </>
  );
}
