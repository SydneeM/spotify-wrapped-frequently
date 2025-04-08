import { memo } from "react";

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

interface TopArtistsProps {
  artists: Artist[];
  selectedIdx: number | null;
  handleClick: (id: string, idx: number) => void;
}

const TopArtists = memo(function TopArtists({ artists, selectedIdx, handleClick }: TopArtistsProps) {
  return (
    <div className="flex flex-col">
      <span className="font-semibold text-6xl py-6">Top Artists</span>
      <ul className="flex flex-col gap-y-4">
        {artists.map((artist, idx) => (
          <li
            key={artist.id}
            className={`flex flex-row gap-x-4 items-center cursor-pointer p-3 rounded-lg hover:bg-foreground/15 ${selectedIdx === idx ? 'bg-foreground/15' : ''}`}
            onClick={() => handleClick(artist.id, idx)}
          >
            <span className="font-semibold text-6xl">{idx + 1}</span>
            <img className="h-20" src={artist.images[0].url} alt={`${artist.name} Image`} />
            <span className="font-semibold text-3xl">{artist.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
});

export default TopArtists;
