import * as React from "react"
import { SVGProps } from "react"

const FilterIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={24}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M3 6h3M3 18h3M14 6h7M14 18h7M3 12h12"
      stroke="#292D32"
      strokeWidth={1.5}
      strokeLinecap="round"
    />
    <rect
      x={8}
      y={4}
      width={4}
      height={4}
      rx={1.5}
      stroke="#292D32"
      strokeWidth={1.5}
    />
    <rect
      x={8}
      y={16}
      width={4}
      height={4}
      rx={1.5}
      stroke="#292D32"
      strokeWidth={1.5}
    />
    <rect
      x={17}
      y={10}
      width={4}
      height={4}
      rx={1.5}
      stroke="#292D32"
      strokeWidth={1.5}
    />
  </svg>
)

export default FilterIcon
