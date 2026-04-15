"use client";

import { useEffect } from "react";

interface TrackingConfig {
  siteKey?: string;
  gtmId?: string;
  siteId?: string;
  gaId?: string;
  pixelId?: string;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export function useTracking(config: TrackingConfig) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (document.getElementById("optimizer-script")) return;

    const w = window as any;
    w.API_ENDPOINT = "https://optimizer.gomega.ai";
    w.TRACKING_API_ENDPOINT = "https://events-api.gomega.ai";

    if (config.siteKey) {
      w.MEGA_TAG_CONFIG = {
        ...(w.MEGA_TAG_CONFIG || {}),
        siteKey: config.siteKey,
        siteId: config.siteId,
        gtmId: config.gtmId,
        gaId: config.gaId,
        pixelId: config.pixelId,
      };
    }

    if (config.siteId && !document.querySelector('meta[name="mega-site-id"]')) {
      const meta = document.createElement("meta");
      meta.name = "mega-site-id";
      meta.content = config.siteId;
      document.head.appendChild(meta);
    }

    const script = document.createElement("script");
    script.id = "optimizer-script";
    script.src = "https://cdn.gomega.ai/scripts/optimizer.min.js";
    if (config.siteId) script.dataset.siteId = config.siteId;
    script.async = true;
    document.head.appendChild(script);
  }, [config]);
}
