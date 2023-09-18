import Link from "next/link";
import { useRouter } from "next/router";
import Header from "~/components/Header";
import { currency, formatDate } from "~/components/Invoice";
import PageWrapper from "~/components/PageWrapper";
import StatusIndicator from "~/components/StatusIndicator";
import ItemDisplay from "~/components/ItemDisplay";
import { api } from "~/utils/api";
import { BillFrom, Invoice, Person, type Item } from "@prisma/client";
import { useEffect, useRef, useState } from "react";

export function calculateTotal(items: Item[]) {
  let total = 0;
  for (const item of items) {
    if (total == null) {
      total = item.price * item.quantity;
    } else {
      total += item.price * item.quantity;
    }
  }

  return total;
}

type InvoiceData = {
  item: Item[];
  billFrom: BillFrom;
  person: Person;
  status: string;
  dueDate: Date;
  amount: number;
};

export default function InvoicePage() {
  const router = useRouter();
  const id = String(router.query.id);
  const status = useRef("");

  const [invoiceData, setInvoiceData] = useState<InvoiceData | null>(null);

  const { data: initialData } = api.invoice.getAllInvoiceDataById.useQuery(id);

  useEffect(() => {
    if (initialData) {
      setInvoiceData(initialData);
    }
  }, [initialData]);

  let totalAmount = 0;

  if (invoiceData) {
    totalAmount = calculateTotal(invoiceData.item);
  }

  const markAsPaid = api.invoice.markAsPaid.useMutation();
  const deleteInvoice = api.invoice.delete.useMutation();

  return (
    <>
      <PageWrapper>
        <Header />
        <main className="flex w-full flex-col items-center bg-light font-spartan">
          <Link href="/" className="">
            Go Back
          </Link>
          {invoiceData && (
            <div className="flex flex-col gap-6">
              <div className="flex h-[5.5rem] w-[45.625rem] max-w-full items-center justify-between gap-2 rounded-[0.5rem] bg-white px-8 shadow-md">
                <div className="flex items-center gap-5">
                  <p className="font-medium text-[#858BB2]">Status</p>
                  {status && (
                    <StatusIndicator key={id} status={invoiceData.status} />
                  )}
                </div>
                <div className="flex gap-2">
                  <button className="h-[3rem] min-w-[4.6rem] rounded-[1.5rem] bg-[#F9FAFE] px-6 font-bold text-07">
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      deleteInvoice.mutate(id, {
                        onSuccess: () => {
                          void router.push("/");
                        },
                      });
                    }}
                    className="h-[3rem] min-w-[4.6rem] rounded-[1.5rem] bg-09 px-6 font-bold text-white"
                  >
                    Delete
                  </button>
                  {invoiceData.status.toLowerCase() !== "paid" && (
                    <button
                      onClick={() => {
                        markAsPaid.mutate(id, {
                          onSuccess: () => {
                            setInvoiceData((prevData) => {
                              if (prevData) {
                                return { ...prevData, status: "Paid" };
                              }
                              return prevData;
                            });
                          },
                        });
                      }}
                      className="h-[3rem] min-w-[4.6rem] rounded-[1.5rem] bg-01 px-6 font-bold text-white"
                    >
                      Mark as Paid
                    </button>
                  )}
                </div>
              </div>

              <div className="w-[45.625rem] max-w-full rounded-[0.5rem] bg-white p-12 shadow">
                <div className="pb-11">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-bold">
                        <span className="text-06">#</span>
                        {id}
                      </p>
                      <p className="text-07">Project Description</p>
                    </div>
                    <div className="text-07">
                      <p>{invoiceData.billFrom.address}</p>
                      <p>{invoiceData.billFrom.city}</p>
                      <p>{invoiceData.billFrom.postcode}</p>
                      <p>{invoiceData.billFrom.country}</p>
                    </div>
                  </div>
                  <div className="flex justify-between pt-6">
                    <div className="flex flex-col justify-between">
                      <div>
                        <p className="text-07">Invoice Date</p>
                        <p className="font-bold">21 Aug 2021</p>
                      </div>
                      <div>
                        <p className="text-07">Payment Due</p>
                        <p className="font-bold">
                          {formatDate(invoiceData.dueDate)}
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="text-07">Bill To</p>
                      <p className="font-bold">{invoiceData.person.name}</p>
                      <div className="text-07">
                        <p>{invoiceData.person.address}</p>
                        <p>{invoiceData.person.city}</p>
                        <p>{invoiceData.person.postcode}</p>
                        <p>{invoiceData.person.country}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-07">Sent to</p>
                      <p className="font-bold">{invoiceData.person.email}</p>
                    </div>
                  </div>
                </div>

                {/* ITEMS AND TOTAL AMOUNT DUE */}
                <div className="flex flex-col rounded-t-lg bg-[#F9FAFE] p-8 font-medium">
                  <div className="grid grid-cols-5 pb-4">
                    <p className="col-span-1 text-07">Item</p>
                    <p className="col-start-3 text-center text-07">QTY.</p>
                    <p className="col-start-4 text-right text-07">Price</p>
                    <p className="col-start-5 text-right text-07">Total</p>
                  </div>
                  {invoiceData.item.map((item: Item) => (
                    <ItemDisplay key={item.id} item={item} />
                  ))}
                </div>
                <div className="flex h-[5rem] items-center justify-between rounded-b-lg bg-[#373B53] px-8">
                  <p className="text-body text-white">Amount Due</p>
                  <p className="text-heading-m font-bold text-white">
                    {currency.format(totalAmount)}
                  </p>
                </div>
              </div>
            </div>
          )}
        </main>
      </PageWrapper>
    </>
  );
}
