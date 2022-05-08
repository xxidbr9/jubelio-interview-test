import * as React from "react"
import { SVGProps } from "react"

const LeftIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={24}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M14 7.5s-4 4-4 4.5 4 4.5 4 4.5"
      stroke="#222628"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default LeftIcon
