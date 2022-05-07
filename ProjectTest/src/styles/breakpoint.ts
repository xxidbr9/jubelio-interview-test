import baseTailwindConfig from '@base/tailwind.config'

const { screens: twScreen } = baseTailwindConfig.theme.extend

const breakpoint = {
  ...twScreen
}


export default breakpoint


const breakScreen: {
  [x: string]: number
} = {}

Object.keys(breakpoint).forEach(key => breakScreen[key] = +(breakpoint[key].replace("px", "")))

export { breakScreen }