
import * as React from "react"
import { SVGProps } from "react"

const CartIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={props.width || 24}
    height={props.height || 24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx={11.5} cy={20.5} r={1.5} fill="#292D32" />
    <circle cx={17.5} cy={20.5} r={1.5} fill="#292D32" />
    <path
      d="M4 9H3M5 15H4M5 12H2M6.762 6.5l2.082 9.327A1.5 1.5 0 0 0 10.308 17h8.146a1.5 1.5 0 0 0 1.464-1.173l1.674-7.5A1.5 1.5 0 0 0 20.128 6.5H6.762Zm0 0L6.11 4.106A1.5 1.5 0 0 0 4.663 3H2"
      stroke="#292D32"
      strokeWidth={1.5}
      strokeLinecap="round"
    />
  </svg>
)

export default CartIcon