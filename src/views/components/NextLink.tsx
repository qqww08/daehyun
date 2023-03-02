import Link from "next/link";
import { AnchorHTMLAttributes, ReactNode } from "react";
import styled from "styled-components";

export interface NextLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  /**
   * @example https://nextjs.org/docs/api-reference/next/link
   */
  /**
   * Replace the current `history` state instead of adding a new url into the stack.
   *
   * @defaultValue `false`
   */
  replace: boolean;
  /**
   * Whether to override the default scroll behavior
   *
   * @example https://nextjs.org/docs/api-reference/next/link#disable-scrolling-to-the-top-of-the-page
   *
   * @defaultValue `true`
   */
  scroll: boolean;
  /**
   * Update the path of the current page without rerunning [`getStaticProps`](/docs/basic-features/data-fetching/get-static-props.md), [`getServerSideProps`](/docs/basic-features/data-fetching/get-server-side-props.md) or [`getInitialProps`](/docs/api-reference/data-fetching/get-initial-props.md).
   *
   * @defaultValue `false`
   */
  shallow: boolean;
  /**
   * Forces `Link` to send the `href` property to its child.
   *
   * @defaultValue `false`
   */
  passHref: boolean;
  /**
   * Prefetch the page in the background.
   * Any `<Link />` that is in the viewport (initially or through scroll) will be preloaded.
   * Prefetch can be disabled by passing `prefetch={false}`. When `prefetch` is set to `false`, prefetching will still occur on hover. Pages using [Static Generation](/docs/basic-features/data-fetching/get-static-props.md) will preload `JSON` files with the data for faster page transitions. Prefetching is only enabled in production.
   *
   * @defaultValue `true`
   */
  prefetch: boolean;
  /**
   * The active locale is automatically prepended. `locale` allows for providing a different locale.
   * When `false` `href` has to include the locale as the default behavior is disabled.
   */
}
const AnchorTag = ({
  children,
  href,
  replace,
  scroll,
  prefetch,
  shallow,
  ...rest
}: NextLinkProps) => {
  return (
    <Link
      href={href}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
      prefetch={prefetch ? undefined : false}
      passHref
      legacyBehavior
    >
      <LinkStyled {...rest}>{children}</LinkStyled>
    </Link>
  );
};
const LinkStyled = styled.a``;
export const NextLink = AnchorTag as typeof Link;
