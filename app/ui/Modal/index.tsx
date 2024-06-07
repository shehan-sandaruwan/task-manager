type ModalProps = {
  title: string;
  children: React.ReactNode;
};
export default function Modal({ title, children }: ModalProps) {
  return (
    <>
      <div className="h-screen w-screen bg-green-500 opacity-30 absolute z-1"></div>
      <div className="flex flex-col justify-start items-center md:min-w-[500px] h-fit bg-white z-60 absolute top-[50%] bottom-[50%] translate-y-[-50%] rounded-2xl p-4 gap-6 shadow-xl">
        <header className="text-3xl font-bold">{title}</header>
        {children}
      </div>
    </>
  );
}
