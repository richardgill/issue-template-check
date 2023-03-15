import { Icon, IconProps } from '@chakra-ui/react'

export const AstroIcon: React.FC<IconProps> = ({ css, ...props }) => (
  <Icon viewBox="0 0 256 256" {...props}>
    <g>
      <path
        d="M95.2891 198.921C84.8919 189.539 81.8569 169.825 86.1886 155.543C93.6995 164.548 104.106 167.4 114.886 169.01C131.527 171.495 147.87 170.566 163.329 163.057C165.098 162.197 166.732 161.054 168.665 159.897C170.115 164.051 170.493 168.245 169.986 172.514C168.754 182.91 163.513 190.94 155.178 197.028C151.845 199.463 148.318 201.639 144.875 203.935C134.299 210.992 131.438 219.266 135.412 231.302C135.506 231.595 135.591 231.888 135.804 232.604C130.405 230.219 126.46 226.745 123.455 222.178C120.281 217.358 118.77 212.026 118.691 206.256C118.651 203.448 118.651 200.616 118.269 197.848C117.335 191.1 114.126 188.078 108.081 187.904C101.876 187.725 96.9681 191.512 95.6666 197.475C95.5673 197.932 95.4233 198.385 95.2792 198.916L95.2891 198.921Z"
        fill="currentColor"
      />
      <path
        d="M43 159.916C43 159.916 71.4293 146.096 99.938 146.096L121.433 79.7147C122.237 76.5044 124.587 74.3229 127.24 74.3229C129.892 74.3229 132.242 76.5044 133.047 79.7147L154.541 146.096C188.306 146.096 211.479 159.916 211.479 159.916C211.479 159.916 163.19 28.6441 163.095 28.3807C161.709 24.4996 159.37 22 156.215 22H98.2689C95.1145 22 92.8692 24.4996 91.3887 28.3807C91.2844 28.6391 43 159.916 43 159.916Z"
        fill="currentColor"
      />
    </g>
  </Icon>
)
