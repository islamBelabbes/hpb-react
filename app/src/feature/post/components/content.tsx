"use client";
import { parseBlock } from "@/feature/block/utils";
import useIsMounted from "@/hooks/use-is-mounted";
import parse from "html-react-parser";

function Content({ content }: { content: string }) {
  const isMounted = useIsMounted();

  const parsed = parse(content, {
    replace(domNode) {
      return parseBlock(domNode);
    },
  });

  if (!isMounted) return null;
  return <article className="my-6">{parsed}</article>;
}

export default Content;
