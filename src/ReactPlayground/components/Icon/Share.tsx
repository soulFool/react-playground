import { IconProps } from './type'

const Share = (props: IconProps) => {
  const { className, style, title, onClick } = props

  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      className={className}
      onClick={onClick}
      style={{ cursor: 'pointer', ...style }}
    >
      <g
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <circle cx="18" cy="5" r="3" />
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="19" r="3" />
        <path d="M8.59 13.51l6.83 3.98" />
        <path d="M15.41 6.51l-6.82 3.98" />
      </g>
    </svg>
  )
}

export default Share
