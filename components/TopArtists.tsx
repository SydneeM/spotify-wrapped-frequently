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
  handleClick: (id: string) => void;
}

const TopArtists = memo(function TopArtists({ artists, handleClick }: TopArtistsProps) {
  return (
    <div className="mt-8">
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
});

export default TopArtists;
