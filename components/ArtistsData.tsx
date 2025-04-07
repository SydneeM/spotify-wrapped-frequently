"use client"

import { useState, useEffect } from "react";
import { Field, Input, Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";

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

interface Response {
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

export default function ArtistsData({ session }) {
  const [range, setRange] = useState<string>(ranges[0]);
  const [limit, setLimit] = useState<number>(5);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [topTracks, setTopTracks] = useState([]); //set types

  useEffect(() => {
    const getTopArtists = async () => {
      const url = "https://api.spotify.com/v1/me/top/artists?time_range=" + range + "&limit=" + limit;
      const response = await fetch(url, {
        headers: {
          "Authorization": `Bearer ${session.accessToken}`,
          "Content-Type": "application/json"
        }
      });
      const topArtists: Response = await response.json();
      console.log(topArtists);
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
    const tracks = await response.json();
    console.log(tracks);
    setTopTracks(tracks);
  }

  const handleClick = (id: string) => {
    getTopTracks(id);
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
    </div>
  );
}
