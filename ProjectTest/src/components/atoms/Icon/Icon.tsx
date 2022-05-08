import styled from '@emotion/styled'
import React from 'react'
import tw from 'twin.macro'
import { IconProps } from './Icon.props'

const WrapperStyled = styled.div`
  position: relative;
  width:24px;
  height:24px ;
`

const BadgeStyled = styled.div`
  position: absolute;
  font-size: 10px;
  padding: 2px 8px;
  color: white;
  top: -4px;
  right: -8px;
  ${tw`bg-black rounded-full`}
`
const Icon: React.FC<IconProps> = ({ badge = 0, src, color, ...props }) => {

  const IconSrc = src

  return (
    <WrapperStyled>
      {!!badge && <BadgeStyled>{badge}</BadgeStyled>}
      <IconSrc color={color} />
    </WrapperStyled>
  )
}

export default Icon