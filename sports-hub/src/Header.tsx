import React, { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function Header() {
  const [selectedSport, setSelectedSport] = useState("");

  // Function to handle the click on a sport item
  const handleSportClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const sportId = event.currentTarget.id;
    setSelectedSport(sportId);

    const api = `https://${selectedSport}.api-sports.io/`;
  };

  return (
    <>
      <div className="bg-cyan-900 font-oswald text-white flex flex-col justify-center items-center ">
        <h1 className="p-5 pb-20 text-4xl">SPORTS HUB</h1>
        <Carousel className="w-2/3 text-xl cursor-pointer ">
          <CarouselContent className="ml-28">
            <CarouselItem
              id="v2.nba"
              className="basis-1/3"
              onClick={handleSportClick}
            >
              🏀 NBA 🏀
            </CarouselItem>
            <CarouselItem
              id="v3.football"
              className="basis-1/3"
              onClick={handleSportClick}
            >
              ⚽️ FOOTBALL ⚽️
            </CarouselItem>
            <CarouselItem
              id="v1.mma"
              className="basis-1/3"
              onClick={handleSportClick}
            >
              🥊 UFC 🥊
            </CarouselItem>
            <CarouselItem
              id="v1.formula-1"
              className="basis-1/3"
              onClick={handleSportClick}
            >
              🏁 F1 🏁
            </CarouselItem>
            <CarouselItem
              id="v1.afl"
              className="basis-1/3"
              onClick={handleSportClick}
            >
              🏉 AFL 🏉
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </>
  );
}
