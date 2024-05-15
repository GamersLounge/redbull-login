import { config } from "@config/index.js";

/**
 * Get the full URL for server uploads.
 *
 * @param {string} fileURL
 * @returns {string || null}
 */
export function getRemoteAsset(fileURL) {
  return fileURL ? `${config.baseURL}/${fileURL}` : null;
}

/**
 * Get the full URL for images in local asset directory.
 *
 * @param {string} fileName
 * @returns {string}
 */
export function getLocalImage(fileName) {
  return new URL(`../assets/images/${fileName}`, import.meta.url).href;
}

export function getLocalAvatar(fileName) {
  return new URL(`/avatars/${fileName}`, import.meta.url).href;
}
