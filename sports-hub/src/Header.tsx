import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function Header() {
  const [selectedSport, setSelectedSport] = useState("");

  // fix Apis to corrspond to the correct request (fix date so its always current)
  const nbaApi = `https://v2.nba.api-sports.io/games?date=2022-03-09`;
  const footballApi = `https://v3.football.api-sports.io/games?date=2022-03-09`;
  const ufcApi = `https://v1.mma.api-sports.io/games?date=2022-03-09`;
  const f1Api = `https://v1.formula-1.api-sports.io/games?date=2022-03-09`;
  const aflApi = `https://v1.afl.api-sports.io/games?date=2022-03-09`;

  // Function to handle the click on a sport
  const handleSportClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const sportId = event.currentTarget.id;
    setSelectedSport(sportId);
  };
  console.log(selectedSport);

  const apiSelected = useQuery({
    queryKey: ["selectedApi", selectedSport],
    queryFn: () =>
      fetch(selectedSport, {
        headers: {
          "x-rapidapi-key": import.meta.env.VITE_API_KEY,
        },
      }).then((res) => res.json()),
    enabled: !!selectedSport,
  });

  console.log(apiSelected.data);

  // Render loading state if data is still loading

  // Render fetched data if available
  // Render fetched data if available
  return (
    <>
      <div className="bg-cyan-900 font-oswald text-white flex flex-col justify-center items-center ">
        <h1 className="p-5 pb-20 text-4xl">SPORTS HUB</h1>
        <Carousel className="w-2/3 text-xl cursor-pointer ">
          <CarouselContent className="ml-28">
            <CarouselItem
              id={nbaApi}
              className="basis-1/3"
              onClick={handleSportClick}
            >
              🏀 NBA 🏀
            </CarouselItem>
            <CarouselItem
              id={footballApi}
              className="basis-1/3"
              onClick={handleSportClick}
            >
              ⚽️ FOOTBALL ⚽️
            </CarouselItem>
            <CarouselItem
              id={ufcApi}
              className="basis-1/3"
              onClick={handleSportClick}
            >
              🥊 UFC 🥊
            </CarouselItem>
            <CarouselItem
              id={f1Api}
              className="basis-1/3"
              onClick={handleSportClick}
            >
              🏁 F1 🏁
            </CarouselItem>
            <CarouselItem
              id={aflApi}
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
      <div>
        {/* Check if data is available before rendering */}
        {apiSelected.data && (
          <>
            <h1>Response: {apiSelected.data.response[0].teams.home.name}</h1>
            {/* Render other properties as needed */}
          </>
        )}
      </div>
    </>
  );
}
