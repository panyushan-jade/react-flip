import React, { useState, useLayoutEffect, useRef } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  column-count: 4;
  margin: auto;
  width: 800px;
`;
const ImgWrap = styled.div`
  width: 25%;
  padding: 8px;
  box-sizing: border-box;
`;
const Img = styled.img`
  width: 100%;
  height: 200px;
  border-radius: 8px;
  object-fit: cover;
`;

export default function App() {
  // 根节点
  const root = useRef();
  // 保留前一个状态
  const prev = useRef(null);
  const [imgs, setImgs] = useState([
    "https://pic3.zhimg.com/v2-89735fee10045d51693f1f74369aaa46_r.jpg",
    "https://pic1.zhimg.com/v2-ca51a8ce18f507b2502c4d495a217fa0_r.jpg",
    "https://pic1.zhimg.com/v2-c90799771ed8469608f326698113e34c_r.jpg",
    "https://pic1.zhimg.com/v2-8d3dd83f3a419964687a028de653f8d8_r.jpg",
    "https://pic1.zhimg.com/v2-09eefac19ac282684f60a202aa9abb2c_r.jpg",
    "https://pic3.zhimg.com/v2-a7340ebca1f7a4f65190583b4ab3a482_r.jpg",
    "https://pic2.zhimg.com/v2-37860484a1a73257178e95267c7db641_r.jpg",
    "https://pic2.zhimg.com/v2-7fc30291c807d07d2d26c5a8ffdd3b89_r.jpg",
  ]);
  useLayoutEffect(() => {
    if (prev.current === null) {
      // mounted保留前状态
      prev.current = Array.from(root.current.children).map((dom) => {
        const rect = dom.getBoundingClientRect();
        return { dom, pos: { left: rect.left, top: rect.top } };
      });
    } else {
      prev.current.map(({ dom, pos }) => {
        // 获取新状态
        const rect = dom.getBoundingClientRect();
        // invent 还原到初始状态
        // play: 执行动画
        // dom.style = `transform: translate(${pos.left - rect.left}px, ${
        //   pos.top - rect.top
        // }px)`;
        setTimeout(() => {
          dom.animate(
            [
              {
                transform: `translate(${pos.left - rect.left}px, ${
                  pos.top - rect.top
                }px)`,
              },
              {
                transform: "translate(0,0)"
              },
            ],
            {
              duration: 300,
              easing: "cubic-bezier(0,0,0.32,1)",
              fill: "forwards",
            }
          );
        },5)
      });
      // 保存最新状态
      prev.current = Array.from(root.current.children).map((dom) => {
        const rect = dom.getBoundingClientRect();
        return { dom, pos: { left: rect.left, top: rect.top } };
      });
    }
  }, [imgs]);
  return (
    <Container ref={root}>
      {imgs.map((img) => (
        <ImgWrap
          key={img}
          onClick={() => {
            // 将数组打乱
            setImgs((imgs) => [...imgs.sort(() => (Math.random() > 0.5 ? -1 : 1))]);
          }}
        >
          <Img src={img} />
        </ImgWrap>
      ))}
    </Container>
  );
}