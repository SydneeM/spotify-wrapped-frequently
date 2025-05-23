"use client"

import { Session } from "next-auth";
import { useState, useEffect } from "react";
import RangeSelector from "./RangeSelector";
import { TopTracksResponse, Track } from "./TopTracks";
import TopTracks from "./TopTracks";

interface ArtistsDataProps {
  session: Session;
}

export default function TracksData({ session }: ArtistsDataProps) {
  const [range, setRange] = useState<string>("short_term");
  const [tracks, setTracks] = useState<Track[]>([]);

  useEffect(() => {
    const getTopArtists = async () => {
      const url = "https://api.spotify.com/v1/me/top/tracks?time_range=" + range + "&limit=5";
      const response = await fetch(url, {
        headers: {
          "Authorization": `Bearer ${session.access_token}`,
          "Content-Type": "application/json",
        },
      });
      const topTracks: TopTracksResponse = await response.json();
      setTracks(topTracks.items);
    }

    getTopArtists();
  }, [session.access_token, range]);

  const handleSetRange = (newRange: string) => {
    setRange(newRange);
  }

  return (
    <div className="flex flex-col items-center p-8">
      <div className="flex flex-col gap-y-4">
        <RangeSelector range={range} handleSetRange={handleSetRange} />
        <TopTracks tracks={tracks} />
      </div>
    </div>
  );
}
