import type { ReactNode } from "react";

type Props = {
  Children?: ReactNode;
  onClick?: () => void;
};

export const Button = ({ Children, onClick }: Props) => {
  return (
    <>
      <button onClick={onClick}>{Children}</button>
    </>
  );
};
