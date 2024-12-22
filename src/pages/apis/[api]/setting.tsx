import Border from "@/_client/atoms/Border";
import Button from "@/_client/atoms/Button";
import Field from "@/_client/atoms/Field";
import Form from "@/_client/atoms/Form";
import Header from "@/_client/atoms/Header";
import Modal from "@/_client/atoms/Modal";
import Title from "@/_client/atoms/Title";
import { CreateForm, RemoveForm, ConditionalDelete } from "@/_client/setting";
import PagesTable from "@/_client/table";
import actions from "@/_server";
import models from "@/_server/models";
import { FORM_TYPES } from "@/const";
import { Fragment } from "react/jsx-runtime";

interface Props {
  api: string;
}

export default async function CMSApisIdSettingPage(props: Props) {
  const { api } = props;
  const [forms, pages] = await Promise.all([
    models.forms.listByApi(api),
    models.pages.listByApi(api),
  ]);

  return (
    <>
      <Form _action={actions.forms.update.bind(null, api)}>
        <Header
          active
          title={api}
          href={`/apis/${api}/setting`}
          setting="API 設定"
        >
          <div className="flex justify-end w-full gap-2.5">
            <Button type="submit" className="text-white bg-[#FB773F]">
              更新
            </Button>
          </div>
        </Header>
        <Title title="API スキーマ">
          {forms.map((form, index) => (
            <Fragment key={index}>
              <div className="relative flex w-full gap-10">
                <RemoveForm api={api} formId={form.id} />
                <div className="flex flex-col w-full">
                  <Field
                    title="APIキー"
                    name="name"
                    defaultValue={form.form_name ?? ""}
                  />
                </div>
                <div className="flex flex-col w-full">
                  <Field
                    title="表示名"
                    name="title"
                    defaultValue={form.form_title ?? ""}
                  />
                </div>
                <div className="flex flex-col w-full">
                  <Field title="タイプ" name="type" form_type="select">
                    {FORM_TYPES.map((type, index) => (
                      <option
                        value={type.type}
                        key={index}
                        selected={form.form_type === type.type}
                      >
                        {type.title}
                      </option>
                    ))}
                  </Field>
                </div>
              </div>
              <Border />
            </Fragment>
          ))}
          <CreateForm api={api} />
        </Title>
      </Form>
      <Title title="削除したコンテンツ">
        <div>
          <PagesTable api={api} isDeleted />
        </div>
      </Title>
      <Title title="重要な操作">
        <Modal small>
          <Button className="flex-0 h-12 border border-[#DC2647] text-[#DC2647] hover:opacity-50 disabled:opacity-25">
            コンテンツを完全に削除
          </Button>
          <Form _action={actions.pages.remove.bind(null, api)} className="p-10">
            <ConditionalDelete value={api} />
          </Form>
        </Modal>
        <Modal small>
          <Button
            disabled={pages.length > 0}
            className="flex-0 h-12 border border-[#DC2647] text-[#DC2647] hover:opacity-50 disabled:opacity-25"
          >
            API を完全に削除
          </Button>
          <Form _action={actions.apis.remove.bind(null, api)} className="p-10">
            <ConditionalDelete value={api} />
          </Form>
        </Modal>
      </Title>
    </>
  );
}
