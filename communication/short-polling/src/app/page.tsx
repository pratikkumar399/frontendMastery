"use client";

import { useEffect, useRef, useState } from "react";

export default function Home() {
  const lastIdRef = useRef(0);
  const [notifications, setNotifications] = useState<{
    id: number;
    message: string;
    time: string;
  }[]>([]);

  const poll = async () => {
    const res = await fetch(
      `/api/notifications?lastId=${lastIdRef.current}`
    );

    const data = await res.json();

    setNotifications(data);
  };

  useEffect(() => {
    poll(); // initial call

    const interval = setInterval(poll, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main style={{ padding: 24 }}>
      <h1>Short Polling Demo</h1>
      <p>Open console to see updates</p>
      <div className="flex flex-col gap-2">
        {notifications.slice(notifications.length - 1, notifications.length).map((notification) => (
          <div key={notification.id} className="border border-zinc-200 p-2 rounded-md shadow-md">
            <h3>{notification.message}</h3>
            <p>{new Date(notification.time).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
