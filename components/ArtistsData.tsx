"use client"

import { Session } from "next-auth";
import { useState, useEffect } from "react";
import { Field, Input, Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
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

const ranges: string[] = [
  "short_term",
  "medium_term",
  "long_term"
];

interface ArtistsDataProps {
  session: Session;
}

export default function ArtistsData({ session }: ArtistsDataProps) {
  const [range, setRange] = useState<string>(ranges[0]);
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

  return (
    <div>
      <div>Top Artists</div>
      <Listbox value={range} onChange={setRange}>
        <ListboxButton>{range}</ListboxButton>
        <ListboxOptions anchor="bottom">
          {ranges.map((range, idx) => (
            <ListboxOption key={idx} value={range} className="data-[focus]:bg-blue-100">
              {range}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
      <Field>
        <Label>Number of Artists</Label>
        <Input
          type="number"
          min="1"
          max="50"
          value={limit}
          onChange={(e) => setLimit(Number(e.target.value))}
        />
      </Field>
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
