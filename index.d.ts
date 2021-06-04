interface IParsedMarkdown {
  metadata?: { [key: string]: string };
  title?: string;
  content: string;
}
export default function metadown(path: string): Promise<IParsedMarkdown>
