import React from "react";

export default function AnimatedTitle({ title }) {
  return (
    <div className="mt-5 text-center text-4xl uppercase leading-[0.8] md:text-[6rem]">
      {title}
    </div>
  );
}
