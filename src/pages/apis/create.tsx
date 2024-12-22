import Button from "@/_client/atoms/Button";
import Form from "@/_client/atoms/Form";
import Field from "@/_client/atoms/Field";
import actions from "@/_server";

export default async function CreatePage() {
  return (
    <>
      <h1 className="mx-auto text-center pt-20 mb-6 text-[24px] font-bold">
        API の基本情報を入力
      </h1>
      <Form
        _action={actions.apis.create}
        className="mx-auto p-10 max-w-[800px] flex flex-col rounded-lg bg-[#F8F9FD]"
      >
        <Field name="title" title="API 名" />
        <Field name="api" title="エンドポイント" />
        <Button type="submit" className="mt-8 text-white rounded bg-[#563BFE]">
          作成
        </Button>
      </Form>
    </>
  );
}
