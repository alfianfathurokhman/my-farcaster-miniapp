import React, { useEffect, useState } from "react";
import { sdk } from "@farcaster/miniapp-sdk";

export default function App() {
  const [ctx, setCtx] = useState(null);
  const [err, setErr] = useState(null);

  useEffect(() => {
    try {
      if (sdk && sdk.isInMiniApp && sdk.isInMiniApp()) {
        sdk.context().then((c) => setCtx(c)).catch((e) => setErr(e?.message || String(e)));
      }
    } catch (e) {
      setErr(e?.message || String(e));
    }
  }, []);

  return (
    <div style={{ padding: 20, fontFamily: "system-ui, Arial" }}>
      <h1>My Mini App Farcaster</h1>

      {ctx ? (
        <>
          <p>Terbuka dari Farcaster — berikut context:</p>
          <pre style={{ background: "#f5f5f5", padding: 10 }}>{JSON.stringify(ctx, null, 2)}</pre>
        </>
      ) : (
        <>
          <p>Aplikasi berjalan di browser biasa (ini normal saat development).</p>
          <p>Kamu bisa cek manifest di: <a href="/.well-known/farcaster.json">/.well-known/farcaster.json</a></p>
        </>
      )}

      {err && (
        <div style={{ marginTop: 12, color: "crimson" }}>
          <strong>SDK error:</strong> {err}
        </div>
      )}
    </div>
  );
}
