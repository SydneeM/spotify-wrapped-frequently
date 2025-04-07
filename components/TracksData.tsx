"use client"

import { Session } from "next-auth";
import { useState, useEffect } from "react";
import ParamsSelector from "./ParamsSelector";
import { TopTracksResponse, Track } from "./TopTracks";
import TopTracks from "./TopTracks";

interface ArtistsDataProps {
  session: Session;
}

export default function TracksData({ session }: ArtistsDataProps) {
  const [range, setRange] = useState<string>("short_term");
  const [limit, setLimit] = useState<number>(5);
  const [tracks, setTracks] = useState<Track[]>([]);

  useEffect(() => {
    const getTopArtists = async () => {
      const url = "https://api.spotify.com/v1/me/top/tracks?time_range=" + range + "&limit=" + limit;
      const response = await fetch(url, {
        headers: {
          "Authorization": `Bearer ${session.accessToken}`,
          "Content-Type": "application/json",
        },
      });
      const topTracks: TopTracksResponse = await response.json();
      console.log(topTracks);
      setTracks(topTracks.items);
    }

    getTopArtists();
  }, [session.accessToken, range, limit]);

  const handleSetLimit = (newLimit: number) => {
    setLimit(newLimit);
  }

  const handleSetRange = (newRange: string) => {
    setRange(newRange);
  }

  return (
    <div>
      <div>Top Tracks</div>
      <ParamsSelector label="Tracks" limit={limit} range={range} handleSetLimit={handleSetLimit} handleSetRange={handleSetRange} />
      <TopTracks tracks={tracks} />
    </div>
  );
}
