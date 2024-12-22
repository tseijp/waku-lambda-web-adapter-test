import Datetime from "@/_client/atoms/DateTime";
import Header from "@/_client/atoms/Header";
import Table, { LinkedTableRow } from "@/_client/atoms/Table";
import { FilePreview, UploadButton } from "@/_client/media";
import actions from "@/_server";
import models from "@/_server/models";
import React from "react";

interface Props {
  path: string;
  children: React.ReactNode;
}

export default async function MediaLayout(props: Props) {
  const { children, path } = props;
  const blobs = await models.blobs.list();
  return (
    <>
      <Header title="メディア管理">
        <input
          placeholder="検索"
          className="rounded px-3 w-60 h-10 bg-[#F8F9FD]"
        />
        <UploadButton
          plus
          _action={actions.blobs.create}
          className="text-white rounded bg-[#563BFE]"
        >
          アップロード
        </UploadButton>
      </Header>
      <div className="mx-10 mt-5 flex">
        <Table>
          <tr className="flex border-bottom border-[#E5E5F2]">
            <th />
            <th>ファイル名</th>
            <th>形式</th>
            <th>作成日</th>
            <th>更新日</th>
          </tr>
          {blobs.map((blob) => (
            <LinkedTableRow
              key={blob.id}
              href={`/media/${blob.id}`}
              active={`/media/${blob.id}` === path}
            >
              <td className="h-[112px]">
                <FilePreview blob={blob} className="h-16" />
              </td>
              <td>{blob.file_name}</td>
              <td>
                <a href={`${blob.id}`}>{blob.file_type}</a>
              </td>
              <td>
                <Datetime date={blob.created_at} />
              </td>
              <td>
                <Datetime datetime={blob.updated_at} />
              </td>
            </LinkedTableRow>
          ))}
        </Table>
        <div className="shrink-0 w-[340px] h-full pl-12 top-9 right-0 flex flex-col gap-4">
          {children}
        </div>
      </div>
    </>
  );
}
