import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

export default function Body(props: any) {
  const [selectedLeagueId, setSelectedLeagueId] = useState("");

  const setFootballLeague = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const leagueId = event.target.value;
    setSelectedLeagueId(leagueId);
  };

  const selectedLeagueApi = `${props.footballApi}&league=${selectedLeagueId}`;

  const footballApiSelected = useQuery({
    queryKey: ["selectedApi", selectedLeagueApi],
    queryFn: () =>
      fetch(selectedLeagueApi, {
        headers: {
          "x-rapidapi-key": import.meta.env.VITE_API_KEY,
        },
      }).then((res) => res.json()),
    enabled: !!selectedLeagueApi,
  });

  function updateScore() {
    props.apiSelected.refetch();
  }

  console.log(props.selectedSport);

  if (props.apiSelected) {
    return (
      <>
        <div className="w-max-screen flex justify-center py-16">
          <div>
            {props.apiSelected.isError && (
              <p className="text-white text-xl">Error! Refresh browser...</p>
            )}
            {props.apiSelected.isLoading && (
              <div className="inline-flex justify-center transition-all">
                <div className="animate-bounce">⚽️</div>
                <div className="animate-bounce delay-75 px-4">🏈</div>
                <div className="animate-bounce">🏀</div>
              </div>
            )}

            {props.apiSelected.isSuccess && (
              <>
                {/* Render NBA response */}
                {props.selectedSport === props.nbaApi && (
                  <div>
                    <div className="grid grid-flow-row grid-cols-2">
                      {props.apiSelected.data.response.map((result: any) => (
                        <div className="relative" key={result.id}>
                          <div className="m-4 p-4 w-[20rem] h-[15rem] bg-slate-200/90 rounded text-black border-4 outline-1 hover:shadow-[1px_1px_7px_5px_#718096,-3px_3px_40px_5px_#7f9cf5] hover:shadow-slate-400 hover:transition">
                            <div className="flex justify-between items-center">
                              <div className="text-center">
                                <h2 className="font-bold">HOME</h2>
                                <img
                                  className="h-16 inline-flex justify-center"
                                  src={`${result.teams.home.logo}`}
                                  alt="team logo"
                                />
                                <p>{result.teams.home.name}</p>
                              </div>
                              <div className="text-center">
                                <h2 className="font-bold">AWAY</h2>
                                <img
                                  className="h-16 inline-flex justify-center"
                                  src={`${result.teams.visitors.logo}`}
                                  alt="team logo"
                                />
                                <p className="text-center">
                                  {result.teams.visitors.name}
                                </p>
                              </div>
                            </div>

                            <div className="flex flex-col items-center justify-center pt-6">
                              <h2 className="font-bold">SCORE</h2>
                              <p>
                                {result.scores.home.points} -{" "}
                                {result.scores.visitors.points}
                              </p>

                              <div>
                                <span className="animate-pulse p-1 font-bold text-sm absolute bottom-4 left-4 text-red-500">
                                  {result.status.long.toUpperCase()}
                                </span>
                                <span
                                  onClick={updateScore}
                                  className="p-1 font-bold text-xs text-black/30 absolute bottom-4 right-4 hover:text-black/70 hover:transition-all hover:ease-linear hover:cursor-pointer"
                                >
                                  UPDATE SCORE
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    {props.apiSelected.data.response.length === 0 && (
                      <p className="text-white flex justify-center items-center">
                        NO GAMES ON TODAY!
                      </p>
                    )}
                  </div>
                )}

                {/* Render FOOTBALL response */}
                {props.selectedSport === props.footballApi && (
                  <>
                    <div className="flex justify-center items-center pb-10">
                      <select
                        className="w-60 bg-sky-800 rounded h-8 text-white text-center font-sans"
                        name="league"
                        id="league"
                        onChange={setFootballLeague}
                        value={selectedLeagueId}
                      >
                        <option value="">SELECT FOOTBALL LEAGUE</option>
                        <option value="2">UEFA Champions League</option>
                        <option value="39">English Premier League</option>
                        <option value="140">La Liga</option>
                        <option value="135">Serie A</option>
                        <option value="61">League 1</option>
                        <option value="78">Bundesliga</option>
                      </select>
                    </div>
                    {footballApiSelected.isLoading && (
                      <div className="flex justify-center animate-bounce">
                        ⚽️
                      </div>
                    )}
                    {selectedLeagueId && (
                      <div>
                        {footballApiSelected.isSuccess &&
                          footballApiSelected.data.response.map(
                            (result: any) => (
                              <div
                                className="grid grid-flow-row grid-cols-2"
                                key={result.id}
                              >
                                <div className="m-4 p-4 w-[20rem] bg-slate-200/90 rounded text-black border-4 outline-1 hover:shadow-[1px_1px_7px_5px_#718096,-3px_3px_40px_5px_#7f9cf5] hover:shadow-slate-400 hover:transition">
                                  <div className="flex justify-between items-center">
                                    <div className="text-center">
                                      <h2 className="font-bold">HOME</h2>
                                      <img
                                        className="h-16 inline-flex justify-center"
                                        src={`${result.teams.home.logo}`}
                                        alt="team logo"
                                      />
                                      <p>{result.teams.home.name}</p>
                                    </div>
                                    <div className="text-center">
                                      <h2 className="font-bold">AWAY</h2>
                                      <img
                                        className="h-16 inline-flex justify-center"
                                        src={`${result.teams.away.logo}`}
                                        alt="team logo"
                                      />
                                      <p className="text-center">
                                        {result.teams.away.name}
                                      </p>
                                    </div>
                                  </div>

                                  <div className="flex flex-col items-center justify-center pt-6">
                                    <h2 className="font-bold">SCORE</h2>
                                    <p>
                                      {result.goals.home} - {result.goals.away}
                                    </p>
                                    <div>
                                      <span className="animate-pulse p-1 font-bold text-sm absolute bottom-4 left-4 text-red-500">
                                        //check that this works ----
                                        {result.fixture.status.long.toUpperCase()}
                                      </span>
                                      <span
                                        onClick={updateScore}
                                        className="p-1 font-bold text-xs text-black/30 absolute bottom-4 right-4 hover:text-black/70 hover:transition-all hover:ease-linear hover:cursor-pointer"
                                      >
                                        UPDATE SCORE
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )
                          )}
                      </div>
                    )}
                    {footballApiSelected.isSuccess &&
                      footballApiSelected.data.response.length === 0 && (
                        <p className="text-white flex justify-center items-center">
                          NO GAMES ON TODAY!
                        </p>
                      )}
                  </>
                )}

                {/* Render UFC response */}
                {props.selectedSport === props.ufcApi && (
                  <>
                    <div>
                      <div className="grid grid-flow-row grid-cols-2">
                        {props.apiSelected.data.response.map((result: any) => (
                          <div className="relative" key={result.id}>
                            <div className="m-4 p-4 w-[20rem] h-[15rem] bg-slate-200/90 rounded text-black border-4 outline-1 hover:shadow-[1px_1px_7px_5px_#718096,-3px_3px_40px_5px_#7f9cf5] hover:shadow-slate-400 hover:transition">
                              <span className="text-sm pb-5 font-bold flex justify-center items-center text-center">
                                {result.slug}
                              </span>
                              <span className="pb-5  flex flex-col justify-center items-center">
                                <p className="font-bold">DIVISION</p>
                                {result.category}
                              </span>
                              <div className="flex justify-between items-center">
                                <div className="text-center">
                                  <img
                                    className="h-16 inline-flex justify-center"
                                    src={`${result.fighters.first.logo}`}
                                    alt="👤 no image"
                                  />
                                  <span>
                                    {result.fighters.first.winner ? (
                                      <p className="font-bold text-green-500 text-center">
                                        {result.fighters.first.name}
                                      </p>
                                    ) : (
                                      <p className="text-center">
                                        {result.fighters.first.name}
                                      </p>
                                    )}
                                  </span>
                                </div>
                                <div className="text-center">
                                  <img
                                    className="h-16 inline-flex justify-center"
                                    src={`${result.fighters.second.logo}`}
                                    alt="team logo"
                                  />
                                  <span>
                                    {result.fighters.second.winner ? (
                                      <p className="font-bold text-green-500 text-center">
                                        {result.fighters.second.name}
                                      </p>
                                    ) : (
                                      <p className="text-center">
                                        {result.fighters.second.name}
                                      </p>
                                    )}
                                  </span>
                                </div>
                              </div>

                              <div>
                                <span className="animate-pulse p-1 font-bold text-sm flex justify-center items-center text-red-500">
                                  {result.status.long.toUpperCase()}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      {props.apiSelected.data.response.length === 0 && (
                        <p className="text-white flex justify-center items-center">
                          NO MATCHES ON TODAY!
                        </p>
                      )}
                    </div>
                  </>
                )}
                {/* Render AFL response */}
                {props.selectedSport === props.aflApi && (
                  <div>
                    <div className="grid grid-flow-row grid-cols-2">
                      {props.apiSelected.data.response.map((result: any) => (
                        <div className="relative" key={result.id}>
                          <div className="m-4 p-4 w-[15rem] h-[10rem] md:w-[20rem] md:h-[15rem] bg-slate-200/90 rounded text-black border-4 outline-1 hover:shadow-[1px_1px_7px_5px_#718096,-3px_3px_40px_5px_#7f9cf5] hover:shadow-slate-400 hover:transition">
                            <div className="flex justify-between items-center text-xs md:text-lg">
                              <div className="text-center">
                                <h2 className="font-bold">HOME</h2>
                                <img
                                  className="h-10 md:h-16 inline-flex justify-center"
                                  src={`${result.teams.home.logo}`}
                                  alt="team logo"
                                />
                                <p className="text-[0.6rem] md:text-[1rem] leading-3 md:leading-5">
                                  {result.teams.home.name}
                                </p>
                              </div>
                              <div className="text-center">
                                <h2 className="font-bold">AWAY</h2>
                                <img
                                  className="h-10 md:h-16 inline-flex justify-center"
                                  src={`${result.teams.away.logo}`}
                                  alt="team logo"
                                />
                                <p className="text-[0.6rem] md:text-[1rem] leading-3 md:leading-5">
                                  {result.teams.away.name}
                                </p>
                              </div>
                            </div>

                            <div className="flex flex-col items-center justify-center pt-6 text-xs md:text-lg">
                              <div className="absolute bottom-8">
                                <h2 className="font-bold">SCORE</h2>
                                <p className="text-center">
                                  {result.scores.home.score} -{" "}
                                  {result.scores.away.score}
                                </p>
                              </div>

                              <div className="text-[0.5rem] md:text-xs p-1 font-bold">
                                <span className="animate-pulse  absolute bottom-5 left-5 text-red-500">
                                  {result.status.long.toUpperCase()}
                                </span>
                                <span
                                  onClick={updateScore}
                                  className=" text-black/30 absolute bottom-5 right-5 hover:text-black/70 hover:transition-all hover:ease-linear hover:cursor-pointer"
                                >
                                  UPDATE SCORE
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    {props.apiSelected.data.response.length === 0 && (
                      <p className="text-white flex justify-center items-center">
                        NO GAMES ON TODAY!
                      </p>
                    )}
                  </div>
                )}

                {/* Render NFL response */}
                {props.selectedSport === props.nflApi && (
                  <div>
                    <div className="grid grid-flow-row grid-cols-2">
                      {props.apiSelected.data.response.map((result: any) => (
                        <div className="relative" key={result.id}>
                          <div className="m-4 p-4 w-[15rem] h-[10rem] md:w-[20rem] md:h-[15rem] bg-slate-200/90 rounded text-black border-4 outline-1 hover:shadow-[1px_1px_7px_5px_#718096,-3px_3px_40px_5px_#7f9cf5] hover:shadow-slate-400 hover:transition">
                            <div className="flex justify-between items-center text-xs md:text-lg">
                              <div className="text-center">
                                <h2 className="font-bold">HOME</h2>
                                <img
                                  className="h-10 md:h-16 inline-flex justify-center"
                                  src={`${result.teams.home.logo}`}
                                  alt="team logo"
                                />
                                <p className="text-[0.6rem] md:text-[1rem] leading-3 md:leading-5">
                                  {result.teams.home.name}
                                </p>
                              </div>
                              <div className="text-center">
                                <h2 className="font-bold">AWAY</h2>
                                <img
                                  className="h-10 md:h-16 inline-flex justify-center"
                                  src={`${result.teams.away.logo}`}
                                  alt="team logo"
                                />
                                <p className="text-[0.6rem] md:text-[1rem] leading-3 md:leading-5">
                                  {result.teams.away.name}
                                </p>
                              </div>
                            </div>

                            <div className="flex flex-col items-center justify-center pt-6 text-xs md:text-lg">
                              <div className="absolute bottom-8">
                                <h2 className="font-bold">SCORE</h2>
                                <p className="text-center">
                                  {result.scores.home.total} -{" "}
                                  {result.scores.away.total}
                                </p>
                              </div>

                              <div className="text-[0.5rem] md:text-xs p-1 font-bold">
                                <span className="animate-pulse  absolute bottom-5 left-5 text-red-500">
                                  {result.game.status.long.toUpperCase()}
                                </span>
                                <span
                                  onClick={updateScore}
                                  className=" text-black/30 absolute bottom-5 right-5 hover:text-black/70 hover:transition-all hover:ease-linear hover:cursor-pointer"
                                >
                                  UPDATE SCORE
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    {props.apiSelected.data.response.length === 0 && (
                      <p className="text-white flex justify-center items-center">
                        NO GAMES ON TODAY!
                      </p>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </>
    );
  }
}
