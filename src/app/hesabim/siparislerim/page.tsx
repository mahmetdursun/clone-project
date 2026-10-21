import { AccountShell } from "@/components/account/AccountShell";
import { SiparislerimClient } from "./SiparislerimClient";

export default function SiparislerimPage() {
  return (
    <AccountShell>
      <SiparislerimClient />
    </AccountShell>
  );
}
