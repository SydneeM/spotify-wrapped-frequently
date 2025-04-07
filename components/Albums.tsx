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
    <div className="mt-8">
      <ul>
        {albums.map((album) => (
          <li
            key={album.id}
          >
            {album.name}
          </li>
        ))}
      </ul>
    </div>
  );
});

export default Albums;
