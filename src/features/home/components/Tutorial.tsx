"use client";
import React from "react";
import { Timeline } from "primereact/timeline";
import { Card } from "primereact/card";
import { Image } from "primereact/image";

interface TimelineEvent {
  status?: string;
  date?: string;
  icon?: string;
  color?: string;
  image?: string;
}

export const Tutorial = ({ title }: { title: string }) => {
  const events: (TimelineEvent & { index: number })[] = [
    {
      status: "Diamond Member",
      date: "instruction",
      icon: "pi pi-spin pi-cog",
      image: "/images/logo.png",
      index: 0,
    },
    {
      status: "Platinum Member",
      date: "instruction",
      icon: "pi pi-spin pi-cog",
      image: "/images/logo.png",
      index: 1,
    },
    {
      status: "Gold Member",
      date: "instruction",
      icon: "pi pi-spin pi-cog",
      image: "/images/logo.png",
      index: 2,
    },
    {
      status: "Silver Member",
      date: "instruction",
      icon: "pi pi-spin pi-cog",
      image: "/images/logo.png",
      index: 3,
    },
  ];

  const customizedMarker = (item: TimelineEvent) => {
    return (
      <span className="flex w-10 h-10 items-center justify-center  border-circle z-1 shadow-md dark:shadow-white">
        <i
          className={`${item.icon} text-lg rounded-lg text-black dark:text-white p-2`}
        ></i>
      </span>
    );
  };

  const customizedContent = (item: TimelineEvent & { index: number }) => {
    const isEven = item.index % 2 === 0;

    return (
      <Card
        title={item.status}
        subTitle={item.date}
        className="dark:text-white text-black dark:bg-gray-900 bg-white"
      >
        <div
          className={`flex flex-col md:flex-row ${
            isEven ? "md:flex-row" : "md:flex-row-reverse"
          } items-center gap-4`}
        >
          {item.image && (
            <Image
              src={`${item.image}`}
              alt={item.image}
              width="500"
              className="shadow-1"
              preview
            />
          )}
          <p className="text-left">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore
            sed consequuntur error repudiandae numquam deserunt quisquam
            repellat libero asperiores earum nam nobis, culpa ratione quam
            perferendis esse, cupiditate neque quas!
          </p>
        </div>
      </Card>
    );
  };

  return (
    <>
      <section id="tutorial" style={{ minHeight: "100vh", paddingTop: "20px" }}>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {title}
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
        </div>
        <div className="card max-w-7xl mx-auto">
          <Timeline
            value={events}
            align="alternate"
            className="customized-timeline"
            marker={customizedMarker}
            content={customizedContent}
          />
        </div>
      </section>
    </>
  );
};
