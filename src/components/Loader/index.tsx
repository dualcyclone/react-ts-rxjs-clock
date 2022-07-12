import styled from "styled-components";
import CircularProgress from "@mui/material/CircularProgress";

const Loader = styled(CircularProgress)``;
Loader.defaultProps = {
  size: 40,
  thickness: 1
};

export default Loader;
