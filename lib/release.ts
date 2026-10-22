export function isReleased() {
  return process.env.RELEASE_STAGE === "released";
}

export function getDownloadUrl() {
  return process.env.DOWNLOAD_URL ?? "";
}
