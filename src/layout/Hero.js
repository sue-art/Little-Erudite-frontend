import React from "react";

export default function Hero() {
  const image_adventure = window.location.origin + "/adventure.svg";
  const bg_image = window.location.origin + "/home_bg.svg";

  return (
    <div
      style={{
        backgroundImage: `url(${bg_image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="relative dairy-cream isolate px-6 pt-20 lg:px-8"
    >
      <div className="mx-auto max-w-2xl pb:20 pt-15 sm:py-8 ">
        <div className="hidden sm:mb-8 sm:flex sm:justify-center">
          <div className="relative dairy-cream rounded-full text-2xl px-3 ">
            <a href="/books" className="font-semibold text-indigo-600">
              <img
                width="660px"
                src={image_adventure}
                alt="adventure of the book stories"
              />
            </a>
          </div>
        </div>
      </div>
      <div
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
    </div>
  );
}
