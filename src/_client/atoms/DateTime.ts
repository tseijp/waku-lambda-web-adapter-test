"use client";

import { useMemo } from "react";

const padding = (value: string | number = 0, length = 2, target = "0") => {
  return (target.repeat(length) + value).slice(-length);
};

interface Props {
  date?: any;
  time?: any;
  datetime?: any;
}

export default function Datetime(props: Props) {
  const { datetime, date, time } = props;
  return useMemo(() => {
    const utc = new Date(datetime ?? date ?? time);
    const jst = new Date(utc.toLocaleString());
    const YYYY = padding(jst.getFullYear(), 4);
    const MM = padding(jst.getMonth() + 1, 2);
    const dd = padding(jst.getDate(), 2);
    const hh = padding(jst.getHours(), 2);
    const mm = padding(jst.getMinutes(), 2);
    if (datetime) return `${YYYY}年${MM}月${dd}日 ${hh}:${mm}`;
    if (date) return `${YYYY}年${MM}月${dd}日`;
    return `${hh}:${mm}`;
  }, [date, time]);
}
