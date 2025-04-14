import { memo } from "react";
import Image from "next/image";

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
    <div className="flex flex-col gap-y-4">
      <span className="font-semibold text-6xl">Top Tracks</span>
      <ul className="flex flex-col gap-y-4">
        {tracks.map((track, i) => (
          <li
            key={track.id}
            className="flex flex-row gap-x-4 items-center text-body p-3"
          >
            <span className="font-semibold text-6xl">{i + 1}</span>
            <Image
              className="object-fill h-20 w-20"
              height={80}
              width={80}
              src={track.album.images[0].url}
              alt={`${track.album.name} Image`}
            />
            <div className="flex flex-col">
              <span className="font-semibold text-3xl">{track.name}</span>
              <div className="flex flex-row">
                {track.artists.map((artist, j) =>
                  j === 0 ?
                    <span key={artist.id} className="text-xl">{artist.name}</span>
                    :
                    <span key={artist.id} className="text-xl">{`, ${artist.name}`}</span>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
});

export default TopTracks;
