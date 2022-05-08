import styled from "@emotion/styled"
import tw from "twin.macro"
import { ButtonProps } from "./Button.props"

const StyledButton = styled.button<ButtonProps>`
  ${tw`py-4  flex items-center justify-center duration-100 ease-out rounded-sm`}
  ${props => props.fluid ? tw`w-full` : tw`px-6`}
  ${props => props.variant === "primary" && tw`bg-black text-white`}
  ${props => props.variant === "secondary" && tw`bg-white text-black border-2`}
  ${props => props.variant === "ternary" && tw`bg-blue-500 text-white`}
`

const Button: React.FC<ButtonProps & JSX.IntrinsicElements['button']> = (props) => {
  return <StyledButton {...props} variant={props.variant || "primary"} className={"active:scale-[.98] " + props.className} />
}

export default Button