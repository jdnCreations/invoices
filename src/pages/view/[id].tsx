import Link from "next/link";
import { useRouter } from "next/router";
import Header from "~/components/Header";
import { currency, formatDate } from "~/components/Invoice";
import PageWrapper from "~/components/PageWrapper";
import StatusIndicator from "~/components/StatusIndicator";
import ItemDisplay from "~/components/ItemDisplay";
import { api } from "~/utils/api";
import { type Item } from "@prisma/client";

function calculateTotal(items: Item[]) {
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

export default function InvoicePage() {
  const router = useRouter();
  const id = String(router.query.id);

  const invoice = api.invoice.getAllInvoiceDataById.useQuery(id).data;

  let totalAmount = 0;

  if (invoice) {
    totalAmount = calculateTotal(invoice.item);
  }

  return (
    <>
      <PageWrapper>
        <Header />
        <main className="flex w-full flex-col items-center bg-light font-spartan">
          <Link href="/" className="">
            Go Back
          </Link>
          {invoice && (
            <div className="flex flex-col gap-6">
              <div className="flex h-[5.5rem] w-[45.625rem] max-w-full items-center justify-between gap-2 rounded-[0.5rem] bg-white px-8 shadow-md">
                <div className="flex items-center gap-5">
                  <p className="font-medium text-[#858BB2]">Status</p>
                  <StatusIndicator key={id} status={invoice.status} />
                </div>
                <div className="flex gap-2">
                  <button className="h-[3rem] min-w-[4.6rem] rounded-[1.5rem] bg-[#F9FAFE] px-6 font-bold text-07">
                    Edit
                  </button>
                  <button className="h-[3rem] min-w-[4.6rem] rounded-[1.5rem] bg-09 px-6 font-bold text-white">
                    Delete
                  </button>
                  <button className="h-[3rem] min-w-[4.6rem] rounded-[1.5rem] bg-01 px-6 font-bold text-white">
                    Mark as Paid
                  </button>
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
                      <p>{invoice.billFrom.address}</p>
                      <p>{invoice.billFrom.city}</p>
                      <p>{invoice.billFrom.postcode}</p>
                      <p>{invoice.billFrom.country}</p>
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
                          {formatDate(invoice.dueDate)}
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="text-07">Bill To</p>
                      <p className="font-bold">{invoice.person.name}</p>
                      <div className="text-07">
                        <p>{invoice.person.address}</p>
                        <p>{invoice.person.city}</p>
                        <p>{invoice.person.postcode}</p>
                        <p>{invoice.person.country}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-07">Sent to</p>
                      <p className="font-bold">{invoice.person.email}</p>
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
                  {invoice.item.map((item) => (
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
