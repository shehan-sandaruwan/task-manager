type ButtonProps = {
  children: React.ReactNode;
  onClickHandler?: () => void;
  styles: string;
  type?: "button" | "reset" | "submit" | undefined;
  testId?: string;
};
export default function Button({ children, ...props }: ButtonProps) {
  return (
    <button
      className={`${props.styles} py-4 px-8 rounded-2xl border-2`}
      onClick={props.onClickHandler}
      type={props.type ? props.type : "button"}
      data-testid={props.testId}
    >
      {children}
    </button>
  );
}
