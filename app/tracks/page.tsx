import { auth } from "@/auth";

export default async function Tracks() {
  const session = await auth();
  if (!session?.user) {
    return (
      <div>
        User not signed in
      </div>
    );
  }

  const url = "https://api.spotify.com/v1/me/top/tracks";
  const response = await fetch(url, {
    headers: {
      "Authorization": `Bearer ${session.accessToken}`,
      "Content-Type": "application/json",
    },
  });
  const topTracks = await response.json();
  console.log(topTracks);

  return (
    <div>
      <div>Top Tracks</div>
      <ul>
        {topTracks.items.map((track) => (
          <li key={track.id}>{track.name}</li>
        ))}
      </ul>
    </div>
  );
} 
