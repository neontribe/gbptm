import React from 'react';
import { Global, css } from '@emotion/react';

import theme from './theme';

// loosely based on https://hankchizljaw.com/wrote/a-modern-css-reset
const globalStyles = (
  <Global
    styles={css`
      @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap');

      *,
      *::before,
      *::after {
        box-sizing: border-box;
      }

      *:focus {
        outline: none;
      }

      [data-focus-visible-added] {
        outline: 1px dotted currentColor;
        outline-offset: 0.5rem;
      }

      /* remove default padding */
      ul,
      ol,
      button,
      fieldset {
        padding: 0;
      }

      /* remove default margin */
      body,
      h1,
      h2,
      h3,
      h4,
      p,
      ul,
      ol,
      li,
      figure,
      figcaption,
      blockquote,
      dl,
      dd,
      fieldset {
        margin: 0;
      }

      :root,
      #root {
        height: 100%;
      }

      /* set core body defaults */
      body {
        height: 100%;
        scroll-behavior: smooth;
        text-rendering: optimizeSpeed;
        line-height: 1.5;
        font-family: 'Open Sans', sans-serif;
        color: ${theme.colors.primary};
      }

      /* remove list styles on ul, ol elements */
      ul,
      ol {
        list-style: none;
      }

      /* have link and buttons be indistinguishable */
      a,
      button {
        color: inherit;
        cursor: pointer;
      }

      a {
        text-decoration: none;
      }

      button {
        border: none;
        background: none;
      }

      /* make images easier to work with */
      img {
        max-width: 100%;
        display: block;
      }

      /* natural flow and rhythm in articles by default */
      article > * + * {
        margin-top: 1em;
      }

      /* inherit fonts for inputs and buttons */
      input,
      button,
      textarea,
      select {
        font: inherit;
      }

      label {
        cursor: pointer;
      }

      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        font: inherit;
      }

      fieldset {
        border: 0;
      }

      th {
        text-align: left;
        font-weight: normal;
        vertical-align: bottom;
      }

      p + p {
        margin-top: 1em;
      }

      a:hover,
      a:focus,
      button:hover,
      button:focus {
        color: ${theme.colors.tertiary};
        transition: all 0.2s ease;
      }

      [hidden] {
        display: none !important;
      }

      [inert] {
        opacity: 0.25;
      }

      ::-webkit-input-placeholder {
        color: ${theme.colors.primary};
      }

      :-ms-input-placeholder {
        color: ${theme.colors.primary};
      }

      ::placeholder {
        color: ${theme.colors.primary};
      }

      /* remove all animations and transitions for people that prefer not to see them */
      @media (prefers-reduced-motion: reduce) {
        * {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
          scroll-behavior: auto !important;
        }
      }
    `}
  />
);

export default globalStyles;
