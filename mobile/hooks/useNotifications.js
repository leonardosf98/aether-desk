import { useCallback, useEffect, useRef, useState } from "react";
import { api } from "../apiClient";

export function useNotifications(token, isStaff, onRefreshTickets) {
  const [notifications, setNotifications] = useState([]);
  const [unread, setUnread] = useState(0);
  const sinceRef = useRef(new Date().toISOString());
  const knownIdsRef = useRef(new Set());
  const onRefreshRef = useRef(onRefreshTickets);
  onRefreshRef.current = onRefreshTickets;

  const openNotification = useCallback(
    async (item, onOpenTicket) => {
      try {
        await onOpenTicket(item.ticketId);
      } catch (err) {
        if (err.status === 404) {
          setNotifications((current) => current.filter((n) => n.id !== item.id));
          return;
        }
        throw err;
      }
    },
    [],
  );

  function markSeen() {
    setUnread(0);
    sinceRef.current = new Date().toISOString();
    knownIdsRef.current = new Set();
    setNotifications([]);
  }

  useEffect(() => {
    if (!token || !isStaff) return undefined;
    const tick = async () => {
      const since = sinceRef.current;
      try {
        const data = await api(`/notifications?since=${encodeURIComponent(since)}`, { token });
        if (since !== sinceRef.current) return;
        const fresh = data.notifications.filter((item) => !knownIdsRef.current.has(item.id));
        if (!fresh.length) return;
        fresh.forEach((item) => knownIdsRef.current.add(item.id));
        setNotifications((prev) => [...fresh, ...prev].slice(0, 50));
        setUnread((n) => n + fresh.length);
        onRefreshRef.current();
      } catch {
        return;
      }
    };
    tick();
    const id = setInterval(tick, 8000);
    return () => clearInterval(id);
  }, [isStaff, token]);

  function clearNotifications() {
    setNotifications([]);
    setUnread(0);
  }

  return { notifications, unread, openNotification, markSeen, clearNotifications };
}
