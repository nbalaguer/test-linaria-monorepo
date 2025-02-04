import { styled } from "@linaria/react";
import { colorvar } from "@acme/tokens";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}

const Root = styled.button<{ $variant: "primary" | "secondary" }>`
  padding: 0.7rem 1.2rem;
  color: white;
  border: ${colorvar.primary[80]} solid 4px;
  border-radius: 0.5rem;


  background-color: ${({ $variant }) => {
    switch ($variant) {
      case "primary":
        return colorvar.primary[60];
      case "secondary":
        return colorvar.secondary[60];
      default:
        return "black";
    }
  }};
`;

function Button(props: ButtonProps): JSX.Element {
  const { children, variant = "primary", ...other } = props;

  return (
    <Root type="button" $variant={variant} {...other}>
      {children}
    </Root>
  );
}

Button.displayName = "Button";

export default Button;
