"use client"

import { Session } from "next-auth";
import { useState, useEffect } from "react";
import ParamsSelector from "./ParamsSelector";
import { ArtistTopTracksResponse, Track } from "./TracksData";
import TracksData from "./TracksData";
import { Album, AlbumsResponse } from "./Albums";
import Albums from "./Albums";

interface ExternalUrl {
  spotify: string;
}

interface Follower {
  href: string | null;
  total: number;
}

interface Image {
  url: string;
  height: number;
  width: number;
}

interface Artist {
  external_urls: ExternalUrl;
  followers: Follower;
  genres: string[];
  href: string;
  id: string;
  images: Image[];
  name: string;
  popularity: number;
  type: string;
  uri: string;
}

interface TopArtistsResponse {
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
  items: Artist[];
}

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
      <ParamsSelector limit={limit} range={range} handleSetLimit={handleSetLimit} handleSetRange={handleSetRange} />
      <ul>
        {artists.map((artist) => (
          <li
            key={artist.id}
            onClick={() => handleClick(artist.id)}
          >
            {artist.name}
          </li>
        ))}
      </ul>
      <TracksData tracks={tracks} />
      <Albums albums={albums} />
    </div>
  );
}
