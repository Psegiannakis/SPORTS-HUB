import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

export default function Body(props: any) {
  function live(status: string) {
    return status === "In Play";
  }

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

  console.log(selectedLeagueApi);

  if (props.apiSelected) {
    return (
      <>
        <div className=" w-max-screen flex justify-center items-center bg-cyan-900">
          <div>
            {props.apiSelected.isError && <p>Error fetching data</p>}
            {props.apiSelected.isLoading && (
              <div className="bg-cyan-900" role="status">
                <svg
                  aria-hidden="true"
                  className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            )}

            {props.apiSelected.isSuccess && (
              <>
                {/* Render NBA response */}
                {props.selectedSport === props.nbaApi && (
                  <div className="bg-white grid grid-cols-5 grid-rows-2 w-11/12 min-h-[31rem] gap-5">
                    {props.apiSelected.data.response.map((result: any) => (
                      <div key={result.id} className="mb-4">
                        <div className="">
                          <h2 className="font-bold">
                            HOME: {result.teams.home.name}
                          </h2>
                          <h2>SCORE: {result.scores.home.points}</h2>
                        </div>
                        <div className="">
                          <h2 className="font-bold">
                            AWAY: {result.teams.visitors.name}
                          </h2>
                          <h2>SCORE:{result.scores.visitors.points}</h2>
                        </div>

                        {live(result.status.long) && (
                          <span className="text-red-500">LIVE GAME</span>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Render FOOTBALL response */}

                {props.selectedSport === props.footballApi && (
                  <>
                    <div className="flex justify-center items-center pt-16">
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
                    {selectedLeagueId && (
                      <div className=" mt-10 grid grid-cols-3 ">
                        {footballApiSelected.isLoading && (
                          <div className=" bg-cyan-900" role="status">
                            <svg
                              aria-hidden="true"
                              className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                              viewBox="0 0 100 101"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor"
                              />
                              <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentColor"
                              />
                            </svg>
                          </div>
                        )}
                        {footballApiSelected.isSuccess &&
                          footballApiSelected.data.response.map(
                            (result: any) => (
                              <div className=" ">
                                <div
                                  key={result.id}
                                  className="m-4 p-4 w-[20rem] bg-slate-400 rounded text-black   border-4 outline-1 hover:shadow-[1px_1px_7px_5px_#718096,-3px_3px_40px_5px_#7f9cf5] hover:shadow-cyan-600 hover:transition"
                                >
                                  <div className="flex justify-between items-center">
                                    <div className="text-center">
                                      <h2 className="font-bold">HOME</h2>
                                      <img
                                        className="h-16"
                                        src={`${result.teams.home.logo}`}
                                        alt="team logo"
                                      />
                                      <p>{result.teams.home.name}</p>
                                    </div>
                                    <div className="text-center">
                                      <h2 className="font-bold">AWAY</h2>
                                      <img
                                        className="h-16"
                                        src={`${result.teams.away.logo}`}
                                        alt="team logo"
                                      />
                                      <p className="text-center">
                                        {" "}
                                        //check this to see if logo and names
                                        are centre
                                        {result.teams.away.name}
                                      </p>
                                    </div>
                                  </div>

                                  <div className="flex flex-col items-center justify-center pt-6">
                                    <h2 className="font-bold">SCORE</h2>
                                    <p>
                                      {result.goals.home} - {result.goals.away}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            )
                          )}
                      </div>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </>
    );
  }
}
