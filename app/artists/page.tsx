import { auth } from "@/auth";

export default async function Artists() {
  const session = await auth();
  if (!session?.user) {
    return (
      <div>
        User not signed in
      </div>
    );
  }

  const url = "https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=10";
  const response = await fetch(url, {
    headers: {
      "Authorization": `Bearer ${session.accessToken}`,
      "Content-Type": "application/json",
    },
  });
  const topArtists = await response.json();
  console.log(topArtists);

  return (
    <div>
      <div>Top Artists</div>
      <ul>
        {topArtists.items.map((artist: Artist) => (
          <li key={artist.id}>{artist.name}</li>
        ))}
      </ul>
    </div>
  );
} 
