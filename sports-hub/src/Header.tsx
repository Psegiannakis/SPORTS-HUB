import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Body from "./Body";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function Header() {
  const [selectedSport, setSelectedSport] = useState("");

  function currentDate(date: any) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  function overseasDate(date: any) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + (d.getDate() - 1),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  const nbaApi = `https://v2.nba.api-sports.io/games?date=${currentDate(
    Date()
  )}`; //test data: 2024-04-14 // use current

  const footballApi = `https://v3.football.api-sports.io/fixtures?date=${overseasDate(
    Date()
  )}&season=${new Date().getFullYear() - 1}`; //test data: 2024-05-11 // use overseas

  const ufcApi = `https://v1.mma.api-sports.io/fights?date=${currentDate(
    Date()
  )}`; //test data: 2024-04-14 // use current

  const aflApi = `https://v1.afl.api-sports.io/games?date=${currentDate(
    Date()
  )}`; //test data: 2024-04-13 // use current

  const nflApi = `https://v1.american-football.api-sports.io/games?date=${overseasDate(
    Date()
  )}`; //test data: 2023-01-01 // use overseas

  // Function to handle the click on a sport
  const handleSportClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const sportId = event.currentTarget.id;
    setSelectedSport(sportId);
  };

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

  return (
    <>
      <div className="font-oswald text-white flex flex-col justify-center items-center">
        <h1 className="m-5 text-2xl md:text-4xl">SPORTS HUB</h1>
        <p className="mb-8 md:mb-16">
          YOUR FAVOURITE SPORTS, ALL IN THE ONE PLACE
        </p>

        <Carousel className="w-7/12  text-[0.5rem] md:w-2/3 sm:text-md md:text-lg lg:text-xl cursor-pointer">
          <CarouselContent className="xl:ml-28 ml-2">
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
              id={aflApi}
              className="basis-1/3"
              onClick={handleSportClick}
            >
              🏉 AFL 🏉
            </CarouselItem>

            <CarouselItem
              id={nflApi}
              className="basis-1/3"
              onClick={handleSportClick}
            >
              🏈 NFL 🏈
            </CarouselItem>
          </CarouselContent>

          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      <Body
        apiSelected={apiSelected}
        selectedSport={selectedSport}
        nbaApi={nbaApi}
        footballApi={footballApi}
        ufcApi={ufcApi}
        aflApi={aflApi}
        nflApi={nflApi}
      />
    </>
  );
}
