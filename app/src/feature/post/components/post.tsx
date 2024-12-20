import React from "react";
import { TPost } from "../schema";
import Image from "next/image";
import Content from "./content";

function Post({ content, image, title }: TPost) {
  return (
    <div className="mt-32 flex flex-col gap-6">
      <h1 className="text-4xl font-bold">{title}</h1>
      {image && (
        <div className="relative mx-auto h-[350px] w-1/2">
          <Image
            src={image}
            alt={title}
            fill
            className="rounded-xl object-cover"
          />
        </div>
      )}
      <Content content={content} />
    </div>
  );
}

export default Post;
