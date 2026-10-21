import { AccountShell } from "@/components/account/AccountShell";
import { GarajimClient } from "./GarajimClient";

export default function GarajimPage() {
  return (
    <AccountShell>
      <GarajimClient />
    </AccountShell>
  );
}
