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

interface TracksDataProps {
  tracks: Track[];
}

const TracksData = memo(function TracksData({ tracks }: TracksDataProps) {
  return (
    <div className="mt-8">
      <ul>
        {tracks.map((track) => (
          <li
            key={track.id}
          >
            {track.name}
          </li>
        ))}
      </ul>
    </div>
  );
});

export default TracksData;
