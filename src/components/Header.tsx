import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function Header() {
  const session = useSession();
  return (
    <header className="z-20 flex h-[4.5rem] items-center justify-between bg-04 md:h-screen md:flex-col md:rounded-r-[20px]">
      <div className="relative flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-r-2xl bg-01 md:h-[6.4375rem] md:w-[6.4375rem]">
        <Image
          className="relative z-10 w-[28px] md:w-[40px]"
          alt="logo"
          src="/images/logo.svg"
          width={40}
          height={40}
        />
        <div className="absolute bottom-0 h-[2.25rem] w-full rounded-br-2xl rounded-tl-2xl bg-02 md:h-[3.21875rem]"></div>
      </div>
      <div className="flex h-full max-h-[150px] items-center justify-between gap-6 px-6 md:w-full md:flex-col md:px-0 md:pb-4">
        <Image
          alt="mode icon"
          src="/images/icon-moon.svg"
          width={19.9}
          height={19.9}
        />
        <div className="h-full w-[1px] bg-[#494e6e] md:h-[1px] md:w-full"></div>
        {session.data && (
          <Image
            alt="profile picture"
            src={session.data.user.image!}
            width={32}
            height={32}
            className="rounded-full md:w-[40px]"
            onClick={() => void signOut()}
          />
        )}
      </div>
    </header>
  );
}
