import useNavigateBack from "../../hooks/useNavigateBack";
import { PageWrapper } from "../ClientWrapper/Layout";

function ShouldntBeHere() {
  const navigateBack = useNavigateBack();

  return (
    <PageWrapper onPageLeft={navigateBack} onPageRight={navigateBack}>
      <h1>okay.</h1>
      <p>you souldn't be here :)</p>
      <div className="divider" />
      <button onClick={navigateBack}>go back</button>
      <p>( or stay here idc. )</p>
    </PageWrapper>
  );
}

export default ShouldntBeHere;
