type Props = {
  title: string;
};

export const Header = ({ title }: Props) => {
  return (
    <div className="flex justify-between items-center px-4 py-3 border-[#27282D] border-b">
      <div className="flex items-center gap-3">
        <h2 className="text-white text-sm select-none">{title}</h2>
      </div>
    </div>
  );
};
