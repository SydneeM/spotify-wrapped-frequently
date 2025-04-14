import { memo } from "react";
import Image from "next/image";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import Albums, { Album } from "./Albums";

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
  albums: Album[][];
}

const TopArtists = memo(function TopArtists({ artists, albums }: TopArtistsProps) {
  return (
    <div className="flex flex-col gap-y-4">
      <span className="font-semibold text-6xl">Top Artists</span>
      <div className="flex flex-col">
        {artists.map((artist, idx) => (
          <Disclosure
            key={artist.id}
            as="div"
            defaultOpen={false}
          >
            <DisclosureButton className="flex flex-row w-full gap-x-4 py-2 items-center cursor-pointer rounded-lg hover:bg-foreground/10 hover:px-2 data-[open]:bg-foreground/25 data-[open]:px-2">
              <span className="font-semibold text-6xl">{idx + 1}</span>
              <Image
                className="object-fill h-20 w-20"
                height={80}
                width={80}
                src={artist.images[0].url}
                alt={`${artist.name} Image`}
              />
              <span className="font-semibold text-3xl">{artist.name}</span>
            </DisclosureButton>
            {albums.length > 0 &&
              <DisclosurePanel className="flex flex-col py-2 px-3">
                <Albums albums={albums[idx]} />
              </DisclosurePanel>}
          </Disclosure>
        ))}
      </div>
    </div>
  );
});

export default TopArtists;
