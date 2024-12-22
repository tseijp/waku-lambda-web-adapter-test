interface Props {
  title: string;
  children: React.ReactNode;
}

export default function Title(props: Props) {
  const { title, children } = props;
  return (
    <>
      <div className="ml-10 pt-10 pb-2 leading-8 font-bold text-[#9393B2] border-b border-[#E5E5F2]">
        {title}
      </div>
      <div className="px-20 py-10 flex flex-col gap-10">{children}</div>
    </>
  );
}
