import * as React from "react"
import Svg, { Circle, Path } from "react-native-svg"

function SearchIcon(props) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Circle cx={11.5} cy={11.5} r={9.5} stroke="#393939" strokeWidth={1.5} />
      <Path
        d="M20 20l2 2"
        stroke="#393939"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </Svg>
  )
}

export default SearchIcon
