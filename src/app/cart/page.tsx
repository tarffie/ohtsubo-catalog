import React from "react";
import { BillingDetails } from "@/app/cart/components/BillingDetails";
import { PurchaseDetails } from "@/app/cart/components/PurchaseDetails";

/**
  |             |
--*-------------*-----
  |  Finalize  |
  |            |
  |  _      _  |
  | |_|    |_| |
  |        [=] |
  |            |
  |            |
  |            |
*/

export default function Page() {
  return (
    <div>
      <div>
        <BillingDetails />
        <PurchaseDetails />
      </div>
    </div>
  );
}
