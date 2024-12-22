"use client";

import React from "react";

export interface FormActionResponse {
  statusCode: number;
  message?: string;
  redirect?: string;
}

interface Props extends React.HTMLProps<HTMLFormElement> {
  _action: (formData: FormData) => Promise<FormActionResponse>;
  confirm?: string;
}

export default function Form(props: Props) {
  const { _action, confirm, ...formProps } = props;

  const override = async (formData: FormData) => {
    if (confirm) if (!window.confirm(confirm)) return;
    const res = await _action(formData);
    if (res.statusCode !== 200) throw Error(`Error: response is not ok`);
    if (res.message) alert(res.message);
    if (res.redirect) window.location.pathname = res.redirect;
  };

  return <form action={override} {...formProps} />;
}
