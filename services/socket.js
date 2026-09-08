let socket = null;
let cachedIoFactory = null;

function resolveIoFactory() {
  if (cachedIoFactory) {
    return cachedIoFactory;
  }

  try {
    const runtimeRequire = globalThis.eval?.("require");
    if (!runtimeRequire) {
      return null;
    }

    const socketClient = runtimeRequire("socket.io-client");
    cachedIoFactory = socketClient?.io || socketClient?.default?.io || socketClient?.default || null;
    return cachedIoFactory;
  } catch (_error) {
    return null;
  }
}

export function connectSocket(accessToken) {
  if (!accessToken) return null;
  if (socket?.connected) return socket;

  const ioFactory = resolveIoFactory();
  if (!ioFactory) {
    return null;
  }

  socket = ioFactory(process.env.EXPO_PUBLIC_API_BASE_URL || "http://localhost:3000", {
    transports: ["websocket"],
    auth: {
      token: accessToken,
    },
  });

  return socket;
}

export function getSocket() {
  return socket;
}

export function disconnectSocket() {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}
