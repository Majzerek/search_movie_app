import type { ButtonHTMLAttributes } from "react";
import { useNavigate } from "react-router"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>  {
  children:React.ReactNode;
  to:string;
};

export const ButtonNav = ({children, to, ...props}:ButtonProps) => {
  const navigate = useNavigate()
  return (
    <button type="button" className='btn_nav' {...props}  onClick={()=> navigate(to)}>{children}</button>
  )
}
