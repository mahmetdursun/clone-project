import { AccountShell } from "@/components/account/AccountShell";
import { HesabimClient } from "./HesabimClient";

// AccountShell sunucuda oturumu doğrular (bkz. AccountShell.tsx) — bu yüzden
// page.tsx bir Server Component olmalı; localStorage/form mantığı ayrı bir
// Client Component'e (HesabimClient) taşındı.
export default function HesabimPage() {
  return (
    <AccountShell>
      <HesabimClient />
    </AccountShell>
  );
}
