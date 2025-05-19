const colors = [
  "bg-red-200 text-red-800",
  "bg-yellow-200 text-yellow-800",
  "bg-green-200 text-green-800",
  "bg-blue-200 text-blue-800",
  "bg-indigo-200 text-indigo-800",
  "bg-purple-200 text-purple-800",
  "bg-pink-200 text-pink-800",
];

export function getAvatarColor(name) {
  // Use a consistent hash so same name gets same color
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % colors.length;
  return colors[index];
}
