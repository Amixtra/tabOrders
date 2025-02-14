// useOrderNotifications.ts
import { useEffect, useRef } from "react";
import axios from "axios";

const useOrderNotifications = (userId: string) => {
  const ordersRef = useRef<any[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const playNotificationSound = () => {
    const audio = new Audio("/assets/sound/bell.mp3");
    audio.play().catch(error => {
      console.warn("Audio playback was blocked:", error);
    });
  };

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/orders", {
        params: { userID: userId },
      });
      const newOrders = response.data;
      const prevUnconfirmedOrders = ordersRef.current.filter((o: any) => o.confirmStatus !== "Confirmed").length;
      const newUnconfirmedOrders = newOrders.filter((o: any) => o.confirmStatus !== "Confirmed").length;

      ordersRef.current = newOrders;

      if (newUnconfirmedOrders > prevUnconfirmedOrders) {
        playNotificationSound();
        startLoggingInterval();
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const startLoggingInterval = () => {
    if (intervalRef.current) return;

    intervalRef.current = setInterval(() => {
      const unconfirmedOrders = ordersRef.current.filter(o => o.confirmStatus !== "Confirmed");
      if (unconfirmedOrders.length > 0) {
        playNotificationSound();
      } else {
        clearInterval(intervalRef.current!);
        intervalRef.current = null;
      }
    }, 5000);
  };

  useEffect(() => {
    const interval = setInterval(fetchOrders, 5000);
    return () => clearInterval(interval);
  }, [userId]);
};

export default useOrderNotifications;
