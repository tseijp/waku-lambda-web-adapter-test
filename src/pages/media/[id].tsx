import Datetime from "@/_client/atoms/DateTime";
import { DeleteButton, FilePreview, UploadButton } from "@/_client/media";
import actions from "@/_server";
import models from "@/_server/models";

interface Props {
  id: string;
}

export default async function CMSMediaPage(props: Props) {
  const { id } = props;
  if (!id) return;
  const blob = await models.blobs.get(Number(id));
  if (!blob) return "Blob Not Found";
  return (
    <>
      <div className="h-[180px]">
        <FilePreview blob={blob} className="w-[340px] h-[180px]" />
      </div>
      <div className="max-w-[340px]">{blob.file_name}</div>
      <div className="grid grid-cols-[128px_1fr] gap-y-2">
        <div className="font-bold">作成日時</div>
        <div>
          <Datetime datetime={blob.created_at} />
        </div>
        <div className="font-bold">形式</div>
        <div>{blob.file_type}</div>
        <div className="font-bold">容量</div>
        <div>{(blob.file_size / 1024 / 1024).toFixed(2)} MB</div>
      </div>
      <div className="fixed right-10 bottom-10 flex gap-4">
        <UploadButton
          _action={actions.blobs.update.bind(null, blob.id)}
          className="w-[162px] h-12 border border-[#563BFF] text-[#563BFF] hover:opacity-50"
        >
          再アップロード
        </UploadButton>
        <DeleteButton
          _action={actions.blobs.remove.bind(null, blob.id)}
          blobId={blob.id}
          className="w-[162px] h-12 border border-[#DC2647] text-[#DC2647] hover:opacity-50"
        >
          削除
        </DeleteButton>
      </div>
    </>
  );
}
