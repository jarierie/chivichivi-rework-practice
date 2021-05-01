import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { gsap } from "gsap";
import image1 from "./assets/pic1.jpg";
import image2 from "./assets/pic2.jpg";
import image3 from "./assets/pic3.jpg";
import image4 from "./assets/pic4.jpg";
import image5 from "./assets/logo512.png";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
`;

const TextMainContainer = styled.div`
  width: 700px;
  height: 600px;
`;

const TextContainer = styled.div`
  width: 100%;
  height: 100px;
  background-color: ${(props) => props.color};
  text-align: ${(props) => props.align};
  font-size: 50px;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  text-transform: uppercase;
`;

const RevealImageContainer = styled.div`
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    opacity: 0;
    width: 100%;
    height: 100%;
  }
`;

const text = [
  { name: "Hardwork", color: "lightgreen", align: "end", image: image1 },
  { name: "Perseverance", color: "lightyellow", align: "start", image: image2 },
  { name: "Guts", color: "lightblue", align: "center", image: image3 },
  { name: "Confidence", color: "tomato", align: "start", image: image4 },
  { name: "Go get 'em", color: "purple", align: "center", image: image5 },
];

const Main = () => {
  const initialImage = image5;
  const [img, setImg] = useState(initialImage);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const ref = useRef(null);

  //animation

  const initialHover = () => {
    const tl = gsap.timeline();
    tl.to(ref.current.childNodes[0], { opacity: 1 }).to(
      ref.current,
      { scale: 1.1, duration: 2, rotate: 10 },
      0
    );
  };

  const leaveHover = () => {
    const tl = gsap.timeline();
    tl.to(ref.current.childNodes[0], { opacity: 0, scale: 1 }, 0);
  };

  const animation = () => {
    const tl = gsap.timeline();
    tl.to(ref.current, {
      x:
        position.x -
        window.innerWidth / 2 -
        ref.current.getBoundingClientRect().width * 2,

      y:
        position.y -
        window.innerHeight / 2 -
        ref.current.getBoundingClientRect().height * 0.01,
    });
  };

  const hoverChangeState = (img) => {
    setImg(img);
  };

  useEffect(() => {
    animation();
  }, [position]);

  useEffect(() => {
    const set = (e) => {
      setPosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", set);

    return () => {
      window.removeEventListener("mousemove", set);
    };
  }, []);

  return (
    <>
      {" "}
      <Container>
        <TextMainContainer>
          {text.map((item) => {
            return (
              <TextContainer
                onMouseEnter={initialHover}
                onMouseOut={leaveHover}
                onMouseOver={() => hoverChangeState(item.image)}
                align={item.align}
                color={item.color}
              >
                {item.name}
              </TextContainer>
            );
          })}
        </TextMainContainer>
        <RevealImageContainer ref={ref}>
          <img src={img}></img>
        </RevealImageContainer>
      </Container>{" "}
      <Container></Container>
    </>
  );
};

export default Main;
