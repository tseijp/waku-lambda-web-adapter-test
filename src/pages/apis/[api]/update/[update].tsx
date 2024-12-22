import Button from "@/_client/atoms/Button";
import Form from "@/_client/atoms/Form";
import Header from "@/_client/atoms/Header";
import Field from "@/_client/atoms/Field";
import Title from "@/_client/atoms/Title";
import actions from "@/_server";
import models from "@/_server/models";
import { BlobTable } from "@/pages/media/[id]";

interface Props {
  api: string;
  update: string;
}

export default async function CMSApisIdUpdatePage(props: Props) {
  const { api, update: pathname } = props;
  const page = await models.pages.get(pathname);
  if (!page) return "Pages Not Found";
  const [forms, items] = await Promise.all([
    await models.forms.listByApi(api),
    await models.items.listByPathname(page.pathname),
  ]);
  const getValue = (id: number) => {
    const current = items.find(({ form_id }) => form_id === id);
    return current?.content ?? "";
  };
  return (
    <Form _action={actions.pages.update.bind(null, api, pathname)}>
      <Header title={api} setting="API 設定" href={`/apis/${api}/setting`}>
        {/* <Button className="text-[#563BFE] border border-[#563BFE]">
            下書きを保存
          </Button> */}
        <div />
        <Button type="submit" className="text-white bg-[#FB773F]">
          更新
        </Button>
      </Header>
      <Title title="コンテンツ">
        {forms.map(({ id, form_name, form_type, form_title }) => (
          <Field
            key={id}
            name={form_name ?? ""}
            title={form_title ?? ""}
            defaultValue={getValue(id) as string}
            form_type={form_type}
          />
        ))}
      </Title>
    </Form>
  );
}
