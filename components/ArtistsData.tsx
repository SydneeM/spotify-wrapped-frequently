"use client"

import { Session } from "next-auth";
import { useState, useEffect } from "react";
import RangeSelector from "./RangeSelector";
import { TopArtistsResponse, Artist } from "./TopArtists";
import TopArtists from "./TopArtists";
import { Album, AlbumsResponse } from "./Albums";

interface ArtistsDataProps {
  session: Session;
}

export default function ArtistsData({ session }: ArtistsDataProps) {
  const [range, setRange] = useState<string>("short_term");
  const [artists, setArtists] = useState<Artist[]>([]);
  const [albums, setAlbums] = useState<Album[][]>([]);

  useEffect(() => {
    const headers = {
      "Authorization": `Bearer ${session.access_token}`,
      "Content-Type": "application/json"
    };

    const getLatestAlbums = async (artistId: string) => {
      const url = "https://api.spotify.com/v1/artists/" + artistId + "/albums?limit=5";
      const response = await fetch(url, { headers });
      const latestAlbums: AlbumsResponse = await response.json();
      return latestAlbums.items;
    }

    const getArtistsData = async () => {
      const url = "https://api.spotify.com/v1/me/top/artists?time_range=" + range + "&limit=5";
      const response = await fetch(url, { headers });
      const topArtists: TopArtistsResponse = await response.json();
      setArtists(topArtists.items);

      const albumsPromises: Promise<Album[]>[] = [];
      topArtists.items.forEach((artist) => {
        albumsPromises.push(getLatestAlbums(artist.id));
      });
      const latestAlbums = await Promise.all(albumsPromises);
      setAlbums(latestAlbums);
    }

    getArtistsData();
  }, [session.access_token, range]);

  const handleSetRange = (newRange: string) => {
    setRange(newRange);
    setAlbums([]);
  }

  return (
    <div className="flex flex-col items-center p-8">
      <div className="flex flex-col gap-y-4">
        <RangeSelector range={range} handleSetRange={handleSetRange} />
        <TopArtists artists={artists} albums={albums} />
      </div>
    </div>
  );
}
