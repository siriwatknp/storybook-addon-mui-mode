import * as React from "react";

export function SvgMuiDark(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={21}
      height={16}
      viewBox="0 0 31 24"
      fill="none"
      {...props}
    >
      <g clipPath="url(#prefix__clip0)">
        <path
          d="M0 13.083V0l11.357 6.541v4.361l-7.571-4.36v8.721L0 13.083z"
          fill="#565656"
        />
        <path
          d="M11.357 6.541L22.714 0v13.083l-7.571 4.36-3.786-2.18 7.572-4.36V6.54l-7.572 4.361v-4.36z"
          fill="#121212"
        />
        <path
          d="M11.357 15.263v4.361l7.572 4.36v-4.36l-7.572-4.36z"
          fill="#565656"
        />
        <path
          d="M18.929 23.985l11.357-6.541V8.722l-3.786 2.18v4.361l-7.571 4.361v4.36zM26.5 6.54v-4.36L30.286 0v4.36L26.5 6.542z"
          fill="#121212"
        />
      </g>
      <defs>
        <clipPath id="prefix__clip0">
          <path fill="#fff" d="M0 0h30.286v24H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}
