export const FORM_TYPES = [
  { type: "text" as const, title: "テキストフィールド" },
  { type: "textarea" as const, title: "テキストエリア" },
  { type: "editor" as const, title: "リッチエディタ" },
  { type: "blob" as const, title: "画像" },
  { type: "blobs" as const, title: "複数画像" },
  { type: "date" as const, title: "日時" },
  { type: "bool" as const, title: "真偽地" },
  { type: "select" as const, title: "セレクトフィールド" },
  { type: "ref" as const, title: "コンテンツ参照" },
  { type: "refs" as const, title: "複数コンテンツ参照" },
  { type: "number" as const, title: "数値" },
];

export type FormTypes = (typeof FORM_TYPES)[number];

export type FormType = (typeof FORM_TYPES)[number]["type"];
