import { useCallback, useRef, useState } from "react";
import { api } from "../apiClient";

export function useTickets(token) {
  const [tickets, setTickets] = useState([]);
  const [detail, setDetail] = useState(null);
  const [creating, setCreating] = useState(false);
  const [saving, setSaving] = useState(false);
  const lastRequestRef = useRef(0);

  const refreshTickets = useCallback(
    async (tab) => {
      if (!token) return;
      const request = ++lastRequestRef.current;
      const query = tab === "mine" ? "?mine=1" : "";
      const data = await api(`/tickets${query}`, { token });
      if (request === lastRequestRef.current) setTickets(data.tickets);
    },
    [token],
  );

  async function openTicket(id) {
    const data = await api(`/tickets/${id}`, { token });
    setDetail(data);
    setCreating(false);
  }

  async function createTicket(payload, tab) {
    setSaving(true);
    try {
      const data = await api("/tickets", { token, method: "POST", body: payload });
      setCreating(false);
      await refreshTickets(tab);
      await openTicket(data.ticket.id);
      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.message };
    } finally {
      setSaving(false);
    }
  }

  async function patchTicket(id, body, tab) {
    await api(`/tickets/${id}`, { token, method: "PATCH", body });
    await openTicket(id);
    await refreshTickets(tab);
  }

  async function deleteTicket(id, tab) {
    await api(`/tickets/${id}`, { token, method: "DELETE" });
    setDetail(null);
    await refreshTickets(tab);
  }

  function clearDetail() {
    setDetail(null);
  }

  function startCreating() {
    setCreating(true);
  }

  function cancelCreating() {
    setCreating(false);
  }

  return {
    tickets,
    detail,
    creating,
    saving,
    refreshTickets,
    openTicket,
    createTicket,
    patchTicket,
    deleteTicket,
    clearDetail,
    startCreating,
    cancelCreating,
  };
}
