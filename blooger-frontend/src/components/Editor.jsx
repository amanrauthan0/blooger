import { UseMarkdown } from "../context/UseMarkdown";

export default function Editor() {
  const { markdown, setMarkdown } = UseMarkdown();

  return (
    <textarea
      value={markdown}
      onChange={(e) => setMarkdown(e.target.value)}
      placeholder="Start writing your story..."
      className="
        w-full
        h-full
        bg-[#111816]
        text-slate-200
        placeholder:text-slate-700
        p-7
        outline-none
        resize-none
        font-mono
        text-[15px]
        leading-7
      "
    />
  );
}