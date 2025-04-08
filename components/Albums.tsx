import { memo } from "react";

interface ExternalUrl {
  spotify: string;
}

interface Image {
  url: string;
  height: number;
  width: number;
}

interface Restriction {
  reason: string;
}

interface Artist {
  external_urls: ExternalUrl;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}

export interface Album {
  album_type: string;
  total_tracks: number;
  available_markets: string[];
  external_urls: ExternalUrl;
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: string;
  release_date_precision: string;
  restrictions?: Restriction;
  type: string;
  uri: string;
  artists: Artist[];
  album_group: string;
}

export interface AlbumsResponse {
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
  items: Album[];
}

interface AlbumsProps {
  albums: Album[];
}

const Albums = memo(function Albums({ albums }: AlbumsProps) {
  return (
    <div className="flex flex-col">
      <span className="font-semibold text-6xl py-10">Latest Albums</span>
      <ul className="flex flex-col gap-y-10">
        {albums.map((album, idx) => (
          <li
            key={album.id}
            className="flex flex-row gap-x-4 items-center"
          >
            <span className="font-semibold text-6xl">{idx + 1}</span>
            <img className="h-20" src={album.images[0].url} alt={`${album.name} Image`} />
            <span className="font-semibold text-3xl">{album.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
});

export default Albums;
