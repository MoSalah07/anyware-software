export const HOST = import.meta.env.VITE_SERVER_URL;

const ANNOUNCEMENT_URL = `${HOST}/announcements`;

export const GET_ALL_ANNOUNCEMENT = `${ANNOUNCEMENT_URL}/all-announcement`;
