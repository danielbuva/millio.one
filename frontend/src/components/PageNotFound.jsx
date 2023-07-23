import useNavigateBack from "../hooks/useNavigateBack";
import { PageWrapper } from "./ClientWrapper/Layout";

const faces = [
  "(-’๏_๏’-)",
  "˚⌇˚",
  "(╯︵╰,)",
  "‘︿’",
  "(ㄒoㄒ)",
  "v( ‘.’ )v",
  "┐(‘～`；)┌",
  "v(ಥ ̯ ಥ)v",
  "ﾟ｡･ﾟヾ(ﾟ｀ｪ´ﾟ)ﾉ｡ﾟ･｡",
  "( -̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥᷄◞ω◟-̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥̥᷅ )",
  "૮(꒦ິཅ꒦ິ)ა",
  "︵‿︵(´ ͡༎ຶ ͜ʖ ͡༎ຶ `)︵‿︵",
  "(｡•́︿•̀｡)",
  "｡○(ᐢ´•̥ ×•̥ `ᐢ)○｡",
  "(っ˘̩╭╮˘̩)っ",
  "(つ﹏<。)",
  "(☭ ͜ʖ ☭)",
  "▂▅▇█▓▒░(‘ω’)░▒▓█▇▅",
  "༼☯﹏☯༽",
  "(´°ω°`)",
  "(*꒦ິㅂ꒦ີ)",
  "(੭ ˃̣̣̥ ω˂̣̣̥)੭ु⁾⁾",
  "(-̩̩̩-̩̩̩-̩̩-̩̩̩_-̩̩̩-̩-̩̩̩-̩̩̩)",
  ".·´¯`(>▂<)´¯`·.",
  "(っ◞‸◟c)",
];

function PageNotFound() {
  const goback = useNavigateBack();
  return (
    <PageWrapper onPageLeft={goback} onPageRight={goback}>
      <h1>page not found.</h1>
      <p>return now!</p>
      <div className="divider" />
      <p className="face">
        {faces[Math.floor(Math.random() * faces.length)]}
      </p>
    </PageWrapper>
  );
}

export default PageNotFound;
