"use client"

import { Session } from "next-auth";
import { useState, useEffect } from "react";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import ParamsSelector from "./ParamsSelector";
import { ArtistTopTracksResponse, Track } from "./TopTracks";
import TopTracks from "./TopTracks";
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

export interface Artist {
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

export interface TopArtistsResponse {
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
  const [artists, setArtists] = useState<Artist[]>([]);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);

  useEffect(() => {
    const getTopArtists = async () => {
      const url = "https://api.spotify.com/v1/me/top/artists?time_range=" + range + "&limit=5";
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
  }, [session.accessToken, range]);

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
    setTracks(topTracks.tracks.slice(0, 5));
  }

  const getLatestAlbums = async (artistId: string) => {
    const url = "https://api.spotify.com/v1/artists/" + artistId + "/albums?limit=5";
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
    setTracks([]);
    setAlbums([]);
    getTopTracks(id);
    getLatestAlbums(id);
  }

  const handleSetRange = (newRange: string) => {
    setRange(newRange);
    setTracks([]);
    setAlbums([]);
  }

  return (
    <div className="flex flex-col items-center p-20">
      <div className="flex flex-col gap-y-4">
        <ParamsSelector range={range} handleSetRange={handleSetRange} />
        <div className="flex flex-col gap-y-4">
          <span className="font-semibold text-6xl">Top Artists</span>
          {artists.map((artist, idx) => (
            <Disclosure key={artist.id} as="div" className="" defaultOpen={false}>
              <DisclosureButton className="flex flex-row gap-x-4 items-center cursor-pointer p-3 rounded-lg hover:bg-foreground/15 w-full data-[open]:bg-foreground/15" onClick={() => handleClick(artist.id)}>
                <span className="font-semibold text-6xl">{idx + 1}</span>
                <img className="h-20" src={artist.images[0].url} alt={`${artist.name} Image`} />
                <span className="font-semibold text-3xl">{artist.name}</span>
              </DisclosureButton>
              {tracks.length > 0 && albums.length > 0 &&
                <DisclosurePanel className="flex flex-col p-3 gap-y-3">
                  <TopTracks tracks={tracks} artistTracks={true} />
                  <Albums albums={albums} />
                </DisclosurePanel>
              }
            </Disclosure>
          ))}
        </div>
      </div>
    </div>
  );
}
