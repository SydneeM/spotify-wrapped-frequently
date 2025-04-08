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

interface Album {
  album_type: string;
  total_tracks: number;
  available_markets: string[];
  external_urls: ExternalUrl;
  href: string;
  id: string;
  is_playable: boolean;
  images: Image[];
  name: string;
  release_date: string;
  release_date_precision: string;
  restrictions?: Restriction;
  type: string;
  uri: string;
  artists: Artist[];
}

interface ExternalId {
  isrc: string;
  ean: string;
  upc: string;
}

export interface Track {
  album: Album;
  artists: Artist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: ExternalId;
  external_urls: ExternalUrl;
  href: string;
  id: string;
  is_playable: boolean;
  linked_from?: object;
  restrictions?: Restriction;
  name: string;
  popularity: number;
  track_number: number;
  type: string;
  uri: string;
  is_local: boolean;
}

export interface ArtistTopTracksResponse {
  tracks: Track[];
}

export interface TopTracksResponse {
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
  items: Track[];
}

interface TopTracksProps {
  tracks: Track[];
}

const TopTracks = memo(function TopTracks({ tracks }: TopTracksProps) {
  return (
    <div className="flex flex-col">
      <span className="font-semibold text-6xl py-6">Top Tracks</span>
      <ul className="flex flex-col gap-y-4">
        {tracks.map((track, idx) => (
          <li
            key={track.id}
            className="flex flex-row gap-x-4 items-center p-3"
          >
            <span className="font-semibold text-6xl">{idx + 1}</span>
            <img className="h-20" src={track.album.images[0].url} alt={`${track.album.name} Image`} />
            <span className="font-semibold text-3xl">{track.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
});

export default TopTracks;
