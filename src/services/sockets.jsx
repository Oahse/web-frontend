import { useState } from "react";

const sockets = {};

/**
 * Returns a singleton WebSocket connection for a given key/URL.
 * Creates it if it doesn't exist yet.
 * 
 * @param {string} url - The WebSocket URL to connect to.
 * @param {string} key - Unique key to identify the socket connection.
 * @returns {WebSocket} The WebSocket instance.
 */
export function getSocket(url, key) {
  if (!key) {
    throw new Error("You must provide a unique key for the socket connection.");
  }

  if (!sockets[key]) {
    const ws = new WebSocket(url);

    ws.onopen = () => {
      console.log(`WebSocket connected: ${key} (${url})`);
    };

    ws.onclose = () => {
      console.log(`WebSocket disconnected: ${key}`);
      delete sockets[key];
    };

    ws.onerror = (err) => {
      console.error(`WebSocket error: ${key}`, err);
    };

    sockets[key] = ws;
  }

  return sockets[key];
}

/**
 * Optionally, you can add a function to close a socket by key
 */
export function closeSocket(key) {
  if (sockets[key]) {
    sockets[key].close();
    delete sockets[key];
  }
}

export function sendMessage(key, message) {
  const ws = sockets[key];
  if (!ws) {
    return { success: false, error: `No socket connection found for key: ${key}` };
  }
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(message);
    return { success: true };
  } else {
    return { success: false, error: `WebSocket for key ${key} is not open.` };
  }
}
export function editMessage(key, message) {
    const ws = sockets[key];
    if (!ws) {
        return { success: false, error: `No socket connection found for key: ${key}` };
    }
    if (ws.readyState === WebSocket.OPEN) {
        ws.send(message);
        return { success: true };
    } else {
        return { success: false, error: `WebSocket for key ${key} is not open.` };
    }
}
export function deleteMessage(key, message) {
    const ws = sockets[key];
    if (!ws) {
        return { success: false, error: `No socket connection found for key: ${key}` };
    }
    if (ws.readyState === WebSocket.OPEN) {
        ws.send(message);
        return { success: true };
    } else {
        return { success: false, error: `WebSocket for key ${key} is not open.` };
    }
}

