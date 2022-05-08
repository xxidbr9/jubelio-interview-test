import React from "react";

type DrawerProps = {
  header?: string | React.ReactNode,
  open?: boolean,
  onClose?: () => void
}

const Drawer: React.FC<DrawerProps> = ({ header, children, open, onClose }) => {
  return (
    <main
      className={
        "fixed overflow-hidden z-50 inset-0 transform ease-in-out " +
        (open
          ? " transition-opacity opacity-100 duration-500 translate-x-0  "
          : " transition-all delay-500 opacity-0 translate-x-full  ")
      }
    >
      <section
        className={
          " w-screen max-w-sm right-0 absolute bg-white h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform  " +
          (open ? " translate-x-0 " : " translate-x-full ")
        }
      >
        <article className="relative max-w-lg pb-10 flex flex-col space-y-6 overflow-y-scroll h-full z-50">
          {typeof header === "string" ? (
            <header className="p-4 font-bold text-lg">{header}</header>
          ) : (
            <header>{header}</header>
          )}
          <div className="">
            {children}
          </div>
        </article>
      </section>
      <section
        className={`w-screen h-full cursor-pointer bg-gray-900 bg-opacity-25` +
          (open
            ? " transition-opacity opacity-100 duration-200 "
            : " transition-all delay-200 opacity-0 ")
        }
        onClick={onClose}
      ></section>
    </main>
  );
}

export default Drawer