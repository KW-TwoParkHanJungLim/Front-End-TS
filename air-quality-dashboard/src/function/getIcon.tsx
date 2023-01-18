import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const Icon = styled(FontAwesomeIcon)<{ color: string }>`
  color: ${(props) => props.color};
  margin-bottom: 4px;
  font-size: 28px;
  margin-right: 10px;
`;

export function getFace(state: string, color: string, isError: boolean) {
  if (isError) return <Icon icon="face-meh-blank" color={"grey"} />;

  if (state === "매우좋음")
    return <Icon icon="face-smile-beam" color={color} />;
  else if (state === "좋음") return <Icon icon="face-smile" color={color} />;
  else if (state === "보통") return <Icon icon="face-meh" color={color} />;
  else if (state === "나쁨")
    return <Icon icon="face-frown-open" color={color} />;
  else if (state === "매우나쁨")
    return <Icon icon="face-dizzy" color={color} />;
}
