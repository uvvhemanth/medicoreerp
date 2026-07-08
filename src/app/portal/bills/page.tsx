"use client";

import { useState } from "react";
import { Card, CardBody } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusChip } from "@/components/ui/badge";
import { useToast } from "@/components/ui/toast";
import { formatCurrency } from "@/lib/utils";

const bills = [
  { id: "INV-4521", desc: "OPD Consultation + ECG", amount: 2400, status: "due" as const },
  { id: "INV-4433", desc: "Lab tests — CBC, Lipid", amount: 1850, status: "due" as const },
  { id: "INV-4390", desc: "Pharmacy", amount: 940, status: "paid" as const },
];

export default function BillsPage() {
  const toast = useToast();
  const [paid, setPaid] = useState<string[]>([]);
  const totalDue = bills.filter((b) => b.status === "due" && !paid.includes(b.id)).reduce((s, b) => s + b.amount, 0);

  return (
    <div className="space-y-4 p-4">
      <h1 className="font-heading text-2xl font-extrabold text-heading">Bills & Payments</h1>
      <Card className="border-teal/25 bg-teal/[0.04]">
        <CardBody className="pt-5">
          <p className="text-sm text-muted">Total due</p>
          <p className="font-heading text-3xl font-extrabold text-teal">{formatCurrency(totalDue)}</p>
          {totalDue > 0 && <Button className="mt-3 w-full" onClick={() => { setPaid(bills.map((b) => b.id)); toast.success("Payment successful (demo)"); }}>Pay all now</Button>}
        </CardBody>
      </Card>
      {bills.map((b) => {
        const isPaid = b.status === "paid" || paid.includes(b.id);
        return (
          <Card key={b.id}>
            <CardBody className="flex items-center gap-3 pt-5">
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-heading">{b.desc}</p>
                <p className="text-xs text-muted">{b.id}</p>
              </div>
              <span className="font-semibold text-heading">{formatCurrency(b.amount)}</span>
              {isPaid ? <StatusChip status="done">Paid</StatusChip> : <Button size="sm" onClick={() => { setPaid((p) => [...p, b.id]); toast.success("Paid (demo)"); }}>Pay</Button>}
            </CardBody>
          </Card>
        );
      })}
    </div>
  );
}
