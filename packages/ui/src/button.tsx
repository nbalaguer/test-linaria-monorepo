import { styled } from "@linaria/react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}

const Root = styled.button<{ $variant: "primary" | "secondary" }>`
  background-color: ${({ $variant }) => {
    switch ($variant) {
      case "primary":
        return "red";
      case "secondary":
        return "blue";
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
