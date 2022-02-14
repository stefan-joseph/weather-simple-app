import { css } from "@emotion/react";
import FadeLoader from "react-spinners/FadeLoader";

export default function Loader() {
  return (
    <div className="loader">
      <FadeLoader loading css={css} color="#57a0ee" />
    </div>
  );
}
