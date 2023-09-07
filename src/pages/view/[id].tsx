import Link from "next/link";
import { useRouter } from "next/router";
import Header from "~/components/Header";
import { currency } from "~/components/Invoice";
import PageWrapper from "~/components/PageWrapper";
import StatusIndicator from "~/components/StatusIndicator";
import { api } from "~/utils/api";

export default function InvoicePage() {
  const router = useRouter();
  const id = String(router.query.id);

  const data = api.invoice.getById.useQuery(id).data;

  return (
    <>
      <PageWrapper>
        <Header />
        <main className="flex w-full flex-col items-center bg-light font-spartan">
          <Link href="/" className="">
            Go Back
          </Link>
          {data && (
            <div className="flex flex-col gap-6">
              <div className="flex h-[5.5rem] w-[45.625rem] max-w-full items-center justify-between gap-2 rounded-[0.5rem] bg-white px-8 shadow-md">
                <div className="flex items-center gap-5">
                  <p className="font-medium text-[#858BB2]">Status</p>
                  <StatusIndicator key={id} invoice={data} />
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
                        {data.id}
                      </p>
                      <p className="text-07">Project Description</p>
                    </div>
                    <div className="text-07">
                      <p>19 Example Street</p>
                      <p>City</p>
                      <p>Post Code</p>
                      <p>Country</p>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="flex flex-col justify-between">
                      <div>
                        <p className="text-07">Invoice Date</p>
                        <p className="font-bold">21 Aug 2021</p>
                      </div>
                      <div>
                        <p className="text-07">Payment Due</p>
                        <p className="font-bold">20 Sep 2021</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-07">Bill To</p>
                      <p className="font-bold">{data.person}</p>
                      <div className="text-07">
                        <p>Address</p>
                        <p>City</p>
                        <p>Post Code</p>
                        <p>Country</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-07">Sent to</p>
                      <p className="font-bold">Email</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-t-lg bg-[#F9FAFE] p-8">
                  <p className="text-07">Item Name</p>
                  <p className="font-bold">Banner Design</p>
                  <p className="font-bold">Email Design</p>
                </div>
                <div className="flex h-[5rem] items-center justify-between rounded-b-lg bg-[#373B53] px-8">
                  <p className="text-body text-white">Amount Due</p>
                  <p className="text-heading-m font-bold text-white">
                    {currency.format(data.amount)}
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
