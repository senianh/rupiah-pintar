export type MoneyKind = "note" | "coin";

export interface MoneyAsset {
  value: number;
  label: string;
  shortLabel: string;
  kind: MoneyKind;
  color: string;
  accent: string;
  textColor: string;
  imageFront?: string;
  imageBack?: string;
}

const biImage = (nominal: string, side: "depan" | "belakang") =>
  `https://www.bi.go.id/Gambar%20Uang/TE2022/TE-2022-${nominal}-${side}.JPG`;

export const MONEY_ASSETS: MoneyAsset[] = [
  {
    value: 100,
    label: "Rp 100",
    shortLabel: "100",
    kind: "coin",
    color: "#d7dbe2",
    accent: "#8f98a8",
    textColor: "#283142",
  },
  {
    value: 200,
    label: "Rp 200",
    shortLabel: "200",
    kind: "coin",
    color: "#e7edf4",
    accent: "#9aa8ba",
    textColor: "#24364d",
  },
  {
    value: 500,
    label: "Rp 500",
    shortLabel: "500",
    kind: "coin",
    color: "#f2d27d",
    accent: "#b7822f",
    textColor: "#4b2d08",
  },
  {
    value: 1000,
    label: "Rp 1.000",
    shortLabel: "1K",
    kind: "note",
    color: "#4f8a48",
    accent: "#c9e0a4",
    textColor: "#123918",
    imageFront: biImage("1000", "depan"),
    imageBack: biImage("1000", "belakang"),
  },
  {
    value: 2000,
    label: "Rp 2.000",
    shortLabel: "2K",
    kind: "note",
    color: "#687482",
    accent: "#d5dce7",
    textColor: "#172536",
    imageFront: biImage("2000", "depan"),
    imageBack: biImage("2000", "belakang"),
  },
  {
    value: 5000,
    label: "Rp 5.000",
    shortLabel: "5K",
    kind: "note",
    color: "#6f4a35",
    accent: "#d3af83",
    textColor: "#2b1608",
    imageFront: biImage("5000", "depan"),
    imageBack: biImage("5000", "belakang"),
  },
  {
    value: 10000,
    label: "Rp 10.000",
    shortLabel: "10K",
    kind: "note",
    color: "#6f2aa1",
    accent: "#c9a1e7",
    textColor: "#210039",
    imageFront: biImage("10000", "depan"),
    imageBack: biImage("10000", "belakang"),
  },
  {
    value: 20000,
    label: "Rp 20.000",
    shortLabel: "20K",
    kind: "note",
    color: "#2c8c43",
    accent: "#a4d691",
    textColor: "#093913",
    imageFront: biImage("20000", "depan"),
    imageBack: biImage("20000", "belakang"),
  },
  {
    value: 50000,
    label: "Rp 50.000",
    shortLabel: "50K",
    kind: "note",
    color: "#1d70bf",
    accent: "#a6cff1",
    textColor: "#06294c",
    imageFront: biImage("50000", "depan"),
    imageBack: biImage("50000", "belakang"),
  },
  {
    value: 100000,
    label: "Rp 100.000",
    shortLabel: "100K",
    kind: "note",
    color: "#b8272f",
    accent: "#f0a4a0",
    textColor: "#4a090d",
    imageFront: biImage("100000", "depan"),
    imageBack: biImage("100000", "belakang"),
  },
];

export const getMoneyAsset = (value: number) => {
  const asset = MONEY_ASSETS.find((money) => money.value === value);
  if (!asset) {
    throw new Error(`Money asset not found for ${value}`);
  }
  return asset;
};

export const formatRupiah = (amount: number) => `Rp ${amount.toLocaleString("id-ID")}`;
