import { DOMNode } from "html-react-parser";
import {
  definedBlocksSchema,
  musicListSchema,
  testimonialsSchema,
} from "./schema";
import { Testimonials } from "./components/testimonials";
import BlockFullBack from "./components/block-fullback";
import React from "react";
import { MusicList } from "./components/music-player";

export const parseBlock = (block: DOMNode) => {
  // make sure its a block
  if (block.type !== "tag" || block.name !== "hpblock") return block;

  // get the slug
  const slug = definedBlocksSchema.safeParse(block.attribs.slug);
  if (slug.error) {
    console.warn("block found but no implementation was defined");
    return React.createElement(BlockFullBack);
  }

  // generate data based on the slug
  switch (slug.data) {
    case "lazyblock/testimonials": {
      return Testimonials({
        testimonials: testimonialsSchema
          .array()
          .parse(toJson(block.attribs.testimonials)),
      });
    }
    case "lazyblock/music-list": {
      return MusicList({
        music: musicListSchema.array().parse(toJson(block.attribs.music)),
      });
      // return React.createElement(MusicList, {
      //   music: musicListSchema.array().parse(toJson(block.attribs.music)),
      // });
    }
  }
};

export const toJson = (string: any) => {
  try {
    return JSON.parse(string);
  } catch (e) {
    throw new Error("invalid json");
  }
};
