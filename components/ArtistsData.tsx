"use client"

import { Session } from "next-auth";
import { useState, useEffect } from "react";
import ParamsSelector from "./ParamsSelector";
import { Artist, TopArtistsResponse } from "./TopArtists";
import TopArtists from "./TopArtists";
import { ArtistTopTracksResponse, Track } from "./TopTracks";
import TopTracks from "./TopTracks";
import { Album, AlbumsResponse } from "./Albums";
import Albums from "./Albums";

interface ArtistsDataProps {
  session: Session;
}

export default function ArtistsData({ session }: ArtistsDataProps) {
  const [range, setRange] = useState<string>("short_term");
  const [limit, setLimit] = useState<number>(5);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);

  useEffect(() => {
    const getTopArtists = async () => {
      const url = "https://api.spotify.com/v1/me/top/artists?time_range=" + range + "&limit=" + limit;
      const response = await fetch(url, {
        headers: {
          "Authorization": `Bearer ${session.accessToken}`,
          "Content-Type": "application/json"
        }
      });
      const topArtists: TopArtistsResponse = await response.json();
      console.log("artists:", topArtists);
      setArtists(topArtists.items);
    }

    getTopArtists();
  }, [session.accessToken, range, limit]);

  const getTopTracks = async (artistId: string) => {
    const url = "https://api.spotify.com/v1/artists/" + artistId + "/top-tracks";
    const response = await fetch(url, {
      headers: {
        "Authorization": `Bearer ${session.accessToken}`,
        "Content-Type": "application/json"
      }
    });
    const topTracks: ArtistTopTracksResponse = await response.json();
    console.log("tracks:", topTracks.tracks);
    setTracks(topTracks.tracks);
  }

  const getLatestAlbums = async (artistId: string) => {
    const url = "https://api.spotify.com/v1/artists/" + artistId + "/albums?limit=10";
    const response = await fetch(url, {
      headers: {
        "Authorization": `Bearer ${session.accessToken}`,
        "Content-Type": "application/json"
      }
    });
    const latestAlbums: AlbumsResponse = await response.json();
    console.log("albums:", latestAlbums);
    setAlbums(latestAlbums.items);
  }

  const handleClick = (id: string) => {
    getTopTracks(id);
    getLatestAlbums(id);
  }

  const handleSetLimit = (newLimit: number) => {
    setLimit(newLimit);
  }

  const handleSetRange = (newRange: string) => {
    setRange(newRange);
  }

  return (
    <div>
      <div>Top Artists</div>
      <ParamsSelector label="Artists" limit={limit} range={range} handleSetLimit={handleSetLimit} handleSetRange={handleSetRange} />
      <TopArtists artists={artists} handleClick={handleClick} />
      <TopTracks tracks={tracks} />
      <Albums albums={albums} />
    </div>
  );
}
