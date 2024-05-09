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

  function currentDate(date: any) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  // fix Apis to corrspond to the correct request (fix date so its always current)
  const nbaApi = `https://v2.nba.api-sports.io/games?date=${currentDate(
    Date()
  )}`;
  const footballApi = `https://v3.football.api-sports.io/fixtures?date=${currentDate(
    Date()
  )}`;
  const ufcApi = `https://v1.mma.api-sports.io/fights?date=${currentDate(
    Date()
  )}`;
  const f1Api = `https://v1.formula-1.api-sports.io/races?date=${currentDate(
    Date()
  )}`;
  const aflApi = `https://v1.afl.api-sports.io/games?date=${currentDate(
    Date()
  )}`;

  // Function to handle the click on a sport
  const handleSportClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const sportId = event.currentTarget.id;
    setSelectedSport(sportId);
    console.log(Date());
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
        {apiSelected.isError && <p>Error fetching data</p>}
        {apiSelected.isSuccess && (
          <>
            <h1>Response: {apiSelected.data.response[0].teams.home.name}</h1>
            {/* Render other properties as needed */}
          </>
        )}
      </div>
    </>
  );
}
