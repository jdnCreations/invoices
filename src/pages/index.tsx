import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { api } from "~/utils/api";
import Image from "next/image";
import Header from "~/components/Header";
import PageWrapper from "~/components/PageWrapper";
import Invoice from "~/components/Invoice";
import FormSectionTitle from "~/components/FormSectionTitle";

export default function Home() {
  const session = useSession();
  const authenticated = session.status === "authenticated";
  const isOpen = false;

  const currentDate = new Date().toLocaleDateString("en-au", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  let userId;

  if (session.data && session.data.user) {
    userId = session.data.user.id;
  } else {
    userId = "";
  }

  const { data, isLoading } = api.invoice.getAllByUser.useQuery(userId);

  if (authenticated && !isLoading) {
    return (
      <>
        <Head>
          <title>Invoices</title>
          <meta name="description" content="Generated by create-t3-app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <PageWrapper>
          <Header />
          <main className="flex w-full flex-col items-center bg-light font-spartan">
            <div className="flex w-[calc(100%-1.5rem)] max-w-[45.625rem] py-8 md:py-12">
              <div className="flex w-full items-center justify-between px-2">
                <div>
                  <h1 className="text-heading-m font-bold leading-heading-m tracking-heading-m">
                    Invoices
                  </h1>
                  <p className="text-06">
                    {isLoading
                      ? "invoices"
                      : data!.length > 1
                      ? `${data?.length} invoices`
                      : `${data?.length} invoice`}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <label
                    className="text-heading-s font-bold leading-body-var tracking-heading-s"
                    htmlFor=""
                  >
                    Filter
                  </label>
                  <select name="filter" id="filter"></select>
                  <button className="flex h-[3rem] w-auto items-center justify-between gap-2 rounded-full bg-01 px-2 text-white md:w-[9.375rem]">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white">
                      <Image
                        alt="plus"
                        src="/images/icon-plus.svg"
                        width={11}
                        height={11}
                        className="object-center"
                      />
                    </div>
                    New
                  </button>
                </div>
              </div>
            </div>

            {data?.map((data) => (
              <Invoice key={data.id} invoice={data} person={data.person} />
            ))}
          </main>

          <div className="absolute z-0 h-full w-full bg-08/40"></div>

          <div className="absolute z-10 h-full w-[719px] overflow-y-auto rounded-r-[20px] bg-white">
            <div className="relative left-[103px] w-[calc(100%-103px)] px-14 pb-8 pt-14">
              <form>
                <h1 className="pb-14 text-heading-m font-bold">New Invoice</h1>
                <div className="flex flex-col gap-6 pb-12">
                  <FormSectionTitle title="Bill From" />
                  <div>
                    <label
                      htmlFor="address"
                      className="text-body font-medium text-07"
                    >
                      Street Address
                    </label>
                    <input
                      id="address"
                      className="h-[48px] w-full rounded border border-05 px-5 text-heading-s font-bold text-08 outline-05"
                      type="text"
                    />
                  </div>
                  <div className="flex gap-6">
                    <div>
                      <label
                        htmlFor="city"
                        className="text-body font-medium text-07"
                      >
                        City
                      </label>
                      <input
                        id="city"
                        className="h-[48px] w-full rounded border border-05 px-5 text-heading-s font-bold text-08 outline-05"
                        type="text"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="post-code"
                        className="text-body font-medium text-07"
                      >
                        Post Code
                      </label>
                      <input
                        id="post-code"
                        className="h-[48px] w-full rounded border border-05 px-5 text-heading-s font-bold text-08 outline-05"
                        type="text"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="country"
                        className="text-body font-medium text-07"
                      >
                        Country
                      </label>
                      <input
                        id="country"
                        className="h-[48px] w-full rounded border border-05 px-5 text-heading-s font-bold text-08 outline-05"
                        type="text"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-6 pb-12">
                  <FormSectionTitle title="Bill To" />
                  <div>
                    <label
                      htmlFor="clientsName"
                      className="pb-8 text-body font-medium text-07"
                    >
                      {`Client's Name`}
                    </label>
                    <input
                      id="clientsName"
                      className="h-[48px] w-full rounded border border-05 px-5 text-heading-s font-bold text-08 outline-05"
                      type="text"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="clientsEmail"
                      className="pb-8 text-body font-medium text-07"
                    >
                      {`Client's Email`}
                    </label>
                    <input
                      id="clientsEmail"
                      className="h-[48px] w-full rounded border border-05 px-5 text-heading-s font-bold text-08 outline-05"
                      type="text"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="clientsAddress"
                      className="pb-8 text-body font-medium text-07"
                    >
                      {`Street Address`}
                    </label>
                    <input
                      id="clientsAddress"
                      className="h-[48px] w-full rounded border border-05 px-5 text-heading-s font-bold text-08 outline-05"
                      type="text"
                    />
                  </div>
                  <div className="flex gap-6">
                    <div>
                      <label
                        htmlFor="city"
                        className="pb-8 text-body font-medium text-07"
                      >
                        City
                      </label>
                      <input
                        id="city"
                        className="h-[48px] w-full rounded border border-05 px-5 text-heading-s font-bold text-08 outline-05"
                        type="text"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="post-code"
                        className="pb-8 text-body font-medium text-07"
                      >
                        Post Code
                      </label>
                      <input
                        id="post-code"
                        className="h-[48px] w-full rounded border border-05 px-5 text-heading-s font-bold text-08 outline-05"
                        type="text"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="country"
                        className="pb-8 text-body font-medium text-07"
                      >
                        Country
                      </label>
                      <input
                        id="country"
                        className="h-[48px] w-full rounded border border-05 px-5 text-heading-s font-bold text-08 outline-05"
                        type="text"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-6 pb-12">
                  <div className="flex gap-6">
                    <div>
                      <label
                        htmlFor="invoiceDate"
                        className="pb-8 text-body font-medium text-07"
                      >
                        Invoice Date
                      </label>
                      <input
                        id="invoiceDate"
                        className="h-[48px] w-full rounded border border-05 px-5 text-heading-s font-bold text-08 outline-05"
                        type="text"
                        value={currentDate}
                        readOnly
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="paymentTerms"
                        className="pb-8 text-body font-medium text-07"
                      >
                        Payment Terms
                      </label>
                      <select
                        name="paymentTerms"
                        id="paymentTerms"
                        className="h-[48px] w-full rounded border border-05 px-5 text-heading-s font-bold text-08 outline-05"
                      >
                        <option value="Next 30 Days">Next 30 Days</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="projectDescription"
                      className="pb-8 text-body font-medium text-07"
                    >
                      Project Description
                    </label>
                    <input
                      id="projectDescription"
                      className="h-[48px] w-full rounded border border-05 px-5 text-heading-s font-bold text-08 outline-05"
                      type="text"
                    />
                  </div>
                </div>
                <div>
                  <div>
                    <p className="pb-3 text-[18px] font-bold text-[#777F98]">
                      Item List
                    </p>
                    <div className="flex gap-4 pb-4">
                      <div>
                        <label
                          htmlFor="itemName"
                          className="pb-8 text-body font-medium text-07"
                        >
                          Item Name
                        </label>
                        <input
                          id="itemName"
                          className="h-[48px] w-[214px] rounded border border-05 px-5 text-heading-s font-bold text-08 outline-05"
                          type="text"
                        />
                      </div>
                      <div>
                        <div>
                          <label
                            htmlFor="quantity"
                            className="pb-8 text-body font-medium text-07"
                          >
                            Qty.
                          </label>
                          <input
                            id="quantity"
                            className="h-[48px] w-[46px] rounded border border-05 text-center text-heading-s font-bold text-08 outline-05"
                            type="text"
                          />
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="price"
                          className="pb-8 text-body font-medium text-07"
                        >
                          Price
                        </label>
                        <input
                          id="price"
                          className="h-[48px] w-[100px] rounded border border-05 px-5 text-heading-s font-bold text-08 outline-05"
                          type="text"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="total"
                          className="pb-8 text-body font-medium text-07"
                        >
                          Total
                        </label>
                        <p className="flex h-[48px] items-center text-heading-s font-bold text-06">
                          156.00
                        </p>
                      </div>
                      <div className="flex h-[72px] items-center">a</div>
                    </div>
                    <button className="h-[48px] w-full rounded-3xl bg-[#f9fafe] text-heading-s font-bold text-07">
                      + Add New Item
                    </button>
                  </div>
                </div>
                <div className="bottom-4 flex justify-between pt-8 text-heading-s font-bold">
                  <button className="h-[48px] rounded-3xl bg-[#f9fafe] px-6 text-07 ">
                    Discard
                  </button>
                  <div className="flex gap-2">
                    <button className="h-[48px] rounded-3xl bg-[#373b53] px-6 text-06 ">
                      Save as Draft
                    </button>
                    <button className="h-[48px] rounded-3xl bg-01 px-6 text-white ">
                      Save & Send
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </PageWrapper>
      </>
    );
  } else {
    return <button onClick={() => void signIn()}>Sign in</button>;
  }
}
