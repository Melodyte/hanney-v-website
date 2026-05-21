interface RichTextRendererProps {
  content: string;
  className?: string;
}

export default function RichTextRenderer({ content, className = "" }: RichTextRendererProps) {
  return (
    <div
      className={`prose prose-lg max-w-none prose-headings:font-heading prose-headings:text-neutral-950 prose-p:text-neutral-700 prose-p:leading-relaxed prose-a:text-gold-600 prose-a:no-underline hover:prose-a:underline prose-blockquote:border-l-gold-400 prose-blockquote:text-neutral-600 prose-img:rounded-lg prose-strong:text-neutral-900 ${className}`}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
